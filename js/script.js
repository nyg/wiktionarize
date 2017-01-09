document.getElementById('parse').onclick = function () {

    var words = Array.from(new Set(document.getElementById('text').value.split(' '))),
        languages = document.getElementById('languages').value.split(/[, ]+/)
        results = document.getElementById('results')

    words.forEach(function (word) {

        results.appendChild(_span(word, word + ': '))
        results.appendChild(_br());

        languages.forEach(function (lang) {
            checkExistence(lang, word)
        })
    })
}

function checkExistence(lang, word) {
    new MediaWikiJS('https://' + lang + '.wiktionary.org', {
        action: 'opensearch',
        search: word,
        profile: 'fuzzy',
        limit: 1
    }, function (data) {
        var links = data[3]
        var a = _a(lang, data[3])
        if (links.length == 0) {
            a.style.color = 'red'
        }
        a.style.marginRight = '5px'
        document.getElementById(word).appendChild(_span(lang + '-' + word, a))
    })
}

function _span(id, content) {
    var span = document.createElement('span')
    span.setAttribute('id', id)
    if (typeof content === 'string') {
        span.textContent = content
    }
    else if (typeof content === 'object') {
        span.appendChild(content)
    }
    return span
}

function _br() {
    return document.createElement('br')
}

function _a(title, url) {
    var a = document.createElement('a')
    a.setAttribute('href', url)
    a.textContent = title
    return a
}
