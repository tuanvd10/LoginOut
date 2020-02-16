import React, { Component } from 'react';
import axios from 'axios';

//axios.defaults.withCredentials = true

export default class Secret extends Component {
    constructor() {
      super();
      //Set default message
      this.state = {
        message: 'Loading...'
      }
    }  
    
    componentDidMount() {
        axios.get('http://192.168.0.101:9090/api/secret', {
            withCredentials: true
          })
            .then((res) => {
                console.log(res);
                this.setState({message: res.data});
            })
            .catch(error => console.log(error));
    }
    
    render() {
      return (
        <div>
          <h1>Secret</h1>
          <p>{this.state.message}</p>
        </div>
      );
    }}

    