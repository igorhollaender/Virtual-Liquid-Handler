//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V H L _ P i p e t t o r . j s
//
//
//	  Last revision: IH 2014-07-30
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// 	P i p e t t o r 9 6
//

function Pipettor96(id,parentGroupId,deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ,details) {
	
	this.id = id;
	this.parentGroupId = parentGroupId;
	this.tipLength = 0.05;
	this.tipRadius = 0.003;	
	this.defaultElevation  = 0.035;
							
	
	// simplification 
	this.tipShape="CYLINDER";   // can be "CYLINDER" or "BOX"
	this.columnShownFrom = 0;	// only 0 implemented
	this.columnShownTo = 11;	// set to 11 for full display, set to smaller number for simplified display
	this.rowShownFrom = 0;		// only 0 implemented
	this.rowShownTo = 7;		// set to 7 for full display
							
	if(!(details==null))
	{
		if("tipShape" in details)			{this.wellShape			=		details.wellShape;}
		if("columnShownTo" in details)		{this.columnShownTo		=		details.columnShownTo;}
	}
							
	this.Create();  	
	this.SetDefaultMaterialBody();	
	this.SetDefaultMaterialTip();	
	this.SetTipContentEmpty();
	EjectTips(this.id);
	this.SetPosition(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ);	
}

Pipettor96.prototype.Create = function() {

	transform = document.createElement("Transform");
	transform.setAttribute("DEF", getUniqueId() );
	
			transform.classList.add(this.id); 			
			transform.classList.add("Pipettor"); 
			transform.classList.add("TRANSFORM"); 			
	
	group = document.createElement("Group");
	transform.appendChild(group);	
	group.setAttribute("id", this.id);
			
	// custom attributes ("member objects") are hosted in this group
	
	group.setAttribute("actualLocationOnDeck", this.actualLocationOnDeck );  	
	group.setAttribute("tipLength", this.tipLength.toString() );  	
	group.setAttribute("actualLocationOffset","0.0 " + this.defaultElevation.toString() + " 0.0" );  		
	
			group.classList.add(this.id); 			
			group.classList.add("Pipettor"); 
			group.classList.add("GROUP"); 			
			group.classList.add("Details"); //IH140716 the entire pipettor is regarded as 'Details' to save triangles			
	
	document.getElementById(this.parentGroupId).appendChild(transform);		
		
	// box  ...
	
	material = document.createElement("Material");
			
		material.classList.add(this.id);
		material.classList.add("Pipettor"); 		
		material.classList.add("Body"); 
		material.classList.add("MATERIAL"); 				
		
	appearance = document.createElement("Appearance");
	box = document.createElement("Box");
	
		box.setAttribute("solid","true");	
		box.setAttribute("ccw","false");   		
		box.setAttribute("size","0.108 0.001 0.072" );
				
	shape = document.createElement("Shape");	
	transform = document.createElement("Transform");
			
		transform.setAttribute("translation","0 " + (this.defaultElevation+this.tipLength*0.5).toString() +" 0 ");	
		
	group.appendChild(transform);	
	transform.appendChild(shape);
	shape.appendChild(box);
	shape.appendChild(appearance);
	appearance.appendChild(material);	
			
	
	// Tip groups   ...
					
	for(tipIdxX=0;tipIdxX<this.columnShownTo+1; tipIdxX++)
	for(tipIdxZ=0;tipIdxZ<this.rowShownTo+1; tipIdxZ++)
	{						
	
		tipGroup = document.createElement("Group");
							
		rowString=["A","B","C","D","E","F","G","H"]
		.slice(this.rowShownFrom,this.rowShownTo+1)[tipIdxZ];
		columnString=(tipIdxX+1).toString();							
		
			tipGroup.classList.add(this.id); 			
			tipGroup.classList.add("Tip"); 			
			tipGroup.classList.add("GROUP"); 	
			tipGroup.classList.add("Row" + rowString); 
			tipGroup.classList.add("Column" + columnString); 			
		
		// tips ...
													
		tipPosX = -0.050 + (11-tipIdxX) * 0.009;
		tipPosY =  this.tipLength*0.5 + this.defaultElevation;		
		tipPosZ = -0.032 + (7-tipIdxZ) * 0.009;						
		
		translationString = tipPosX.toString() + " " + tipPosY.toString() + " " + tipPosZ.toString();
		
		
		switch(this.tipShape) {
		case "BOX":
			//IH140728 for legacy reasons, the variable is still called 'cylinder'
			cylinder = document.createElement("Box");
			cylinder.setAttribute("size",
					(this.tipRadius*2).toString() + " " +
					this.tipLength.toString() + " " +
					(this.tipRadius*2).toString() );			
			cylinder.setAttribute("solid","false");							
			break;
		default:
		case "CYLINDER":
			cylinder = document.createElement("Cylinder");
			cylinder.setAttribute("height",this.tipLength.toString());
			cylinder.setAttribute("radius",this.tipRadius.toString());
			cylinder.setAttribute("solid","false");	
			cylinder.setAttribute("top","false");
			cylinder.setAttribute("bottom","false");									
			break;
		}			
		
					
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform = document.createElement("Transform");
		transform.setAttribute("translation", translationString);		
		
			transform.classList.add(this.id); 			
			transform.classList.add("Tip"); 			
			transform.classList.add("TRANSFORM"); 	
			transform.classList.add("Row" + rowString); 
			transform.classList.add("Column" + columnString); 			
								
			material.classList.add(this.id); 			
			material.classList.add("Tip"); 
			material.classList.add("MATERIAL"); 
								
		group.appendChild(transform);
		transform.appendChild(tipGroup);
		tipGroup.appendChild(shape);
		shape.appendChild(cylinder);
		shape.appendChild(appearance);
		appearance.appendChild(material);
		
		// liquid ...
		
		switch(this.tipShape) {
		//IH140728 for legacy reasons, the variable is still called 'cylinder'
		// and the class is also still called 'CYLINDER'
		case "BOX":
			cylinder = document.createElement("Box");
			cylinder.setAttribute("size",
				(this.tipRadius*2*1.05).toString() + " 2 " + 
				(this.tipRadius*2*1.05).toString()
				);
			cylinder.setAttribute("solid","true");
			break;
			
		default:
		case "CYLINDER":
			cylinder = document.createElement("Cylinder");
			cylinder.setAttribute("radius",(this.tipRadius*1.05).toString());
			cylinder.setAttribute("solid","true");
			cylinder.setAttribute("top","true");
			cylinder.setAttribute("bottom","true");
		}
		
		cylinder.classList.add(this.id);		
		cylinder.classList.add("Row" + rowString); 
		cylinder.classList.add("Column" + columnString); 		
		cylinder.classList.add("CYLINDER");			
		cylinder.classList.add("LiquidInTip");					
		
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		transform1 = document.createElement("Transform");		
		transform1.setAttribute("DEF",getUniqueId());		
		
			transform1.classList.add(this.id); 
			transform1.classList.add("Row" + rowString); 
			transform1.classList.add("Column" + columnString); 
			transform1.classList.add("LiquidInTip"); 
			transform1.classList.add("TRANSFORM"); 
						
			material.classList.add(this.id); 
			material.classList.add("Row" + rowString); 
			material.classList.add("Column" + columnString); 
			material.classList.add("LiquidInTip"); 
			material.classList.add("MATERIAL"); 		
							
		tipGroup.appendChild(transform1);
		transform1.appendChild(shape);		
		shape.appendChild(cylinder);
		shape.appendChild(appearance);
		appearance.appendChild(material);											
	}
}

