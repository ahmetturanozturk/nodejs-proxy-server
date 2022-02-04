## Download Repository

`git clone https://github.com/ahmetturanozturk/nodejs-proxy-server.git`

## Install Packages

`cd  nodejs-proxy-server`
`npm install`

## Start and Test

`npm start`
You can send a request to 'localhost:6999'

## Settings.js file
    module.exports = {
        "PORT" : 6999, //Port
        "HOST" : "localhost", //Proxy host
        "API_SERVICE_URL" : "http://api.myapi.com" //target
    }
