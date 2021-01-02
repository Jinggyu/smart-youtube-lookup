const _ = require('lodash')
const axios = require('axios')

const keys = require('../../private/keys.json')

import parseVideoLinks from '../../lib/parseVideoLinks'

const { KEY, SECRET } = keys.discogs

// to-do: rermove the following abomination (use constants.js)
const BASE_URL = 'https://api.discogs.com/database/search?genre='
const BASE_DISCOGS_URL = 'https://www.discogs.com/'
const PER_PAGE = '75'
const PAGE = '1'

const releaseProps = [
    'title',
    'cover_image',
    'country',
    'style',
    'uri',
    'year',
    'label',
]

const getReleasesByGenre = async (releaseGenre) => {
    try {
        // To-do; build page incrementer logic
        const res = await axios.get(`${BASE_URL}${releaseGenre}&per_page=${PER_PAGE}&page=${PAGE}&key=${KEY}&secret=${SECRET}`)
        return res.data.results.map(result => _.pick(result, releaseProps))
    } catch (err) {
        // To-do: define custom error handler
        throw new Error(err)
    }
}

const getReleaseByUri = async (uri) => {
    const res = await axios.get(`${BASE_DISCOGS_URL}${uri}`)
    return _.get(res, 'data')
}

const getVideosByReleaseUri = async (releaseUri) => {
    const releasePage = await getReleaseByUri(releaseUri)
    return releasePage ? parseVideoLinks(releasePage) : []
}

exports.getReleasesByGenre = getReleasesByGenre
exports.getReleaseByUri = getReleaseByUri
exports.getVideosByReleaseUri = getVideosByReleaseUri