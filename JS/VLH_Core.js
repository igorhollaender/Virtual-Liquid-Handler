//---------------------------------------------------------------------------------
//    Virtual Liquid Handler
//
//	  V L H _ C o r e . j s
//
//
//	  Last revision: IH 2014-08-06
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//   T O D O
//
//		IH140725 	implement stop/break mechanism
//		IH140730	BUG: spike-effect after filling a plate well (interesting: does not occur with pipettor)
//		IH140731	Animation stops when the window is not visible (due to WebGL requestAnimationFrame behaviour)
//					Do something about it
//		IH140801	replace all x3dom.fields.SFVec3f by {x: xxx, y:yyy, z:zzz}
//		IH140805	optimize implemnetation of non-animation case (already done for MoveLabware, MovePipettor, FillLabware)
//		IH140806	implement Plate96 and Plate384 as subclasses of UniversalPlate
//		IH140730	implement different relative volumes for tip and plate well for transfer
//					(HPS96 and 150ul tip are approx similar, but Corning384 or Deepwell 
//					and 150ul tips are unproportional)


//---------------------------------------------------------------------------------
//	COMPACTION
// 	Use
// 	https://github.com/google/closure-compiler

//---------------------------------------------------------------------------------
//	ISSUE 001
//  Increasing local storage quota for Mozilla
//
//	see  https://github.com/zixaphir/appchan-x/issues/354
//	see  http://kb.mozillazine.org/Editing_configuration
//  see  http://kb.mozillazine.org/Dom.storage.default_quota
//
// 		in the address window of the Firefox, type 'about:config' (warning may come),
// 		then change the value of dom.storage.default_quota
// 		original value was '5120'
//

//---------------------------------------------------------------------------------
//  Export definitions 
//
//	These are hints for the Closure compiler optimization/compressor
//  The listed symbols have to be kept in the code after optimization
//  see https://developers.google.com/closure/compiler/docs/api-tutorial3?hl=de

window['SetDeck'] 					= SetDeck;
window['SetPipettor'] 				= SetPipettor;
window['StartProtocolAnimation'] 	= StartProtocolAnimation;

//---------------------------------------------------------------------------------

var standardMoveDurationInSeconds = 3;
var standardFillDurationInSeconds = 3;

var animationDurationLowerLimit = 0.1;

var currentDeck;
var currentDeckId = "DECK1";
var currentPipettor;
var currentPipettorId ='PIPETTOR1';

//---------------------------------------------------------------------------------
// 	A n i m a t i o n
//

//---------------------------------------------------------------------------------
// 	Moving labware
//

var moveLabware_transformNode=null;
var moveLabware_positionInterpolator=null;
var moveLabware_timeSensor=null;
var moveLabware_route1=null;
var moveLabware_route2=null;
var moveLabware_finalTranslationString=null;
var moveLabware_hasToAnimate=1;

var MoveLabware = function(labwareId,deck,locationTo) {

	var travelHeight = 0.06;
	var moveDurationInSeconds = standardMoveDurationInSeconds;

	moveLabware_transformNode = document.getElementsByClassName("Labware TRANSFORM " + labwareId).item(0);
	
	var finalTranslation = deck.Location[locationTo];
	moveLabware_finalTranslationString =
				finalTranslation.x.toString() + " " +
				finalTranslation.y.toString() + " " +
				finalTranslation.z.toString();
	
	moveLabware_hasToAnimate=1;
	if(moveDurationInSeconds<=animationDurationLowerLimit) {
		// skip directly to final state
		moveLabware_hasToAnimate=0;
		MoveLabware_animationComplete();
		return;
	}
		
	var transformNodeDEF = moveLabware_transformNode.getAttribute("DEF");
	var moveLabware_timeSensorNodeDEF = getUniqueId();
	var positionInterpolatorNodeDEF = getUniqueId();

	moveLabware_route1 = document.createElement("ROUTE");
	moveLabware_route1.setAttribute("fromNode", moveLabware_timeSensorNodeDEF);
	moveLabware_route1.setAttribute("fromField", "fraction_changed");
	moveLabware_route1.setAttribute("toNode", positionInterpolatorNodeDEF);
	moveLabware_route1.setAttribute("toField", "set_fraction");

	moveLabware_route2 = document.createElement("ROUTE");
	moveLabware_route2.setAttribute("fromNode", positionInterpolatorNodeDEF);
	moveLabware_route2.setAttribute("fromField", "value_changed");
	moveLabware_route2.setAttribute("toNode", transformNodeDEF);
	moveLabware_route2.setAttribute("toField", "set_translation");

	moveLabware_timeSensor = document.createElement("TimeSensor");
	moveLabware_timeSensor.setAttribute("DEF", moveLabware_timeSensorNodeDEF);
	moveLabware_timeSensor.setAttribute("id", moveLabware_timeSensorNodeDEF);
	moveLabware_timeSensor.setAttribute("cycleInterval", moveDurationInSeconds.toString());
	moveLabware_timeSensor.setAttribute("loop", "false");

	moveLabware_timeSensor.setAttribute("onoutputchange", "MoveLabware_timerOutputChanged(event)");

	moveLabware_positionInterpolator = document.createElement("PositionInterpolator");
	moveLabware_positionInterpolator.setAttribute("DEF", positionInterpolatorNodeDEF);
	moveLabware_positionInterpolator.setAttribute("key", "0.00 0.25 0.75 1.00");

	var initialTranslation = moveLabware_transformNode.getFieldValue("translation");
	var initialTranslationString = moveLabware_transformNode.getAttribute("translation");
	
	var interim1TranslationString =
				initialTranslation.x.toString() + " " +
				(initialTranslation.y+travelHeight).toString() + " " +
				initialTranslation.z.toString();

	var interim2TranslationString =
				finalTranslation.x.toString() + " " +
				(finalTranslation.y+travelHeight).toString() + " " +
				finalTranslation.z.toString();

	var keyValueString = 	initialTranslationString + " "
						+ 	interim1TranslationString + " "
						+ 	interim2TranslationString + " "
						+ 	moveLabware_finalTranslationString;

	moveLabware_positionInterpolator.setAttribute("keyValue", keyValueString);

	document.getElementById("Scene").appendChild(moveLabware_positionInterpolator);
	document.getElementById("Scene").appendChild(moveLabware_timeSensor);
	document.getElementById("Scene").appendChild(moveLabware_route1);
	document.getElementById("Scene").appendChild(moveLabware_route2);

	document.getElementById(moveLabware_timeSensorNodeDEF)
			.setAttribute('startTime',(new Date().getTime() / 1000).toString());
}

