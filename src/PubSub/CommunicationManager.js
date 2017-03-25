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

import $ from 'jquery'
import Sub from './Sub'
import Pub from './Pub'
import Topic from './Topic'

class CommunicationManager {
	constructor () {
		this.topicMap = {};
		this.handlerMap = {};
	}
	subscribe(topicNameList, options) {
		options = options || {};
		//console.log("<<==== subscribe: topic=" + topicName);
		//if (topicName=="/template/update") {
		//	var kk=0;
		//}
		if ($.isFunction(options) ) {
			var opt = {};
			opt.callback = options;
			options = opt;
		}
		if (!$.isArray(topicNameList) ) {
			topicNameList = [topicNameList];
		}
		for (var i=0; i<topicNameList.length; i++) {
			var tn = topicNameList[i];
			var topic = communicationManager.topicMap[tn];
			if (topic == null) {
				topic = communicationManager.topicMap[tn] = new Topic(tn);
			}
			if (options.id == undefined || options.id == "") {
				options.id = this.getId("ID_");
			}
			if (options.callback !== undefined) {
				topic.subMap[options.id] = new Sub(options.id,
						options.callback, null, options.param);
				//console.log ("subscribing: sub.id="+options.id + " callback:"+options.callback.toString().substring(0, 190))
			} else {

				
				topic.subMap[options.id] = new Sub(options.id,
						options.owner, options.handler, options.options);
			}
		}
		

	}
	publish(topicName, options) {
		//console.debug("enter publish:"+topicName)
		//if (topicName=="/applicationService/loadApplications") {
		//	debugger
		//}
		var topic = communicationManager.topicMap[topicName];
		
		//if (debug>0 && topicName.indexOf("/debug")<0) {
		//	debugInfo.addEvent(topicName, options);	
			
		//}
		
		if (topic === undefined) {
			
			communicationManager.topicMap[topicName] = new Topic(
					topicName);
			
			//if (huawei.debug>0 && topicName.indexOf("/debug")<0 && huawei.log) {
			//	console.debug(huawei.debugInfo.print(0, 0));
			//}
			console.log("######WARNING######: there is no subscriber on topic '"+topicName+"'");
			return;
		}
		
		//if (huawei.debug>0 && topicName.indexOf("/debug")<0  && huawei.log) {
		//	console.debug(huawei.debugInfo.print(0, 0));
		//}
		console.log("Publish topic: " + topic.name)
		options = options || {};
		
		for ( var s in topic.subMap) {
			var sub = topic.subMap[s];
			if (sub.param.skip) {
				if (sub.param.skip()) {
					continue;
				}
			}
			//console.log("  ===>process sub=" + sub.id)
			// options.sub = sub;
			if (sub.param) {
				$.extend(options, sub.param);
			}

			if (sub.callback) {
				//console.log("  invoke sub: id=" + sub.id + " callback="
						//+ sub.callback.toString().substring(0, 190));
				var target = window;
				if (sub.owner && window[sub.owner]) {
					target = window[sub.owner];
				}
				sub.callback.apply(target, [ options ]);
				
			} else if (sub.ownerType == "handlerMap") {
				var item = communicationManager.handlerMap[sub.owner];
				item.method.apply(item.owner, options);
			} else {
				//console.log("  invoke sub: id=" + sub.id + " owner="
						//+ sub.owner + " handler=" + sub.handler)
				if (sub.owner && window[sub.owner]) {
					if (sub.handler && window[sub.owner][sub.handler]) {
						window[sub.owner][sub.handler].apple(
								window[sub.owner], [ options ]);
					}
				}
				if (window[sub.handler]) {
					window[sub.handler].apply(window, [ options ]);
				}
			}

		}
		
	}
	publishSequntially(topicName, options) {
		if (options.optionsList.length<1) {
			if (options.doneTopics) {
				this.publish(options.doneTopics);
			}
			return;
		}

		var opt = options.optionsList.shift();
		opt.noConfirm = options.noConfirm;
		opt.callback = function() {
			this.publishSequntially(topicName, options);
		}
		this.publish(topicName, opt);
	}
	
	getId(pre) {
		var v = pre+new Date().valueOf();
		console.info("v="+v)
		return v;
	}
}

const communicationManager = new CommunicationManager()
export default CommunicationManager;