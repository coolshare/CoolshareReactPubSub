import React, { Component } from 'react';
import $ from 'jquery'
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Inside extends Component {
	constructor (props) {
		super(props);
		this.subscriptionMap = {};
	}
	componentWillMount() {
		var topic = "/published/from/inside";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(data) {
		  pubSubManager.log("Subscriber in Inside receive topic: "+topic+" and data:"+JSON.stringify(data))
	  }) 
	  
	}
	componentWillUnmount() {
		var topic = "/published/from/inside";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
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
          <Publisher topic="/inside/function/fg" owner={self} options="{'color':{'___FUNCTION___':'getColor'}}"><button>Button in Inside:set text color of subscriber randomly</button></Publisher>
      </div>     
    );
  }
}

export default Inside;