var MoveLabware_timerOutputChanged = function(eventObject) {

	if(eventObject.type != "outputchange" || eventObject.fieldName != "isActive")
			return;
	if(eventObject.value==false)
	{
		MoveLabware_animationComplete();
	}
}

var MoveLabware_animationComplete = function(){

	moveLabware_transformNode.setAttribute("translation",moveLabware_finalTranslationString);

	if(moveLabware_hasToAnimate)
	{
		document.getElementById("Scene").removeChild(moveLabware_positionInterpolator);
		document.getElementById("Scene").removeChild(moveLabware_timeSensor);
		document.getElementById("Scene").removeChild(moveLabware_route1);
		document.getElementById("Scene").removeChild(moveLabware_route2);
	}

	moveLabware_transformNode = null;
	moveLabware_positionInterpolator=null;
	moveLabware_timeSensor=null;
	moveLabware_route1=null;
	moveLabware_route2=null;
	moveLabware_finalTranslationString=null;
}


//---------------------------------------------------------------------------------
// 	Moving pipettor
//

var movePipettor_transformNode=null;
var movePipettor_positionInterpolator=null;
var movePipettor_timeSensor=null;
var movePipettor_route1=null;
var movePipettor_route2=null;
var movePipettor_finalTranslationString=null;
var movePipettor_hasToAnimate=1;

var MovePipettor = function(pipettorId,deck,locationTo,locationOffsetX,locationOffsetY,locationOffsetZ) {

	var moveDurationInSeconds = standardMoveDurationInSeconds;

	movePipettor_transformNode = document.getElementsByClassName("Pipettor TRANSFORM " + pipettorId).item(0);
	
	var initialTranslation = movePipettor_transformNode.getFieldValue("translation");
	var initialTranslationString = movePipettor_transformNode.getAttribute("translation");

	movePipettor_finalTranslationString =
				(deck.Location[locationTo].x + locationOffsetX).toString() + " " +
				(initialTranslation.y + locationOffsetY).toString() + " " + //Y elevation (travel height) is kept unchanged
				(deck.Location[locationTo].z + locationOffsetZ).toString();

	movePipettor_hasToAnimate=1;
	if(moveDurationInSeconds<=animationDurationLowerLimit) {
		// skip directly to final state
		movePipettor_hasToAnimate=0;
		MovePipettor_animationComplete();
		return;
	}
	
	var transformNodeDEF = movePipettor_transformNode.getAttribute("DEF");
	var movePipettor_timeSensorNodeDEF = getUniqueId();
	var positionInterpolatorNodeDEF = getUniqueId();

	movePipettor_route1 = document.createElement("ROUTE");
	movePipettor_route1.setAttribute("fromNode", movePipettor_timeSensorNodeDEF);
	movePipettor_route1.setAttribute("fromField", "fraction_changed");
	movePipettor_route1.setAttribute("toNode", positionInterpolatorNodeDEF);
	movePipettor_route1.setAttribute("toField", "set_fraction");

	movePipettor_route2 = document.createElement("ROUTE");
	movePipettor_route2.setAttribute("fromNode", positionInterpolatorNodeDEF);
	movePipettor_route2.setAttribute("fromField", "value_changed");
	movePipettor_route2.setAttribute("toNode", transformNodeDEF);
	movePipettor_route2.setAttribute("toField", "set_translation");

	movePipettor_timeSensor = document.createElement("TimeSensor");
	movePipettor_timeSensor.setAttribute("DEF", movePipettor_timeSensorNodeDEF);
	movePipettor_timeSensor.setAttribute("id", movePipettor_timeSensorNodeDEF);
	movePipettor_timeSensor.setAttribute("cycleInterval", moveDurationInSeconds.toString());
	movePipettor_timeSensor.setAttribute("loop", "false");

	movePipettor_timeSensor.setAttribute("onoutputchange", "MovePipettor_timerOutputChanged(event)");

	movePipettor_positionInterpolator = document.createElement("PositionInterpolator");
	movePipettor_positionInterpolator.setAttribute("DEF", positionInterpolatorNodeDEF);
	movePipettor_positionInterpolator.setAttribute("key", "0.00 1.00");

	var keyValueString = 	initialTranslationString + " "
						+ 	movePipettor_finalTranslationString;

	movePipettor_positionInterpolator.setAttribute("keyValue", keyValueString);

	document.getElementById("Scene").appendChild(movePipettor_positionInterpolator);
	document.getElementById("Scene").appendChild(movePipettor_timeSensor);
	document.getElementById("Scene").appendChild(movePipettor_route1);
	document.getElementById("Scene").appendChild(movePipettor_route2);

	var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + pipettorId).item(0);
	pipettorGroup.setAttribute("actualLocationOnDeck",locationTo);
	pipettorGroup.setAttribute("actualLocationOffset",			
			SFVec3fToString({x : locationOffsetX, y: (initialTranslation.y + locationOffsetY), z: locationOffsetZ})
			);
	
	document.getElementById(movePipettor_timeSensorNodeDEF)
			.setAttribute('startTime',(new Date().getTime() / 1000).toString());
}

var MovePipettor_timerOutputChanged = function(eventObject) {
		
	if(eventObject.type != "outputchange" || eventObject.fieldName != "isActive")
			return;
	if(eventObject.value==false)
	{	
		MovePipettor_animationComplete();
	}
}

var MovePipettor_animationComplete = function(){
	
	movePipettor_transformNode.setAttribute("translation",movePipettor_finalTranslationString);

	if(movePipettor_hasToAnimate)
	{
		document.getElementById("Scene").removeChild(movePipettor_positionInterpolator);
		document.getElementById("Scene").removeChild(movePipettor_timeSensor);
		document.getElementById("Scene").removeChild(movePipettor_route1);
		document.getElementById("Scene").removeChild(movePipettor_route2);
	}

	movePipettor_transformNode = null;
	movePipettor_positionInterpolator=null;
	movePipettor_timeSensor=null;
	movePipettor_route1=null;
	movePipettor_route2=null;
	movePipettor_finalTranslationString=null;
}


//---------------------------------------------------------------------------------
// 	Shaking labware
//

var shakeLabware_transformNode = null;
var shakeLabware_positionInterpolator = null;
var shakeLabware_timeSensor = null;
var shakeLabware_route1 = null;
var shakeLabware_route2 = null;
var shakeLabware_initialTranslationString = null;

