//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ C o m m a n d s _ A s y n c. j s
//
//	  Last revision: IH 2014-08-06
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

// all times in seconds

var ANIMATION_SPEED_NONE = 0;
var ANIMATION_SPEED_NORMAL = 1;
var ANIMATION_SPEED_FAST = 2;
var animation_speed = ANIMATION_SPEED_NORMAL;

var standardWaitTime;
var shortWaitTime;
var longWaitTime;

var standardHeatTime;
var standardShakeTime;
var extraLongHeatTime ;

/* these are defined in VLH.js
var standardMoveDurationInSeconds;
var standardFillDurationInSeconds;
*/

//---------------------------------------------------------------------------------
// 	C o m m a n d s
//
// Commands  C_... are typical liquid handler operations
// Commands  U_... are VLH-specific utilities


var U_finish_protocol = function() {
	ASched_finish();
}

var U_init_protocol = function(runDetails) {	
	//IH140806 TODO this has to be done properly
	if(!(runDetails===null))
	{
		U_set_animation_speed(runDetails.animationSpeed);	
	}
	else
	{
		U_set_animation_speed(ANIMATION_SPEED_NORMAL);	
	}
	ASched_init();
}

var U_load_scene = function(name) {
	ASched_postMessage({
		"command" : 			
			"LoadScene('" +name +"')",
		"narrative": 
			"Loading " + name
		}); 
	ASched_wait(20);		
}

var U_set_animation_speed = function(animation_speed) {
	switch (animation_speed)
	{
	case ANIMATION_SPEED_NONE:
			standardWaitTime = 6;
			shortWaitTime = 1;
			longWaitTime = 10;

			standardHeatTime = 5;
			standardShakeTime = 5;
			extraLongHeatTime = 90;
			
			standardMoveDurationInSeconds= 0;
			standardFillDurationInSeconds= 0;
			break;

	case ANIMATION_SPEED_FAST:
			standardWaitTime = 0.2;
			shortWaitTime = 1;
			longWaitTime = 1;

			standardHeatTime = 1;
			standardShakeTime = 1;
			extraLongHeatTime = 3;
			
			standardMoveDurationInSeconds= 0.1;
			standardFillDurationInSeconds= 0.1;
			break;
			
	case ANIMATION_SPEED_NORMAL:
	default:
			standardWaitTime = 6;
			shortWaitTime = 1;
			longWaitTime = 10;

			standardHeatTime = 5;
			standardShakeTime = 5;
			extraLongHeatTime = 90;
			
			standardMoveDurationInSeconds= 3;
			standardFillDurationInSeconds= 3;
			break;
	}	
}

var U_show_details = function(labwareId,onOrOff) {
	ASched_postMessage({
		"command" : 			
			"ShowDetails('" + labwareId +"'," + onOrOff.toString() +")",
		"narrative": 
			""
		}); 		
}

var U_show_narrative = function(narrative) {
	ASched_postMessage({
		"command" : 			
			"",
		"narrative": 
			narrative
		}); 		
	ASched_wait(standardWaitTime);			
}

var U_show_narrative_extended = function(narrative) {
	ASched_postMessage({
		"command" : 			
			"ShowNarrativeExtended('" + narrative + "')",
		"narrative": 
			""
		}); 			
}

var U_store_scene = function(name) {
	ASched_postMessage({
		"command" : 			
			"StoreScene('" +name +"')",
		"narrative": 
			"Storing " + name
		}); 			
	ASched_wait(20);	
}

var U_wait = function(waitTimeInSeconds) {
	ASched_wait(waitTimeInSeconds);
}

var C_discard_labware = function(labwareId) {
						
	ASched_postMessage({
		"command" : 
			"MoveLabware('"+labwareId+"',currentDeck,'Bin')", 
		"narrative": 
			"Discarding labware " + labwareId + " to Bin"
		}); 	
	ASched_wait(standardWaitTime);			
	
	ASched_postMessage({
		"command" : 
			"RemoveLabware('"+labwareId+"')", 
		"narrative": 
			""			
		}); 		
}

