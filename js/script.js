var punctuation = ',.;:!·"«»\''
var begin = new RegExp('^[' + punctuation + ']', 'g')
var end = new RegExp('[' + punctuation.slice(0, -1) + ']$', 'g') // let's not remove ' at the end of words

document.getElementById('parse').onclick = () => {

    var text = _id('text').value
    var results = _id('results')

    results.textContent = ''

    var words = text.toLowerCase().replace(/[^α-ωά-ώ]/g, ' ').split(/\s/g)
    /*.map(e => {
        return e.replace(begin, '').replace(end, '')
    })*/

    console.log('Initial length: ' + words.length)

    var set = new Set(words)

    console.log(set.size)

    Array
    .from(set)
    .sort((a, b) => a.localeCompare(b))
    .forEach(word => {
        if (word.length > 0) results.appendChild(_span('[[' + word + ']] '))
    })
}

function _id(id) {
    return document.getElementById(id)
}

function _span(content) {
    var span = document.createElement('span')
    span.textContent = content
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
