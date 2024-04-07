SSR in React
Rendering -> Generation of HTML
Client -> HTML is created in the browser
Server -> HTML is created on the server

When do we generate HTML? -> When you need to display data in UI, you fetch an API, get data, and use a UI component to display it.

Why does it matter where rendering happens? -> Because of JavaScript. When you use JavaScript to generate HTML, you essentially need to create a function that creates a DOM element and appends it to the body. Typically, this is necessary when fetching data from an API.

Diagram of network calls:
Server-side rendering means you call an API and generate HTML on the server.

How do you generate HTML on the server? How do you call an API?
You can make an HTTP request in any language. You can also create HTML in any language, as it's just a string sent with HTML content type.
Examples of template engines: Jinja, Pug, Jade.

React is a JavaScript library used to build HTML. Now you need to execute JS on the server, which means you can't use APIs that are not available in the JS runtime like node, bun.

Running React code on the server means:

Convert your component into HTML
useEffect hook or useState hook doesn’t work
Accessing the window object will throw undefined
How do you convert a React component into HTML? -> renderToString method
How do you send JavaScript along with it? You need to add the reference to the script in the HTML that is created, so JS will start loading in the network.

Create a page with an interaction:
Question? -> What are the limitations of this approach now? -> Basically anything related to JavaScript.

Now, there's a submit button that needs to have an event listener. To do this, you need JavaScript. So, what needs to be done if you want to attach an event listener to a submit button? The script includes an event listener with a selector and a function to call another API.

We don’t write JavaScript directly; we use some libraries. We'll see how to do this now in React.

Questions?
What’s the pro? -> You can simply show HTML first without making any API call. You can also cache the HTML response, which makes it more useful.
What’s the con? -> Still, JavaScript needs to be loaded on the page first.

Diagram of SSR with React 17:
Hydration -> Attaching event listeners, rebuilding the React app as it did on the client-side.

Let’s get more practical: There won’t be a single API on every page. Even if there is, you don’t need to have a single huge dataset. Not everything on the screen needs to be shown first, not everything needs interaction first.

Demo:

Bare bones -> Show server.js in barebones and use the barebones command.
Questions? -> Why did I use Babel? Why I kept the component inside the same file? If I have to fetch some data, how would I have to send it?
What problems does the current architecture have? -> All interactions only happen after JS is loaded. Waiting for all the API calls to happen -> Selective Hydration, Selective API call with Suspense API.
This is what React 18, 19 will solve. Suspense Stream Architecture. Basically, if you have multiple API calls, send HTML if enough data is available on the screen, Hydrate on priority, hydrate what’s required first.