var C_discard_tips = function() {		
	ASched_postMessage({
		"command" : 
			"MovePipettor(currentPipettorId,currentDeck,'D5',0,0,0)", 
		"narrative": 
			"Moving head to D5"  
		}); 
		ASched_wait(standardWaitTime);		
	ASched_postMessage({
		"command" : 
			"EjectTips(currentPipettorId)", 
		"narrative": 
			"Ejecting tips"  
	}); 
	ASched_wait(standardWaitTime);
}

var C_heat = function(objectId,durationInSeconds,hasToWait) {		
	ASched_postMessage({
		"command" : 
			"ModifyAppearance('" + objectId + "'," + durationInSeconds.toString()+ ")", 
		"narrative": 
			"Incubation"  
		}); 
		if(hasToWait){
			ASched_wait(durationInSeconds+2);		
		}	
}

var C_incubate_on_magnet = function(objectId,durationInSeconds,hasToWait) {		
	ASched_postMessage({
		"command" : 
			"ModifyAppearance('" + objectId + "'," + durationInSeconds.toString()+ ")", 
		"narrative": 
			"Incubation on magnet"  
		}); 
		if(hasToWait){
			ASched_wait(durationInSeconds+2);		
		}	
}

var C_load_tips = function (tipBoxId,locationId,numberOfTipColumns,firstTipBoxColumnUsed) {

		ASched_postMessage({
			"command" : 
				"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"'," + (firstTipBoxColumnUsed*(-0.009)).toString() +",0,0)", 
			"narrative": 
				"Loading " + numberOfTipColumns.toString() +" tip column(s) from " + locationId  
		}); 
		ASched_wait(standardWaitTime);
		ASched_postMessage({
			"command" : 
				"LoadTips(currentPipettorId," + numberOfTipColumns.toString() +")", 
			"narrative": 
				""				
		}); 
		for(var column=firstTipBoxColumnUsed; column<firstTipBoxColumnUsed+numberOfTipColumns; column++)
		{
			ASched_postMessage({
			"command" : 
				"FillLabwareStatic('" + tipBoxId + "','Column" + column.toString() +"','LiquidClassEmptyTips',0)", 
			"narrative": 
				"Loading " + numberOfTipColumns.toString() +" tip column(s) from " + locationId  				
			});
		} 	
		ASched_wait(standardWaitTime);		
}

var C_drop_tips = function (tipBoxId,locationId,numberOfTipColumns,firstTipBoxColumnUsed) {

		ASched_postMessage({
			"command" : 
				"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"'," + (firstTipBoxColumnUsed*(-0.009)).toString() +",0,0)", 
			"narrative": 
				"Dropping " + numberOfTipColumns.toString() +" tip column(s) from " + locationId  
		}); 
		ASched_wait(standardWaitTime);
		ASched_postMessage({
			"command" : 
				"LoadTips(currentPipettorId,0)", 
			"narrative": 
				""				
		}); 
		for(var column=firstTipBoxColumnUsed; column<firstTipBoxColumnUsed+numberOfTipColumns; column++)
		{
			ASched_postMessage({
			"command" : 
				"FillLabwareStatic('" + tipBoxId + "','Column" + column.toString() +"','LiquidClassEmptyTips',1)", 
			"narrative": 
				"Dropping " + numberOfTipColumns.toString() +" tip column(s) to " + locationId  				
			});
		} 	
		ASched_wait(standardWaitTime);		
}

