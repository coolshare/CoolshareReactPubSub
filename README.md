Coolshare Pub/Sub for React - An approach different from Flux
===========================

By Mark Qian 3/2017 (markqian@hotmail.com)

The demo page: http://reactpubsub.coolshare.surge.sh

Description:
************

	Communication among React components could be a pain in case you use react without Flux 
	framework. Comparing to Flux, this package is a different/easier. 

	Similar to Redux:
	****************	
	 - both publish method in PubsubManager and Pulisher component act like the "Action Creator",
	   where publish method allows API or event handler to generate "Actions" and the Publish 
	   component generate "Actions" from user interaction. 
	 - An event (including a topicName with data) is an "Action"
	 - PubsubManager is the "Dispatcher" and topicName is the type of "Action"
	 - Event handler is the "Reducer". In case of React, the event handler makes change to
	   the state/model of React view to trigger the view update.
	 
	Different from Redux:
	*********************
	 - we do not force the event handler to only work on the model while it acts as other roles 
	   such as an "Action creator" that publish an event.
	 - you need to learn almost nothing to use it
	 - One key advantage provided by Pub/Sub pattern is the communication: instead of passing references 
	   around the component hierarchy in order to reach the other party, feels like a baby crawling on 
	   a 2D surface (since you need to travel the hierarchy node by node), you can fly like a bird in 
	   a 3D space: this package allows you to communicate between any two or more points including
	   any components React Hierarchy and services which in turn update the remote model. And the callback
	   of remote request then publishes another topic (event/action) to update the state of view
	   (setView in React).
	 
Who should use this:
********************

	 for those who just want to do something quickly with React instead of dealing or learning more on
	 Redux or Mobx. You need to learn almost nothing for using this package. 


The key features:

 - You can publish topics from both javascript and JSX
 - You can specify any event to trigger the publishing
 - Macro Key Words allow you to publish with data you specified.
 

Instructions to use:

 A). publish a topic in two ways:
 
	0). install this package:
	
		npm install coolshare_react_pub_sub --save
 
 	1). publish from javascript. To publish a topic in javascript, 
 	    you need to do the following:
 	    
 	    //Import
 	    import PubSubManager from 'PubSubManager'
 	    
 	    class MyComponent extends Component {
 	    	handleRemoteAPIResponse() {
	            PubSubManager.publish("/MyTopic1", {"data":{"name":"John"}});
	  		}
			//...
 	    }
 	    
 	    where the second parameter of the "publish" method is "options" which contains the 
 	    data you like to pass with the topic.
 	    
 	2). publish from jsx (HTML). To publish a topic in jsx (HTML), 
 	    you need to do the following:
 	    
 	    render() {
          return (
            <div>
               <Publisher topic="/left/button"><button>Left</button></Publisher>
               <Publisher topic="/left/Publish"><a href="#" className="ddd">aaaa</a></Publisher>
               <Publisher topic="/left/Publish" event="Change" options="{'name':'Mark', 'address':'123 Main Ave San Jose, CA'}">
                 <select>
                   <option value="a">A</option>
                   <option value="b">B</option>
                 </select>
               </Publisher>
          	   <Publisher topic="/left/Publish">
          	     <MyComponentC/>
          	   </Publisher>
          </div>  
        );
      }
      
      where the attribute "options", optional, contains the data you want to pass with the topic.
      The content contained by "options" needs to be in a JSON format which will be evaluated into a javascript object.
      
      The "event" attribute is optional and the default is "Click".
      
      Please also pay attention to the Case of your "event". You should use "MouseOver" instead of "mouseover", "Mouseover" or
      "mouseOver" and "Change" instead of "change".
      
      Note:
      *****
      
      When "publish" tag/component contains regular DOM elements such as "div", "a", "button" and "select", the specified 
      "event" is bound directly to the contained elements but the contained elements are not regular DOM elements (such as
      the last "Publish" element above) the specified event will be bound to a "div" element containing the contained elements.
      
      Macro Key Words:
      ***************
      
        1). ___VALUE___ - this key word pointing to the value of the contained element. For example
           
	           <Publisher topic="/left/dropdown/bg" event="Change" options="{'bgColor':'___VALUE___'}">
	           	<select>
	           		<option value="#ff0000">Red</option>
	           		<option value="#00ff00">Green</option>
	           		<option value="#0000ff">Blue</option>
	           	</select>
	           </Publisher>
	           
	          The example above indicate the "bgColor" in the options will be set to the value of select when a change
	          event occurs.
	        
	    2). ___FUNCTION___ - this key word pointing to the return value of a function of the component where the publisher reside.
	          For example, 
	          
	          class Inside extends Component {
				  //...
				  getColor() {
					  return pubSubManager.getRandomColor();
				  }
				  render() {
				    var self = this;
				    return (				   
				        ...
				          <Publisher topic="/inside/function/fg" owner={self} options="{'color':{'___FUNCTION___':'getColor'}}">
				              <button>Button in Inside:set text color of subscriber randomly</button>
				          </Publisher>
 						 ...    
				    );
				  }
				}
        
              In the example above, the value of "color" in "options" will be assigned with the return value of "getColor".
              One requirement to this feature is that you need to pass the owner's (the function's owner) reference to the 
              attribute "owner".
        
               
  B). subscribe/unsubscribe a topic
  
    To subscribe a topic, you need to do the following:
 	    
 	    //Import
 	    import PubSubManager from 'PubSubManager'
 	    
		class MyComponent extends Component {
			constructor (props) {
				super(props);
				this.subscriptionMap = {};
			}
			componentWillMount() {
				var self = this;
				var topic = "/MyTopic1";
				this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
					//handle the topic here: make modification to the model and trigger the view update
					self.setState(...);
					
					//...
					
					//Or generate another "Action"
					PubSubManager.publish("/MyTopicX", {"data":{"address":"123 Main St"}});
					
				});
	  		}
			//...
			componentWillUnmount() {
				var topic = "/MyTopic1";
				PubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
			}
 	    }
  
  C). To run the sample code, you need to 
 
		    
		0). Prepare required environment
		
		    you need to install node.js
		    and git
		  
		1). Download it by
		
		    cd c:\
		    
		    git clone https://github.com/coolshare/CoolshareReactPubSub.git CoolshareReactPubSub
		    
		    then 
		    
		    cd CoolshareReactPubSub
		    
		2). Do installation
		         
			npm install
		       
		       
		3). Start the server and browser by
		
		    npm start
		         
		
		    You should see a browser page is opened at http://localhost:3000
		    
		Click each component on the page and the result will be shown in the console.
		
		Have fun!

  D). To install it into your React application, you need to 
  
     1). npm install --save coolshare_react_pub_sub_kit
     
     2). Follow the instructions in A). B). above to use it in your application.
     
     
Go Mark's home page http://MarkQian.com to see more.