import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            response: ""
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        axios.post('http://192.168.0.101:9090/api/authenticate', this.state)
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    this.props.history.push('/');
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>Login Below!</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input type="submit" value="Submit" />
                </form>
                <h1>{this.state.response}</h1>
            </div>
        );
    }
}