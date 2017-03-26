import React, { Component } from 'react';
import $ from 'jquery'
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Inside extends Component {
  componentWillMount() {

	  pubSubManager.subscribe("/published/from/inside", function(data) {
		  pubSubManager.log("Subscriber in Inside receive topic: /published/from/right and data:"+JSON.stringify(data))
	  }) 
	  
  }
  getColor() {
	  return pubSubManager.getRandomColor();
  }
  render() {
	var self = this;
    return (
      <div className="Inside">
        <p className="App-intro">
          This is an instance of component "Inside"
        </p>
          <Publisher topic="/inside/function/fg" options="{'color':{'___FUNCTION___':'getColor'}}"><button>Button in Inside:set text color of subscriber randomly</button></Publisher>
      </div>     
    );
  }
}

export default Inside;