var C_mix = function(locationId,labwareId,numberOfColumns,firstColumn,liquidClass,relativeVolume) {
	
	var subClassArrayString = [];
	for(var column=firstColumn; column<firstColumn+numberOfColumns; column++) {		
		subClassArrayString.push("'Column" + column + "',");
	}	
	
	var unionClass = getUniqueId();  
	ASched_postMessage({
		"command" : 			
			"AddUnionClass('Liquid ' + '" + labwareId + "','" + unionClass +"',[" + subClassArrayString + "])",
		"narrative": 
			""
		}); 	

	ASched_postMessage({
		"command" : 			
			"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"'," + ((firstColumn-1)*(-0.009)).toString() +",0,0)", 
		"narrative": 
			"Moving head to " + locationId + ", first column " + firstColumn.toString()
		}); 
	ASched_wait(standardWaitTime);				
	
	for(var numberOfMixSteps=0; numberOfMixSteps<6; numberOfMixSteps++)	{
	for(var mixTransfer=0; mixTransfer<2; mixTransfer++)	{
		ASched_postMessage({
			"command" : 
				"FillPipettor(currentPipettorId,'" + liquidClass +"'," + relativeVolume.toString() +")", 
			"narrative": 
				""  
			}); 			
		ASched_postMessage({		
			"command" : 
				"FillLabware('" + labwareId +"','" + unionClass + "','" + liquidClass + "'," + (-relativeVolume.toString()) +")", 
			"narrative": 
				"Mixing in " + labwareId + ", Columns 1 to " + numberOfColumns.toString()  
			}); 
		}			
		ASched_wait(standardWaitTime);					
		relativeVolume *= -1;
	}	
	
	ASched_postMessage({
		"command" : 			
			"RemoveClass('" + unionClass +"')",
		"narrative": 
			""
		}); 		
}

var C_move_head = function (locationId) {

		ASched_postMessage({
			"command" : 
				"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"',0,0,0)", 
			"narrative": 
				"Moving head to " + locationId  
		}); 
		ASched_wait(standardWaitTime);		
}

var C_move_labware = function(labwareId,locationId) {
			
	ASched_postMessage({
		"command" : 
			"MoveLabware('"+labwareId+"',currentDeck,'"+locationId+"')", 
		"narrative": 
			"Moving labware " + labwareId + " to " + locationId  
		}); 	
	ASched_wait(standardWaitTime);			
}

var C_set_deck = function(deckType) {

		ASched_postMessage({
			"command" : 
				"SetDeck('" + deckType +"')", 
			"narrative": 
				"Changing deck to type '" + deckType + "'"
		}); 
		ASched_wait(standardWaitTime);	
}

var C_pipette = function(locationId,labwareId,numberOfColumns,firstColumn,liquidClass,relativeVolume) {
	// relativeVolume (from -1 to +1)
	//	positive means aspirating from well to tip
	//	negative means dispensing from tip to well
	
	var narrativeForm;	
	if(relativeVolume>0){
		narrativeForm ="Aspirating from ";
		}
	else {
		narrativeForm ="Dispensing to ";
		}	
	var narrativeString	= narrativeForm + labwareId + ", Columns 1 to " + numberOfColumns.toString();  			
	
	var subClassArrayString = [];
	for(var column=firstColumn; column<firstColumn+numberOfColumns; column++) {		
		subClassArrayString.push("'Column" + column + "',");
	}	
		
	var unionClass = getUniqueId(); 
	ASched_postMessage({
		"command" : 			
			"AddUnionClass('Liquid ' + '" + labwareId + "','" + unionClass +"',[" + subClassArrayString + "])",
		"narrative": 
			narrativeString
		}); 
					
	ASched_postMessage({
		"command" : 			
			"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"'," + ((firstColumn-1)*(-0.009)).toString() +",0,0)", 
		"narrative": 			
			narrativeString
		}); 
	ASched_wait(standardWaitTime);				
	ASched_postMessage({
		"command" : 
			"FillPipettor(currentPipettorId,'" + liquidClass +"'," + relativeVolume.toString() +")", 
		"narrative": 
			narrativeString
		}); 	
	var narrativeForm;
	if(relativeVolume>0){
		narrativeForm ="Aspirating from ";
		}
	else {
		narrativeForm ="Dispensing to ";
		}	
	ASched_postMessage({
		"command" : 
			"FillLabware('" + labwareId +"','" + unionClass + "','" + liquidClass + "'," + (-relativeVolume.toString()) +")", 
		"narrative": 			
			narrativeForm + labwareId + ", " + numberOfColumns.toString() + " column(s)"  			
		});     
	
	
	ASched_wait(standardWaitTime);		

	ASched_postMessage({
		"command" : 			
			"RemoveClass('" + unionClass +"')",
		"narrative": 
			narrativeString
		}); 	
	
}

