const express = require('express')
const _ = require('lodash')

const app = express()

const DiscogsApi = require('./service/discogs/discogs-api.js')
const YouTubeApi = require('./service/youtube/youtube-api.js')

app.get('/', (req, res) => {
    res.send("hello!")
})

app.get('/releases/', async (req, res) => {
    let dataFromDiscogs

    const genre = _.get(req.query, 'genre') || 'Folk%2C+World%2C+%26+Country'

    const buildResponse = (release, videos) => {
        return { release, videos }
    }

    try {
        dataFromDiscogs = await DiscogsApi[0](genre)

        const release = _.get(dataFromDiscogs, '0')
        const videos = await YouTubeApi[0](release.uri)

        const response = buildResponse(release, videos)

        res.send(response)

    } catch (err) {
        res.send('Sorry, something is wrong.')
        console.log('caught err: ', err)
    }
})

app.listen(3000)