var ShakeLabware = function(labwareId,shakingDurationInSeconds) {

	var shakeTravelX = 0.005;

	//This function is not reentrant so we have to make sure it is not reentered
	//IH140729 commented out for debugging only
	//if(!(shakeLabware_transformNode === null)) return;

	shakeLabware_transformNode = document.getElementsByClassName("Labware TRANSFORM ".concat(labwareId)).item(0);
	var transformNodeDEF = shakeLabware_transformNode.getAttribute("DEF");
	var shakeLabware_timeSensorNodeDEF = getUniqueId();
	var positionInterpolatorNodeDEF = getUniqueId();

	shakeLabware_route1 = document.createElement("ROUTE");
	shakeLabware_route1.setAttribute("fromNode", shakeLabware_timeSensorNodeDEF);
	shakeLabware_route1.setAttribute("fromField", "fraction_changed");
	shakeLabware_route1.setAttribute("toNode", positionInterpolatorNodeDEF);
	shakeLabware_route1.setAttribute("toField", "set_fraction");

	shakeLabware_route2 = document.createElement("ROUTE");
	shakeLabware_route2.setAttribute("fromNode", positionInterpolatorNodeDEF);
	shakeLabware_route2.setAttribute("fromField", "value_changed");
	shakeLabware_route2.setAttribute("toNode", transformNodeDEF);
	shakeLabware_route2.setAttribute("toField", "set_translation");

	shakeLabware_timeSensor = document.createElement("TimeSensor");
	shakeLabware_timeSensor.setAttribute("id", shakeLabware_timeSensorNodeDEF);
	shakeLabware_timeSensor.setAttribute("cycleInterval", "1");
	shakeLabware_timeSensor.setAttribute("loop", "true");

	shakeLabware_positionInterpolator = document.createElement("PositionInterpolator");
	shakeLabware_positionInterpolator.setAttribute("DEF", positionInterpolatorNodeDEF);
	shakeLabware_positionInterpolator.setAttribute("key", "0.00 0.20 0.80 1.00");

	var initialTranslation = shakeLabware_transformNode.getFieldValue("translation");
	var shakeLabware_initialTranslationString = shakeLabware_transformNode.getAttribute("translation");

	var interim1TranslationString =
				(initialTranslation.x+shakeTravelX).toString() + " " +
				initialTranslation.y.toString() + " " +
				initialTranslation.z.toString();

	var interim2TranslationString =
				(initialTranslation.x-shakeTravelX).toString() + " " +
				initialTranslation.y.toString() + " " +
				initialTranslation.z.toString();

	var keyValueString = 	shakeLabware_initialTranslationString + " "
						+ 	interim1TranslationString + " "
						+ 	interim2TranslationString + " "
						+ 	shakeLabware_initialTranslationString;

	shakeLabware_positionInterpolator.setAttribute("keyValue", keyValueString);

	document.getElementById("Scene").appendChild(shakeLabware_positionInterpolator);
	document.getElementById("Scene").appendChild(shakeLabware_timeSensor);
	document.getElementById("Scene").appendChild(shakeLabware_route1);
	document.getElementById("Scene").appendChild(shakeLabware_route2);

	// start clock
	document.getElementById(shakeLabware_timeSensorNodeDEF)
		.setAttribute('startTime',(new Date().getTime() / 1000).toString());

	setTimeout(ShakeLabware_animationComplete,shakingDurationInSeconds*1010);
}

var ShakeLabware_animationComplete = function(){

	shakeLabware_timeSensor.setAttribute("loop", "false");
	shakeLabware_positionInterpolator.setAttribute("set_fraction", 1);

	document.getElementById("Scene").removeChild(shakeLabware_positionInterpolator);
	document.getElementById("Scene").removeChild(shakeLabware_timeSensor);
	document.getElementById("Scene").removeChild(shakeLabware_route1);
	document.getElementById("Scene").removeChild(shakeLabware_route2);

	shakeLabware_transformNode = null;
	shakeLabware_positionInterpolator = null;
	shakeLabware_timeSensor = null;
	shakeLabware_route1 = null;
	shakeLabware_route2 = null;
	shakeLabware_initialTranslationString = null;
}

//---------------------------------------------------------------------------------
// 	Modifying object appearance
//

var modifyAppearance_materialNode = null;
var modifyAppearance_colorInterpolator = null;
var modifyAppearance_timeSensor  = null;
var modifyAppearance_route1  = null;
var modifyAppearance_route2  = null;
var modifyAppearance_initialEmissiveColorString  = null;

var ModifyAppearance = function(objectId,durationInSeconds) {

	var hotEmissiveColorString = " 0.8 0.5 0.0";

	//This function is not reentrant so we have to make sure it is not reentered
	//IH140729 commented out for debugging only
	//if(!(modifyAppearance_materialNode === null)) return;

	modifyAppearance_materialNode = document.getElementsByClassName("Deck Locator MATERIAL " + objectId).item(0);

	var materialNodeDEF = modifyAppearance_materialNode.getAttribute("DEF");
	var modifyAppearance_timeSensorNodeDEF = getUniqueId();
	var colorInterpolatorNodeDEF = getUniqueId();

	modifyAppearance_route1 = document.createElement("ROUTE");
	modifyAppearance_route1.setAttribute("fromNode", modifyAppearance_timeSensorNodeDEF);
	modifyAppearance_route1.setAttribute("fromField", "fraction_changed");
	modifyAppearance_route1.setAttribute("toNode", colorInterpolatorNodeDEF);
	modifyAppearance_route1.setAttribute("toField", "set_fraction");

	modifyAppearance_route2 = document.createElement("ROUTE");
	modifyAppearance_route2.setAttribute("fromNode", colorInterpolatorNodeDEF);
	modifyAppearance_route2.setAttribute("fromField", "value_changed");
	modifyAppearance_route2.setAttribute("toNode", materialNodeDEF);
	modifyAppearance_route2.setAttribute("toField", "emissiveColor");

	modifyAppearance_timeSensor = document.createElement("TimeSensor");
	modifyAppearance_timeSensor.setAttribute("id", modifyAppearance_timeSensorNodeDEF);
	modifyAppearance_timeSensor.setAttribute("cycleInterval", "1");
	modifyAppearance_timeSensor.setAttribute("loop", "true");

	modifyAppearance_colorInterpolator = document.createElement("ColorInterpolator");
	modifyAppearance_colorInterpolator.setAttribute("DEF", colorInterpolatorNodeDEF);
	modifyAppearance_colorInterpolator.setAttribute("key", "0.00 0.50 1.00");

	var modifyAppearance_initialEmissiveColorString = modifyAppearance_materialNode.getAttribute("emissiveColor");

	var keyValueString = 	modifyAppearance_initialEmissiveColorString + " "
						+ 	hotEmissiveColorString + " "
						+ 	modifyAppearance_initialEmissiveColorString;

	modifyAppearance_colorInterpolator.setAttribute("keyValue", keyValueString);

	document.getElementById("Scene").appendChild(modifyAppearance_colorInterpolator);
	document.getElementById("Scene").appendChild(modifyAppearance_timeSensor);
	document.getElementById("Scene").appendChild(modifyAppearance_route1);
	document.getElementById("Scene").appendChild(modifyAppearance_route2);

	// start clock
	document.getElementById(modifyAppearance_timeSensorNodeDEF)
		.setAttribute('startTime',(new Date().getTime() / 1000).toString());

	setTimeout(ModifyAppearance_animationComplete,durationInSeconds*1010);
}