var C_pipette_384 = function(locationId,labwareId,numberOfColumns96,firstColumn96,quadrant,liquidClass,relativeVolume) {
	// relativeVolume (from -1 to +1)
	//	positive means aspirating from well to tip
	//	negative means dispensing from tip to well
	//
	// quadrant is 'A1','A2','B1','B2'
	
	var numberOfRows96=8;
	var firstRow384 = 1;
	var firstColumn384 = (firstColumn96-1)*2;
	switch(quadrant)
	{
		case 'A1':
			firstRow384 = 1;
			firstColumn384 += 1;
			break;
		case 'A2':			
			firstRow384 = 1;
			firstColumn384 += 2;
			break;
		case 'B1':
			firstRow384 = 2;
			firstColumn384 += 1;
			break;
		case 'B2':
			firstRow384 = 2;
			firstColumn384 += 2;
			break;
	}		
	
	var subClassArrayString = [];
	for(var row384=firstRow384; row384<firstRow384+numberOfRows96*2; row384+=2) {		
		var row384Letter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"][row384-1];
		for(var column384=firstColumn384; column384<firstColumn384+numberOfColumns96*2; column384+=2) {		
			subClassArrayString.push("'Column" + column384.toString() + " Row" + row384Letter +"',");		
	}}
	
	var unionClass = getUniqueId(); 
	ASched_postMessage({
		"command" : 			
			"AddUnionClass('Liquid ' + '" + labwareId + "','" + unionClass +"',[" + subClassArrayString + "])",
		"narrative": 
			""
		}); 
					
	var moveOffsetX = 0.00225 + (firstColumn384-1)*(-0.0045); //IH140716 check this!!!
	var moveOffsetZ = 0;				
	switch(quadrant)
	{
		case 'A1':
		case 'A2':
			moveOffsetZ=+0.00225;
			break;
		case 'B1':
		case 'B2':
			moveOffsetZ=-0.00225;
			break;		
	}
	
	ASched_postMessage({
		"command" : 						
			"MovePipettor(currentPipettorId,currentDeck,'" + locationId +"'," + moveOffsetX.toString() +",0," + moveOffsetZ.toString() +")", 
		"narrative": 
			"Moving head to " + locationId + ", first column " + firstColumn384.toString() + ", quadrant " + quadrant
		}); 
	ASched_wait(standardWaitTime);				
	ASched_postMessage({
		"command" : 
			"FillPipettor(currentPipettorId,'" + liquidClass +"'," + relativeVolume.toString() +")", 
		"narrative": 
			""  
		}); 	
	var narrativeForm;
	if(relativeVolume>0){
		narrativeForm ="Aspirating from ";
		}
	else {
		narrativeForm ="Dispensing to ";
		}	
	ASched_postMessage({
		"command" : 
			"FillLabware('" + labwareId +"','" + unionClass + "','" + liquidClass + "'," + (-relativeVolume.toString()) +")", 
		"narrative": 			
			narrativeForm + labwareId + ", " + numberOfColumns96.toString() + " column(s), quadrant " + quadrant  			
		});     
	ASched_wait(standardWaitTime);		

	ASched_postMessage({
		"command" : 			
			"RemoveClass('" + unionClass +"')",
		"narrative": 
			""
		}); 	
	
}

