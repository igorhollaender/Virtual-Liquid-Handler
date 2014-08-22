//---------------------------------------------------------------------------------
//    Virtual Liquid Handler 
//
//	  V L H _ P r o t o c o l _ T e s t s . j s
//
//	  Last revision: IH 2014-08-21
//
//    (C)2014 Lexogen GmbH
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
function DEMO1() {
		
		//U_show_narrative_extended("You are watching a DEMO");			
		
		/*
		C_prepare_and_place_plate('HSP96','P1','A0',null,{"columnShownTo": 2});
		C_move_labware('P1','A5');
		C_move_head('A5');
		C_move_labware('P1','D4');
		C_move_head('D4');
		C_move_labware('P1','D0');
		C_move_head('D0');
		
		//C_pipette('D4','P1',3,1,'LiquidClassYellow',-0.9);					
		
		
		C_prepare_and_place_plate('HSP96','P3','3',
					[{column:'1',liquidClass: 'LiquidClassRed',relativeVolume:0.9}],
					{"columnShownTo": 2});
		
		C_prepare_and_place_plate('HSP96','P5','5',null,
					{"columnShownTo": 2});
		C_prepare_and_place_tip_box('TIPBOX1','T25',1);
		C_load_tips('TIPBOX1','T25',1,2);			
		C_pipette('3','P3',1,2,'LiquidClassRed',0.9);
		C_pipette('5','P5',1,1,'LiquidClassRed',-0.3);
		C_pipette('5','P5',1,2,'LiquidClassRed',-0.3);
		C_pipette('5','P5',1,3,'LiquidClassRed',-0.3);		
		C_discard_tips	("X");
		
		*/
		C_prepare_and_place_tip_box('TIPBOX1','C3',1);		
		C_prepare_and_place_plate('HSP96','P2','D4',
					[{column:'1',liquidClass: 'LiquidClassRed',relativeVolume:0.9}],
					{"columnShownTo": 5});
		C_load_tips('TIPBOX1','C3',1,1);	
		C_pipette('D4','P2',1,1,'LiquidClassRed',0.9);		
		C_pipette('D4','P2',1,2,'LiquidClassRed',-0.9);		
		C_discard_tips	();
		
		/*
		C_prepare_and_place_plate('SealingFilmForHSP96','P2sealing','Cool',null);
		C_prepare_and_place_plate('LidForHSP96','P2Lid','Cool',null);
		
		C_prepare_and_place_plate('DeepWell96','P3','Heat',null,
					{"columnShownTo": 2});
					
		C_prepare_and_place_plate('LidForDeepWell96','P3Lid','Heat',null);					
		
				
		C_prepare_and_place_plate('Corning384','P6','3',null,				
					{"columnShownTo": 5});
				
		/*
		C_prepare_and_place_plate('HSP96','P2','Cool',
					[{column:'1',liquidClass: 'LiquidClassPink',relativeVolume:0.9},
				     {column:'2',liquidClass: 'LiquidClassYellow',relativeVolume:0.6}					 
					 ],					
					 {wellsToShowString: 'A1 A2 A3 A4 A5 A6 B1 B2 H3'}					 
					 );		
		
		/*
		C_prepare_and_place_plate('TubeCarrier32','CAR1','E1',
			[{wellId:'1',liquidClass: 'LiquidClassPink',relativeVolume:0.9},
			 {wellId:'2',liquidClass: 'LiquidClassWhite',relativeVolume:0.5},
			 {wellId:'3',liquidClass: 'LiquidClassYellow',relativeVolume:0.3}
			],		
			{wellsToShowString:'1 2 3 30 31 32'}
			);
		
		/*		
		C_prepare_and_place_plate('TroughCarrier5','CAR2','W3',			
			[{wellId:'1',liquidClass: 'EtOH',relativeVolume:0.9},
			 {wellId:'2',liquidClass: 'LiquidClassRed',relativeVolume:0.6}
			],
			{wellsToShowString:'1 2   5'}
			);
		
		C_prepare_and_place_plate('CoolTubeModule','P1','Cool',null,{wellsToShowString:'1 2'});
		
		/*
		C_prepare_and_place_plate('DeepWell96','P1','Cool',null,null);
	
					[{column:'1',liquidClass: 'EtOH',relativeVolume:0.9},
				     {column:'2',liquidClass: 'EtOH',relativeVolume:0.9},
					 {column:'3',liquidClass: 'EtOH',relativeVolume:0.9}
					 ],
					 {"columnShownTo": 2}
					 );
		C_prepare_and_place_plate('TroughCarrier5','CAR2','W3',			
			[{row:'1',liquidClass: 'EtOH',relativeVolume:0.9},
			 {row:'2',liquidClass: 'LiquidClassRed',relativeVolume:0.6},
			],
			{"rowShownTo": 4});
		C_prepare_and_place_plate('TubeCarrier32','CAR1','E1',
			[{row:'1',liquidClass: 'LiquidClassPink',relativeVolume:0.9},
			 {row:'2',liquidClass: 'LiquidClassWhite',relativeVolume:0.5},
			 {row:'3',liquidClass: 'LiquidClassYellow',relativeVolume:0.3}
			],
			{"rowShownTo": 2});
		
		/*
		C_prepare_and_place_tip_box('TIPBOX1','T11',1);
		
		U_show_details('TIPBOX1',0);
		C_prepare_and_place_plate('DeepWell96','WASTE','A5',null,{"columnShownTo": 2});
		C_prepare_and_place_plate('DeepWell96','P1','B5',
					[{column:1,liquidClass: 'EtOH',relativeVolume:0.9},
				     {column:2,liquidClass: 'EtOH',relativeVolume:0.9},
					 {column:3,liquidClass: 'EtOH',relativeVolume:0.9}],
					 {"columnShownTo": 2}
					 );
		
		C_prepare_and_place_plate('Corning384','P384a1','C4',null,{"columnShownTo": 5});
		C_pipette_384('C4','P384a1',1,1,'B2','LiquidClassRed',-0.5);
		C_discard_tips	();
		
		//C_prepare_and_place_tip_box('TIPBOX1','C3',1);	
		//C_prepare_and_place_tip_box('TIPBOX1','C3',1);	
		//C_load_tips('TIPBOX1','C3',1,1);			
		//C_prepare_and_place_plate('HSP96','P7','D4',null,{"columnShownTo": 2});
		//C_shake('P7',standardShakeTime);
		//U_wait(standardShakeTime);		
		//C_move_labware('P7','C4');
		//C_incubate_on_magnet('C4',standardHeatTime,1);
		
		//C_pipette('D3','P2',1,1,'LiquidClassYellow',0.9);			
		
		/*
		C_prepare_and_place_plate('DeepWell96','WASTE','A5',null,{"columnShownTo": 2});
		C_prepare_and_place_plate('HSP96','P2','D3',null,{"columnShownTo": 2});		
		C_prepare_and_place_plate('Corning384','P384a1','D4',null,{"columnShownTo": 5});
		
		//C_pipette_384('D4','P384a1',1,1,'B2','LiquidClassRed',-0.5);
		//C_prepare_and_place_plate('HSP96','P2','D4',null);		
				
		/*		
		C_prepare_and_place_tip_box('TIPBOX1','C3',1);	
		
		C_prepare_and_place_plate('HSP96','P1','D3',
					[{column:1,liquidClass:'LiquidClassYellow',relativeVolume:0.9},
					 {column:2,liquidClass:'LiquidClassRed',relativeVolume:0.9}]
				     );					 

		C_prepare_and_place_plate('HSP96','P2','D4',null);		
		
		U_show_narrative_extended("");
				
		C_load_tips('TIPBOX1','C3',1,1);			
		C_pipette('D3','P1',1,1,'LiquidClassYellow',0.9);			
		C_pipette('D4','P2',1,1,'LiquidClassYellow',-0.3);
		C_pipette('D4','P2',1,2,'LiquidClassYellow',-0.3);
		C_pipette('D4','P2',1,3,'LiquidClassYellow',-0.3);		
		C_discard_tips	();
		
		C_load_tips('TIPBOX1','C3',1,2);			
		C_pipette('D3','P1',1,2,'LiquidClassRed',0.9);
		C_pipette('D4','P2',1,1,'LiquidClassRed',-0.3);
		C_pipette('D4','P2',1,2,'LiquidClassRed',-0.3);
		C_pipette('D4','P2',1,3,'LiquidClassRed',-0.3);		
		C_discard_tips	();
		
		C_load_tips('TIPBOX1','C3',3,3);		
		C_mix('D4','P2',3,1,'LiquidClassRed',0.25);		
		C_discard_tips	();		
				
		C_shake('P2',standardShakeTime);		
		U_wait(standardShakeTime);						
		*/
}

//---------------------------------------------------------------------------------
