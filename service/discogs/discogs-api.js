const _ = require('lodash')
const axios = require('axios')

const keys = require('../../private/keys.json')
const { KEY, SECRET } = keys.discogs

import parseVideoLinks from '../../lib/parseVideoLinks'
import { BASE_URL, PER_PAGE } from './constants'

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
        const res = await axios.get(`${BASE_URL}search?genre=${releaseGenre}&per_page=${PER_PAGE}&page=1&key=${KEY}&secret=${SECRET}`)
        return res.data.results.map(result => _.pick(result, releaseProps))
    } catch (err) {
        // To-do: define custom error handler
        throw new Error(err)
    }
}

const getReleaseByUri = async (uri) => {
    const res = await axios.get(`${BASE_URL}${uri}`)
    return _.get(res, 'data')
}

const getVideosByReleaseUri = async (releaseUri) => {
    const releasePage = await getReleaseByUri(releaseUri)
    return releasePage ? parseVideoLinks(releasePage) : []
}

exports.getReleasesByGenre = getReleasesByGenre
exports.getReleaseByUri = getReleaseByUri
exports.getVideosByReleaseUri = getVideosByReleaseUri