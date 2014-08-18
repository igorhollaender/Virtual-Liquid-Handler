//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V H L _ D e c k . j s
//
//	  General model template for a orthogonal-matrix-organized deck.
//
//	  Last revision: IH 2014-07-30
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// 	P E   S c i c l o n e   N G S
//

function Deck_SCICLONE(id,parentGroupId) {
	this.id = id;
	this.parentGroupId = parentGroupId;	
	
	this.deck = new Deck(id,parentGroupId);
	
	this.deck.Location = {	
	
		// these are CENTERS of the respective locations
		
		"A0"		:   new x3dom.fields.SFVec3f(0.143*(+2.5),+0.000,0.100*(+1.5)),
		"A1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(+1.5)),
		"A2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(+1.5)),
		"A3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(+1.5)),
		"A4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(+1.5)),
		"A5"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(+1.5)),
				
		"B0"		:   new x3dom.fields.SFVec3f(0.143*(+2.5),+0.000,0.100*(+0.5)),
		"B1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(+0.5)),
		"B2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(+0.5)),
		"B2a"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.015,0.100*(+0.5)),
		"B3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(+0.5)),
		"B4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(+0.5)),
		"B4a"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.015,0.100*(+0.5)),
		"B5"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(+0.5)),
		
		"C0"		:   new x3dom.fields.SFVec3f(0.143*(+2.5),+0.000,0.100*(-0.5)),
		"C1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(-0.5)),
		"C2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(-0.5)),
		"C3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-0.5)),
		"C4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(-0.5)),
		"C5"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(-0.5)),
		"C5a"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.015,0.100*(-0.5)),
		
		"D0"		:   new x3dom.fields.SFVec3f(0.143*(+2.5),+0.000,0.100*(-1.5)),
		"D1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(-1.5)),
		"D2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(-1.5)),
		"D3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-1.5)),
		"D4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(-1.5)),
		"D5"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(-1.5)),
		
		// special locations
		
		"Bin"  		:  	new x3dom.fields.SFVec3f(0.6,0,0),		
		"Desk"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-3.5)),
		"PCR"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(-3.5))
		};
		
	this.Location = this.deck.Location;	
	
	this.deck.Create();		
	this.deck.SetDefaultMaterialLocator();	

	//special locator properties
	
	this.deck.SetLocatorProperties("A3", 0.02, "0.6 0.1 0.3");	
	this.deck.SetLocatorProperties("A4", 0.02, "0.6 0.1 0.3");	
	this.deck.SetLocatorProperties("D2", 0.02, "0.6 0.1 0.3");		
	this.deck.SetLocatorProperties("D4", 0.02, "0.1 0.2 0.7");	
	this.deck.SetLocatorProperties("C4", 0.01, "0.1 0.1 0.2");	
	this.deck.SetLocatorProperties("D5", -0.04, "0.3 0.3 0.3");	
	this.deck.SetLocatorProperties("PCR", 0.02, "0.6 0.1 0.3");	
	
	this.deck.SetLocatorProperties("Desk", 0.00, "0.2 0.2 0.25");	
	this.deck.SetLocatorProperties("Bin", 0.00, "0.2 0.2 0.25");	
	
	this.parkingLocation = "A0";
}


//---------------------------------------------------------------------------------
// 	P E   Z e p h y r
//

function Deck_ZEPHYR(id,parentGroupId) {
	this.id = id;
	this.parentGroupId = parentGroupId;	
	
	this.deck = new Deck(id,parentGroupId);
	
	this.deck.Location = {		
	
		// these are CENTERS of the respective locations		
		
		"A1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(+1.0)),
		"A2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(+1.0)),
		"A3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(+1.0)),
		"A4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(+1.0)),			
		
		"B1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(+0.0)),
		"B2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(+0.0)),		
		"B3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(+0.0)),
		"B4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(+0.0)),		
		
		"C1"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(-1.0)),
		"C2"		:   new x3dom.fields.SFVec3f(0.143*(+0.5),+0.000,0.100*(-1.0)),
		"C3"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-1.0)),
		"C4"		:   new x3dom.fields.SFVec3f(0.143*(-1.5),+0.000,0.100*(-1.0)),		
		
		// special locations
		
		"Bin"  		:  	new x3dom.fields.SFVec3f(0.4,0,0),		
		"Desk"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-2.5)),		
		"PCR"		:   new x3dom.fields.SFVec3f(0.143*(+1.5),+0.000,0.100*(-3.5))
		};
	this.Location = this.deck.Location;	
	
	this.deck.Create();		
	this.deck.SetDefaultMaterialLocator();	

	//special locator properties
	
	this.deck.SetLocatorProperties("A3", 0.01, "0.1 0.1 0.2");	
	this.deck.SetLocatorProperties("B3", 0.02, "0.1 0.2 0.7");	
	this.deck.SetLocatorProperties("A4", -0.04, "0.3 0.3 0.3");	
	this.deck.SetLocatorProperties("C2", 0.02, "0.6 0.1 0.3");
	
	this.deck.SetLocatorProperties("Desk", 0.00, "0.2 0.2 0.25");	
	this.deck.SetLocatorProperties("Bin", 0.00, "0.2 0.2 0.25");	
	this.deck.SetLocatorProperties("PCR", 0.02, "0.6 0.1 0.3");	
	
	this.parkingLocation = "A1";
}

