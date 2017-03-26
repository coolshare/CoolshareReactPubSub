import React, { Component } from 'react';
import $ from 'jquery'
import './Right.css';
import Publisher from './PubSub/Publisher';
import PubSubManager from './PubSub/PubSubManager'

const pubSubManager = new PubSubManager();
class Right extends Component {
  componentWillMount() {
	  pubSubManager.subscribe("/main/button/bg", function(options) {
		  pubSubManager.log("Subscriber in Right receive topic: /main/button/bg and data:"+JSON.stringify(options));
		  $(".Right").css({"background-color":options.bgColor});
		  
	  })
	  
	  pubSubManager.subscribe("/published/from/right", function(data) {
		  pubSubManager.log("Subscriber in Left receive topic: /published/from/right and data:"+JSON.stringify(data))
	  }) 
	  pubSubManager.subscribe("/left/button/dw", function(options) {
		  pubSubManager.log("Subscriber in Right receive topic: /left/button/dw")
		  $(".Right").width($(".Right").width()+options.dw)
	  }) 
	  
	  pubSubManager.subscribe("/left/MouseOver/randomColor", function(options) {
		  pubSubManager.log("Subscriber in Right receive topic: /left/MouseOver/randomColor")
		  $(".Right").css({"background-color":pubSubManager.getRandomColor()})
	  })
	  
	  pubSubManager.subscribe("/left/dropdown/bg", function(options) {
		  pubSubManager.log("Subscriber in Right receive topic: /left/dropdown/bg")
		  $(".Right").css({"background-color":options.bgColor})
	  })
	  
	  pubSubManager.subscribe("/inside/function/fg", function(options) {
		  pubSubManager.log("Subscriber in Right receive topic: /inside/function/fg options:"+JSON.stringify(options))
		  $(".Right").css({"color":options.color})
	  })
	  
  }
  
  render() {
    return (
      <div className="Right">
        <p className="App-intro">
          This is an instance of component "Right"
        </p>
          <Publisher topic="/right/button/fg" options="{'color':'#ff0000'}"><button>Button in Right:change text color of subscribers</button></Publisher>
      </div>     
    );
  }
}

export default Right;
