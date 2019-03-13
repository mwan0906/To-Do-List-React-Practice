import React from 'react';
import ReactDOM from 'react-dom';

function List(props) {
    const items = this.props.items;
    return (
        <ol>
            { items.map( item => <ListItem key={item.id} desc={item.desc} complete={item.complete} /> ) }
        </ol>
    )
}

function ListItem(props) {
    return (
        <li className={this.props.complete}>{this.props.desc}</li>
    )
}

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks : [
                { id : 1, desc : 'do A', complete : false },
                { id : 2, desc : 'do B', complete : false },
                { id : 3, desc : 'do C', complete : true }
            ]
        };
    }

    render() {
        return (
            <div>
                <div>
                    <h1> To-Do List </h1>
                </div>
                <input type='text' placeholder='Enter new task here' id='inp'></input>
                <div id='container'>
                    <List items={this.state.tasks} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById(app))