//---------------------------------------------------------------------------------
// 	A g i l e n t   B R A V O
//

function Deck_BRAVO(id,parentGroupId) {
	this.id = id;
	this.parentGroupId = parentGroupId;	
	
	this.deck = new Deck(id,parentGroupId);
	
	this.deck.Location = {		
	
		// these are CENTERS of the respective locations		
		
		"1"		:   new x3dom.fields.SFVec3f(0.143*(+1.0),+0.000,0.100*(+1.0)),
		"2"		:   new x3dom.fields.SFVec3f(0.143*(+0.0),+0.000,0.100*(+1.0)),
		"3"		:   new x3dom.fields.SFVec3f(0.143*(-1.0),+0.000,0.100*(+1.0)),		
		
		"4"		:   new x3dom.fields.SFVec3f(0.143*(+1.0),+0.000,0.100*(+0.0)),
		"5"		:   new x3dom.fields.SFVec3f(0.143*(+0.0),+0.000,0.100*(+0.0)),		
		"6"		:   new x3dom.fields.SFVec3f(0.143*(-1.0),+0.000,0.100*(+0.0)),		
		
		"7"		:   new x3dom.fields.SFVec3f(0.143*(+1.0),+0.000,0.100*(-1.0)),
		"8"		:   new x3dom.fields.SFVec3f(0.143*(+0.0),+0.000,0.100*(-1.0)),
		"9"		:   new x3dom.fields.SFVec3f(0.143*(-1.0),+0.000,0.100*(-1.0)),		
		
		// special locations
		
		"Bin"  		:  	new x3dom.fields.SFVec3f(0.4,0,0),		
		"Desk"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-2.5))
		};
	this.Location = this.deck.Location;	
	
	this.deck.Create();		
	this.deck.SetDefaultMaterialLocator();	

	//special locator properties
	
	this.deck.SetLocatorProperties("Desk", 0.00, "0.2 0.2 0.25");	
	this.deck.SetLocatorProperties("Bin", 0.00, "0.2 0.2 0.25");	
	
	this.parkingLocation = "1";
}

//---------------------------------------------------------------------------------
// 	H a m i l t o n    S T A R  N E B   N G S
//

