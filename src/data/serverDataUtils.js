import { pokeData } from './data'

const mockApiData = async () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(pokeData)
    }, 2500)
})

export const fetchData = async () => {
    // const pokeDataBuf = await fetch("https://pokeapi.co/api/v2/pokemon");
 
    // return await pokeDataBuf.json()

    return await mockApiData()
}