import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const maxPerPage = 20;

function debounce(func, wait) {
	var timeOut;
    return function() {
		const context = this;
		const args = arguments;
		var later = function() {
			timeOut = null;
			func.apply(context, args);
        }

		clearTimeout(timeOut);
		timeOut = setTimeout(later, wait);
    }
}

function InputBar(props) {
    return (
        <input id="inp" 
        type="text" 
        placeholder="Enter a new task here" 
        maxlength="50" 
        size="50"
        value={props.value}
        onChange={ event => props.changeInput(event) }
        onKeyDown={ event => props.keyHandler(event) }
        >
        </input>
    )
}

function SubmitButton(props) {
    const clickEvent = props.isEditing ? props.edit : props.add;
    return (
        <button id="submit"
        type="button"
        onClick={ () => clickEvent() }
        >
        Submit
        </button>
    )
}

function CancelButton(props) {
    return (
        <button id='cancel'
        type='button'
        onClick={ props.callback }>
        Cancel
        </button>
    )
}

function Delete(props) {
    return (
        <button type='button' 
        onClick={props.callback}
        >X</button>
    )
}
function Edit(props) {
    const style = props.isEditing ? 'hidden' : 'visible';
    return (
        <button type='button' 
        onClick={event => props.callback(event)}
        style={{visibility : style}}
        >E</button>
    )
}

function Listed(props) {
    const displayContent = props.task.content.padEnd(50, ' ')
    const isBeingEdited = (props.task.id == props.editingItem);
    return (
        <li id={props.task.id} className={isBeingEdited ? 'editing' : ''} >
        {displayContent}
        <Edit callback={props.edit} isEditing={props.isEditing} />
        <Delete callback={props.delete} />
        </li>
    )
}

class ToDoList extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks : [],
            inpval : '',

            pageMode : false,
            currentPage : 0,
            totalPages : 0,

            isEditing : false,
            editingItem : null
        };
        this.removeTask = this.removeTask.bind(this);
        this.addEvent = this.addEvent.bind(this);

        this.editTask = this.editTask.bind(this);
        this.editOn = this.editOn.bind(this);
        this.editOff = this.editOff.bind(this);

        this.keyHandler = this.keyHandler.bind(this);
        this.changeInput = this.changeInput.bind(this);

        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.updoot()
    }

    async updoot() {
        let allTasks = (await axios.get('/api/tasks')).data;
        this.setState({
            totalPages : Math.ceil(allTasks.length / maxPerPage)
        })
        console.log('total pages: ', this.state.totalPages);

        if (this.state.totalPages > 1) {
            if (!this.state.pageMode) {
                console.log('page mode on')
                this.setState({
                    pageMode : true,
                    currentPage : 1,
                    totalPages : Math.ceil(allTasks.length / maxPerPage)
                });
            }
            console.log('page mode continued')
            const begin = maxPerPage * (this.state.currentPage - 1);
            allTasks = allTasks.slice(begin, begin + maxPerPage)
        }
        else if (this.state.pageMode && allTasks.length <= maxPerPage) {
            console.log('page mode ended')
            this.setState({
                pageMode : false,
                currentPage : 0
            });
        }
        this.setState({
            tasks : allTasks
        });
    }

    keyHandler(event) {
        event.persist();
        if (event.keyCode == 13) {
            if (this.state.isEditing) {
                this.editTask()
            } else {
                this.addEvent()
            }
        }
    }

    changeInput(event) {
        this.setState({
            inpval : event.target.value
        })
    }

    editOff() {
        this.setState({
            isEditing : false,
            editingItem : null,
            inpval : ''
        })
        document.getElementById('inp').focus();
    }

    async editOn(event) {
        const id = event.target.parentNode.id;
        const node = await axios.get(`/api/tasks/${id}`);
        this.setState({
            isEditing : true,
            editingItem : id,
            inpval : node.data.content
        })
        document.getElementById('inp').focus();
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
        await this.updoot();
    }

    async removeTask(event) {
        const { target } = event;
        const listItem = target.parentNode;
        const id = listItem.id;
        await axios.delete(`/api/tasks/${id}`);
        document.getElementById('inp').focus();
        if (id == this.state.editingItem) {
            this.editOff();
        }
        await this.updoot()
    }

    async editTask() {
        await axios.put(`/api/tasks/${this.state.editingItem}`, {
            content : this.state.inpval
        })

        this.updoot();
        this.editOff();
        document.getElementById('inp').focus();
    }

    changePage(dir) {
        const newPage = this.state.currentPage + dir;
        this.setState({
            currentPage : newPage
        });
        this.updoot();
    }

    render() {
        return (
            <div>
                <h1> To Do List </h1>

                <div id="interactables">
                    <InputBar 
                        value={this.state.inpval} 
                        callback={this.updateInput}
                        keyHandler={this.keyHandler} 
                        changeInput={this.changeInput}
                        /><p></p>
                    {this.state.isEditing && <CancelButton callback={this.editOff} />}
                    <SubmitButton 
                        isEditing={this.state.isEditing} 
                        add={this.addEvent} 
                        edit={this.editTask}/>
                </div>

                <div>
                <ol start={
                    (!this.state.pageMode || this.currentPage == 1) ?
                    1 : ((maxPerPage * (this.state.currentPage - 1)) + 1)
                    }>
                    {this.state.tasks.map( task =>
                    <Listed key={task.id} 
                        task={task} 
                        isEditing={this.state.isEditing}
                        editingItem={this.state.editingItem}
                        edit={this.editOn} 
                        delete={this.removeTask} /> )}
                </ol>
                </div>

                {this.state.pageMode && <PageSelector 
                    page={this.state.currentPage} 
                    max={this.state.totalPages}
                    func={this.changePage}/>}
            </div>
        )
    }
};

function PageSelector(props) {
    return(
        <div>
            {props.page > 1 && <button onClick={() => props.func(-1)}>&lt;</button>}
            &emsp;Page {props.page}/{props.max}&emsp;
            {props.page < props.max && <button onClick={() => props.func(1)}>&gt;</button>}
        </div>
    )
}

ReactDOM.render( <ToDoList />, document.getElementById('app') );