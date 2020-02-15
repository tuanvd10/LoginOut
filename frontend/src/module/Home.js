import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
    constructor() {
      super();
      //Set default message
      this.state = {
        message: 'Loading...'
      }
    }  
    
    componentDidMount() {
      //GET message from server using fetch api
        axios.get('http://192.168.0.101:9090/api/home')
            .then((res) => {
                console.log(res);
                this.setState({message: res.data});
            })
            .catch(error => console.log(error));
    }
    
    render() {
      return (
        <div>
          <h1>Home</h1>
          <p>{this.state.message}</p>
        </div>
      );
    }}

    