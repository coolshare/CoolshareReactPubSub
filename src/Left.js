import React, { Component } from 'react';
import logo from './logo.svg';
import './Left.css';
import Publisher from './PubSub/Publisher';
import Right from './Right'
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Left extends Component {
  componentWillMount() {
	  pubSubManager.subscribe("/main/button", function(data) {
		  pubSubManager.log("Subscriber in Left receive topic: /main/button and data:"+data)
	  }) 
	  pubSubManager.subscribe("/right/button", function(data) {
		  
		  pubSubManager.log("Subscriber in Left receive topic: /right/button and data:"+data)
		  pubSubManager.publish("/published/from/right", data);
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
          <Publisher topic="/left/Publish" event="MouseOut"><a href="http://google.com" className="ddd" target="blank">Link in Left (MouseOut)</a></Publisher>
          <br/>
          <Publisher topic="/left/Publish" event="Change">A dropdown in Left:<select><option value="a">A</option><option value="b">B</option></select></Publisher>
          <br/><br/>
          This publisher wraps another component:
          <Publisher topic="/left/Publish" event="Click"><Right/></Publisher>
      </div>
     
    );
  }
}

export default Left;
