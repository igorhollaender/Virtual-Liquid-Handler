//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ H a m i l t o n S p e c i a l s. j s
//
//	  Special components used in the Hamilton Star liquid handlers
//
//	  Last revision: IH 2014-08-06
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//  TODO
//


//---------------------------------------------------------------------------------
// 	T u b e C a r r i e r 3 2 
//


function TubeCarrier32(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	this.plate = new UniversalPlate(id,parentGroupId,details);
			
	this.plate.lowerBoxSizeX =				0.030;
	this.plate.lowerBoxHeight =				0.010;
	this.plate.lowerBoxSizeZ =				0.490;
	
	this.plate.upperBoxSizeX =				0.025;
	this.plate.upperBoxHeight =				0.070;
	this.plate.upperBoxSizeZ =				0.485;
	
	this.plate.wellHeight = 				0.035;	
	this.plate.wellOffsetFromPlateBottom = 	this.plate.upperBoxHeight - this.plate.wellHeight;
				
	this.plate.wellDescription = [];
	for(var wellIdxZ=1; wellIdxZ<=32; wellIdxZ++)
	{
		this.plate.wellDescription.push(
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
		if("wellsToShowString" in details)			{this.plate.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.plate.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.plate.SetWellContentEmpty();
	this.plate.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.plate.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.plate.wellOffsetFromPlateBottom.toString());	
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

function TroughCarrier5(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	this.plate = new UniversalPlate(id,parentGroupId,details);
			
	this.plate.lowerBoxSizeX =				0.030;
	this.plate.lowerBoxHeight =				0.010;
	this.plate.lowerBoxSizeZ =				0.490;
	
	this.plate.upperBoxSizeX =				0.025;
	this.plate.upperBoxHeight =				0.070;
	this.plate.upperBoxSizeZ =				0.485;
	
	this.plate.wellHeight = 				0.055;	
	this.plate.wellOffsetFromPlateBottom = 	this.plate.upperBoxHeight - this.plate.wellHeight;
				
	this.plate.wellDescription =
	[
	{posX: 0, 	posZ: (0.100*(+2.0)),  wellId: '1', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'1', labelOffsetX: 0.01, labelOffsetZ:  -0.009},	
	{posX: 0, 	posZ: (0.100*(+1.0)),  wellId: '2', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'2', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(+0.0)),  wellId: '3', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'3', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(-1.0)),  wellId: '4', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'4', labelOffsetX: 0.01, labelOffsetZ:  -0.009},
	{posX: 0, 	posZ: (0.100*(-2.0)),  wellId: '5', 	shape: 'INDEXEDFACESET',  	radiusX: 0.010, radiusZ: 0.040, label:'5', labelOffsetX: 0.01, labelOffsetZ:  -0.009}
	];
		
	if(!(details==null))
	{
		if("wellsToShowString" in details)			{this.plate.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.plate.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.plate.SetWellContentEmpty();
	this.plate.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.plate.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.plate.wellOffsetFromPlateBottom.toString());	
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

function CoolTubeModule(id,parentGroupId,deck,locationId,details) {
	this.id = id;
	this.parentGroupId = parentGroupId;
		
	this.plate = new UniversalPlate(id,parentGroupId,details);
	
	this.plate.lowerBoxSizeX =				0.115;
	this.plate.lowerBoxHeight =				0.010;
	this.plate.lowerBoxSizeZ =				0.085;
	
	this.plate.upperBoxSizeX =				0.110;
	this.plate.upperBoxHeight =				0.040;
	this.plate.upperBoxSizeZ =				0.080;
	
	this.plate.wellHeight = 				0.035;	
	this.plate.wellOffsetFromPlateBottom = 	this.plate.upperBoxHeight - this.plate.wellHeight;

	this.plate.wellDescription =
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
		if("wellsToShowString" in details)			{this.plate.wellsToShowString			=		details.wellsToShowString;}		
	}
						
	this.plate.Create(); 
	this.SetDefaultMaterialBodyAndWell();	
	this.plate.SetWellContentEmpty();
	this.plate.PlaceOnDeck(deck,locationId);
	
	labwareGroup = document.getElementsByClassName("Labware GROUP " + id).item(0);
	labwareGroup.setAttribute("wellHeight", this.plate.wellHeight.toString());
	labwareGroup.setAttribute("wellOffsetFromPlateBottom", this.plate.wellOffsetFromPlateBottom.toString());	
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
		if("wellsToShowString" in details)			{this.wellsToShowString			=		details.wellsToShowString; 
													 this.wellsToShow = this.wellsToShowString.split(" ");}				
	}						
}

UniversalPlate.prototype.Create = function() {

	var transform;
	var material;
	var group;
	var appearance;
	var shape;
	var box;
	var cylinder;
	
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
	
	var tthis=this;
	
	//IH140805 TODO implement filter by 'wellShown'
	
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
		//IH140728 for legacy reasons, the variable is still called 'cylinder'
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
			cylinder.appendChild(coordinates);	
			break;
		case "BOX":
			
			cylinder = document.createElement("Box");
			cylinder.setAttribute("size",
					(e.radiusX*2).toString() + " " +
					tthis.wellHeight.toString() + " " +
					(e.radiusZ*2).toString() );			
			cylinder.setAttribute("solid","false");										
			
			break;
		default:
		case "CYLINDER":
			cylinder = document.createElement("Cylinder");
			cylinder.setAttribute("height",tthis.wellHeight.toString());
			cylinder.setAttribute("radius",e.radius.toString());
			cylinder.setAttribute("solid","false");	
			cylinder.setAttribute("top","false");
			cylinder.setAttribute("bottom","true");									
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
		shape.appendChild(cylinder);
		shape.appendChild(appearance);
		appearance.appendChild(material);
		
		// liquid model ...
		
		switch(e.shape) {
		//IH140728 for legacy reasons, the variable is still called 'cylinder'
		// and the class is also still called 'CYLINDER'
		case "BOX":
		case "INDEXEDFACESET":
			cylinder = document.createElement("Box");					
			cylinder.setAttribute("size",
				(e.radiusX*2*1.05).toString() + " 2 " + 
				(e.radiusZ*2*1.05).toString()
				);
			cylinder.setAttribute("solid","true");			
			break;
			
		default:
		case "CYLINDER":
			cylinder = document.createElement("Cylinder");
			cylinder.setAttribute("radius",(e.radius*1.05).toString());
			cylinder.setAttribute("solid","true");
			cylinder.setAttribute("top","true");
			cylinder.setAttribute("bottom","true");
		}
		
		cylinder.classList.add(tthis.id);		
		cylinder.classList.add("WellId" + e.wellId); 		
		cylinder.classList.add("CYLINDER");			
		cylinder.classList.add("Liquid");						
					
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
							
		wellGroup.appendChild(transform1);
		transform1.appendChild(shape);		
		shape.appendChild(cylinder);
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
		transform2.setAttribute("scale", "0.007 0.007 0.007");
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