function Deck_STARNGS(id,parentGroupId) {
	this.id = id;
	this.parentGroupId = parentGroupId;	
	
	this.deck = new Deck(id,parentGroupId);
	
	this.deck.Location = {		
	
		// these are CENTERS of the respective locations		
		
		"T11"		:   new x3dom.fields.SFVec3f(0.143*(+3.2),+0.000,0.100*(+2.0)),
		"T12"		:   new x3dom.fields.SFVec3f(0.143*(+3.2),+0.000,0.100*(+1.0)),
		"T13"		:   new x3dom.fields.SFVec3f(0.143*(+3.2),+0.000,0.100*(+0.0)),
		"T14"		:   new x3dom.fields.SFVec3f(0.143*(+3.2),+0.000,0.100*(-1.0)),
		"T15"		:   new x3dom.fields.SFVec3f(0.143*(+3.2),+0.000,0.100*(-2.0)),
		
		"T21"		:   new x3dom.fields.SFVec3f(0.143*(+2.2),+0.000,0.100*(+2.0)),
		"T22"		:   new x3dom.fields.SFVec3f(0.143*(+2.2),+0.000,0.100*(+1.0)),
		"T23"		:   new x3dom.fields.SFVec3f(0.143*(+2.2),+0.000,0.100*(+0.0)),
		"T24"		:   new x3dom.fields.SFVec3f(0.143*(+2.2),+0.000,0.100*(-1.0)),
		"T25"		:   new x3dom.fields.SFVec3f(0.143*(+2.2),+0.000,0.100*(-2.0)),		
		
		"1"			:   new x3dom.fields.SFVec3f(0.143*(-1.2),+0.000,0.100*(+2.0)),
		"2"			:   new x3dom.fields.SFVec3f(0.143*(-1.2),+0.000,0.100*(+1.0)),
		"3"			:   new x3dom.fields.SFVec3f(0.143*(-1.2),+0.000,0.100*(+0.0)),
		"MG"		:   new x3dom.fields.SFVec3f(0.143*(-1.2),+0.000,0.100*(-1.0)),
		"5"			:   new x3dom.fields.SFVec3f(0.143*(-1.2),+0.000,0.100*(-2.0)),
		
		"E1"		:   new x3dom.fields.SFVec3f(0.143*(+1.2),+0.000,0.100*(+0.0)),		
		"E2"		:   new x3dom.fields.SFVec3f(0.143*(+0.7),+0.000,0.100*(+0.0)),		
		"E3"		:   new x3dom.fields.SFVec3f(0.143*(+0.2),+0.000,0.100*(+0.0)),		
		
		"W1"		:   new x3dom.fields.SFVec3f(0.143*(-0.28),+0.000,0.100*(+2.0)),		
		"W2"		:   new x3dom.fields.SFVec3f(0.143*(-0.28),+0.000,0.100*(+1.0)),
		"W3"		:   new x3dom.fields.SFVec3f(0.143*(-0.28),+0.000,0.100*(+0.0)),
		"W4"		:   new x3dom.fields.SFVec3f(0.143*(-0.28),+0.000,0.100*(-1.0)),
		"W5"		:   new x3dom.fields.SFVec3f(0.143*(-0.28),+0.000,0.100*(-2.0)),		

		"Heat"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(+1.7)),		
		"Lid"		:   new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(+0.6)),		
		"Cool"		:  	new x3dom.fields.SFVec3f(0.143*(-2.5),+0.000,0.100*(-1.7)),		
		
		"X"			:   new x3dom.fields.SFVec3f(0.143*(-3.5),+0.000,0.100*(+0.0)),
		
		// special locations
		
		"Bin"  		:  	new x3dom.fields.SFVec3f(0.7,0,0),		
		"Desk"		:   new x3dom.fields.SFVec3f(0.143*(-0.5),+0.000,0.100*(-3.5))
		};
	this.Location = this.deck.Location;	
	
	this.deck.Create();		
	this.deck.SetDefaultMaterialLocator();	

	//special locator properties
	
	this.SetLocatorIrregular("W1",0.25,1,"0.2 0.7 0.85");
	this.SetLocatorIrregular("W2",0.25,1,"0.2 0.7 0.85");
	this.SetLocatorIrregular("W3",0.25,1,"0.2 0.7 0.85");
	this.SetLocatorIrregular("W4",0.25,1,"0.2 0.7 0.85");
	this.SetLocatorIrregular("W5",0.25,1,"0.2 0.7 0.85");
	
	this.SetLocatorIrregular("E1",0.25,5.45,"0.2 0.7 0.2");
	this.SetLocatorIrregular("E2",0.25,5.45,"0.2 0.7 0.2");
	this.SetLocatorIrregular("E3",0.25,5.45,"0.2 0.7 0.2");
	
	this.SetLocatorIrregular("X",0.25,2,"0.2 0.2 0.2");
		
	this.deck.SetLocatorProperties("1", 0.05, "0.1 0.1 0.2");	
	this.deck.SetLocatorProperties("2", 0.05, "0.1 0.1 0.2");	
	this.deck.SetLocatorProperties("3", 0.05, "0.1 0.1 0.2");	
	this.deck.SetLocatorProperties("MG", 0.04, "0.1 0.1 0.1");	
	this.deck.SetLocatorProperties("5", 0.05, "0.1 0.1 0.2");	
	
	this.deck.SetLocatorProperties("Heat", 0.05, "0.6 0.1 0.3");	
	this.deck.SetLocatorProperties("Lid", 0.02, "0.1 0.1 0.1");	
	this.deck.SetLocatorProperties("Cool", 0.05, "0.1 0.5 0.3");	
	
	this.deck.SetLocatorProperties("Desk", 0.00, "0.2 0.2 0.25");	
	this.deck.SetLocatorProperties("Bin", 0.00, "0.2 0.2 0.25");	
	
	this.parkingLocation = "T11";
}

Deck_STARNGS.prototype.SetLocatorIrregular = function(locatorName, locatorWidthRelative,locatorLengthRelative, locatorDiffuseColor) {
					
		document.getElementsByClassName("Deck Locator MATERIAL " + this.id + " " + locatorName).item(0)
				.setAttribute("diffuseColor",locatorDiffuseColor);			
		
		var elevatedLocation_x = this.Location[locatorName].x;
		var elevatedLocation_y = this.Location[locatorName].y - 0.0001; 
			//IH140707 correction -0.0001 for proper transparency handling
		var elevatedLocation_z = this.Location[locatorName].z;						
		document.getElementsByClassName("Deck Locator TRANSFORM1 " + this.id + " " + locatorName).item(0)
			.setAttribute("translation",new x3dom.fields.SFVec3f(elevatedLocation_x,elevatedLocation_y,elevatedLocation_z));
		document.getElementsByClassName("Deck Locator TRANSFORM2 " + this.id + " " + locatorName).item(0)
			.setAttribute("scale",new x3dom.fields.SFVec3f(locatorWidthRelative,0,locatorLengthRelative));		
}


