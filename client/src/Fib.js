import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    handleInputChange = event => {
        this.setState({
            index: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault(); 
        const { index } = this.state;

        await axios.post('/api/values', {
            index
        }); 

        this.setState({ index: '' });
    } 

    renderSeenIndexes = () => {
        const { seenIndexes } = this.state;
        return seenIndexes && seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues = () => {
        const { values } = this.state;
        return Object.keys(values).map(key => (
            <div key={key}>{`For index ${key} I Calculated ${values[key]}`}</div>
        ));
    }

    render() {
        const { index } = this.state;
        return (
            <div style={{paddingTop: '56px'}}>
                <form>
                    <label>Enter your index: </label>
                    <input value={index} onChange={this.handleInputChange}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Value</h3>
                {this.renderValues()}
            </div>
        )
    }
}
