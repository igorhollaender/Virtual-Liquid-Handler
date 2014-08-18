//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ L i q u i d . j s
//
//
//	  Last revision: IH 2014-07-30
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// 	L i q u i d   c l a s s e s   d e f i n i t i o n s
//


function SetMaterialLiquid(liquidMaterialElement,liquidClass) {
	
	switch(liquidClass)	
	{
	
	//	General-purpose classes
	
	case "LiquidClassYellow":
	case "FS2/E1":		
	case "PM/E3":		
		liquidMaterialElement.setAttribute("diffuseColor","0.9 0.7 0.0");
		liquidMaterialElement.setAttribute("emissiveColor","0.9 0.7 0.0");			
		break;
		
	case "LiquidClassRed":		
	case "PB":		
	case "SMP":		
		liquidMaterialElement.setAttribute("diffuseColor","0.9 0.1 0.0");
		liquidMaterialElement.setAttribute("emissiveColor","0.9 0.1 0.0");			
		break;		
		
	case "LiquidClassOrange":			
	case "Eluate":
		liquidMaterialElement.setAttribute("diffuseColor","0.6 0.7 0.0");
		liquidMaterialElement.setAttribute("emissiveColor","0.6 0.7 0.0");			
		break;				
		
	case "LiquidClassGreen":		
	case "BC":
	case "FS1":
	case "SS2/E2":
		liquidMaterialElement.setAttribute("diffuseColor","0.1 0.9 0.1");
		liquidMaterialElement.setAttribute("emissiveColor","0.1 0.9 0.1");			
		break;		
		
	case "LiquidClassBlue":		
	case "EtOH":
	case "SS1":
		liquidMaterialElement.setAttribute("diffuseColor","0.0 0.1 1.0");
		liquidMaterialElement.setAttribute("emissiveColor","0.0 0.1 1.0");			
		break;		
		
	case "LiquidClassWhite":			
		liquidMaterialElement.setAttribute("diffuseColor","0.9 1.0 0.9");
		liquidMaterialElement.setAttribute("emissiveColor","0.9 1.0 0.9");			
		break;		
		
	case "LiquidClassPink":		
	case "PS":		
	case "EB":		
	case "RS1":		
	case "SN":		
		liquidMaterialElement.setAttribute("diffuseColor","1.0 0.24 0.48");
		liquidMaterialElement.setAttribute("emissiveColor","1.0 0.24 0.48");			
		break;		
	
	//	Special-purpose classes
	
	case "LiquidClassEmptyWells":		
		liquidMaterialElement.setAttribute("diffuseColor","0.2 0.2 0.2");
		liquidMaterialElement.setAttribute("emissiveColor","0.2 0.2 0.2");			
		break;		
			
	case "LiquidClassEmptyTips":				
		liquidMaterialElement.setAttribute("diffuseColor","0.4 0.4 0.6");
		liquidMaterialElement.setAttribute("specularColor","0.0 0.6 0.9");
		liquidMaterialElement.setAttribute("emissiveColor","0.9 0.9 0.4");
		liquidMaterialElement.setAttribute("ambientIntensity","0.333");
		liquidMaterialElement.setAttribute("shineness","0.1");
		liquidMaterialElement.setAttribute("transparency","0.5");					
		break;				
		
	default:	
		liquidMaterialElement.setAttribute("diffuseColor","0.4 0.4 0.4");
		liquidMaterialElement.setAttribute("emissiveColor","0.4 0.4 0.4");			
	}		
}

