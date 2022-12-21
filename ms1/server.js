const express = require('express')
const axios = require('axios')
const apiName = require('./package.json').name

const app = express()

const PORT=3001
const HOST="localhost"

app.use(express.json())
app.get('/helloworld', (req, res) => {
    res.send('Hello world from ms1 service')
})
app.get('/autrechose', (req, res) => {
    res.send('Autre chose from ms1 service')
})

app.post('/new-post', (req, res) => {
    res.send("add new post")
})


app.all('*', (req, res) => {
    res.send("Not Found Error").status(404)
})

app.listen(PORT, () => {
    axios({
        method: 'POST',
        url: `http://localhost:3000/register`,
        headers: {'Content-Type': 'application/json'},
        data:{
                apiName: apiName,
                protocol: "http",
                host: HOST,
                port: PORT,
            }
    }).then(response => {
        console.log(response.data)
    })
    console.log(`MS1 started on port ${PORT}`)
})