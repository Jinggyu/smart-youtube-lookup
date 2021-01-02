const _ = require('lodash')
const axios = require('axios')

const keys = require('../../private/keys.json')

const { KEY, SECRET } = keys.discogs

const BASE_URL = 'https://api.discogs.com/database/search?genre='
const PER_PAGE = '75'
const PAGE = '1'
// to-do: move these to ./constants.js

const releaseProps = [
    'title',
    'cover_image',
    'country',
    'style',
    'uri',
    'year',
    'label',
]

const getReleaseByGenre = async (releaseGenre) => {
    try {
        const res = await axios.get(`${BASE_URL}${releaseGenre}&per_page=${PER_PAGE}&page=${PAGE}&key=${KEY}&secret=${SECRET}`)
        return res.data.results.map(result => _.pick(result, releaseProps))
    } catch (err) {
        // To-do: handle this error instead of throwing it back ti the caller
        // if you rather handle it here
        throw new Error(err)
    }
}

module.exports = [
    getReleaseByGenre
]