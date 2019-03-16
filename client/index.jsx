import React from 'react';
import ReactDOM from 'react-dom';

/* class ToDoList extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks : []
        };
    }

    render() {
        console.log('rendering')
        return (
            <div>
                <h1> To Do List </h1>
                <input id='enter' placeholder='Enter new task here'></input>
            </div>
        )
    }
} */

function Test() {
    return (
        <h1>testing</h1>
    )
}

ReactDOM.render( <Test />, document.getElementById('app') );