var ModifyAppearance_animationComplete = function(){

	modifyAppearance_timeSensor.setAttribute("loop", "false");
	modifyAppearance_colorInterpolator.setAttribute("set_fraction", 1);

	document.getElementById("Scene").removeChild(modifyAppearance_colorInterpolator);
	document.getElementById("Scene").removeChild(modifyAppearance_timeSensor);
	document.getElementById("Scene").removeChild(modifyAppearance_route1);
	document.getElementById("Scene").removeChild(modifyAppearance_route2);

	modifyAppearance_materialNode = null;
	modifyAppearance_colorInterpolator = null;
	modifyAppearance_timeSensor = null;
	modifyAppearance_route1 = null;
	modifyAppearance_route2 = null ;
	modifyAppearance_initialEmissiveColorString= null;
}

//---------------------------------------------------------------------------------
// 	Filling labware
//

var fillLabware_transformNodes = null;
var fillLabware_timeSensor = null;
var fillLabware_positionInterpolatorScale = null;
var fillLabware_positionInterpolatorTranslation = null;
var fillLabware_route1 = null;
var fillLabware_route2 = [];
var fillLabware_route3 = null;
var fillLabware_route4 = [];
var wellHeight;
var finalLiquidLevelHeight;
var fillLabware_hasToAnimate = 1;

var FillLabwareStatic = function(labwareId,wellClass,liquidClass,liquidLevelRelative) {

		var wellHeight = parseFloat(document.getElementsByClassName("Labware GROUP " + labwareId).item(0).getAttribute("wellHeight"));
		var wellOffsetFromPlateBottom = parseFloat(document.getElementsByClassName("Labware GROUP " + labwareId).item(0).getAttribute("wellOffsetFromPlateBottom"));

		liquidLevelHeight = wellHeight * liquidLevelRelative;

		Array.prototype.slice.call(document.getElementsByClassName("Liquid CYLINDER " + wellClass + " " + labwareId))
			.forEach(function(e,i,a) {
				e.setAttribute("wellContent_relativeVolume",liquidLevelRelative.toString());
				e.setAttribute("wellContent_liquidClass",liquidClass);
			});

		Array.prototype.slice.call(document.getElementsByClassName("Liquid MATERIAL " + wellClass + " " + labwareId))
			.forEach(function(e,i,a) {
				SetMaterialLiquid(e,liquidClass);
			});

		Array.prototype.slice.call(document.getElementsByClassName("Liquid TRANSFORM " + wellClass + " " + labwareId))
			.forEach(function(e,i,a) {
				e.setAttribute("translation","0 " + ((liquidLevelHeight-wellHeight)*0.5).toString() + " 0");		e.setAttribute("scale","1 " + (liquidLevelHeight*0.5).toString() + " 1");
			});
}

