/*
 Coolshare React PubSub - A package/service to provide
 publish/subscribe pattern for communication in React

 Copyright (C) 2017 Mark Qian <markqian@hotmail.com>


Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
import React from 'react';
import $ from 'jquery'
import PubSubManager from './PubSubManager'

const pubSubManager = new PubSubManager();
class Publisher extends React.Component {
  constructor(props) {
    super(props);
    
    this.publish = this.publish.bind(this);
    if (props.classes) {
    	var cn = [];
    	for (var c in props.classes) {
    		cn.push(c);
    	}
    	this.ppp.className = cn.join(" ");
    }
    this.event = "Click";
    if (props.event) {
    	this.event = props.event;
    }
    
  }
  
  publish(e) {
	  console.log("publishing:"+this.props.topic+" event:"+this.props.event)
	  var options = {};
	  if (this.props.options) {
		  options = eval("("+this.props.options+")")
		  for (var i in options) {
			  var item = options[i];
			  if (item==="___VALUE___") {
				  var $this = $(e.target);
				  options[i] = $(e.target).val();
			  } else if (item["___FUNCTION___"]!==undefined) {
				  options[i] = this.element[item["___FUNCTION___"]]();
			  }
		  }
	  }
	  pubSubManager.publish(this.props.topic, options);
  }
  
  render() {
	  var self = this;
	  var notFound = false;
	  self.element = this.props.children._self;
	  var children = React.Children.map(this.props.children, function (c, index) {		  
		  var ppp = $.extend({}, c.props);
		  ppp["on"+self.event] = self.publish;
		  var ccc = React.DOM[c.type];
		  if (ccc) {
			  return ccc(ppp);
		  } else {
			  notFound = true;
			  return c;
		  }
		  
      });
	  if (notFound) {
		  var ppp = {};
		  if (this.props.classes) {
	    	var cn = [];
	    	for (var c in this.props.classes) {
	    		cn.push(c);
	    	}
	    	ppp.className = cn.join(" ");
	      }

	      if (this.props.event) {
	    	ppp["on"+this.props.event] = function() {
	    		this.publish();
	    	}
	      } else {
	    	ppp["onClick"] = this.publish;
	      }
		  return <div { ...ppp } >{this.props.children}</div>;
	  } else {
		  return (
				  <div>
				  {children}
				  </div>
		    );
	  }
	  
  }
}

export default Publisher;

module.exports = Publisher;