import React, { Component } from 'react';
import $ from 'jquery'
import logo from '../coolshare.gif';
import './App.css';
import Left from './Left';
import Right from './Right';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class App extends Component {
  componentWillMount() {

	  
	  
	  pubSubManager.subscribe("/left/Publish", function(options) {
		  pubSubManager.log("Subscriber in main receive topic: /left/Publish")
	  }) 
  }
  componentDidMount() {
	  pubSubManager.setLog("log");
  }
  
  render() {
	var self = this;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Coolshare React Pubsub</h2>
        </div>
        	<p>This page shows how components communicate with pub/sub. There are 4 components on this page: "Main", "Left", "Right" and "Inside". You can try to click the buttons or mouseover the link to see the result below.
        	</p>
          <Left/>
          <Right/>

          <br style={{ "clear": "both"}}></br>
          <div style={{ "width": "400px"}}>
	          <div>Topic/communitaction info:</div>
	          <div style={{ "float": "left"}}>
	          	<textarea style={{ "marginLeft": "30px",height: 200, width: 300 }} id="log"></textarea>
	          </div>
	      </div>
          <Publisher topic="/main/button/bg" options="{'bgColor':'#e3e4e1'}"><button>Button in Main: change subscriber's bg color</button></Publisher>
      </div>
     
    );
  }
}

export default App;