var FillLabware = function(labwareId,wellClass,liquidClass,liquidLevelRelative) {

	var fillDurationInSeconds = standardFillDurationInSeconds;

	//This function is not reentrant so we have to make sure it is not reentered
	//IH140729 commented out for debugging only
	//if(!(fillLabware_transformNodes === null)) return;

	fillLabware_transformNodes = document.getElementsByClassName("Liquid TRANSFORM " + labwareId + " " + wellClass);

	wellHeight = parseFloat(document.getElementsByClassName("Labware GROUP " + labwareId).item(0).getAttribute("wellHeight"));
	var wellOffsetFromPlateBottom = parseFloat(document.getElementsByClassName("Labware GROUP " + labwareId).item(0).getAttribute("wellOffsetFromPlateBottom"));
		
	//IH140707 in this simplified implementation we assume all affected wells to have the same initial liquid level
	var liquidProperties = document.getElementsByClassName("Liquid CYLINDER " + wellClass + " " + labwareId).item(0);

	var initialLiquidLevelRelative = parseFloat(liquidProperties.getAttribute("wellContent_relativeVolume"));
	var finalLiquidLevelRelative = liquidLevelRelative + initialLiquidLevelRelative;

	if(finalLiquidLevelRelative<0)
	{
		finalLiquidLevelRelative=0;
	}
	if(finalLiquidLevelRelative>1)
	{
		finalLiquidLevelRelative=1;
	}

	//use this if required
	//liquidProperties.getAttribute("wellContent_liquidClass");

	var initialLiquidLevelHeight = wellHeight * initialLiquidLevelRelative;
	finalLiquidLevelHeight = wellHeight * finalLiquidLevelRelative;

	Array.prototype.slice.call(document.getElementsByClassName("Liquid MATERIAL " + wellClass + " " + labwareId))
			.forEach(function(e,i,a) {
				SetMaterialLiquid(e,liquidClass);
			});

	Array.prototype.slice.call(document.getElementsByClassName("Liquid CYLINDER " + wellClass + " " + labwareId))
			.forEach(function(e,i,a) {
				e.setAttribute("wellContent_relativeVolume",finalLiquidLevelRelative.toString());
			});

	if(fillDurationInSeconds<=animationDurationLowerLimit) {
		// skip directly to final state
		fillLabware_hasToAnimate=0;
		FillLabware_animationComplete();
		return;
	}
	
	var fillLabware_timeSensorNodeDEF = getUniqueId();
	var fillLabware_positionInterpolatorScaleNodeDEF = getUniqueId();
	var fillLabware_positionInterpolatorTranslationNodeDEF = getUniqueId();

	fillLabware_route1 = document.createElement("ROUTE");
	fillLabware_route1.setAttribute("fromNode", fillLabware_timeSensorNodeDEF);
	fillLabware_route1.setAttribute("fromField", "fraction_changed");
	fillLabware_route1.setAttribute("toNode", fillLabware_positionInterpolatorScaleNodeDEF);
	fillLabware_route1.setAttribute("toField", "set_fraction");

	fillLabware_route3 = document.createElement("ROUTE");
	fillLabware_route3.setAttribute("fromNode", fillLabware_timeSensorNodeDEF);
	fillLabware_route3.setAttribute("fromField", "fraction_changed");
	fillLabware_route3.setAttribute("toNode", fillLabware_positionInterpolatorTranslationNodeDEF);
	fillLabware_route3.setAttribute("toField", "set_fraction");

	fillLabware_timeSensor = document.createElement("TimeSensor");
	fillLabware_timeSensor.setAttribute("DEF", fillLabware_timeSensorNodeDEF);
	fillLabware_timeSensor.setAttribute("id", fillLabware_timeSensorNodeDEF);
	fillLabware_timeSensor.setAttribute("cycleInterval", fillDurationInSeconds.toString());
	fillLabware_timeSensor.setAttribute("loop", "false");

	fillLabware_timeSensor.setAttribute("onoutputchange", "FillLabware_timerOutputChanged(event)");
	fillLabware_positionInterpolatorScale = document.createElement("PositionInterpolator");
	fillLabware_positionInterpolatorScale.setAttribute("DEF", fillLabware_positionInterpolatorScaleNodeDEF);
	fillLabware_positionInterpolatorTranslation = document.createElement("PositionInterpolator");
	fillLabware_positionInterpolatorTranslation.setAttribute("DEF", fillLabware_positionInterpolatorTranslationNodeDEF);

	fillLabware_positionInterpolatorScale.setAttribute("key", "0.00 1.00");
	fillLabware_positionInterpolatorScale.setAttribute("keyValue",
			" 1 " + (initialLiquidLevelHeight*0.5).toString() + " 1" +
			" 1 " + (finalLiquidLevelHeight*0.5).toString() + " 1 ");

	fillLabware_positionInterpolatorTranslation.setAttribute("key", "0.00 1.00");
	fillLabware_positionInterpolatorTranslation.setAttribute("keyValue",
			" 0 " + ((initialLiquidLevelHeight - wellHeight)*0.5).toString() + " 0" +
			" 0 " + ((finalLiquidLevelHeight - wellHeight)*0.5).toString() + " 0 ");

	//IH140707 IMPORTANT EXPERIENCE: sensors and interpolators must be appended to scene BEFORE any routes

	document.getElementById("Scene").appendChild(fillLabware_timeSensor);
	document.getElementById("Scene").appendChild(fillLabware_positionInterpolatorScale);
	document.getElementById("Scene").appendChild(fillLabware_positionInterpolatorTranslation);
	document.getElementById("Scene").appendChild(fillLabware_route1);
	document.getElementById("Scene").appendChild(fillLabware_route3);

	Array.prototype.slice.call(fillLabware_transformNodes).forEach( function(e,i,a) {
		fillLabware_transformNodeDEF = e.getAttribute("DEF");

		fillLabware_route2[i] = document.createElement("ROUTE");
		fillLabware_route2[i].setAttribute("fromNode", fillLabware_positionInterpolatorScaleNodeDEF);
		fillLabware_route2[i].setAttribute("fromField", "value_changed");
		fillLabware_route2[i].setAttribute("toNode", fillLabware_transformNodeDEF);
		fillLabware_route2[i].setAttribute("toField", "scale");

		document.getElementById("Scene").appendChild(fillLabware_route2[i]);

		fillLabware_route4[i] = document.createElement("ROUTE");
		fillLabware_route4[i].setAttribute("fromNode", fillLabware_positionInterpolatorTranslationNodeDEF);
		fillLabware_route4[i].setAttribute("fromField", "value_changed");
		fillLabware_route4[i].setAttribute("toNode", fillLabware_transformNodeDEF);
		fillLabware_route4[i].setAttribute("toField", "translation");

		document.getElementById("Scene").appendChild(fillLabware_route4[i]);
		});


	document.getElementById(fillLabware_timeSensorNodeDEF)
			.setAttribute('startTime',(new Date().getTime() / 1000).toString());
	
}

var FillLabware_timerOutputChanged = function(eventObject) {

	if(eventObject.type != "outputchange" || eventObject.fieldName != "isActive")
			return;
	if(eventObject.value==false)
	{
		FillLabware_animationComplete();
	}
}

var FillLabware_animationComplete = function(){

	Array.prototype.slice.call(fillLabware_transformNodes).forEach( function(e,i,a) {		
		e.setAttribute("scale"," 1 " + (finalLiquidLevelHeight*0.5).toString() + " 1 ");
		e.setAttribute("translation"," 0 " + ((finalLiquidLevelHeight - wellHeight)*0.5).toString() + " 0 ");
		
		});

	if(fillLabware_hasToAnimate)
	{
		document.getElementById("Scene").removeChild(fillLabware_positionInterpolatorScale);
		document.getElementById("Scene").removeChild(fillLabware_positionInterpolatorTranslation);
		document.getElementById("Scene").removeChild(fillLabware_timeSensor);
		document.getElementById("Scene").removeChild(fillLabware_route1);
		document.getElementById("Scene").removeChild(fillLabware_route3);

		fillLabware_route2.forEach(function(e) {
			document.getElementById("Scene").removeChild(e);
		});

		fillLabware_route4.forEach(function(e) {
			document.getElementById("Scene").removeChild(e);
		});
	}

	fillLabware_transformNodes = null;
	fillLabware_timeSensor = null;
	fillLabware_positionInterpolatorScale = null;
	fillLabware_positionInterpolatorTranslation = null;
	fillLabware_route1 = null;
	fillLabware_route2 = [];
	fillLabware_route3 = null;
	fillLabware_route4 = [];
}


//---------------------------------------------------------------------------------
// 	T i p   m a n a g e m e n t
//

