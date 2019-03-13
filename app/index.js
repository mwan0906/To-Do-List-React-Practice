import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            beep : 'beep'
        };
        this.boop = this.boop.bind(this);
    }

    render() {
        return (
            <h1> {this.state.beep} </h1>
        )
    }

    boop() {
        this.setState({ beep : 'boop' })
    }
}

ReactDOM.render(
    <Test />,
    document.getElementById(app))