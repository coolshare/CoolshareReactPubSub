import React, { Component } from 'react';
import logo from './logo.svg';
import './Right.css';
import Publisher from './PubSub/Publisher';
import CommunicationManager from './PubSub/CommunicationManager'

const communicationManager = new CommunicationManager();
class Right extends Component {
  componentWillMount() {
	  communicationManager.subscribe("/main/button", function(data) {
		  console.log("Subscriber in Left receive topic: /main/button and data:"+data)
	  })
	  
	  communicationManager.subscribe("/published/from/right", function(data) {
		  console.log("Subscriber in Left receive topic: /published/from/right and data:"+JSON.stringify(data))
	  }) 
  }
  
  render() {
    return (
      <div className="Right">
        <p className="App-intro">
          This is an instance of component "Right"
        </p>
          <Publisher topic="/right/button" options="{'test':'this is a test'}"><button>Button in Right</button></Publisher>
      </div>     
    );
  }
}

export default Right;