var LoadTips = function(pipettorId,numberOfTipColumns) {

		var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + pipettorId).item(0);
		pipettorGroup.setAttribute("actualTipColumns",numberOfTipColumns);

		for(var c=1; c<=12; c++)
		{
			var tipToHide_TransformNode = Array.prototype.slice.call(
			document.getElementsByClassName("Tip TRANSFORM " + " Column" + c.toString() + " "  + pipettorId));

			var scaleString = "1 0 1";
			if (c<=numberOfTipColumns)
				{
					scaleString = "1 1 1";
				}
			tipToHide_TransformNode.forEach(	function(e,i,a){
				e.setAttribute("scale",scaleString);
				});
		}
}

var EjectTips = function(pipettorId) {
		LoadTips(pipettorId,0);

		Array.prototype.slice.call(document.getElementsByClassName("LiquidInTip MATERIAL " + pipettorId))
			.forEach(function(e,i,a) {
				SetMaterialLiquid(e,"LiquidClassEmptyTips");
			});

}

var fillPipettor_transformNodes = null;
var fillPipettor_timeSensor = null;
var fillPipettor_positionInterpolatorScale = null;
var fillPipettor_positionInterpolatorTranslation = null;
var fillPipettor_route1 = null;
var fillPipettor_route2 = [];
var fillPipettor_route3 = null;
var fillPipettor_route4 = [];
var tipLength;
var finalLiquidLevelHeightInTip;

var FillPipettor = function(pipettorId,liquidClass,liquidLevelRelative) {

	var fillDurationInSeconds = standardFillDurationInSeconds;

	//This function is not reentrant so we have to make sure it is not reentered
	//IH140729 commented out for debugging only
	//if(!(fillPipettor_transformNodes === null)) return;

	fillPipettor_transformNodes = document.getElementsByClassName("LiquidInTip TRANSFORM " + pipettorId);

	tipLength 	= parseFloat(document.getElementsByClassName("Pipettor GROUP " + pipettorId).item(0).getAttribute("tipLength"));
	var actualTipColumns = parseFloat(document.getElementsByClassName("Pipettor GROUP " + pipettorId).item(0).getAttribute("actualTipColumns"));

	//IH140710 in this simplified implementation we assume all affected tips to have the same initial liquid level
	var liquidProperties = document.getElementsByClassName("LiquidInTip CYLINDER " + pipettorId).item(0);

	var initialLiquidLevelRelative = parseFloat(liquidProperties.getAttribute("tipContent_relativeVolume"));
	var finalLiquidLevelRelative = liquidLevelRelative + initialLiquidLevelRelative;

	if(finalLiquidLevelRelative<0)
	{
		finalLiquidLevelRelative=0;
	}
	if(finalLiquidLevelRelative>1)
	{
		finalLiquidLevelRelative=1;
	}

	//use this if required
	//liquidProperties.getAttribute("tipContent_liquidClass");

	var initialLiquidLevelHeight = tipLength * initialLiquidLevelRelative;
	finalLiquidLevelHeightInTip = tipLength * finalLiquidLevelRelative;

	var fillPipettor_timeSensorNodeDEF = getUniqueId();
	var fillPipettor_positionInterpolatorScaleNodeDEF = getUniqueId();
	var fillPipettor_positionInterpolatorTranslationNodeDEF = getUniqueId();

	fillPipettor_route1 = document.createElement("ROUTE");
	fillPipettor_route1.setAttribute("fromNode", fillPipettor_timeSensorNodeDEF);
	fillPipettor_route1.setAttribute("fromField", "fraction_changed");
	fillPipettor_route1.setAttribute("toNode", fillPipettor_positionInterpolatorScaleNodeDEF);
	fillPipettor_route1.setAttribute("toField", "set_fraction");

	fillPipettor_route3 = document.createElement("ROUTE");
	fillPipettor_route3.setAttribute("fromNode", fillPipettor_timeSensorNodeDEF);
	fillPipettor_route3.setAttribute("fromField", "fraction_changed");
	fillPipettor_route3.setAttribute("toNode", fillPipettor_positionInterpolatorTranslationNodeDEF);
	fillPipettor_route3.setAttribute("toField", "set_fraction");

	fillPipettor_timeSensor = document.createElement("TimeSensor");
	fillPipettor_timeSensor.setAttribute("DEF", fillPipettor_timeSensorNodeDEF);
	fillPipettor_timeSensor.setAttribute("id", fillPipettor_timeSensorNodeDEF);
	fillPipettor_timeSensor.setAttribute("cycleInterval", fillDurationInSeconds.toString());
	fillPipettor_timeSensor.setAttribute("loop", "false");

	fillPipettor_timeSensor.setAttribute("onoutputchange", "FillPipettor_timerOutputChanged(event)");

	fillPipettor_positionInterpolatorScale = document.createElement("PositionInterpolator");
	fillPipettor_positionInterpolatorScale.setAttribute("DEF", fillPipettor_positionInterpolatorScaleNodeDEF);
	fillPipettor_positionInterpolatorTranslation = document.createElement("PositionInterpolator");
	fillPipettor_positionInterpolatorTranslation.setAttribute("DEF", fillPipettor_positionInterpolatorTranslationNodeDEF);

	fillPipettor_positionInterpolatorScale.setAttribute("key", "0.00 1.00");
	fillPipettor_positionInterpolatorScale.setAttribute("keyValue",
			" 1 " + (initialLiquidLevelHeight*0.5).toString() + " 1" +
			" 1 " + (finalLiquidLevelHeightInTip*0.5).toString() + " 1 ");

	fillPipettor_positionInterpolatorTranslation.setAttribute("key", "0.00 1.00");
	fillPipettor_positionInterpolatorTranslation.setAttribute("keyValue",
			" 0 " + ((initialLiquidLevelHeight-tipLength)*0.5).toString() + " 0" +
			" 0 " + ((finalLiquidLevelHeightInTip-tipLength)*0.5).toString() + " 0 ");

	//IH140707 IMPORTANT EXPERIENCE: sensors and interpolators must be appended to scene BEFORE any routes

	document.getElementById("Scene").appendChild(fillPipettor_timeSensor);
	document.getElementById("Scene").appendChild(fillPipettor_positionInterpolatorScale);
	document.getElementById("Scene").appendChild(fillPipettor_positionInterpolatorTranslation);
	document.getElementById("Scene").appendChild(fillPipettor_route1);
	document.getElementById("Scene").appendChild(fillPipettor_route3);

	Array.prototype.slice.call(fillPipettor_transformNodes).forEach( function(e,i,a) {
		fillPipettor_transformNodeDEF = e.getAttribute("DEF");

		fillPipettor_route2[i] = document.createElement("ROUTE");
		fillPipettor_route2[i].setAttribute("fromNode", fillPipettor_positionInterpolatorScaleNodeDEF);
		fillPipettor_route2[i].setAttribute("fromField", "value_changed");
		fillPipettor_route2[i].setAttribute("toNode", fillPipettor_transformNodeDEF);
		fillPipettor_route2[i].setAttribute("toField", "scale");

		document.getElementById("Scene").appendChild(fillPipettor_route2[i]);

		fillPipettor_route4[i] = document.createElement("ROUTE");
		fillPipettor_route4[i].setAttribute("fromNode", fillPipettor_positionInterpolatorTranslationNodeDEF);
		fillPipettor_route4[i].setAttribute("fromField", "value_changed");
		fillPipettor_route4[i].setAttribute("toNode", fillPipettor_transformNodeDEF);
		fillPipettor_route4[i].setAttribute("toField", "translation");

		document.getElementById("Scene").appendChild(fillPipettor_route4[i]);
		});

	for(var c=1; c<=12; c++){
		//IH140717 for simplicity, we assume all loaded tips containing same liquid, same volume
		Array.prototype.slice.call(document.getElementsByClassName("LiquidInTip MATERIAL Column" + c.toString() + " " +pipettorId))
			.forEach(function(e,i,a) {
				SetMaterialLiquid(e,(c<=actualTipColumns)?liquidClass:"LiquidClassEmptyTips");
			});
	}

	Array.prototype.slice.call(document.getElementsByClassName("LiquidInTip CYLINDER "  + pipettorId))
			.forEach(function(e,i,a) {
				e.setAttribute("tipContent_relativeVolume",finalLiquidLevelRelative.toString());
			});

	if(fillDurationInSeconds<=animationDurationLowerLimit) {
		// skip directly to final state
		FillPipettor_animationComplete();
	}
	else {
		// start clock
		document.getElementById(fillPipettor_timeSensorNodeDEF)
			.setAttribute('startTime',(new Date().getTime() / 1000).toString());
	}

}

