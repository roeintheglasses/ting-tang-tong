const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Express Setup
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Server start
app.listen(port, console.log("Server running at port " + port));