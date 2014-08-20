//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ P l a t e . j s
//
//	  General model template for a wellplate-like consumable.
//	  and its particular instances.
//
//	  Last revision: IH 2014-08-20
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// 	U n i v e r s a l P l a t e
//

function UniversalPlate(id,parentGroupId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	
	this.lowerBoxSizeX =				0.100;
	this.lowerBoxHeight =				0.010;
	this.lowerBoxSizeZ =				0.050;
	
	this.upperBoxSizeX =				0.100;
	this.upperBoxHeight =				0.070;
	this.upperBoxSizeZ =				0.050;
	
	this.upperBoxElevation =			0.000;  
		
	this.wellHeight = 					0.035;	
	this.wellOffsetFromPlateBottom = 	0.035;

	this.wellDescription =
	[
	{posX: 0.0, posZ:  0.00,  label: 'A1', shape: 'CYLINDER',  radius: 0.005}
	];
	
	this.wellsToShow = null; // null means 'show all'
	this.wellsToShowString = ""; 
	if(!(details==null))
	{
		if("wellsToShowString" in details){
			this.wellsToShowString = details.wellsToShowString; 
			this.wellsToShow = this.wellsToShowString.split(" ");
			}						
	}				
}

UniversalPlate.prototype.Create = function() {

	var transform;
	var material;
	var group;
	var appearance;
	var shape;
	var box;
	var wellobject;
	
	transform = document.createElement("Transform");
	transform.setAttribute("DEF", getUniqueId() );  // unique id
	
			transform.classList.add(this.id); 			
			transform.classList.add("Labware"); 
			transform.classList.add("TRANSFORM"); 			
	
	group = document.createElement("Group");
	transform.appendChild(group);	
	group.setAttribute("id", this.id);
	
	// custom attributes ("member objects") are hosted in this group
	
	group.setAttribute("wellHeight",this.wellHeight.toString() );  
	group.setAttribute("wellOffsetFromPlateBottom",this.wellOffsetFromPlateBottom.toString() );  
	
			group.classList.add(this.id); 			
			group.classList.add("Labware"); 
			group.classList.add("GROUP"); 			
		
	
	document.getElementById(this.parentGroupId).appendChild(transform);		
	
	// lower box  ...
	
	material = document.createElement("Material");
			
		material.classList.add(this.id); 			
		material.classList.add("Body"); 
		material.classList.add("MATERIAL"); 				
		
	appearance = document.createElement("Appearance");
	box = document.createElement("Box");
	
		box.setAttribute("solid","true");	
		box.setAttribute("ccw","false");   		
		box.setAttribute("size",
			this.lowerBoxSizeX.toString() + " " + 
			this.lowerBoxHeight.toString() + " " +
			this.lowerBoxSizeZ.toString() );			
				
	shape = document.createElement("Shape");	
	transform = document.createElement("Transform");
			
		transform.setAttribute("translation","0 " + (this.lowerBoxHeight*0.5).toString() + " 0 ");	
		
	group.appendChild(transform);	
	transform.appendChild(shape);
	shape.appendChild(box);
	shape.appendChild(appearance);
	appearance.appendChild(material);	
	
	// upper box  ...
	
	material = document.createElement("Material");
		
		material.classList.add(this.id); 			
		material.classList.add("Body"); 
		material.classList.add("MATERIAL"); 		
						
	appearance = document.createElement("Appearance");
	box = document.createElement("Box");
	
		box.setAttribute("solid","true");
		box.setAttribute("ccw","false");   
			//IH140623 this is a workaround for a transparency problem; see https://github.com/x3dom/x3dom/issues/67		
		box.setAttribute("size",
			this.upperBoxSizeX.toString() + " " + 
			this.upperBoxHeight.toString() + " " +
			this.upperBoxSizeZ.toString() );			
		
	shape = document.createElement("Shape");	
	transform = document.createElement("Transform");
			
		transform.setAttribute("translation","0 " + (this.upperBoxHeight*0.5 + this.upperBoxElevation).toString() + " 0 ");	
				
	group.appendChild(transform);	
	transform.appendChild(shape);
	shape.appendChild(box);
	shape.appendChild(appearance);
	appearance.appendChild(material);	
		
	//details
		
	var detailsGroup = document.createElement("Group");
	detailsGroup.setAttribute("id",getUniqueId());   
	detailsGroup.classList.add(this.id); 			
	detailsGroup.classList.add("Labware"); 
	detailsGroup.classList.add("Details"); 
	detailsGroup.classList.add("GROUP"); 					
	group.appendChild(detailsGroup);		

	// wells   ...
	
	var tthis=this;		
	this.wellDescription.forEach(		
		function(e,i,a) 		
		{							
		if(!(tthis.wellsToShow === null))
		{				
			if(tthis.wellsToShow.indexOf(e.wellId) == -1) return;				
		}		
		
		var wellGroup = document.createElement("Group");
		
		// wells ...
														
		var wellPosY =  tthis.wellHeight*0.5 + tthis.wellOffsetFromPlateBottom;				
		
		var translationString = e.posX.toString() + " " + wellPosY.toString() + " " + e.posZ.toString();
				
		switch(e.shape) {		
		case "INDEXEDFACESET":
			wellobject = document.createElement("IndexedFaceSet");
			wellobject.setAttribute("solid","false");										
			wellobject.setAttribute("creaseAngle","3.14");										
			wellobject.setAttribute("coordIndex",
				"0 1 5 4 -1 " + 
				"1 2 6 5 -1 " +
				"2 3 7 6 -1 " +
				"3 0 4 7 -1 " +
				"0 1 2 3 -1 " +
				"");  
			var coordinates = document.createElement("Coordinate");
			coordinates.setAttribute("point",
				/* point 0 */  	(+e.radiusX).toString() +  " "  + 
								(-tthis.wellHeight*0.5).toString() +  " "  +
								(-e.radiusZ).toString() +  " "  +
				/* point 1 */  	(-e.radiusX).toString() +  " "  + 
								(-tthis.wellHeight*0.5).toString() +  " "  +
								(-e.radiusZ).toString() +  " "  +
				/* point 2 */  	(-e.radiusX).toString() +  " "  + 
								(-tthis.wellHeight*0.5).toString() +  " "  +
								(+e.radiusZ).toString() +  " "  +
				/* point 3 */  	(+e.radiusX).toString() +  " "  + 
								(-tthis.wellHeight*0.5).toString() +  " "  +
								(+e.radiusZ).toString() +  " "  +
				/* point 4 */  	(+e.radiusX).toString() +  " "  + 
								(+tthis.wellHeight*0.5).toString() +  " "  +
								(-e.radiusZ).toString() +  " "  +
				/* point 5 */  	(-e.radiusX).toString() +  " "  + 
								(+tthis.wellHeight*0.5).toString() +  " "  +
								(-e.radiusZ).toString() +  " "  +
				/* point 6 */  	(-e.radiusX).toString() +  " "  + 
								(+tthis.wellHeight*0.5).toString() +  " "  +
								(+e.radiusZ).toString() +  " "  +
				/* point 7 */  	(+e.radiusX).toString() +  " "  + 
								(+tthis.wellHeight*0.5).toString() +  " "  +
								(+e.radiusZ).toString() +  " "  +								
								""
				);			
			wellobject.appendChild(coordinates);	
			break;
		case "BOX":
			
			wellobject = document.createElement("Box");
			wellobject.setAttribute("size",
					(e.radiusX*2).toString() + " " +
					tthis.wellHeight.toString() + " " +
					(e.radiusZ*2).toString() );			
			wellobject.setAttribute("solid","false");										
			
			break;
		default:
		case "CYLINDER":
			wellobject = document.createElement("Cylinder");
			wellobject.setAttribute("height",tthis.wellHeight.toString());			
			wellobject.setAttribute("radius",e.radius.toString());
			wellobject.setAttribute("solid","false");	
			wellobject.setAttribute("top","false");
			wellobject.setAttribute("bottom","true");									
			break;
		}	
					
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform = document.createElement("Transform");
		transform.setAttribute("translation", translationString);	
											
			material.classList.add(tthis.id); 			
			material.classList.add("Well"); 
			material.classList.add("MATERIAL"); 
								
		detailsGroup.appendChild(transform);
		transform.appendChild(wellGroup);
		wellGroup.appendChild(shape);
		shape.appendChild(wellobject);
		shape.appendChild(appearance);
		appearance.appendChild(material);
		
		// liquid model ...
		
		switch(e.shape) {		
		case "BOX":
		case "INDEXEDFACESET":
			wellobject = document.createElement("Box");					
			wellobject.setAttribute("size",
				(e.radiusX*2*1.05).toString() + " 2 " + 
				(e.radiusZ*2*1.05).toString()
				);
			wellobject.setAttribute("solid","true");			
			break;
			
		default:
		case "CYLINDER":
			wellobject = document.createElement("Cylinder");
			wellobject.setAttribute("radius",(e.radius*1.05).toString());
			wellobject.setAttribute("solid","true");
			wellobject.setAttribute("top","true");
			wellobject.setAttribute("bottom","true");
		}
		
			wellobject.classList.add(tthis.id);		
			wellobject.classList.add("WellId" + e.wellId); 				
			wellobject.classList.add("CYLINDER");	//IH140819 for elegacy reasons, the class is called 'CYLINDER'		
			wellobject.classList.add("Liquid");					
							
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform1 = document.createElement("Transform");		
		transform1.setAttribute("DEF",getUniqueId());		
		
			transform1.classList.add(tthis.id); 			
			transform1.classList.add("WellId" + e.wellId); 
			transform1.classList.add("Liquid"); 
			transform1.classList.add("TRANSFORM"); 
									
			material.classList.add(tthis.id); 
			material.classList.add("WellId" + e.wellId); 			
			material.classList.add("Liquid"); 
			material.classList.add("MATERIAL"); 		
					
			if('wellExtraClassListString' in e)
			{			
			e.wellExtraClassListString.split(" ").forEach(function(eE,iE,aE){
					wellobject.classList.add(eE);
					transform1.classList.add(eE);
					material.classList.add(eE);
					});			
			}
							
		wellGroup.appendChild(transform1);
		transform1.appendChild(shape);		
		shape.appendChild(wellobject);
		shape.appendChild(appearance);
		appearance.appendChild(material);
	
		// labels ...																	
		
		if('label' in e)
		{
		
		var actualLabelOffsetX = ('labelOffsetX' in e)? e.labelOffsetX : 0.004;
		var actualLabelOffsetZ = ('labelOffsetZ' in e)? e.labelOffsetZ : 0.004;
		
		var labelPosX = e.posX + actualLabelOffsetX;
		var labelPosY = 0;
		var labelPosZ = e.posZ + actualLabelOffsetZ;
			
		translationString = labelPosX.toString() + " " + labelPosY.toString() + " " + labelPosZ.toString();
								
		fontStyle = document.createElement("FontStyle");						
		text = document.createElement("Text");										
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");						
		var transform1 = document.createElement("Transform");
		var transform2 = document.createElement("Transform");
		transform1.setAttribute("translation", translationString);
		transform1.setAttribute("rotation", "0 1 0 3.1416");			
								
		transform2.setAttribute("translation","0 ".concat(tthis.upperBoxHeight.toString()," 0"));
		transform2.setAttribute("rotation", "1 0 0 -1.5708");
		transform2.setAttribute("scale", "0.0055 0.0055 0.0055");
		material.setAttribute("diffuseColor","0.2 0.2 0.2");
		
		text.setAttribute("string",e.label);
		text.setAttribute("solid","false");
		fontStyle.setAttribute("family","SANS");
		fontStyle.setAttribute("justify",'"MIDDLE" "MIDDLE"');
						
		detailsGroup.appendChild(transform1);
		text.appendChild(fontStyle);
		transform1.appendChild(transform2);
		transform2.appendChild(shape);
		shape.appendChild(text);
		shape.appendChild(appearance);
		appearance.appendChild(material);		
		}
			
	});
}