var FillPipettor_timerOutputChanged = function(eventObject) {

	if(eventObject.type != "outputchange" || eventObject.fieldName != "isActive")
			return;
	if(eventObject.value==false)
	{
		FillPipettor_animationComplete();
	}
}

var FillPipettor_animationComplete = function(){

	//IH140805 Problem here: Can't convert null to object (only happens when animation is off)
	Array.prototype.slice.call(fillLabware_transformNodes).forEach( function(e,i,a) {
		e.setAttribute("translation"," 0 " + ((finalLiquidLevelHeightInTip - tipLength)*0.5).toString() + " 0 ");
		e.setAttribute("scale"," 1 " + (finalLiquidLevelHeightInTip*0.5).toString() + " 1 ");
		});

	document.getElementById("Scene").removeChild(fillPipettor_positionInterpolatorScale);
	document.getElementById("Scene").removeChild(fillPipettor_positionInterpolatorTranslation);
	document.getElementById("Scene").removeChild(fillPipettor_timeSensor);
	document.getElementById("Scene").removeChild(fillPipettor_route1);
	document.getElementById("Scene").removeChild(fillPipettor_route3);

	fillPipettor_route2.forEach(function(e) {
		document.getElementById("Scene").removeChild(e);
	});

	fillPipettor_route4.forEach(function(e) {
		document.getElementById("Scene").removeChild(e);
	});

	fillPipettor_transformNodes = null;
	fillPipettor_timeSensor = null;
	fillPipettor_positionInterpolatorScale = null;
	fillPipettor_positionInterpolatorTranslation = null;
	fillPipettor_route1 = null;
	fillPipettor_route2 = [];
	fillPipettor_route3 = null;
	fillPipettor_route4 = [];
}


//---------------------------------------------------------------------------------
// 	P r o t o c o l   a n i m a t i o n
//

var StandardListener = function(oEvent) {
	
	switch(oEvent.detail.type)
	{
		case "SETANIMATIONTIMES":
			SetAnimationTimes(oEvent.data.standardMoveDurationInSeconds,oEvent.data.standardFillDurationInSeconds);
			break;
		case "FINISHED":
			TerminateProtocolAnimation();
			break;
		case "SYNTAXERROR":
			ReportSyntaxError();
			break;
		case "COMMAND":
			if(oEvent.detail.narrative != "")
				{
				document.getElementById("BILLBOARD3").innerHTML = oEvent.detail.narrative;			
				}			
			eval(oEvent.detail.command);
	}
}

var StartProtocolAnimation = function(protocolId,runDetails) {
	
	CleanDeck(currentPipettorId,currentDeck);	
	document.addEventListener("ASched_message",StandardListener,false);
	ScheduleProtocol(protocolId,runDetails);
	document.getElementById("BILLBOARD4").innerHTML = "Running " + protocolId +"...";
	document.getElementById("BILLBOARD4").style.visibility = "visible";
}

var ScheduleProtocol = function(protocolId, runDetails) {	
	
	switch(protocolId)
	{	
	case "autoQuantSeq":		
			U_init_protocol(runDetails); 	
			autoQuantSeq1();	
			autoQuantSeq2();	
			autoQuantSeq3();	
			autoQuantSeq4();	
			autoQuantSeq5();	
			autoQuantSeq6();	
			U_finish_protocol();	
			break;

	case "autoQuantSeq1":		
			U_init_protocol(runDetails); 	
			autoQuantSeq1();	
			U_store_scene("autoQuantSeq_Scene1");			
			U_finish_protocol();	
			break;
			
	case "autoQuantSeq2":		
			U_init_protocol(runDetails); 	
			U_load_scene("autoQuantSeq_Scene1");					
			autoQuantSeq2();	
			U_store_scene("autoQuantSeq_Scene2");			
			U_finish_protocol();	
			break;
			
	case "autoQuantSeq3":		
			U_init_protocol(runDetails); 	
			U_load_scene("autoQuantSeq_Scene2");					
			autoQuantSeq3();	
			U_store_scene("autoQuantSeq_Scene3");			
			U_finish_protocol();	
			break;
			
	case "autoQuantSeq4":		
			U_init_protocol(runDetails); 	
			U_load_scene("autoQuantSeq_Scene3");					
			autoQuantSeq4();	
			U_store_scene("autoQuantSeq_Scene4");			
			U_finish_protocol();	
			break;
			
	case "autoQuantSeq5":		
			U_init_protocol(runDetails); 	
			U_load_scene("autoQuantSeq_Scene4");					
			autoQuantSeq5();	
			U_store_scene("autoQuantSeq_Scene5");			
			U_finish_protocol();	
			break;
	
	case "autoQuantSeq6":		
			U_init_protocol(runDetails); 	
			U_load_scene("autoQuantSeq_Scene5");					
			autoQuantSeq6();	
			U_store_scene("autoQuantSeq_Scene6");			
			U_finish_protocol();	
			break;
		
	case "autoQuantSeq_STAR":		
			U_init_protocol(runDetails); 	
			autoQuantSeq_STAR_1();				
			U_finish_protocol();	
			break;
	
	case "DEMO1":							
			U_init_protocol(runDetails); 	
			DEMO1();			
			U_finish_protocol();	
			break;	
	
	default:		
	}			
}

