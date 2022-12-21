const express = require('express')
const axios = require('axios')
const registry = require('./registry.json')
const fs = require('fs')

const router = express.Router()

router.all('/:apiName/:path', (req, res) => {
    console.log(req.params.apiName)
    if (registry.services[req.params.apiName]) {
        axios({
            method: req.method,
            url: `${registry.services[req.params.apiName].url}${req.params.path}`,
            headers: req.headers,
            data: req.body
        })
        .then(response => {
            res.send(response.data)
        })
    }else{
        res.send("API Name doesn't exist")
    }
})


router.post('/register', (req, res) => {
    const registrationInfo = req.body

    registrationInfo.url = registrationInfo.protocol + "://" + registrationInfo.host + ":" + registrationInfo.port + "/"

    registry.services[registrationInfo.apiName] = {...registrationInfo}

    fs.writeFile('./routes/registry.json', JSON.stringify(registry, null, 2), (err) => {
        if (err) {
            res.send(`Could not register ${registrationInfo.apiName} ${err}`)
        }else{
            res.send(`Successfully registered ${registrationInfo.apiName}`)
        }
    })
})

module.exports = router