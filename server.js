const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;
const indexPath = path.join(__dirname, "/build");
const indexHtml = path.join(__dirname, "/build/index.html");
// Express Setup
app.use(express.static(indexPath));
app.get('/*', function (req, res) {
    res.sendFile(indexHtml);
});

//Server start
app.listen(port, console.log("Server running at port " + port));