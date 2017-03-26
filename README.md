Coolshare Pub/Sub for React
===========================

By Mark Qian 3/25/2017 (markqian@hotmail.com)
Go http://MarkQian.com to see more.

This is a pub/sub package for react.
It provides the following functionalities:

 A). publish a topic in two ways:
 
 	a). publish from javascript. To publish a topic in javascript, 
 	    you need to do the following:
 	    
 	    //Import
 	    import CommunicationManager from 'CommunicationManager'
 	    
 	    //Create an singleton
 	    const communicationManager = new CommunicationManager();
 	    
 	    class MyComponent extends Component {
 	    	myHandler() {
	            communicationManager.publish("/MyTopic1", {"data":{"name":"John"}});
	  		}
			//...
 	    }
 	    
 	    where the second parameter of the "publish" method is "options" which contains the 
 	    data you like to pass with the topic.
 	    
 	b). publish from jsx. To publish a topic in jsx, 
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
      "event" is bound directly to the contained elements but the contained elements are not regular DOm elements (such as
      the last "Publish" element above) the specified event will be bound to a "div" element containing the contained elements.
      
      
        
               
  B). subscribe a topic
  
    To subscribe a topic, you need to do the following:
 	    
 	    //Import
 	    import CommunicationManager from 'CommunicationManager'
 	    
 	    //Create an singleton
 	    const communicationManager = new CommunicationManager();
 	    
 	    class MyComponent extends Component {
 	    	componentWillMount() {
	            communicationManager.subscribe("/MyTopic1", function(options) {
	                  //handle the topic here
	            );
	  		}
			//...
 	    }
  
To run the sample code, simply use "npm start" from the package root directory.
And the result will be shown in the console.


