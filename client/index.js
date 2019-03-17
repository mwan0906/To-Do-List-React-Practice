import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function InputBar(props) {
    return (
        <input id="inp" 
        type="text" 
        placeholder="Enter a new task here" 
        maxlength="50" 
        size="50"
        value={props.value}
        onChange={ (event) => props.callback(event) }>
        </input>
    )
}

function SubmitButton(props) {
    const addEvent = props.callback;
    return (
        <button id="submit"
        type="button"
        onClick={ () => addEvent() }
        >
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
            tasks : [],
            inpval : ''
        };
        this.removeTask = this.removeTask.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(event) {
        this.setState({
            inpval : event.target.value
        })
    }

    async componentDidMount() {
        const allTasks = await axios.get('/api/tasks');
        this.setState({
            tasks : allTasks.data
        });
    }

    async addEvent() {
        const added = await axios.post('/api/tasks', {
            content : this.state.inpval
        })
        const joined = this.state.tasks.concat([added.data]);
        this.setState({
            tasks : joined,
            inpval : ''
        });
    }

    async removeTask(event) {
        const { target } = event;
        const listItem = target.parentNode;
        const id = listItem.id;
        await axios.delete(`/api/tasks/${id}`);
        listItem.remove();
    }

    render() {
        return (
            <div>
                <h1> To Do List </h1>
                <div id="interactables">
                    <InputBar value={this.state.inpval} callback={this.updateInput}/><p></p>
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