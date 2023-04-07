import axios from 'axios'

export const instanceJoke = axios.create({
   baseURL: 'https://v2.jokeapi.dev/',
})

export const apiKey = 'wXNY57gJYhAAzUrFFwLZo18LXfEUGGWV'

export const instanceEvent = axios.create({
   baseURL: 'https://app.ticketmaster.com/discovery/v2/events',
})