var C_prepare_and_place_plate = function(plateType,plateId,locationId,fillingScheme,details) {
	//
	// Filling scheme example	
	//	[{column:'1',liquidClass:'LiquidClassYellow',relativeVolume:0.4},
	//	 {column:'2',liquidClass:'LiquidClassRed',relativeVolume:0.9}]
	//
	//	or
	//
	//	[{row:'A',liquidClass:'LiquidClassYellow',relativeVolume:0.4},
	//	 {row:'C',liquidClass:'LiquidClassRed',relativeVolume:0.9}]
	
	
	// Details may contain following fields:
	//
	
	var detailsString = "";
	detailsString += "{";
	for (var key in details) {
		if (details.hasOwnProperty(key)) {
			var valueString = details[key].toString();
			if(typeof details[key] === "string")
			{
				valueString = "'" + valueString + "'"; 
			}
			detailsString += "'" + key.toString() + "':" + valueString + ","			
			}
	}
	detailsString += "}";
	
	ASched_postMessage({
		"command" : 
			"new " + plateType + "('" + plateId +"','Labware_GROUP',currentDeck,'Desk'," + detailsString + ")",
		"narrative": 
			"Preparing a new " + plateType + " plate (" + plateId + ")"  
		}); 	
	ASched_wait(shortWaitTime);							
		
	if(!(fillingScheme === null))
	{
	fillingScheme.forEach(function(e,i,a){	
		//IH140805 HACK / TODO implement the well selection properly
		if("wellId" in e)
		{
			ASched_postMessage({
			"command" : 
				"FillLabware('" + plateId +"','WellId" + e.wellId.toString() + "','" + e.liquidClass + "'," + e.relativeVolume.toString() +")", 
			"narrative": 
				"Filling " + plateId + ", well " + e.wellId.toString() + ", reagent " + e.liquidClass  
			});
		}
		if("column" in e)
		{
			ASched_postMessage({
			"command" : 
				"FillLabware('" + plateId +"','Column" + e.column.toString() + "','" + e.liquidClass + "'," + e.relativeVolume.toString() +")", 
			"narrative": 
				"Filling " + plateId + ", Column " + e.column.toString() + ", reagent " + e.liquidClass  
			});
		}
		if("row" in e)
		{
			ASched_postMessage({
			"command" : 
				"FillLabware('" + plateId +"','Row" + e.row.toString() + "','" + e.liquidClass + "'," + e.relativeVolume.toString() +")", 
			"narrative": 
				"Filling " + plateId + ", Row " + e.row.toString() + ", reagent " + e.liquidClass  
			});
		}

		ASched_wait(standardWaitTime);					
		});	
	}
			
	ASched_postMessage({
		"command" : 
			"MoveLabware('"+plateId+"',currentDeck,'"+locationId+"')", 
		"narrative": 
			"Moving " + plateId + " to " + locationId  
		}); 	
	ASched_wait(standardWaitTime);			
}

var C_prepare_and_place_tip_box = function(tipBoxId,locationId,isFull,details) {

	var detailsString = "";
	detailsString += "{";
	for (var key in details) {
		if (details.hasOwnProperty(key)) {
			var valueString = details[key].toString();
			if(typeof details[key] === "string")
			{
				valueString = "'" + valueString + "'"; 
			}
			detailsString += "'" + key.toString() + "':" + valueString + ","			
			}
	}
	detailsString += "}";
	
	ASched_postMessage({
		"command" : 
			"new TipBox96('"+tipBoxId+"','Labware_GROUP',currentDeck,'Desk'," + detailsString +")",
		"narrative": ""  
		}); 	
	ASched_wait(shortWaitTime);	
	
	var emptyOrFullString =	"an empty";
	var emptyOrFullDigit = "0";
	if(isFull)
	{
		emptyOrFullString =	"a full";
		emptyOrFullDigit = "1";
	}	
	
	ASched_postMessage({
		"command" :
			"FillLabwareStatic('"+tipBoxId+"','','LiquidClassEmptyTips'," + emptyOrFullDigit +")", 
		"narrative": 
			"Preparing " + emptyOrFullString +" tip box (" + tipBoxId + ")"  
		}); 	
	ASched_wait(standardWaitTime);					
	ASched_postMessage({
		"command" : 
			"MoveLabware('"+tipBoxId+"',currentDeck,'"+locationId+"')", 
		"narrative": 
			"Moving tipbox " + tipBoxId + " to " + locationId  
		}); 
	ASched_wait(standardWaitTime);
}
	
var C_shake = function(plateId,durationInSeconds)  {
	ASched_postMessage({
		"command" : 			
			"ShakeLabware('" + plateId + "'," + durationInSeconds.toString() +")",
		"narrative": 
			"Shaking " + plateId + " for " + durationInSeconds.toString() + " seconds"
		}); 	
	ASched_wait(standardWaitTime);	// shaking is still going on until durationInSeconds
}
		

// taken from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
var getUniqueId = function (prefix) {

	var d = new Date().getTime();
	
	d += (parseInt(Math.random() * 100)).toString();
	if (undefined === prefix) {
		prefix = 'uid-';
	}
	d = prefix + d;
	return d;
};
