//---------------------------------------------------------------------------------
//    Virtual Liquid Handler
//
//	  V L H _ P r o t o c o l _ a u t o Q u a n t S e q _ S T A R . j s
//
//	  Last revision: IH 2014-08-20
//
//    (C) 2014 Lexogen GmbH
//---------------------------------------------------------------------------------


// TODO
//

function autoQuantSeq_STAR_1() {

	// DECK SETUP
	// implementation for 3 columns

		C_set_deck('STARNGS');
			
					U_show_narrative_extended(
						'You are watching a simulation ' +
						'of the <mark>autoQuantSeq</mark> automated protocol for 24 samples ' +
						'running on a liquid handler similar to <em>Hamilton STAR NGS</em>.<p>' +
						'This is the run preparation phase. The operator has to fill the labware with defined reagents ' +
						'and place the carriers with labware on the deck.' +
						'');
					U_wait(standardWaitTime);
					U_show_narrative_extended(
						'We begin by placing some tip racks on the deck. ' +
						'');

		U_show_details('PIPETTOR1',0);

		C_prepare_and_place_tip_box('TIPBOX1','T11',1);
		U_show_details('TIPBOX1',0);
		C_prepare_and_place_tip_box('TIPBOX2','T12',1);
		U_show_details('TIPBOX2',0);
		
		//TODO place remaining tip boxes
						
		C_prepare_and_place_plate('TubeCarrier32','CAR1','E1', null,			
			{wellsToShowString:'1 2 3 4 5 6 '}
			);
			
		C_prepare_and_place_plate('TroughCarrier5','CAR2','W3',			
			[{wellId:'1',liquidClass: 'PS',relativeVolume:0.6},
			 {wellId:'2',liquidClass: 'EB',relativeVolume:0.6},
			 {wellId:'4',liquidClass: 'EtOH',relativeVolume:0.8},
			 {wellId:'5',liquidClass: 'PB',relativeVolume:0.6}
			],
			{wellsToShowString:'1 2 3 4 5'}
			);
		U_show_details('CAR1',0);
		
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
		
		C_prepare_and_place_plate('HSP96','P1','1',
			[{column:1,liquidClass: 'BC',relativeVolume:0.6},
			 {column:2,liquidClass: 'BC',relativeVolume:0.6},
			 {column:3,liquidClass: 'BC',relativeVolume:0.6}
			],
			{"columnShownTo": 2}
			);
						
		U_show_details('P1',0);						
		
		C_prepare_and_place_plate('HSP96','P2','2',
			[{column:1,liquidClass: 'SMP',relativeVolume:0.2},
			 {column:2,liquidClass: 'SMP',relativeVolume:0.2},
			 {column:3,liquidClass: 'SMP',relativeVolume:0.2}
			],
			{"columnShownTo": 2}
			);
			
		U_show_details('P1',0);
		U_show_details('P2',0);
						
		U_wait(standardWaitTime);

					U_show_narrative_extended(
						'Deck setup is finished. Now the operator starts the run. ' +
						'');
						
		U_wait(standardWaitTime);
}
