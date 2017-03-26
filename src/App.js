import React, { Component } from 'react';
import logo from '../coolshare.gif';
import './App.css';
import Left from './Left';
import Right from './Right';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class App extends Component {
  componentWillMount() {
	  pubSubManager.subscribe("/main/button", function(data) {
		  pubSubManager.log("Subscriber in main receive topic: /main/button")
	  }) 
	  pubSubManager.subscribe("/left/button", function(data) {
		  pubSubManager.log("Subscriber in main receive topic: /left/button")
	  }) 
	  pubSubManager.subscribe("/left/Publish", function(data) {
		  pubSubManager.log("Subscriber in main receive topic: /left/Publish")
	  }) 
  }
  componentDidMount() {
	  pubSubManager.setLog("log");
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Coolshare React Pubsub</h2>
        </div>
        	<p>This page shows how components communicate with pub/sub. There are 4 components on this page: "Main", "Left", "Right" and "Right" in "Left". You can try to click the buttons or mouseover the link to see the result below.
        	</p>
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
