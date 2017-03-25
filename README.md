Coolshare Pub/Sub for React
===========================
By Mark Qian 3/25/2017 (markqian@hotmail.com)

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
          
             <Publisher topic="/MyTopic2" event="Change"><MyComponentB/></Publisher>
          </div>  
        );
      }
      
      where the attribute "options" can container the data you want to pass with the topic.
      The content contained by "options" needs to be in a JSON format which will be evaluated into a javascript object.
      
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


