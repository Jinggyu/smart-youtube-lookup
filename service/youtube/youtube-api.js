const _ = require('lodash')
const axios = require('axios')

// todo import from ../discogs/constants.js
const BASE_DISCOGS_URL = 'https://www.discogs.com'

const needle = 'https://www.youtube.com/'
const linkLength = 43

const parseDiscogsForYouTubeLinks = (html) => {
    const htmlChars = [...html]
    const links = []

    htmlChars.forEach((char, index) => {
        if (html.substring(index, index + needle.length) === needle) {
            links.push(html.substring(index, index + linkLength))
        }
    })

    return links
}

const getVideoLinks = async (uri) => {
    const releasePage = await axios.get(`${BASE_DISCOGS_URL}${uri}`)
    return _.get(releasePage, 'data') ? parseDiscogsForYouTubeLinks(releasePage.data) : null
}

module.exports = [
    getVideoLinks,
]