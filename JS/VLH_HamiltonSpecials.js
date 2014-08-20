//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ H a m i l t o n S p e c i a l s. j s
//
//	  Special components used in the Hamilton Star liquid handlers
//
//	  Last revision: IH 2014-08-20
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//  TODO
//

//---------------------------------------------------------------------------------
// 	T u b e C a r r i e r 3 2 
//

//IH140820 In HTML, this file (VLH_HamiltonSpecials.js) must be included AFTER VLH_Plate.js,
// in order to see the definition of UniversalPlate

TubeCarrier32.prototype = Object.create(UniversalPlate.prototype);
TubeCarrier32.prototype.constructor = TubeCarrier32;

function TubeCarrier32(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	UniversalPlate.call(this,id,parentGroupId,details);	
			
	this.lowerBoxSizeX =				0.030;
	this.lowerBoxHeight =				0.010;
	this.lowerBoxSizeZ =				0.490;
	
	this.upperBoxSizeX =				0.025;
	this.upperBoxHeight =				0.070;
	this.upperBoxSizeZ =				0.485;
	
	this.wellHeight = 					0.035;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
				
	this.wellDescription = [];
	for(var wellIdxZ=1; wellIdxZ<=32; wellIdxZ++)
	{
		this.wellDescription.push(
			{	posX: 0, 
				posZ: (-15.5*0.015 + (32-wellIdxZ) * 0.015),  
				wellId: (wellIdxZ.toString()),  
				shape: 'CYLINDER',  
				radius: 0.005, 
				label:(wellIdxZ.toString()), 
				labelOffsetX: 0.01, 
				labelOffsetZ: -0.004
			}		
		)
	}
		
	if(!(details==null))
	{
		if("wellsToShowString" in details)			{this.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

TubeCarrier32.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL " + this.id));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.8 0.8 0.2");
			material[i].setAttribute("specularColor","0.8 0.8 0.2");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}

}

//---------------------------------------------------------------------------------
// 	T r o u g h C a r r i e r 5
//

TroughCarrier5.prototype = Object.create(UniversalPlate.prototype);
TroughCarrier5.prototype.constructor = TroughCarrier5;

function TroughCarrier5(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	UniversalPlate.call(this,id,parentGroupId,details);	
			
	this.lowerBoxSizeX =				0.030;
	this.lowerBoxHeight =				0.010;
	this.lowerBoxSizeZ =				0.490;
	
	this.upperBoxSizeX =				0.025;
	this.upperBoxHeight =				0.070;
	this.upperBoxSizeZ =				0.485;
	
	this.wellHeight = 				0.055;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;
				
	this.wellDescription =
	[
	{posX: 0, 	posZ: (0.100*(+2.0)),  wellId: '1', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'1', labelOffsetX: 0.01, labelOffsetZ:  -0.009},	
	{posX: 0, 	posZ: (0.100*(+1.0)),  wellId: '2', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'2', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(+0.0)),  wellId: '3', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'3', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(-1.0)),  wellId: '4', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'4', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(-2.0)),  wellId: '5', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'5', labelOffsetX: 0.01, labelOffsetZ:  -0.009}
	];
		
	if(!(details==null))
	{
		if("wellsToShowString" in details)			{this.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

TroughCarrier5.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL " + this.id));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.8 0.4 0.2");
			material[i].setAttribute("specularColor","0.8 0.4 0.2");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}
}


//---------------------------------------------------------------------------------
// 	C o o l T u b e M o d u l e
//

CoolTubeModule.prototype = Object.create(UniversalPlate.prototype);
CoolTubeModule.prototype.constructor = CoolTubeModule;

