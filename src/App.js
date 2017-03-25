import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Left from './Left';
import Right from './Right';
import Publisher from './PubSub/Publisher';
import CommunicationManager from './PubSub/CommunicationManager'

const communicationManager = new CommunicationManager();
class App extends Component {
  componentWillMount() {
	  communicationManager.subscribe("/main/button", function(data) {
		  console.log("Got it in main: /main/button")
	  }) 
	  communicationManager.subscribe("/left/button", function(data) {
		  console.log("Got it in main: /left/button")
	  }) 
	  communicationManager.subscribe("/left/Publish", function(data) {
		  console.log("Got it in main: /left/Publish")
	  }) 
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <Left/>
          <Right/>
          <Publisher topic="/main/button"><button>Main</button></Publisher>
      </div>
     
    );
  }
}

export default App;
