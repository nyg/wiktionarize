var greekWord = /[ΐα-ωά-ώ]+/g
var wiktionaryUrl = 'https://el.wiktionary.org/wiki/'
var wiktionaryApiUrl = 'https://el.wiktionary.org/w/api.php'
var titlesPerRequest = 50
var titlesLengthPerRequest = 6000

var latestParse = 0

document.getElementById('parse').onclick = () => {

    var words = _id('text').value.toLowerCase().match(greekWord) || []
    var distinctWords = Array.from(new Set(words)).sort((a, b) => a.localeCompare(b, 'el'))
    var results = _id('results')
    var parse = ++latestParse
    var anchors = new Map()

    results.textContent = ''

    distinctWords.forEach((word, index) => {
        if (index > 0) {
            results.appendChild(document.createTextNode(' '))
        }
        anchors.set(word, results.appendChild(_a(word)))
    })

    requestChunks(distinctWords).forEach(chunk => {

        missingWords(chunk)
            .then(missing => {
                if (parse === latestParse) {
                    missing.filter(word => anchors.has(word))
                        .forEach(word => anchors.get(word).style.color = 'red')
                }
            })
            .catch(() => {})
    })
}

function requestChunks(words) {

    var chunks = []
    var chunk = []
    var length = 0

    words.forEach(word => {

        var wordLength = encodeURIComponent(word).length + 3

        if (chunk.length === titlesPerRequest || (chunk.length > 0 && length + wordLength > titlesLengthPerRequest)) {
            chunks.push(chunk)
            chunk = []
            length = 0
        }

        chunk.push(word)
        length += wordLength
    })

    if (chunk.length > 0) {
        chunks.push(chunk)
    }

    return chunks
}

function missingWords(words) {

    var titles = words.map(encodeURIComponent).join('%7C')
    var url = `${wiktionaryApiUrl}?action=query&format=json&origin=*&titles=${titles}`

    return fetch(url, { headers: { 'Api-User-Agent': 'wiktionarize (https://github.com/nyg/wiktionarize)' } })
        .then(response => response.json())
        .then(data => Object.values(data.query.pages)
            .filter(page => 'missing' in page)
            .map(page => page.title))
}

function _id(id) {
    return document.getElementById(id)
}

function _a(word) {
    var a = document.createElement('a')
    a.setAttribute('href', wiktionaryUrl + encodeURIComponent(word))
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noopener')
    a.textContent = word
    return a
}
