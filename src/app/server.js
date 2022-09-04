const express = require('express');
const path = require("path");

const app = express();

app.use(express.static('./dist/ecomfrontend'))

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/ExpenseTracker_UI'})
})

app.listen(process.env.PORT || 8080)

