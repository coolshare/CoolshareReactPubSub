import React, { Component } from 'react';
import $ from 'jquery'
import './Left.css';
import Publisher from './PubSub/Publisher';
import Right from './Right'
import Inside from './Inside'
import PubSubManager from './PubSub/PubSubManager'

class Left extends Component {
	constructor (props) {
		super(props);
		this.subscriptionMap = {};
	}
	
	componentWillMount() {
		
		//************* Update without React way using jquery **************************
		var topic = "/main/button/bg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+ JSON.stringify(options))
			$(".Left").css({"background-color":options.bgColor});
		}) 
		
		topic = "/right/button/fg";
		this.subscriptionMap[topic] = PubSubManager.subscribe(topic, function(options) {
			PubSubManager.log("Subscriber in Left receive topic: "+topic+" and data:"+JSON.stringify(options))
			$(".Left").css({"color":options.color});
			PubSubManager.publish("/published/from/right", options);
		}) 
	}
	componentWillUnmount() {
		var topic = "/main/button/bg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
		
		topic = "/right/button/fg";
		PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
	}
  
  render() {
    return (
      <div className="Left">
        
        <p className="App-intro">
        This is an instance of component "Left"
        </p>
          <Publisher topic="/left/button/dw" options="{'dw':20}"><button>Button in Left: enlarge width of subscribers</button></Publisher>
          <Publisher topic="/left/MouseOver/randomColor" event="MouseOver"><a href="http://google.com" className="ddd" target="blank" style={{"fontSize":"11px"}}>Link in Left (MouseOver): randomly set the bg color of subscribers</a></Publisher>

          A dropdown in Left (set color of subscribers):
          <Publisher topic="/left/dropdown/bg" event="Change" options="{'bgColor':'___VALUE___'}"><select><option value="#ff0000">Red</option><option value="#00ff00">Green</option><option value="#0000ff">Blue</option></select></Publisher>
          <br/>
          This publisher wraps another component:
          <Publisher topic="/left/Publish" event="Click"><Inside/></Publisher>
      </div>
     
    );
  }
}

export default Left;
