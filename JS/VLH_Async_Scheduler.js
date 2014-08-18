//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ A s y n c _ S c h e d u l e r . j s
//
//	  Last revision: IH 2014-07-29
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

var ASched_nextScheduledTimeInSeconds;
var ASched_schedulerList = [];
var ASched_minimumTimeGap = 0.1;

var ASched_init = function() {
	ASched_nextScheduledTimeInSeconds=0.1;  // 'immediate' start delayed by 100 msec
	ASched_schedulerList = [];	
}

var ASched_finish = function() {		
	
	var t = setTimeout(function() {		
		ASched_postMessage_dispatchEvent({"type": "FINISHED"});
		},  
		ASched_nextScheduledTimeInSeconds*1000);
		
	ASched_schedulerList.push({
		timerReference 	: 		t,
		messageDetails 	: 		{"type": "FINISHED"},
		scheduledTime 	: 		ASched_nextScheduledTimeInSeconds
		});						
}

var ASched_postMessage = function(messageDets) {
	
	ASched_nextScheduledTimeInSeconds+=ASched_minimumTimeGap;
	
	messageDets.type = "COMMAND";
	var t = setTimeout(function() {				
		ASched_postMessage_dispatchEvent(messageDets);
		},  
		ASched_nextScheduledTimeInSeconds*1000);
		
	ASched_schedulerList.push({
		timerReference 	: 		t,
		messageDetails 	: 		messageDets,
		scheduledTime 	: 		ASched_nextScheduledTimeInSeconds
		});						
}

var ASched_wait = function(waitTime) {
	ASched_nextScheduledTimeInSeconds += waitTime;
}

var ASched_postMessage_dispatchEvent = function(messageDets) {
	
	var event = new CustomEvent(
		"ASched_message",
		{
			detail: messageDets,			
			bubbles: true,
			cancelable: true
		}
		);
	document.dispatchEvent(event);	
}