function CoolTubeModule(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
			
	UniversalPlate.call(this,id,parentGroupId,details);	
	
	this.lowerBoxSizeX =				0.115;
	this.lowerBoxHeight =				0.010;
	this.lowerBoxSizeZ =				0.085;
	
	this.upperBoxSizeX =				0.110;
	this.upperBoxHeight =				0.040;
	this.upperBoxSizeZ =				0.080;
	
	this.wellHeight = 				0.035;	
	this.wellOffsetFromPlateBottom = 	this.upperBoxHeight - this.wellHeight;

	this.wellDescription =
	[
	{posX: (0.015*(+2.5)), 	posZ: (0.013*(+2.5)),  wellId: '1', 	shape: 'CYLINDER',  	radius: 0.005, label:'1', labelOffsetX: 0.01, labelOffsetZ:  -0.003},	
	{posX: (0.015*(+1.5)), 	posZ: (0.013*(+2.5)),  wellId: '2', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(+0.5)), 	posZ: (0.013*(+2.5)),  wellId: '3', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-0.5)), 	posZ: (0.013*(+2.5)),  wellId: '4', 	shape: 'CYLINDER',  	radius: 0.005}, 
	{posX: (0.015*(-1.5)), 	posZ: (0.013*(+2.5)),  wellId: '5', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-2.5)), 	posZ: (0.013*(+2.5)),  wellId: '6', 	shape: 'CYLINDER',  	radius: 0.005, label:'6', labelOffsetX: -0.01, labelOffsetZ:  -0.003},		
	
	{posX: (0.015*(+2.5)), 	posZ: (0.013*(+0.5)),  wellId: '7', 	shape: 'CYLINDER',  	radius: 0.005, label:'7', labelOffsetX: 0.01, labelOffsetZ:  -0.003},		
	{posX: (0.015*(+1.5)), 	posZ: (0.013*(+0.5)),  wellId: '8', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(+0.5)), 	posZ: (0.013*(+0.5)),  wellId: '9', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-0.5)), 	posZ: (0.013*(+0.5)),  wellId: '10', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-1.5)), 	posZ: (0.013*(+0.5)),  wellId: '11', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-2.5)), 	posZ: (0.013*(+0.5)),  wellId: '12', 	shape: 'CYLINDER',  	radius: 0.005, label:'12', labelOffsetX: -0.01, labelOffsetZ:  -0.003},	
	
	{posX: (0.015*(+2.5)), 	posZ: (0.013*(-0.5)),  wellId: '13', 	shape: 'CYLINDER',  	radius: 0.005, label:'13', labelOffsetX: 0.01, labelOffsetZ:  -0.003},	
	{posX: (0.015*(+1.5)), 	posZ: (0.013*(-0.5)),  wellId: '14', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(+0.5)), 	posZ: (0.013*(-0.5)),  wellId: '15', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-0.5)), 	posZ: (0.013*(-0.5)),  wellId: '16', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-1.5)), 	posZ: (0.013*(-0.5)),  wellId: '17', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-2.5)), 	posZ: (0.013*(-0.5)),  wellId: '18', 	shape: 'CYLINDER',  	radius: 0.005, label:'18', labelOffsetX: -0.01, labelOffsetZ:  -0.003},	
	
	{posX: (0.015*(+2.5)), 	posZ: (0.013*(-2.5)),  wellId: '19', 	shape: 'CYLINDER',  	radius: 0.005, label:'19', labelOffsetX: 0.01, labelOffsetZ:  -0.003},	
	{posX: (0.015*(+1.5)), 	posZ: (0.013*(-2.5)),  wellId: '20', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(+0.5)), 	posZ: (0.013*(-2.5)),  wellId: '21', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-0.5)), 	posZ: (0.013*(-2.5)),  wellId: '22', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-1.5)), 	posZ: (0.013*(-2.5)),  wellId: '23', 	shape: 'CYLINDER',  	radius: 0.005},	
	{posX: (0.015*(-2.5)), 	posZ: (0.013*(-2.5)),  wellId: '24', 	shape: 'CYLINDER',  	radius: 0.005, label:'24', labelOffsetX: -0.01, labelOffsetZ:  -0.003}
	];
		
	if(!(details==null))
	{
		if("wellsToShowString" in details)			{this.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.SetWellContentEmpty();
	this.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.wellOffsetFromPlateBottom.toString());	
}

CoolTubeModule.prototype.SetDefaultMaterialBodyAndWell = function() {
		
		var materialBody = Array.prototype.slice.call(
			document.getElementsByClassName("Body MATERIAL " + this.id)); 
		var materialWell = Array.prototype.slice.call(
			document.getElementsByClassName("Well MATERIAL " + this.id));
		var material = materialBody.concat(materialWell);	
		
		i = material.length;
		while(i--)
		{
			material[i].setAttribute("diffuseColor","0.8 0.8 0.2");
			material[i].setAttribute("specularColor","0.8 0.8 0.2");
			material[i].setAttribute("emissiveColor","0 0.01 0.01");
			material[i].setAttribute("ambientIntensity","0.333");
			material[i].setAttribute("shineness","0.1");
			material[i].setAttribute("transparency","0.5");			
		}
}

