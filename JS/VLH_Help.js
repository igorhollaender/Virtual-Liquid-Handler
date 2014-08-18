//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ H e l p . j s
//
//	  Last revision: IH 2014-08-06
//
//    (C) 2014 Lexogen GmbH
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//  Export definitions 
//
//	These are hints for the Closure compiler optimization/compressor
//  The listed symbols have to be kept in the code after optimization
//  see https://developers.google.com/closure/compiler/docs/api-tutorial3?hl=de

window['ShowHelp'] 					= ShowHelp;

//---------------------------------------------------------------------------------


var ShowHelp = function(showOrHide) {
					
	if(showOrHide==0){ShowNarrativeExtended("");} else { ShowNarrativeExtended(
	
	'<p>Navigate your view by dragging the deck shown, Ctrl+drag is to pan, Alt+drag is to zoom.</p>' + 
	'<p>Use the View buttons for specific views.</p>' + 
	'<p>Restart button restarts normally; Restart (light mode) reduces animations (suitable for lower performance PC).</p>' + 
	'<input type="button" value="Close" onclick="ShowHelp(0);"/>' +
	'');					 
	}
}
