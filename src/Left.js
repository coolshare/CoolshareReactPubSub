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
		  communicationManager.log("Subscriber in Left receive topic: /main/button and data:"+data)
	  }) 
	  communicationManager.subscribe("/right/button", function(data) {
		  
		  communicationManager.log("Subscriber in Left receive topic: /right/button and data:"+data)
		  communicationManager.publish("/published/from/right", data);
	  }) 
  }
  
  render() {
    return (
      <div className="Left">
        
        <p className="App-intro">
        This is an instance of component "Left"
        </p>
          <Publisher topic="/left/button"><button>Button in Left</button></Publisher>
          <br/>
          <Publisher topic="/left/Publish" event="MouseOut"><a href="http://google.com" className="ddd" target="blank">Link in Left</a></Publisher>
          <br/>
          <Publisher topic="/left/Publish" event="Change">A dropdown in Left:<select><option value="a">A</option><option value="b">B</option></select></Publisher>
          <br/><br/><br/>
          This publisher wraps another component:
          <Publisher topic="/left/Publish" event="Click"><Right/></Publisher>
      </div>
     
    );
  }
}

export default Left;