UniversalPlate.prototype.SetWellContentEmpty = function() {		

		var tthis = this;			
		this.wellDescription.forEach(function(eR,iR,aR){	

					if(!(tthis.wellsToShow === null))
					{
						if(tthis.wellsToShow.indexOf(eR.wellId) == -1) return;
					}		
					
					var well =  document.getElementsByClassName("Liquid CYLINDER " + " WellId"+eR.wellId + " " + tthis.id).item(0);
					well.setAttribute("wellContent_relativeVolume","0");
					well.setAttribute("wellContent_liquidClass","");
					
					var transform = document.getElementsByClassName("Liquid TRANSFORM " + " WellId" + eR.wellId + " " + tthis.id).item(0);
					transform.setAttribute("scale","1 0 1");				transform.setAttribute("translation", "0 " + (tthis.wellHeight*(-0.5)).toString() + " 0")			

					var material = document.getElementsByClassName("Liquid MATERIAL " + " WellId" + eR.wellId + " " + tthis.id).item(0);			
					SetMaterialLiquid(material,"LiquidClassEmptyWells");							

			});					
}

UniversalPlate.prototype.PlaceOnDeck = function(deck,locationId) {
		document.getElementsByClassName("Labware TRANSFORM ".concat(this.id)).item(0)						
						.setAttribute("translation",	SFVec3fToString(deck.Location[locationId]));					
		document.getElementsByClassName("Labware GROUP " + this.id).item(0).setAttribute("actualLocationOnDeck",locationId);
}

