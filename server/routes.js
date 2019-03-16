var express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
})