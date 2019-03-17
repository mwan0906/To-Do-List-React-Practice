const { db, Task } = require('./server/models');
const testData = [
    {content : 'do the laundry', dueDate : new Date(2019, 2, 16), isComplete : true},
    {content : 'do more laundry', dueDate : new Date(2019, 3, 1)},
    {content : 'Love Thyself', dueDate : new Date(1969, 11, 24)},
    {content : 'hhhhh', dueDate : new Date(Date.now() + 50000)}
  ]

const seed = async () => {
    await db.sync({force: true})
    await Promise.all( testData.map(task => {
        Task.create(task)
    }))
}

seed()