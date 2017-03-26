import React, { Component } from 'react';
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Right extends Component {
  componentWillMount() {
	  pubSubManager.subscribe("/main/button", function(data) {
		  pubSubManager.log("Subscriber in Left receive topic: /main/button and data:"+data)
	  })
	  
	  pubSubManager.subscribe("/published/from/right", function(data) {
		  pubSubManager.log("Subscriber in Left receive topic: /published/from/right and data:"+JSON.stringify(data))
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
