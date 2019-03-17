var express = require('express');
const path = require('path');
const app = express();

const { db, Task } = require('./models')

app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api/tasks', async (req, res, next) => {
    res.json( await Task.findAll() )
})

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

const PORT = 3000

const init = function() {
//    db.sync({ force : true })
    app.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}
init();