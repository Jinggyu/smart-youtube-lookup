import express from 'express'
import cors from 'cors'
import { get } from 'lodash' 

const app = express()

import Discogs from '../service/discogs/discogs-api.js'

app.get('/', (req, res) => {
    res.send("hello!")
})

app.get('/ping', cors(), (req, res) => {
    res.send('pong')
})

app.get('/releases/', cors(), async (req, res) => {
    const genre = get(req.query, 'genre') || 'Folk%2C+World%2C+%26+Country'

    const buildResponse = (release, videos) => {
        return { release, videos }
    }

    try {
        const dataFromDiscogs = await Discogs.getReleasesByGenre(genre)
        const release = get(dataFromDiscogs, '0')
        let videos = []

        if (release) {
            videos = await Discogs.getVideosByReleaseUri(release.uri)
        }
        res.send(buildResponse(release, videos))
    } catch (err) {
        res.send('Sorry, something is wrong.')
    }
})

export default app