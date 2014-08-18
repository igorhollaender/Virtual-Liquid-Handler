//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ P l a t e 3 8 4 . j s
//
//	  General model template for an ANSI/SLAS-format 384-well consumable.
//	  and its particular instances.
//
//	  Last revision: IH 2014-08-05
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// 	C o r n i n g 3 8 4 
//

function Corning384(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
	
	this.plate	= new Plate384(id,parentGroupId);
	this.plate.lowerBoxHeight =				0.002;
	this.plate.upperBoxHeight =				0.010;
	this.plate.wellHeight = 				0.006;	
	this.plate.wellOffsetFromPlateBottom = 	this.plate.upperBoxHeight - this.plate.wellHeight;
	this.plate.wellRadius	=				0.0015;
	
	if(!(details==null))
	{
		if("wellShape" in details)			{this.plate.wellShape			=		details.wellShape;}
		if("columnShownTo" in details)		{this.plate.columnShownTo		=		details.columnShownTo;}
	}
	
	this.plate.Create();	
	this.SetDefaultMaterialBodyAndWell();	
	this.plate.SetWellContentEmpty();
	this.plate.PlaceOnDeck(deck,locationId);		

	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.plate.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.plate.wellOffsetFromPlateBottom.toString());	
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

//---------------------------------------------------------------------------------
// 	P l a t e 3 8 4
//

function Plate384(id,parentGroupId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	this.lowerBoxHeight =				0.002;
	this.upperBoxHeight =				0.010;
	this.wellHeight = 					0.006;		
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
	this.wellRadius	=					0.001;
	
	// simplification 
	this.wellShape="INDEXEDFACESET";   // can be "CYLINDER" or "BOX" or "INDEXEDFACESET"
	this.columnShownFrom = 0;	// only 0 implemented
	this.columnShownTo = 23;		// set to 23 for full display, set to smaller number for simplified display
	this.rowShownFrom = 0;		// only 0 implemented
	this.rowShownTo = 15;		// set to 15 for full display
	
	if(!(details==null))
	{
		if("wellShape" in details)			{this.wellShape			=		details.wellShape;}
		if("columnShownTo" in details)		{this.columnShownTo		=		details.columnShownTo;}
	}
		
	//this.Create();  // Create() has to be called in the instances
	//this.SetDefaultMaterialBodyAndWell();	
	//this.SetWellContentEmpty();
}

