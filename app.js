var Nightmare = require('nightmare')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(express.static('./'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
    res.sendFile('./index.html', {root:'./'})
})

app.post('/search', function(req, res){
    // after requiring nightmare, we create a browser
    var nightmareBrowser = Nightmare({ show: false })

    // open multiple browsers if you want to scrape multiple sites simultaneously
    // var anothernightmareBrowser = Nightmare({ show: true })
    nightmareBrowser
        .goto('http://yahoo.com')
        // we're using nightmare.js to search yahoo for pages about nightmare.js
        .type('#uh-search-box', req.body.searchTerm)
        .click('#uh-search-button')
        // don't proceed with the rest of the code until we see an element with the id 'main'
        // we had to manually inspect the page to know that the starting page did not have a '#main', but the search results page does.
        .wait('#main')


        .evaluate(function(){
            // the code inside of .evaluate runs IN THE NIGHTMARE BROWSER
            // this is CLIENT-SIDE code, not server side code. 
            return {
                link: document.querySelector('#main li.first a').href,
                text: document.querySelector('#main li.first a').innerHTML
            }
            // $('#main li.first a').attr('href')

        })
        .end()
        // the 'result' that is passed into this function is the value we returned from '.evaluate'
        .then(function(result) {
            console.log(result)
            res.send(result)
        })
})

app.listen(80)




