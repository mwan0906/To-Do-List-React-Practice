var express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();

const { db, Task } = require('./models')

app.use(express.static(path.join(__dirname, '..', 'node_modules')))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(bodyParser({ extended: false }));

app.get('/api/tasks', async (req, res, next) => {
    res.json( await Task.findAll({
        order : ['id']
    }) );
})

app.get('/api/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) { res.sendStatus(404); }
        else { res.json(task); }
    } catch (err) { next(err) }
})

app.post('/api/tasks', async (req, res, next) => {
    try {
        console.log(req.body);
        const newTask = await Task.create(req.body);
        res.json(newTask);
    } catch (err) { next(err) }
})

app.delete('/api/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) { res.sendStatus(404) }
        else {
            await task.destroy();
            res.send('Successfully deleted')
        }
    } catch (err) { next(err) }
})

app.put('/api/tasks/:id', async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) { res.sendStatus(404); }
        else {
            const changedContents = Object.keys(req.body);
            changedContents.forEach( key => {
                task[key] = req.body[key];
            });
            await task.save();
            res.json(task);
        }
    } catch (err) { next(err) }
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