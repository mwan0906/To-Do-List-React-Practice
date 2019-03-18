var express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

const apiRoutes = require('./api')

app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParser({ extended: false }));

app.use('/api/tasks', apiRoutes);

app.get('/page/:pn', async (req, res, next) => {
    res.send('boop')
})

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

const PORT = 3000

const init = function() {
//    db.sync({ force : true })
    app.listen(PORT, ()=> {
        console.log(`Listening on port ${PORT}`)
    })
}
init();