//---------------------------------------------------------------------------------
// 	N e w P l a t e 9 6
//

Plate96.prototype = Object.create(UniversalPlate.prototype);
Plate96.prototype.constructor = Plate96;

function Plate96(id,parentGroupId,deck,locationId,wellShape,wellRadius,details) {		
	
	if(!(details==null))
	{		
		if("columnShownTo" in details)	{ //IH140819 this is a legacy option for matrix-patterned plates			
			details.wellsToShowString = "";
			for(var wellIdxX=1; wellIdxX<=(details.columnShownTo+1); wellIdxX++)
			for(var wellIdxZ=1; wellIdxZ<=8; wellIdxZ++)  {			
				var rowString = ["A","B","C","D","E","F","G","H"][wellIdxZ-1];		
				var columnString = wellIdxX.toString();
				details.wellsToShowString += (" " + rowString + columnString);
			}
		}	
	}
	
	UniversalPlate.call(this,id,parentGroupId,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.004;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.015;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.013;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
	this.wellRadius	=					wellRadius;
	this.wellShape	=					wellShape;   	
	
	this.wellDescription = [];
	for(var wellIdxX=1; wellIdxX<=12; wellIdxX++)
	for(var wellIdxZ=1; wellIdxZ<=8; wellIdxZ++)
	{
		var rowString = ["A","B","C","D","E","F","G","H"][wellIdxZ-1];		
		var columnString = wellIdxX.toString();
		
		var myLabel="";
		var myLabelOffsetX;
		var myLabelOffsetZ;
		if(wellIdxX==1 && wellIdxZ==1) {  //IH140819 special case for 'A1'
			myLabel='A1';
			myLabelOffsetX = +0.0075;
			myLabelOffsetZ = +0.0035;
		}
		else
		if(wellIdxX==1) {
			myLabel=rowString;
			myLabelOffsetX = +0.0075;
			myLabelOffsetZ = -0.0030;
		}
		else
		if(wellIdxZ==1) {		
			myLabel=columnString;		
			myLabelOffsetX = +0.0000;
			myLabelOffsetZ = +0.0035;			
		}		
				
		this.wellDescription.push(
			{	
				posX: (-0.050 + (12-wellIdxX) * 0.009),  
				posZ: (-0.032 + (8-wellIdxZ) * 0.009),  
				wellId: (rowString+columnString),  
				wellExtraClassListString: 
					("Column"+columnString+" "+"Row"+rowString+" " +"Well"+rowString+columnString),
				shape: this.wellShape,  
				radius: this.wellRadius, 
				radiusX: this.wellRadius, 
				radiusZ: this.wellRadius, 				
				label: myLabel, 
				labelOffsetX: myLabelOffsetX, 
				labelOffsetZ: myLabelOffsetZ				
			}		
		)
	}
	
}


//---------------------------------------------------------------------------------
// 	H S P 9 6
//

HSP96.prototype = Object.create(Plate96.prototype);
HSP96.prototype.constructor = HSP96;

function HSP96(id,parentGroupId,deck,locationId,details) {
	
	this.wellRadius	=					0.0025;
	this.wellShape	=					"CYLINDER";   	
		
	Plate96.call(this,id,parentGroupId,deck,locationId,this.wellShape,this.wellRadius,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.004;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.015;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.013;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
	

	this.Create();	
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);		
		
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

HSP96.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL ".concat(this.id))); 			
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL ".concat(this.id)));
		var material = materialBody.concat(materialWell);	
		
		var i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.0 0.6 0.9");
			material[i].setAttribute("specularColor","0.0 0.6 0.9");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}
}


