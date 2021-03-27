import axios from "axios"

const instance = axios.create({
    baseURL: "https://studenti.sum.ba/StudentskiSmjestajMostar"
})

export default instance