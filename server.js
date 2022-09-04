const express = require('express');
const path = require("path");

const app = express();

app.use(express.static('./dist/expense-tracker-ui'))

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/expense-tracker-ui'})
})

app.listen(process.env.PORT || 8080)

