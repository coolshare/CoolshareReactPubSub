import React, { Component } from 'react';
import logo from './logo.svg';
import './Right.css';
import Publisher from './PubSub/Publisher';
import CommunicationManager from './PubSub/CommunicationManager'

const communicationManager = new CommunicationManager();
class Right extends Component {
  componentWillMount() {
	  communicationManager.subscribe("/main/button", function(data) {
		  console.log("Got it in right: "+data)
	  })
	  
	  communicationManager.subscribe("/published/from/right", function(data) {
		  console.log("Got it in right: "+JSON.stringify(data))
	  }) 
  }
  
  render() {
    return (
      <div className="Right">
        <p className="App-intro">
          This is the right pane
        </p>
          <Publisher topic="/right/button" options="{'test':'this is a test'}"><button>Right</button></Publisher>
      </div>
     
    );
  }
}

export default Right;
