import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://v2.jokeapi.dev/',
})
