var greekWord = /[ΐα-ωά-ώ]+/g

document.getElementById('parse').onclick = () => {

    var words = _id('text').value.toLowerCase().match(greekWord) || []
    var distinctWords = Array.from(new Set(words)).sort((a, b) => a.localeCompare(b, 'el'))

    _id('results').textContent = distinctWords.map(word => '[[' + word + ']]').join(' ')
}

function _id(id) {
    return document.getElementById(id)
}
