var greekWord = /[ΐα-ωά-ώ]+/g
var wiktionaryUrl = 'https://el.wiktionary.org/wiki/'

document.getElementById('parse').onclick = () => {

    var words = _id('text').value.toLowerCase().match(greekWord) || []
    var distinctWords = Array.from(new Set(words)).sort((a, b) => a.localeCompare(b, 'el'))
    var results = _id('results')

    results.textContent = ''

    distinctWords.forEach((word, index) => {
        if (index > 0) {
            results.appendChild(document.createTextNode(' '))
        }
        results.appendChild(_a(word))
    })
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
