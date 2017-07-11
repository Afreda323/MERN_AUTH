const express = require('express')
const logger = require('morgan')
const parser = require('body-parser')

const app = express();

const PORT = process.env.production || 3000;

app.listen(PORT, () => {
    console.log('====================================');
    console.log('Up on ' + PORT);
    console.log('====================================');
})