//---------------------------------------------------------------------------------
// 	D e e p W e l l 9 6
//

DeepWell96.prototype = Object.create(Plate96.prototype);
DeepWell96.prototype.constructor = DeepWell96;

function DeepWell96(id,parentGroupId,deck,locationId,details) {	
	
	this.wellRadius	=					0.004;
	this.wellShape	=					"INDEXEDFACESET";   	
		
	Plate96.call(this,id,parentGroupId,deck,locationId,this.wellShape,this.wellRadius,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.004;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.043;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.041;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;	
		
	this.Create();	
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);		
		
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

DeepWell96.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL " + this.id));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.8 0.8 0.9");
			material[i].setAttribute("specularColor","0.8 0.8 0.9");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}
}

//---------------------------------------------------------------------------------
// 	T i p B o x 9 6 
//

TipBox96.prototype = Object.create(Plate96.prototype);
TipBox96.prototype.constructor = TipBox96;

function TipBox96(id,parentGroupId,deck,locationId,details) {	

	this.wellRadius	=					0.0025;
	this.wellShape	=					"CYLINDER";   	
		
	Plate96.call(this,id,parentGroupId,deck,locationId,this.wellShape,this.wellRadius,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.002;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.055;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.041;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;	
		
	this.Create();	
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);		
		
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

TipBox96.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL ".concat(this.id))); 			
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL ".concat(this.id)));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.0 0.2 0.7");
			material[i].setAttribute("specularColor","0.0 0.2 0.7");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.3");			
		}
}