Pipettor96.prototype.SetDefaultMaterialTip = function() {
						
		Array.prototype.slice.call(document.getElementsByClassName("Tip MATERIAL CYLINDER "  + this.id))
			.forEach(function(e,i,a) {				
	
			//IH140711 we use SetMaterialLiquid here although we actually  paint the tips
			SetMaterialLiquid(e,"LiquidClassEmptyTips");
		});
}

Pipettor96.prototype.SetDefaultMaterialBody = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Pipettor Body MATERIAL " + this.id)); 		
		
		i = materialBody.length;
		while(i--)
		{
			materialBody[i].setAttribute("diffuseColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("specularColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.04");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.5");
			materialBody[i].setAttribute("transparency","0.8");			
		}
}


Pipettor96.prototype.SetTipContentEmpty = function() {		
		tthis = this;
		["1","2","3","4","5","6","7","8","9","10","11","12"]
		.slice(tthis.columnShownFrom,tthis.columnShownTo+1)
		.forEach(function(eC,iC,aC){
			["A","B","C","D","E","F","G","H"]
			.slice(tthis.rowShownFrom,tthis.rowShownTo+1)
			.forEach(function(eR,iR,aR){					
					
					tip =  document.getElementsByClassName("LiquidInTip CYLINDER " + " Row"+eR + " Column"+eC + " " + tthis.id).item(0);
					tip.setAttribute("tipContent_relativeVolume","0");
					tip.setAttribute("tipContent_liquidClass","");
					
					transform = document.getElementsByClassName("LiquidInTip TRANSFORM " + " Row"+eR + " Column"+eC + " " + tthis.id).item(0);
					transform.setAttribute("scale","1 0 1");	
					transform.setAttribute("translation", "0 " + (tthis.tipLength*(-0.5)).toString() + " 0");					
			});					
			});					
}

Pipettor96.prototype.SetPosition = function(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ) {

		var translation = new x3dom.fields.SFVec3f(
				deck.Location[locationId].x +  locationOffsetX,								
				this.defaultElevation +  locationOffsetY,  // location elevation of the pipettor is constant
				deck.Location[locationId].z +  locationOffsetZ);
			
		document.getElementsByClassName("Pipettor TRANSFORM ".concat(this.id)).item(0)						
						.setAttribute("translation",	SFVec3fToString(translation));					
		
		var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + this.id).item(0);
		
		pipettorGroup.setAttribute("actualLocationOnDeck",locationId);		
		pipettorGroup.setAttribute("actualLocationOffset",
				SFVec3fToString(new x3dom.fields.SFVec3f(
					locationOffsetX, 
					this.defaultElevation +locationOffsetY,
					locationOffsetZ)));  
}
