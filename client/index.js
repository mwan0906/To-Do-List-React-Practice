import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function InputBar() {
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
    const addEvent = props.callback;
    return (
    <button id="submit"
    type="button"
    onClick={addEvent( 'test adding' )}>
    Submit
    </button>
    )
}

function Delete(props) {
    return (
        <button type='button' onClick={props.callback} >X</button>
    )
}

function Listed(props) {
    const displayContent = props.task.content.padEnd(50, ' ')
    return (
        <li id={props.task.id}>{displayContent}<Delete callback={props.callback} /></li>
    )
}

class ToDoList extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks : []
        };
        this.removeTask = this.removeTask.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    async componentDidMount() {
        const allTasks = await axios.get('/api/tasks');
        this.setState({
            tasks : allTasks.data
        });
    }

    addEvent(newItem) {
        console.log('adding ', newItem);
/*         const toAdd = {
            content : newItem,
            dueDate : new Date()
        }
        const joined = this.state.tasks.concat([toAdd]);
        this.setState({
            tasks : joined
        }); */
    }

    removeTask(event) {
        const { target } = event;
        const listItem = target.parentNode;
        listItem.remove();
    }

    render() {
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