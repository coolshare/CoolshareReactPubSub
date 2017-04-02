Coolshare Pub/Sub for React
===========================

By Mark Qian 3/2017 (markqian@hotmail.com)

The demo page: http://reactpubsub.coolshare.surge.sh

Description:

	Communication among React components could be a pain. Passing references around the
	component hierarchy feels like a baby crawling on a 2D surface and is so hard to maintain. 
	
	Why not fly like a bird in a 3D space? This is a pub/sub package for React allows you 
	to communicate between any two or more points in the React Hierarchy.

The key features:

 - You can publish topics from both javascript and JSX
 - You can specify any event to trigger the publishing
 - Macro Key Words allow you to publish with data you specified.
 

Instructions to use:

 A). publish a topic in two ways:
 
 	a). publish from javascript. To publish a topic in javascript, 
 	    you need to do the following:
 	    
 	    //Import
 	    import PubSubManager from 'PubSubManager'
 	    
 	    //Create an singleton
 	    const pubSubManager = new PubSubManager();
 	    
 	    class MyComponent extends Component {
 	    	myHandler() {
	            pubSubManager.publish("/MyTopic1", {"data":{"name":"John"}});
	  		}
			//...
 	    }
 	    
 	    where the second parameter of the "publish" method is "options" which contains the 
 	    data you like to pass with the topic.
 	    
 	b). publish from jsx (HTML). To publish a topic in jsx (HTML), 
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
        
               
  B). subscribe a topic
  
    To subscribe a topic, you need to do the following:
 	    
 	    //Import
 	    import PubSubManager from 'PubSubManager'
 	    
 	    //Create an singleton
 	    const pubSubManager = new PubSubManager();
 	    
		class MyComponent extends Component {
			constructor (props) {
				super(props);
				this.subscriptionMap = {};
			}
			componentWillMount() {
				var topic = "/MyTopic1";
				this.subscriptionMap[topic] = pubSubManager.subscribe(topic, function(options) {
					//handle the topic here
				});
	  		}
			//...
			componentWillUnmount() {
				var topic = "/MyTopic1";
				pubSubManager.unsubscribe(topic, this.subscriptionMap[topic]);
			}
 	    }
  
  C). To run the sample code, you need to 
 
		    
		0). Prepare required environment
		
		    you need to install node.js
		    
		  
		1). Download it by
		
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
  
     1). npm install coolshare_react_pub_sub --save
     
     2). Follow the instructions in A). B). above to use it in your application.
     
     
Go Mark's home page http://MarkQian.com to see more.