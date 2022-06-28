const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

if (process.env.NODE_ENV === "production") {
    app.use(express.static("dist"));
    app.get("/*", function (req, res) {
        res.sendFile(path.join(appRoot,"index.html"));
  });
  }

const port = process.env.PORT || 8080
app.listen(port)

console.log('Listening on port: ' + port)