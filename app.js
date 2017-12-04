var Nightmare = require('nightmare')
var express = require('express')
var bodyParser = require('body-parser')
var child_process = require('child_process')
var app = express()

app.use(express.static('./'))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){
    res.sendFile('./index.html', {root:'./'})
})

app.post('/search', function(req, res){
    console.log('search term: ', req.body.searchTerm)
    child_process.exec(`xvfb-run node ./get-lucky.js '${req.body.searchTerm}'`, function(err, stdout, stderr){
        console.log('err: ', err)
        console.log('stdout: ', stdout)
        console.log('stderr: ', stderr)
        res.send(JSON.parse(stdout))
    })

})

app.listen(80)




