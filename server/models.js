const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/todo', { logging : false });

const Task = db.define('Task', {
    content : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    isComplete : {
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    dueDate : {
        type: Sequelize.DATE
    }
})

module.exports = { db, Task }