//---------------------------------------------------------------------------------
// 	L i d   f o r   H S P 9 6 
//

LidForHSP96.prototype = Object.create(UniversalPlate.prototype);
LidForHSP96.prototype.constructor = LidForHSP96;

function LidForHSP96(id,parentGroupId,deck,locationId) {		
		
	UniversalPlate.call(this,id,parentGroupId,null);
	
	this.lowerBoxSizeX =				0;
	this.lowerBoxHeight =				0;
	this.lowerBoxSizeZ =				0;
	
	this.upperBoxSizeX =				0.128;
	this.upperBoxHeight =				0.009;
	this.upperBoxSizeZ =				0.085;
	this.upperBoxElevation =			0.009;
				
	this.wellDescription = [];
	
	this.Create();	
	this.SetDefaultMaterialBody();		
	this.PlaceOnDeck(deck,locationId);			
}

LidForHSP96.prototype.SetDefaultMaterialBody = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 		
		
		var i = materialBody.length;
		while(i--)
		{
			materialBody[i].setAttribute("diffuseColor","0.6 0.6 0.6");
			materialBody[i].setAttribute("specularColor","0.6 0.6 0.6");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.01");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.5");
			materialBody[i].setAttribute("transparency","0.5");			
		}
}


//---------------------------------------------------------------------------------
// 	S e a l i n g F i l m F o r H S P 9 6 
//

SealingFilmForHSP96.prototype = Object.create(UniversalPlate.prototype);
SealingFilmForHSP96.prototype.constructor = SealingFilmForHSP96;

function SealingFilmForHSP96(id,parentGroupId,deck,locationId) {		
		
	UniversalPlate.call(this,id,parentGroupId,null);
	
	this.lowerBoxSizeX =				0;
	this.lowerBoxHeight =				0;
	this.lowerBoxSizeZ =				0;
	
	this.upperBoxSizeX =				0.128;
	this.upperBoxHeight =				0.001;
	this.upperBoxSizeZ =				0.085;
	this.upperBoxElevation =			0.016;
				
	this.wellDescription = [];
	
	this.Create();	
	this.SetDefaultMaterialBody();		
	this.PlaceOnDeck(deck,locationId);			
}

SealingFilmForHSP96.prototype.SetDefaultMaterialBody = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 		
		
		var i = materialBody.length;
		while(i--)
		{
			materialBody[i].setAttribute("diffuseColor","0.8 0.8 0.2");
			materialBody[i].setAttribute("specularColor","0.8 0.8 0.2");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.01");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.8");
			materialBody[i].setAttribute("transparency","0.4");			
		}
}

//---------------------------------------------------------------------------------
// 	L i d F o r D e e p W e l l 9 6 
//

LidForDeepWell96.prototype = Object.create(UniversalPlate.prototype);
LidForDeepWell96.prototype.constructor = LidForDeepWell96;

function LidForDeepWell96(id,parentGroupId,deck,locationId) {		
		
	UniversalPlate.call(this,id,parentGroupId,null);
	
	this.lowerBoxSizeX =				0;
	this.lowerBoxHeight =				0;
	this.lowerBoxSizeZ =				0;
	
	this.upperBoxSizeX =				0.128;
	this.upperBoxHeight =				0.009;
	this.upperBoxSizeZ =				0.085;
	this.upperBoxElevation =			0.038;
				
	this.wellDescription = [];
	
	this.Create();	
	this.SetDefaultMaterialBody();		
	this.PlaceOnDeck(deck,locationId);			
}

