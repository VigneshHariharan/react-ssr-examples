
const mockApiData = async () => new Promise((resolve) => {
    setTimeout(() => {
        const data = new Array(100).fill({
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        });
        resolve(data);
    })
})

const root = document.querySelector("#root");

const createTexts = (data) => {
    const fragment = document.createDocumentFragment()
    for(let pok of data) {
        const text = document.createElement('p');
        text.innerText = pok.name;
        fragment.appendChild(text);

    }
    root.appendChild(fragment)
}
async function load() {
    const pokeData = await mockApiData()
    console.log('poke',pokeData)
    createTexts(pokeData);

    // const layoutImage = document.getElementById("layout-image");
    const image = new Image()
    image.src =
      "https://developer.chrome.com/static/docs/chromium/layoutng/image/shows-tree-described-t-4efbe34534aff_960.png";
    
    image.width = 400;
    image.height = 300;
    image.onload = (async () => {
        const bitmap = await Promise.all([
          createImageBitmap(image,),
          createImageBitmap(image),
        ]);
        console.log("bitmap",bitmap)
    })
    

    console.log('iamge',image)
    // document.body.appendChild(image)
}
load()
