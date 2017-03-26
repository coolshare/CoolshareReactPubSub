import React, { Component } from 'react';
import logo from '../coolshare.gif';
import './App.css';
import Left from './Left';
import Right from './Right';
import Publisher from './PubSub/Publisher';
import CommunicationManager from './PubSub/CommunicationManager'

const communicationManager = new CommunicationManager();
class App extends Component {
  componentWillMount() {
	  communicationManager.subscribe("/main/button", function(data) {
		  communicationManager.log("Subscriber in main receive topic: /main/button")
	  }) 
	  communicationManager.subscribe("/left/button", function(data) {
		  communicationManager.log("Subscriber in main receive topic: /left/button")
	  }) 
	  communicationManager.subscribe("/left/Publish", function(data) {
		  communicationManager.log("Subscriber in main receive topic: /left/Publish")
	  }) 
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Coolshare React Pubsub</h2>
        </div>

          <Left/>
          <Right/>

          <br style={{ "clear": "both"}}></br>
          <div style={{ "width": "400px"}}>
	          <div>Topic/communitaction info:</div>
	          <div style={{ "float": "left"}}>
	          	<textarea style={{ "margin-left": "30px",height: 200, width: 300 }} id="log"></textarea>
	          </div>
	      </div>
          <Publisher topic="/main/button"><button>Button in Main</button></Publisher>
      </div>
     
    );
  }
}

export default App;
