var Nightmare = require('nightmare')
var nightmareBrowser = Nightmare({ show: false })

nightmareBrowser
    .goto('http://yahoo.com')
    .type('#uh-search-box', process.argv[2])
    .click('#uh-search-button')
    .wait('#main')


    .evaluate(function(){ return {
            link: document.querySelector('#main li.first a').href,
            text: document.querySelector('#main li.first a').innerHTML
        }

    })
    .end()
    .then(function(result) {
        console.log(JSON.stringify(result))
    })