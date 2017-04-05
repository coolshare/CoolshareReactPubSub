import React, { Component } from 'react';
import $ from 'jquery'
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Right extends Component {
	constructor (props) {
		super(props);
		this.state = {
				style: {
					backgroundColor: "#EDEDEE",
					color:"#000",
					width:"300px"
				}
				
		}
		this.subscriptionMap = {};
	}
	
	componentWillMount() {
		var self = this;
		var topic = "/main/button/bg";
		
		//************* Update with React way using setState **************************
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
			pubSubManager.log("Subscriber in Right receive topic: "+topic+" and data:"+JSON.stringify(options));
			//$(".Right").css({"background-color":options.bgColor});
			self.setState({"style":{"backgroundColor":options.bgColor}});
	  
		})
		topic = "/published/from/right";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(data) {
			pubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+JSON.stringify(data))
		}) 
		
		topic = "/left/button/dw";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
			pubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").width($(".Right").width()+options.dw)
			var ww = self.state.style.width.indexOf("px");
			ww = parseInt(self.state.style.width.substring(0, ww)); 
			ww +=options.dw;
			self.setState({"style":{"width":ww+"px"}});
		}) 
		
		topic = "/left/MouseOver/randomColor";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
			pubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").css({"background-color":pubSubManager.getRandomColor()})
			self.setState({"style":{"backgroundColor":pubSubManager.getRandomColor()}});
		})
		
		topic = "/left/dropdown/bg";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
			pubSubManager.log("Subscriber in Right receive topic: "+topic)
			//$(".Right").css({"background-color":options.bgColor})
			self.setState({"style":{"backgroundColor":options.bgColor}});
		})
		  
		topic = "/inside/function/fg";
		this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
			pubSubManager.log("Subscriber in Right receive topic: "+topic+" options:"+JSON.stringify(options))
			//$(".Right").css({"color":options.color})
			self.setState({"style":{"color":options.color}});
		})
		  
	}
	
	componentWillUnmount() {
		var topic = "/main/button/bg";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/published/from/right";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]); 
		
		topic = "/left/button/dw";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]); 
		
		topic = "/left/MouseOver/randomColor";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/left/dropdown/bg";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		  
		topic = "/inside/function/fg";
		pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		  
	}
  
  render() {
    return (
      <div className="Right" style={this.state.style}>
        <p className="App-intro">
          This is an instance of component "Right"
        </p>
          <Publisher topic="/right/button/fg" options="{'color':'#ff0000'}"><button>Button in Right:change text color of subscribers</button></Publisher>
      </div>     
    );
  }
}

export default Right;