Plate384.prototype.Create = function() {

	transform = document.createElement("Transform");
	transform.setAttribute("DEF", getUniqueId() );  // unique id
	
			transform.classList.add(this.id); 			
			transform.classList.add("Labware"); 
			transform.classList.add("TRANSFORM"); 			
	
	group = document.createElement("Group");
	transform.appendChild(group);	
	group.setAttribute("id", this.id);
	
	// custom attributes ("member objects") are hosted in this group
	
	group.setAttribute("actualLocationOnDeck", this.actualLocationOnDeck );  
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
		box.setAttribute("size","0.127 " + this.lowerBoxHeight.toString() + " 0.085" );
				
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
		box.setAttribute("size","0.125 " + this.upperBoxHeight.toString() +" 0.083");
		
	shape = document.createElement("Shape");	
	transform = document.createElement("Transform");
			
		transform.setAttribute("translation","0 " + (this.upperBoxHeight*0.5).toString() + " 0 ");	
				
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
	
	var columnLabelDone = [];
	var rowLabelDone = [];
		
	for(wellIdxX=0;wellIdxX<this.columnShownTo+1; wellIdxX++)
	for(wellIdxZ=0;wellIdxZ<this.rowShownTo+1; wellIdxZ++)
	
	{							
		wellGroup = document.createElement("Group");
				
		rowString=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"]
		.slice(this.rowShownFrom,this.rowShownTo+1)[wellIdxZ];
		columnString=(wellIdxX+1).toString();							
		
		// wells ...
													
		wellPosX = -0.050 -0.0045*0.5 + (23-wellIdxX) * 0.0045;
		wellPosY =  this.wellHeight*0.5 + this.wellOffsetFromPlateBottom;		
		wellPosZ = -0.032 -0.0045*0.5 + (15-wellIdxZ) * 0.0045;						
		
		translationString = wellPosX.toString() + " " + wellPosY.toString() + " " + wellPosZ.toString();
		
		
		switch(this.wellShape) {
		case "INDEXEDFACESET":
			cylinder = document.createElement("IndexedFaceSet");
			cylinder.setAttribute("solid","false");										
			cylinder.setAttribute("creaseAngle","3.14");										
			cylinder.setAttribute("coordIndex",
				"0 1 5 4 -1 " + 
				"1 2 6 5 -1 " +
				"2 3 7 6 -1 " +
				"3 0 4 7 -1 " +
				"0 1 2 3 -1 " +
				"");  
			var coordinates = document.createElement("Coordinate");
			coordinates.setAttribute("point",
				/* point 0 */  	(+this.wellRadius).toString() +  " "  + 
								(-this.wellHeight*0.5).toString() +  " "  +
								(-this.wellRadius).toString() +  " "  +
				/* point 1 */  	(-this.wellRadius).toString() +  " "  + 
								(-this.wellHeight*0.5).toString() +  " "  +
								(-this.wellRadius).toString() +  " "  +
				/* point 2 */  	(-this.wellRadius).toString() +  " "  + 
								(-this.wellHeight*0.5).toString() +  " "  +
								(+this.wellRadius).toString() +  " "  +
				/* point 3 */  	(+this.wellRadius).toString() +  " "  + 
								(-this.wellHeight*0.5).toString() +  " "  +
								(+this.wellRadius).toString() +  " "  +
				/* point 4 */  	(+this.wellRadius).toString() +  " "  + 
								(+this.wellHeight*0.5).toString() +  " "  +
								(-this.wellRadius).toString() +  " "  +
				/* point 5 */  	(-this.wellRadius).toString() +  " "  + 
								(+this.wellHeight*0.5).toString() +  " "  +
								(-this.wellRadius).toString() +  " "  +
				/* point 6 */  	(-this.wellRadius).toString() +  " "  + 
								(+this.wellHeight*0.5).toString() +  " "  +
								(+this.wellRadius).toString() +  " "  +
				/* point 7 */  	(+this.wellRadius).toString() +  " "  + 
								(+this.wellHeight*0.5).toString() +  " "  +
								(+this.wellRadius).toString() +  " "  +								
								""
				);			
			cylinder.appendChild(coordinates);	
			break;
		case "BOX":
			//IH140728 for legacy reasons, the variable is still called 'cylinder'
			cylinder = document.createElement("Box");
			
			cylinder.setAttribute("size",
					(this.wellRadius*2).toString() + " " +
					this.wellHeight.toString() + " " +
					(this.wellRadius*2).toString() );			
			cylinder.setAttribute("solid","false");				
			cylinder.setAttribute("wellOffset",this.wellOffsetFromPlateBottom.toString());		// this is a custom attribute
			//IH140710 TODO Obsolete??? (Check)
			break;
		default:
		case "CYLINDER":
			
			cylinder = document.createElement("Cylinder");
			cylinder.setAttribute("height",this.wellHeight.toString());
			cylinder.setAttribute("radius",this.wellRadius.toString());
			cylinder.setAttribute("solid","false");	
			cylinder.setAttribute("top","false");
			cylinder.setAttribute("bottom","true");						
			cylinder.setAttribute("wellOffset",this.wellOffsetFromPlateBottom.toString());		// this is a custom attribute
			//IH140710 TODO Obsolete??? (Check)
			break;
		}	
		
					
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform = document.createElement("Transform");
		transform.setAttribute("translation", translationString);	
											
			material.classList.add(this.id); 			
			material.classList.add("Well"); 
			material.classList.add("MATERIAL"); 
								
		detailsGroup.appendChild(transform);
		transform.appendChild(wellGroup);
		wellGroup.appendChild(shape);
		shape.appendChild(cylinder);
		shape.appendChild(appearance);
		appearance.appendChild(material);
		
		// liquid model ...
		
		switch(this.wellShape) {
		//IH140728 for legacy reasons, the variable is still called 'cylinder'
		// and the class is also still called 'CYLINDER'
		case "BOX":
		case "INDEXEDFACESET":
			cylinder = document.createElement("Box");					
			cylinder.setAttribute("size",
				(this.wellRadius*2*1.05).toString() + " 2 " + 
				(this.wellRadius*2*1.05).toString()
				);
			cylinder.setAttribute("solid","true");
			break;
			
		default:
		case "CYLINDER":
			cylinder = document.createElement("Cylinder");					
						
			cylinder.setAttribute("radius",(this.wellRadius*1.05).toString());
			cylinder.setAttribute("solid","true");
			cylinder.setAttribute("top","true");
			cylinder.setAttribute("bottom","true");
		}
		
		cylinder.classList.add(this.id);		
		cylinder.classList.add("Row" + rowString); 
		cylinder.classList.add("Column" + columnString); 		
		cylinder.classList.add("CYLINDER");			
		cylinder.classList.add("Liquid");						
		
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform1 = document.createElement("Transform");		
		transform1.setAttribute("DEF",getUniqueId());		
		
			transform1.classList.add(this.id); 
			transform1.classList.add("Row" + rowString); 
			transform1.classList.add("Column" + columnString); 
			transform1.classList.add("Liquid"); 
			transform1.classList.add("TRANSFORM"); 
									
			material.classList.add(this.id); 
			material.classList.add("Row" + rowString); 
			material.classList.add("Column" + columnString); 
			material.classList.add("Liquid"); 
			material.classList.add("MATERIAL"); 		
							
		wellGroup.appendChild(transform1);
		transform1.appendChild(shape);		
		shape.appendChild(cylinder);
		shape.appendChild(appearance);
		appearance.appendChild(material);
	
		// labels ...																	
		
		for(i=0;i<2;i++) 
		// we have to execute the loop twice to make sure 
		// all columns and rows will be rendered
								
		{
		hasToDoRowLabel=0;
		if(rowLabelDone.indexOf(wellIdxZ)==-1)
		{
			// row labels
			labelPosX =  0.057 ;
			labelPosY =  0;
			labelPosZ = -0.0353  + (15-wellIdxZ) * 0.0045;																
			labelString=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"].
			slice(this.rowShownFrom,this.rowShownTo+1)[wellIdxZ];
			hasToDoRowLabel=1;
		}
		hasToDoColumnLabel=0;
		if(columnLabelDone.indexOf(wellIdxX)==-1)
		{						
			labelPosX = -0.050 -0.0045*0.5 + (23-wellIdxX) * 0.0045;
			labelPosY =  0;
			labelPosZ =  0.036 ;																		
			labelString=(wellIdxX+1).toString();							
			hasToDoColumnLabel=1;
		}											
		
		if(hasToDoRowLabel==1 || hasToDoColumnLabel==1)
		{												
										
			if(hasToDoColumnLabel==1) 
				columnLabelDone.push(wellIdxX);	
			else
			if(hasToDoRowLabel==1) 
				rowLabelDone.push(wellIdxZ);	
			
			translationString = labelPosX.toString() + " " + labelPosY.toString() + " " + labelPosZ.toString();
									
			fontStyle = document.createElement("FontStyle");						
			text = document.createElement("Text");										
			material = document.createElement("Material");
			appearance = document.createElement("Appearance");
			shape = document.createElement("Shape");						
			transform1 = document.createElement("Transform");
			transform2 = document.createElement("Transform");
			transform1.setAttribute("translation", translationString);
			transform1.setAttribute("rotation", "0 1 0 3.1416");			
									
			transform2.setAttribute("translation","0 ".concat(this.upperBoxHeight.toString()," 0"));
			transform2.setAttribute("rotation", "1 0 0 -1.5708");
			transform2.setAttribute("scale", "0.004 0.004 0.004");
			material.setAttribute("diffuseColor","0.2 0.2 0.2");
			
			text.setAttribute("string",labelString);
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
		}
												
	}
}

Plate384.prototype.SetWellContentEmpty = function() {		
		tthis = this;
		["1","2","3","4","5","6","7","8","9","10","11","12",
		"13","14","15","16","17","18","19","20","21","22","23","24"]
		.slice(tthis.columnShownFrom,tthis.columnShownTo+1)
		 .forEach(function(eC,iC,aC){
			["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"]
			.slice(tthis.rowShownFrom,tthis.rowShownTo+1)
			.forEach(function(eR,iR,aR){					
					
					well =  document.getElementsByClassName("Liquid CYLINDER " + " Row"+eR + " Column"+eC + " " + tthis.id).item(0);
					well.setAttribute("wellContent_relativeVolume","0");
					well.setAttribute("wellContent_liquidClass","");
					
					transform = document.getElementsByClassName("Liquid TRANSFORM " + " Row"+eR + " Column"+eC + " " + tthis.id).item(0);
					transform.setAttribute("scale","1 0 1");				transform.setAttribute("translation", "0 " + (tthis.wellHeight*(-0.5)).toString() + " 0")			

					material = document.getElementsByClassName("Liquid MATERIAL " + " Row"+eR + " Column"+eC + " " + tthis.id).item(0);			
					SetMaterialLiquid(material,"LiquidClassEmptyWells");							
	
			});					
			});					
}

Plate384.prototype.PlaceOnDeck = function(deck,locationId) {
		document.getElementsByClassName("Labware TRANSFORM ".concat(this.id)).item(0)						
						.setAttribute("translation",	SFVec3fToString(deck.Location[locationId]));					
		document.getElementsByClassName("Labware GROUP " + this.id).item(0).setAttribute("actualLocationOnDeck",locationId);
}
