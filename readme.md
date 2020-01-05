# CaramelPuppy 🐕🐶

CaramelPuppy is an intelligent log manager, it allows to save the logs in a caramelPuppy.json file in the project root.  Integration with express and credential protected web interface for log viewing.

## Content Guide
- [Configuration](#configuration)
- [Use](#use)
- [Express](#express)
  - [Configuration](#configuration-1)
  - [Web interface connection](#web-interface-connection)
- [Request](#request)
- [Contributions](#contributions)
- [License](#license)

## Configuration

First install the caramelPuppy package
- Via Node Package Manager (NPM):
```
npm install caramel-puppy
```
- Via yarn:
```
yarn add caramel-puppy
```

Then import caramelPuppy into your project:
```js
const caramelPuppy = require("caramel-puppy")({
    __filename
})
```
The code above is enough for caramelPuppy to work.  The `__filename` parameter is Node's own variable, which tells which file that code is being run.

## Use

After the setup is a success.  The caramelPuppy will return some functions.
- [caramelPuppy.log()](#caramelPuppylog)
- [caramelPuppy.request()](#request)
- [caramelPuppy.appStart()](#caramelPuppyappstart)
### caramelPuppy.log()
Similar to the `console.log()` function it takes a number of parameters.  And save it to the caramelPuppy.json log array like this:
```js
{
    date:"2019-12-11 10:12:12",
    type:"log",
    filename:"index.js",
    log:["Hello","World"] //array of arguments
}
```
And will display on the console:

<span style="background-color:blue;color:Black;">LOG</span> Hello World
### caramelPuppy.appStart()
Useful to know when your app started.
In caramelPuppy.json:
```js
{
    filename:"index.js",
    type:"appStart",
    date:"2019-12-11 10:12:12"
}
```
And will not display anything on the console.

## Express

CaramelPuppy uses express middleware to intercept requests and save the http method, status code, and URL.
By default the information will only be saved at the end of the request.
> Not required to use Express.
### Configuration
```js
const express = require("express")
const app = express()
const caramelPuppy = require("caramel-puppy")({
    __filename,
    express:app
})
```
Messages will be displayed on the console:

<span style='background-color:#ffe846; color:black;'>Express</span> Start GET /hi 

<span style='background-color:#ffe846; color:black;'>Express</span> End GET /hi 200

Start means the request has been received.
End means the request has been terminated.
> In the future with the implementation of trace it will be easier to monitor the logs that happened in a request.
### Web interface connection

CaramelPuppy provides a web interface to view logs simply and securely.
Setting this interface requires setting an environment variable, so you can create the `.env` file in the root:
```
CARAMELPUPPY_KEY=exemple
```
When creating this file, caramelPuppy uses [dotenv](https://www.npmjs.com/package/dotenv) to read it.  So just go to url: http://mydomin.com/caramelPuppy?credential=example

## Request

`caramelPuppy.request(req)` receives the request req as a parameter:
```js
request("google.com",{
	time:true //Passing time: true will save elapsedTime
},(err,req,body)=>{
	caramelPuppy.request(req)
})
```
And will display on the console:

<span style='background-color:#ff2eff; color:black;'>Request</span> GET 200 google.com

## ChangeLog

- 1.0.0: Initial release
- 1.0.1: Fixed error looking for href from url in request

## Contributors

- [Patrícia Garbe Carvalho](https://www.facebook.com/profile.php?id=100009279859979): Helped you choose the name caramelPuppy

My sincere and thank you to all who contributed.

## Contributions

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## License

This project is licensed under the MIT license - see the [LICENSE](LICENSE) file for details.