//---------------------------------------------------------------------------------
// 	D e c k 
//

function Deck(id,parentGroupId) {
	this.id = id;
	this.parentGroupId = parentGroupId;
	
	this.LocatorModelThickness = 0.0005;
	
	this.Location = {};
		
	// this.Create();		
	// this.SetDefaultMaterialLocator();	
	
}

Deck.prototype.Create = function() {
		
	var deck_group;
	var material;
	var appearance;
	var shape;
	var box;
	var transform1;
	var transform2;
	
	deck_group = document.createElement("Group");
	deck_group.setAttribute("id", this.id);
	document.getElementById(this.parentGroupId).appendChild(deck_group);		
							
	// locators ...
		
	var tthis = this;	//since 'this' has changed meaning under following function
	Object.getOwnPropertyNames(this.Location).forEach(function(name,idx,array) {		
	
		//default locator setup ...
		
		material = document.createElement("Material");
		material.setAttribute("DEF", getUniqueId() );
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");
		box = document.createElement("Box");
		transform1 = document.createElement("Transform");
		transform2 = document.createElement("Transform");
		deck_group.appendChild(transform1);
		transform1.appendChild(transform2);	
		transform2.appendChild(shape);	
		shape.appendChild(appearance);
		appearance.appendChild(material);		
		shape.appendChild(box);				
		box.solid = "true";
		box.ccw = "false";   		
																															
		transform1.setAttribute("translation","");
		transform1.setFieldValue("translation",tthis.Location[name]);		
		transform1.setAttribute("scale","0.065 0.0005 0.045");						
		transform1.classList.add(tthis.id,name,"Deck","Locator","TRANSFORM1");		
		transform2.classList.add(tthis.id,name,"Deck","Locator","TRANSFORM2");		
		material.classList.add(tthis.id,name,"Deck","Locator","MATERIAL"); 
				
																										
		// labels ...
		
		var fontStyle = document.createElement("FontStyle");						
		var text = document.createElement("Text");										
		material = document.createElement("Material");
		appearance = document.createElement("Appearance");
		shape = document.createElement("Shape");						
		transform1 = document.createElement("Transform");
		transform2 = document.createElement("Transform");
		transform1.setAttribute("translation", "");
							
		// label is at level y=0
		transform1.setAttribute("rotation", "0 1 0 3.1416");					
		transform2.setAttribute("translation","0  0 0.035 ");
		transform2.setAttribute("rotation", "1 0 0 -1.5708");
		transform2.setAttribute("scale", "0.07 0.07 0.07");
		material.setAttribute("diffuseColor","0.3 0.3 0.3");
		
		text.setAttribute("string",name);
		text.setAttribute("solid","true");		
		fontStyle.setAttribute("family","SANS");
		fontStyle.setAttribute("justify",'"MIDDLE" "MIDDLE" ');
						
		deck_group.appendChild(transform1);
		text.appendChild(fontStyle);
		transform1.appendChild(transform2);
		transform1.setFieldValue("translation", tthis.Location[name]);
		transform2.appendChild(shape);
		shape.appendChild(text);
		shape.appendChild(appearance);
		appearance.appendChild(material);
								
		});		
}


Deck.prototype.SetDefaultMaterialLocator = function() {
		
		Array.prototype.slice.call(
			document.getElementsByClassName("Deck Locator MATERIAL " + this.id)).forEach( function(e,i,a) {			
				e.setAttribute("diffuseColor","0.6 0.6 0.9");			
				e.setAttribute("emissiveColor","0 0 0");			
				e.setAttribute("transparency","0.5");			
			});		
}

Deck.prototype.SetLocatorProperties = function(locatorName, locatorThickness, locatorDiffuseColor) {
					
		document.getElementsByClassName("Deck Locator MATERIAL " + this.id + " " + locatorName).item(0)
				.setAttribute("diffuseColor",locatorDiffuseColor);			
		
		var elevatedLocation_x = this.Location[locatorName].x;
		var elevatedLocation_y = this.Location[locatorName].y + locatorThickness*0.5 - 0.0001; 
			//IH140707 correction -0.0001 for proper transparency handling
		var elevatedLocation_z = this.Location[locatorName].z;						
		document.getElementsByClassName("Deck Locator TRANSFORM1 " + this.id + " " + locatorName).item(0)
			.setAttribute("translation",new x3dom.fields.SFVec3f(elevatedLocation_x,elevatedLocation_y,elevatedLocation_z));
		document.getElementsByClassName("Deck Locator TRANSFORM2 " + this.id + " " + locatorName).item(0)
			.setAttribute("scale",new x3dom.fields.SFVec3f(1,locatorThickness*1000,1));		
			
		this.Location[locatorName].y += locatorThickness;
}




