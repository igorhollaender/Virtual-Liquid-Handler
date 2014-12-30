//---------------------------------------------------------------------------------
//    Virtual Liquid Handler
//
//	  V L H _ P r o t o c o l _ a u t o Q u a n t S e q _ S T A R . j s
//
//	  Last revision: IH 2014-12-18
//
//    (C) 2014 Lexogen GmbH
//---------------------------------------------------------------------------------


// TODO
//

function autoQuantSeq_STAR_1() {

	// DECK SETUP
	// implementation for 2 columns

		C_set_deck('STARNGS');
			
					U_show_narrative_extended(
						'You are watching a simulation ' +
						'of the <mark>autoQuantSeq STAR</mark> automated protocol for 16 samples ' +
						'running on a liquid handler similar to <em>Hamilton STAR NGS</em>.<p>' +
						'This is the run preparation phase. The operator has to fill the labware with defined reagents ' +
						'and place the carriers with labware on the deck.' +
						'');
					U_wait(standardWaitTime);
					U_show_narrative_extended(
						'We begin by placing some tip racks on the deck. ' +
						'');

		U_show_details('PIPETTOR1',0);		
				
					U_show_narrative_extended('1000 ul tips.');						
					
		C_prepare_and_place_tip_box('TIPBOX_1000_1','T11',1,{materialType: 'GREEN'});
		U_show_details('TIPBOX_1000_1',0);
		
					U_show_narrative_extended('300 ul tips.');
					
		C_prepare_and_place_tip_box('TIPBOX_300R_1','T12',1, {materialType: 'RED'});
		U_show_details('TIPBOX_300R_1',0);
		C_prepare_and_place_tip_box('TIPBOX_300_1','T21',1, {materialType: 'RED'});
		U_show_details('TIPBOX_300_1',0);
		C_prepare_and_place_tip_box('TIPBOX_300_2','T22',1, {materialType: 'RED'});
		U_show_details('TIPBOX_300_2',0);
		
					U_show_narrative_extended('50 ul tips.');
					
		C_prepare_and_place_tip_box('TIPBOX_50_1','T13',1, {materialType: 'BLUE'});
		U_show_details('TIPBOX_50_1',0);
		C_prepare_and_place_tip_box('TIPBOX_50_2','T14',1, {materialType: 'BLUE'});
		U_show_details('TIPBOX_50_2',0);
		C_prepare_and_place_tip_box('TIPBOX_50_3','T15',1, {materialType: 'BLUE'});
		U_show_details('TIPBOX_50_3',0);
		
					U_show_narrative_extended('Tubes containing purification beads and purification solution.');
					
		C_prepare_and_place_plate('TubeCarrier32','CAR1','E3', 
			[
			 {wellId:'31',liquidClass: 'PB',relativeVolume:0.6},
			 {wellId:'30',liquidClass: 'PB',relativeVolume:0.6},
			 {wellId:'28',liquidClass: 'PS',relativeVolume:0.8}
			],
			{wellsToShowString:'31 30 28 '}
			);
			
					U_show_narrative_extended('Reservoirs containing Elution Buffer, Waste (water), and Ethanol');
			
		C_prepare_and_place_plate('TroughCarrier5','CAR2','W3',			
			[
			 {wellId:'2',liquidClass: 'EB',relativeVolume:0.6},
			 {wellId:'3',liquidClass: 'WASTE',relativeVolume:0.1},
			 {wellId:'4',liquidClass: 'EtOH',relativeVolume:0.8},			 
			],
			{wellsToShowString:'2 3 4'}
			);
		U_show_details('CAR1',0);
		
					U_show_narrative_extended('Tubes containing specific enzymatic and non-enzymatic reagents.');
		
		C_prepare_and_place_plate('CoolTubeModule','TCA','Cool',
			[{wellId:'1',liquidClass: 'FS1',relativeVolume:0.5},
			 {wellId:'2',liquidClass: 'FS2E1',relativeVolume:0.5},
			 {wellId:'3',liquidClass: 'RS1',relativeVolume:0.5},
			 {wellId:'4',liquidClass: 'RS2',relativeVolume:0.5},
			 {wellId:'5',liquidClass: 'SS1',relativeVolume:0.5},
			 {wellId:'6',liquidClass: 'SS2E2',relativeVolume:0.5},
			 {wellId:'7',liquidClass: 'PME3',relativeVolume:0.5}
			],		
			{wellsToShowString:'1 2 3 4 5 6 7'}
			);
			
		U_show_details('CAR2',0);			
		
					U_show_narrative_extended('Plate containing barcodes, covered with lid. ' +
											  'Typically, this is thea barcode plate included in the kit.');
		
		C_prepare_and_place_plate('HSP96','P1','2',
			[{column:1,liquidClass: 'BC',relativeVolume:0.6},
			 {column:2,liquidClass: 'BC',relativeVolume:0.6}			 
			],
			{"columnShownTo": 1}
			);
		C_prepare_and_place_plate('LidForHSP96','P1Lid','2',null);
						
		U_show_details('P1',0);						
		
					U_show_narrative_extended('Plate containing samples, covered with a lid.');
		
		C_prepare_and_place_plate('HSP96','P2','5',
			[{column:1,liquidClass: 'SMP',relativeVolume:0.2},
			 {column:2,liquidClass: 'SMP',relativeVolume:0.2}
			],
			{"columnShownTo": 1}
			);
		C_prepare_and_place_plate('LidForHSP96','P2Lid','5',null);
		
					U_show_narrative_extended('An empty plate with will serve as the final prePCR plate.');
			
		C_prepare_and_place_plate('HSP96','P3','1',null,			
			{"columnShownTo": 1}
			);
			
					U_show_narrative_extended('Another empty plate with will serve as the final postPCR plate.');
			
		C_prepare_and_place_plate('HSP96','P4','3',null,			
			{"columnShownTo": 1}
			);
			
		U_show_details('P1',0);
		U_show_details('P2',0);
		U_show_details('P3',0);
		U_show_details('P4',0);
						
		U_wait(standardWaitTime);

					U_show_narrative_extended(
						'Deck setup is finished. Now the operator starts the run. ' +
						'');
						
		U_wait(standardWaitTime);
}
