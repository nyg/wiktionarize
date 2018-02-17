document.getElementById('parse').onclick = () => {

    var text = _id('text').value.replace(/["']/g, '').trim(),
        words = Array.from(new Set(text.split(/[ \n]/g))),
        languages = _id('languages').value.replace(/ /g, '').split(',')
        results = _id('results')

    results.innerHTML = ''

    words.forEach(word => {

        results.appendChild(_span(word, ''))
        results.appendChild(_br());

        languages.forEach(lang => {
            checkExistence(lang, word)
        })
    })
}

var apiOptions = {
    action: 'opensearch',
    profile: 'normal',
    limit: 1
}

function checkExistence(lang, word) {

    apiOptions.search = word
    var url = 'https://' + lang + '.wiktionary.org'

    new MediaWikiJS(url, apiOptions, data => {

        if (data[3].length == 1) { // there is a result
            _id(word).appendChild(
                _span(lang + '-' + word,
                    _a(`${data[1][0]} (${lang})`, data[3][0])))
        }
        else {
            var a = _a(`${word} (${lang})`, `${url}/wiki/${word}`)
            a.style.color = 'red'
            _id(word).appendChild(a)
        }
    })
}

function _id(id) {
    return document.getElementById(id)
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
    a.style.marginRight = '15px'
    return a
}
