const needle = 'https://www.youtube.com/'
const linkLength = 43

export default function parsevideoLinks (html) {
  const htmlChars = [...html]
  const links = []

  htmlChars.forEach((char, index) => {
      if (html.substring(index, index + needle.length) === needle) {
          links.push(html.substring(index, index + linkLength))
      }
  })

  return links
}