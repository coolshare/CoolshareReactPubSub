import React, { Component } from 'react';
import logo from './logo.svg';
import './Left.css';
import Publisher from './PubSub/Publisher';
import Right from './Right'
import CommunicationManager from './PubSub/CommunicationManager'

const communicationManager = new CommunicationManager();
class Left extends Component {
  componentWillMount() {
	  communicationManager.subscribe("/main/button", function(data) {
		  console.log("Got it in left: "+data)
	  }) 
	  communicationManager.subscribe("/right/button", function(data) {
		  
		  console.log("Got it in left: "+data)
		  communicationManager.publish("/published/from/right", data);
	  }) 
  }
  
  render() {
    return (
      <div className="Left">
        
        <p className="App-intro">
          This is the left pane
        </p>
          <Publisher topic="/left/button"><button>Left</button></Publisher>
          <Publisher topic="/left/Publish"><a href="#" className="ddd">aaaa</a></Publisher>
          <br/>
          <Publisher topic="/left/Publish" event="Change"><select><option value="a">A</option><option value="b">B</option></select></Publisher>
          <br/>
          This publisher wraps another component
          <Publisher topic="/left/Publish" event="Change"><Right/></Publisher>
      </div>
     
    );
  }
}

export default Left;
