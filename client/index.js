import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function InputBar() {
    console.log('rendering input bar');
    return (
        <input id="inp" 
        type="text" 
        placeholder="Enter a new task here" 
        maxlength="50" 
        size="50">
        </input>
    )
}

function SubmitButton(props) {
    console.log('rendering submit button');
    const addEvent = props.callback;
    return (
        <button id="submit"
        type="button"
        onClick={ () => console.log( document.getElementById('inp') ) }
        >
        Submit
        </button>
    )
}

function Delete(props) {
    console.log('rendering delete button');
    return (
        <button type='button' onClick={props.callback} >X</button>
    )
}

function Listed(props) {
    console.log('rendering list item');
    const displayContent = props.task.content.padEnd(50, ' ')
    return (
        <li id={props.task.id}>{displayContent}<Delete callback={props.callback} /></li>
    )
}

class ToDoList extends React.Component {
    constructor() {
        console.log('making todo component')
        super();
        this.state = {
            tasks : []
        };
        this.removeTask = this.removeTask.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    async componentDidMount() {
        console.log('grabbing from api')
        const allTasks = await axios.get('/api/tasks');
        this.setState({
            tasks : allTasks.data
        });
    }

    async addEvent(newItem) {
        console.log('adding ', this);
        const added = await axios.post('/api/tasks', {
            content : newItem
        })
    }

    async removeTask(event) {
        const { target } = event;
        const listItem = target.parentNode;
        const id = listItem.id;
        await axios.delete(`/api/tasks/${id}`);
        listItem.remove();
    }

    render() {
        console.log('rendering whole page')
        return (
            <div>
                <h1> To Do List </h1>
                <div id="interactables">
                    <InputBar /><p></p>
                    <SubmitButton callback={this.addEvent} />
                </div>
                <div>
                <ol>
                    {this.state.tasks.map( task =>
                    <Listed key={task.id} task={task} callback={this.removeTask} /> )}
                </ol>
                </div>
            </div>
        )
    }
};

ReactDOM.render( <ToDoList />, document.getElementById('app') );