LidForDeepWell96.prototype.SetDefaultMaterialBody = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 		
		
		var i = materialBody.length;
		while(i--)
		{
			materialBody[i].setAttribute("diffuseColor","0.2 0.6 0.9");
			materialBody[i].setAttribute("specularColor","0.2 0.6 0.9");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.04");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.5");
			materialBody[i].setAttribute("transparency","0.5");			
		}
}


//---------------------------------------------------------------------------------
// 	N e w P l a t e 3 8 4 
//

Plate384.prototype = Object.create(UniversalPlate.prototype);
Plate384.prototype.constructor = Plate384;

function Plate384(id,parentGroupId,deck,locationId,wellShape,wellRadius,details) {		
	
	if(!(details==null))
	{		
		if("columnShownTo" in details)	{ //IH140819 this is a legacy option for matrix-patterned plates			
			details.wellsToShowString = "";
			for(var wellIdxX=1; wellIdxX<=(details.columnShownTo+1); wellIdxX++)
			for(var wellIdxZ=1; wellIdxZ<=16; wellIdxZ++)  {	
				var rowString = 
					["A","B","C","D","E","F","G","H",
					 "I","J","K","L","M","N","O","P"]
					[wellIdxZ-1];									
				var columnString = wellIdxX.toString();
				details.wellsToShowString += (" " + rowString + columnString);
			}
		}	
	}
	
	UniversalPlate.call(this,id,parentGroupId,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.002;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.015;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.006;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
	this.wellRadius	=					wellRadius;
	this.wellShape	=					wellShape;   	
	
	this.wellDescription = [];
	for(var wellIdxX=1; wellIdxX<=24; wellIdxX++)
	for(var wellIdxZ=1; wellIdxZ<=16; wellIdxZ++)
	{
		var rowString = 
			["A","B","C","D","E","F","G","H",
			 "I","J","K","L","M","N","O","P"]
			[wellIdxZ-1];		
		var columnString = wellIdxX.toString();
		
		var myLabel="";
		var myLabelOffsetX;
		var myLabelOffsetZ;
		if(wellIdxX==1 && wellIdxZ==1) {  //IH140819 special case for 'A1'
			myLabel='A1';
			myLabelOffsetX = +0.0075;
			myLabelOffsetZ = +0.0035;
		}
		else
		if(wellIdxX==1) {
			myLabel=rowString;
			myLabelOffsetX = +0.0075;
			myLabelOffsetZ = -0.0030;
		}
		else
		if(wellIdxZ==1) {		
			myLabel=columnString;		
			myLabelOffsetX = +0.0000;
			myLabelOffsetZ = +0.0035;			
		}		
				
		this.wellDescription.push(
			{	
				posX: (-0.050 -0.0045*0.5 + (24-wellIdxX) * 0.0045),  
				posZ: (-0.032 -0.0045*0.5 + (16-wellIdxZ) * 0.0045),  
				wellId: (rowString+columnString),  
				wellExtraClassListString: 
					("Column"+columnString+" "+"Row"+rowString+" " +"Well"+rowString+columnString),
				shape: this.wellShape,  
				radius: this.wellRadius, 
				radiusX: this.wellRadius, 
				radiusZ: this.wellRadius, 				
				label: myLabel, 
				labelOffsetX: myLabelOffsetX, 
				labelOffsetZ: myLabelOffsetZ				
			}		
		)
	}
	
}


//---------------------------------------------------------------------------------
// 	C o r n i n g 3 8 4 
//

Corning384.prototype = Object.create(Plate384.prototype);
Corning384.prototype.constructor = Corning384;

function Corning384(id,parentGroupId,deck,locationId,details) {
	
	this.wellRadius =					0.0015;
	this.wellShape =					"INDEXEDFACESET";
	
	Plate384.call(this,id,parentGroupId,deck,locationId,this.wellShape,this.wellRadius,details);
	
	this.lowerBoxSizeX =				0.127;
	this.lowerBoxHeight =				0.002;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.125;
	this.upperBoxHeight =				0.010;
	this.upperBoxSizeZ =				0.083;
		
	this.wellHeight = 					0.006;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
	

	this.Create();	
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);		
		
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());		
}

Corning384.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL " + this.id));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.7 0.7 0.7");
			material[i].setAttribute("specularColor","0.7 0.7 0.7");
			material[i].setAttribute("emissiveColor","0 0.01 0.09");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}
}