var TerminateProtocolAnimation = function() {	

	//IH140725 TODO implement stop/break mechanism
	
	Finalize();	
}

var Finalize = function() {
	document.getElementById("BILLBOARD3").innerHTML = "Ready.";
	document.getElementById("BILLBOARD4").style.visibility = "hidden";
	ShowNarrativeExtended("");
}

var ReportSyntaxError = function() {
	document.getElementById("BILLBOARD3").innerHTML = "Syntax error in script.";
	document.getElementById("BILLBOARD4").style.visibility = "hidden";
}

//---------------------------------------------------------------------------------
// 	D i v e r s e
//

var SetDeck = function(deckType) {
	RemoveAllChildren('Labware_GROUP');
	RemoveAllChildren('Deck_GROUP');
	switch(deckType) {
		case "ZEPHYR":
			currentDeck = new Deck_ZEPHYR(currentDeckId,"Deck_GROUP");
			break;
		case "BRAVO":
			currentDeck = new Deck_BRAVO(currentDeckId,"Deck_GROUP");
			break;
		case "STARNGS":
			currentDeck = new Deck_STARNGS(currentDeckId,"Deck_GROUP");
			break;			
		case "SCICLONE":
		default:
			currentDeck = new Deck_SCICLONE(currentDeckId,"Deck_GROUP");
			break;
	}
}

var SetPipettor = function(pipettorType,columnShownTo) {
	//IH140724 one pipettor type currently implemented

	// currentDeck has to be defined before calling this method
	RemoveAllChildren('Pipettor_GROUP');
	currentPipettor = new Pipettor96(currentPipettorId,
		"Pipettor_GROUP",currentDeck,currentDeck.parkingLocation,0,0,0,
		{"columnShownTo": columnShownTo}); 
		
}

var RemoveLabware = function(labwareId) {

	var node=document.getElementsByClassName("Labware TRANSFORM " + labwareId).item(0);
	node.parentNode.removeChild(node);

}

var RemoveAllChildren = function (parentGroupId) {
	node = document.getElementById(parentGroupId);
	while (last = node.lastChild) node.removeChild(last);
}

var CleanDeck = function(pipettorId,deck) {
	RemoveAllChildren('Labware_GROUP');
	MovePipettor(pipettorId,deck,deck.parkingLocation,0,0,0);
	EjectTips(pipettorId);
	ShowNarrativeExtended ("");
}

var ShowNarrativeExtended = function(narrativeString) {

	//IH140725 TODO this has to be set outside
	var hasToShowNarrativeExtended=1;
	
	if(!hasToShowNarrativeExtended) return;
	
	if(narrativeString===""){
		document.getElementById("BILLBOARD5").style.visibility = 'hidden';
	}
	else
	{
		document.getElementById("BILLBOARD5").style.visibility = 'visible';
		document.getElementById("BILLBOARD5").innerHTML = narrativeString;
	}

}

var SetAnimationTimes = function(move,fill) {
	standardMoveDurationInSeconds = move;
	standardFillDurationInSeconds = fill;
}

//---------------------------------------------------------------------------------
// 	S t o r a g e
//

var StoreScene = function(name) {
	var serializer = new XMLSerializer();
	localStorage.setItem(name,serializer.serializeToString(document.getElementById("Pipettor_and_Labware_GROUP")));
	//alert(name	+ " stored.")
	//IH140718 TODO report success/fail somehow
}

var LoadScene = function(name) {
	var storedScene = localStorage.getItem(name);
	if(!(storedScene===null))
	{

		RemoveAllChildren('Pipettor_and_Labware_GROUP');
		document.getElementById('Pipettor_and_Labware_GROUP').insertAdjacentHTML('afterbegin', storedScene);
		/*
		RemoveAllChildren('Labware_GROUP');
		document.getElementById('Labware_GROUP').insertAdjacentHTML('afterbegin', storedScene);
		*/
		//alert(name + " loaded.");
		//IH140718 TODO report success/fail somehow
	}
	else
	{
		//alert("No " + name + " stored.");
		//IH140718 TODO report success/fail somehow
	}
}

//---------------------------------------------------------------------------------
// 	D e t a i l   l e v e l   m a n a g e m e n t
//


var ShowDetails = function(objectId,hasToShow) {

		Array.prototype.slice.call(document.getElementsByClassName(objectId + " Details"))
			.forEach(function(e,i,a) {
				e.setAttribute('render',hasToShow?true:false);
				});
}


//---------------------------------------------------------------------------------
// 	D i v e r s e   U t i l i t i e s
//

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

var SFVec3fToString= function(sfv) {
	return sfv.x.toString() + " " + sfv.y.toString() + " " + sfv.z.toString();
};

var AddUnionClass = function(rootClass,unionClass,subClassArray) {
// for each element belonging to rootClass, add unionClass if this element has at least one of the classes listed in subClassArray
// The element of the subClassArray may be a space-separated list of classes which are understood as intersection.
	Array.prototype.slice.call(document.getElementsByClassName(rootClass)).forEach( function(e,i,a) {
		subClassArray.forEach( function(e1,i1,a1){
			isToInclude=1;
			e1.split(" ").forEach( function(e2,i2,a2){
				if(!(e.classList.contains(e2))) {
					isToInclude=0;
					}
				});
			if(isToInclude){
				e.classList.add(unionClass);
				}
			})
		});
}

var RemoveClass = function(classToRemove) {
	Array.prototype.slice.call(document.getElementsByClassName(classToRemove)).forEach( function(e,i,a) {
		e.classList.remove(classToRemove);
		});
}


