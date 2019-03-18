const express = require('express');
const router = express.Router();

const { db, Task } = require('./models')

router.get('/', async (req, res, next) => {
    res.json( await Task.findAll({
        order : ['id']
    }) );
})

router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) { res.sendStatus(404); }
        else { res.json(task); }
    } catch (err) { next(err) }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const newTask = await Task.create(req.body);
        res.json(newTask);
    } catch (err) { next(err) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) { res.sendStatus(404) }
        else {
            await task.destroy();
            res.send('Successfully deleted')
        }
    } catch (err) { next(err) }
})

router.put('/:id', async (req, res, next) => {
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

module.exports = router;