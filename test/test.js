const html = 'snthn lngdf youtube.com/123 kfkfhslfkn youtube.com/456 lkdfgldfglkdgcd'

const linkLocations = []
const subs = [...html]

let links = []
subs.forEach((char, index) => {
    if (html.substring(index, index + 11) === 'youtube.com') {
        links.push(html.substring(index, index + 15))
    }
})