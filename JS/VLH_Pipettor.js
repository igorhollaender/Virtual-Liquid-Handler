//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V H L _ P i p e t t o r . j s
//
//
//	  Last revision: IH 2014-08-22
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// 	P i p e t t o r 9 6
//

Pipettor96.prototype = Object.create(Plate96.prototype);
Pipettor96.prototype.constructor = Pipettor96;

function Pipettor96(id,parentGroupId,deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ,details) {
	
	this.wellRadius	=					0.003;
	this.wellShape	=					"CYLINDER";   	
		
	Plate96.call(this,id,parentGroupId,deck,locationId,'Pipettor',this.wellShape,this.wellRadius,details);
	
	this.lowerBoxSizeX =				0.0;
	this.lowerBoxHeight =				0.0;
	this.lowerBoxSizeZ =				0.0;
	
	this.upperBoxSizeX =				0.108;
	this.upperBoxHeight =				0.001;
	this.upperBoxSizeZ =				0.072;
	this.upperBoxElevation =			0.095;
		
	this.wellHeight = 					0.05;	
	this.wellOffsetFromPlateBottom = 	0.07;
	
	this.Create();	
	this.SetDefaultMaterialBodyAndWell();		
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);			
	EjectTips(this.id);	
	this.SetPosition(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ);
	
	var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + id).item(0);
	pipettorGroup.setAttribute("wellHeight", this.wellHeight.toString());
	pipettorGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
	pipettorGroup.setAttribute("actualTipColumns", "0");		
	
	var liquidProperties = document.getElementsByClassName("Liquid CYLINDER " + id).item(0);
	liquidProperties.setAttribute("tipContent_relativeVolume", "0");			
}

Pipettor96.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL ".concat(this.id))); 					
		
		var i = materialBody.length;
		while(i--)
		{			
			materialBody[i].setAttribute("diffuseColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("specularColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.04");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.5");
			materialBody[i].setAttribute("transparency","0.8");			
			
		}
		
		Array.prototype.slice.call(document.getElementsByClassName("Well MATERIAL CYLINDER "  + this.id))
			.forEach(function(e,i,a) {				
	
			//IH140711 we use SetMaterialLiquid here although we actually  paint the tips
			SetMaterialLiquid(e,"LiquidClassEmptyTips");
		});
}

Pipettor96.prototype.SetPosition = function(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ) {

		var translation = new x3dom.fields.SFVec3f(
				deck.Location[locationId].x +  locationOffsetX,								
				this.defaultElevation +  locationOffsetY,  // location elevation of the pipettor is constant
				deck.Location[locationId].z +  locationOffsetZ);
			
		document.getElementsByClassName("Pipettor TRANSFORM " + this.id).item(0)						
						.setAttribute("translation",	SFVec3fToString(translation));					
		
		var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + this.id).item(0);
		
		pipettorGroup.setAttribute("actualLocationOnDeck",locationId);		
		pipettorGroup.setAttribute("actualLocationOffset",
				SFVec3fToString(new x3dom.fields.SFVec3f(
					locationOffsetX, 
					this.defaultElevation +locationOffsetY,
					locationOffsetZ)));  
}


//---------------------------------------------------------------------------------
// 	P i p e t t o r 8
//

Pipettor8.prototype = Object.create(UniversalPlate.prototype);
Pipettor8.prototype.constructor = Pipettor96;

function Pipettor8(id,parentGroupId,deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ,details) {
	
	this.wellRadius	=					0.003;
	this.wellShape	=					"CYLINDER";   	
		
	UniversalPlate.call(this,id,parentGroupId,'Pipettor',details);
	
	this.lowerBoxSizeX =				0.0;
	this.lowerBoxHeight =				0.0;
	this.lowerBoxSizeZ =				0.0;
	
	this.upperBoxSizeX =				0.108;
	this.upperBoxHeight =				0.001;
	this.upperBoxSizeZ =				0.072;
	this.upperBoxElevation =			0.095;
		
	this.wellHeight = 					0.05;	
	this.wellOffsetFromPlateBottom = 	0.07;
	
	this.wellDescription = [];	
	for(var wellIdxZ=1; wellIdxZ<=8; wellIdxZ++)
	{
		var rowString = ["A","B","C","D","E","F","G","H"][wellIdxZ-1];					
		this.wellDescription.push(
			{	
				posX: (-0.050 + (12-1) * 0.009),  
				posZ: (-0.032 + (8-wellIdxZ) * 0.009),  
				wellId: rowString,  
				wellExtraClassListString: ("Well"+rowString),
				shape: this.wellShape,  
				radius: this.wellRadius, 
				radiusX: this.wellRadius, 
				radiusZ: this.wellRadius 								
			}		
		)
	}
	
	this.Create();	
	this.SetDefaultMaterialBodyAndWell();		
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);			
	EjectTips(this.id);	
	this.SetPosition(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ);
	
	var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + id).item(0);
	pipettorGroup.setAttribute("wellHeight", this.wellHeight.toString());
	pipettorGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
	pipettorGroup.setAttribute("actualTipColumns", "0");	//IH140822 TODO this needs to be adapted for this pipettor type
	
	var liquidProperties = document.getElementsByClassName("Liquid CYLINDER " + id).item(0);
	liquidProperties.setAttribute("tipContent_relativeVolume", "0");			
}

Pipettor8.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL ".concat(this.id))); 					
		
		var i = materialBody.length;
		while(i--)
		{			
			materialBody[i].setAttribute("diffuseColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("specularColor","0.9 0.9 0.2");
			materialBody[i].setAttribute("emissiveColor","0 0.01 0.04");
			materialBody[i].setAttribute("ambientIntensity","0.333");
			materialBody[i].setAttribute("shineness","0.5");
			materialBody[i].setAttribute("transparency","0.8");			
			
		}
		
		Array.prototype.slice.call(document.getElementsByClassName("Well MATERIAL CYLINDER "  + this.id))
			.forEach(function(e,i,a) {				
	
			//IH140711 we use SetMaterialLiquid here although we actually  paint the tips
			SetMaterialLiquid(e,"LiquidClassEmptyTips");
		});
}

Pipettor8.prototype.SetPosition = function(deck,locationId,locationOffsetX,locationOffsetY,locationOffsetZ) {

		var translation = new x3dom.fields.SFVec3f(
				deck.Location[locationId].x +  locationOffsetX,								
				this.defaultElevation +  locationOffsetY,  // location elevation of the pipettor is constant
				deck.Location[locationId].z +  locationOffsetZ);
			
		document.getElementsByClassName("Pipettor TRANSFORM " + this.id).item(0)						
						.setAttribute("translation",	SFVec3fToString(translation));					
		
		var pipettorGroup = document.getElementsByClassName("Pipettor GROUP " + this.id).item(0);
		
		pipettorGroup.setAttribute("actualLocationOnDeck",locationId);		
		pipettorGroup.setAttribute("actualLocationOffset",
				SFVec3fToString(new x3dom.fields.SFVec3f(
					locationOffsetX, 
					this.defaultElevation +locationOffsetY,
					locationOffsetZ)));  
}


