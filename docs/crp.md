## A little about Chromium architecture

- Chromium is a web browser and an open source project where other web browsers like opera, edge, even arc built on top of.
- Chromium is built on multi process architecture which means there are multiple processes that handles specific functionality.

- Browser Process (one process): UI of the browser, switching tabs, Network thread, Storage
- Renderer Process (N number of processes depends upon tab): Compositor thread, Blink engine

Blink is an rendering engine - it is part of chromium codebase which implements everything related to rendering content of the web page inside a tab in the browser.

What does it mean? -> requesting a file (by communicating with browser process which will make use of network stack in the OS), processing our HTML, CSS, JS, WASM based on the web standards to turn into a visual representation.

----

## Critical Rendering Path

- When a URL is entered? DNS resolution -> TCP connection -> HTML is streamed

### Steps

- Parsing HTML (main thread)
- Parsing CSS (main thread)
- Render tree (main thread)
- Layout (main thread)
- Paint (main thread)
- commit -> moves Paint operations to compositor thread
- compositor
  - rasterize (rasterize thread in GPU)
  - combine  (compositor thread)
  - Draw pixels (viz(visuals) thread -> make GL calls)

----

### Document Object Model

- The entry of a web page is always an HTML file. Once the browser receives the HTML, it parses the HTML to DOM objects.
- Document Object Model, they represent a tree level representation of the elements.
- These serve 2 purposes, One this will be used as chrome's internal representation of the elements, it allows js to access these objects.
- This task runs on the main thread.
- Demo in the performance monitor

----

### CSS Object Model

- A HTML file may contain a reference stylesheet or an inline style node.
- A CSS file is made up of selectors and declarations.
  - Selector refers to the node in the HTML and declarations is the styles like font-size, color.
- The browser parses the CSS into CSS Object Model (CSSOM) for a fast lookup to get access to the styles.
- The parsing of CSS also happens in the **main thread**.
- Demo in performance monitor

```html
<!-- reference to a style sheet --> 
<link rel='stylesheet' />
```

Why cascade? → a node inherits styles from parent

----

### Render tree

- Render tree is an object that is constructed with DOM nodes (does not necessarily contain all the elements like elements with display none) and it’s styles.
- It contains two things one is a DOM node that needs to be constructed and it’s associated styles which is derived through getComputedStyle.
- getComputedStyle: → getComputed style calculates style based on the declarations provided and specificity.
- In Chrome profiler, the process is known as recalculate style.

----

### Layout process (Also called reflow)

- After render tree is built, the browser will calculate positions of the positions of the elements to be rendered and create boxes (not paint elements) recursively
- Since the render object is a tree, the size of the elements are calculated from bottom to top like if a child element has 500px on a div, the div will also expand to 500px. Since layout is expensive, browser caches it’s result.

----

### Paint

- Paint doesn't mean drawing your render tree into pixels
- It converts the render tree object into record of drawing instructions called paint ops
- Paint ops will do something like drawBackground, drawTextBlob
- These instructions are structured in such a way that it respects stacking context
- That is elements that have z-index is gonna be painted at last

### Commit

- Send paint operations to compositor thread
- this is where all the work on main thread ends for now

----

### Compositor

- Compositing -> Combine visual elements from separate resources and create it into one.
- Decompose the page into layers
- Combine the layers on another thread
- Create a compositor frame

----

### Layers

What are layers?

- Elements that are going to be changed, it is gonna be drawn into a separate frame
- Why? -> Once all the elements are changed to pixels, now you have some elements that does some animation, instead of re drawing all the pixels, renderer only draws the elements that is going to be animating.

- What happens is that each layer is drawn is separately, the layer on top is drawn on a transparent background, then when it is animating it actually looks like it belongs to one single frame

### Rasterization

- Rasterization turns (part of) a record of paint operation into a **bitmap** of color values.

- Rasterization process also involves decompressing an image into bitmap of pixels which contains a matrix of color values.

### Compositor continued

- These Layers are broken into tiles for raster, rasterization happens on a GPU process which has multiple threads for rasterization.
- Once the rasterization is complete this will be returned to the compositor thread again which will combine these tiles into a single compositor frame. rasterization process is asynchronous
- Demo: Show layer, rendering panel with tiles enabled for drawing operations in layer.html

### Activation

- The compositor frame is actually the output of the renderer process.
- The frame’s don’t get directly shown, Once the entire frame is ready, and no user input is happening the newly drawn layer is put onto the top.
- What happens here is the frame is actually a bitmap generated, these are provided to GPU for drawing the pixels in the screen
- This work is done by a graphics library called Skia which calls GPU hardware using OpenGL or in DirectX(windows)

----

## Reference

1. [Browser rendering pipeline](https://webperf.tips/tip/browser-rendering-pipeline/)
2. [Conf talk](https://youtu.be/rVb0pfGFZFw?si=pGFZ1wkD0onkjdJy)
3. [Life of a pixel](https://www.youtube.com/watch?v=K2QHdgAKP-s)
