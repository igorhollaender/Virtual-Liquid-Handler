//---------------------------------------------------------------------------------
//    Virtual Liquid Handler
//
//	  V L H _ P r o t o c o l _ a u t o Q u a n t S e q . j s
//
//	  Last revision: IH 2014-08-22
//
//    (C) 2014 Lexogen GmbH
//---------------------------------------------------------------------------------


// TODO
//
//	IH140721	all narrative fields have to be filled
//	IH140722	P1Lid does not land on B4 (autoQuantSeq5)
//	IH140730	implement different relative volumes for tip and plate well for transfer
//				(HPS96 and 150ul tip are approx similar, but Corning384 or Deepwell 
//				and 150ul tips are unproportional)

function autoQuantSeq1() {

	// DECK SETUP
	// implementation for 3 columns

		C_set_deck('SCICLONE');
	
		
					U_show_narrative_extended(
						'You are watching a simulation ' +
						'of the <mark>autoQuantSeq</mark> automated protocol for 24 samples ' +
						'running on a liquid handler similar to <em>PerkinElmer Sciclone NGS</em>.<p>' +
						'This is the run preparation phase. The operator has to fill the labware with defined reagents ' +
						'and place the labware on the deck.' +
						'');
					U_wait(standardWaitTime);
					U_show_narrative_extended(
						'We begin by placing some tip boxes on the deck. ' +
						'');

		U_show_details('PIPETTOR1',0);

		C_prepare_and_place_tip_box('TIPBOX1','C3',1);
		U_show_details('TIPBOX1',0);
		C_prepare_and_place_tip_box('TIPBOX2','A1',1);
		U_show_details('TIPBOX2',0);
		C_prepare_and_place_tip_box('TIPBOX3','B1',1);
		U_show_details('TIPBOX3',0);
		C_prepare_and_place_tip_box('TIPBOX4','C2',0,{"columnShownTo": 2});
		U_show_details('TIPBOX4',0);

					U_show_narrative_extended(
						'We place a <mark>deep well for waste</mark> ' +
						'and another <mark>deep well filled with ethanol</mark>. ' +
						'We cover the ethanol plate with a lid. ' +
						'');

		C_prepare_and_place_plate('DeepWell96','WASTE','A5',null,{"columnShownTo": 2});

		C_prepare_and_place_plate('DeepWell96','P1','B5',
					[{column:1,liquidClass: 'EtOH',relativeVolume:0.9},
				     {column:2,liquidClass: 'EtOH',relativeVolume:0.9},
					 {column:3,liquidClass: 'EtOH',relativeVolume:0.9}],
					 {"columnShownTo": 2}
					 );
		U_show_details('WASTE',0);

		C_prepare_and_place_plate('LidForDeepWell96','P1Lid','B5',null);

					U_show_narrative_extended(
						'We fill an <mark>HSP-96 plate with purification solution</mark> and place it on deck. ' +
						'');

		C_prepare_and_place_plate('HSP96','P3','B2',
					[{column:1,liquidClass: 'PS',relativeVolume:0.6},
				     {column:2,liquidClass: 'PS',relativeVolume:0.6},
					 {column:3,liquidClass: 'PS',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_wait(standardWaitTime);
		U_show_details('P1',0);

					U_show_narrative_extended(
						'We fill an <mark>HSP-96 plate with magnetic beads</mark> and place it on deck. ' +
						'');

		C_prepare_and_place_plate('HSP96','P2','B2a',
					[{column:1,liquidClass: 'PB',relativeVolume:0.6},
				     {column:2,liquidClass: 'PB',relativeVolume:0.6},
					 {column:3,liquidClass: 'PB',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_show_details('P2',0);

					U_show_narrative_extended(
						'We fill an <mark>HSP-96 plate with elution buffer</mark> and place it on deck. ' +
						'');
						
		U_show_details('P4',1);
		C_prepare_and_place_plate('HSP96','P4','C5',
					[{column:1,liquidClass: 'EB',relativeVolume:0.6},
				     {column:2,liquidClass: 'EB',relativeVolume:0.6},
					 {column:3,liquidClass: 'EB',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_show_details('P3',0);

					U_show_narrative_extended(
						'The <mark>HSP-96 plate with barcodes</mark> comes in the kit, so we place it on deck. '+
						'The plate is covered with a lid. '+
						'');

		C_prepare_and_place_plate('HSP96','P5','A2',
					[{column:1,liquidClass: 'BC',relativeVolume:0.6},
				     {column:2,liquidClass: 'BC',relativeVolume:0.6},
					 {column:3,liquidClass: 'BC',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_show_details('P4',0);

		C_prepare_and_place_plate('LidForHSP96','P5Lid','A2',null);

					U_show_narrative_extended(
						'Now we fill another <mark>HSP-96 plate with the enzymatic kit reagents</mark> ' +
						'and place it on deck. '+
						'');

		C_prepare_and_place_plate('HSP96','P6','D2',
					[{column:12,liquidClass: 'FS1',relativeVolume:0.6},
				     {column:11,liquidClass: 'FS2/E1',relativeVolume:0.9},
					 {column:10,liquidClass: 'RS1',relativeVolume:0.6},
					 {column:9,liquidClass: 'RS2',relativeVolume:0.6},
					 {column:8,liquidClass: 'SS1',relativeVolume:0.6},
					 {column:6,liquidClass: 'SS2/E2',relativeVolume:0.6},
					 {column:5,liquidClass: 'PM/E3',relativeVolume:0.9}
					 ]					 
					 );
		U_show_details('P5',0);

					U_show_narrative_extended(
						'Another <mark>HSP-96 plate with RNA samples</mark> ' +
						'is to be placed on deck and covered with a lid. '+
						'');

		C_prepare_and_place_plate('HSP96','P7','D4',
					[{column:1,liquidClass: 'SMP',relativeVolume:0.2},
				     {column:2,liquidClass: 'SMP',relativeVolume:0.2},
					 {column:3,liquidClass: 'SMP',relativeVolume:0.2}],
					 {"columnShownTo": 2}
					 );
		C_prepare_and_place_plate('LidForHSP96','P7Lid','D4',null);
		U_show_details('P6',0);

					U_show_narrative_extended(
						'Now we add some additional empty labware which will be needed  ' +
						'during the protocol.'+
						'');

		C_prepare_and_place_plate('HSP96','NONSTERILE','B4',null,{"columnShownTo": -1});
		C_prepare_and_place_plate('HSP96','P12','C5a',null,{"columnShownTo": 2});
		U_show_details('P7',0);

		U_show_details('NONSTERILE',0);
		U_show_details('P12',0);

		C_prepare_and_place_plate('Corning384','P10','A3',null,{"columnShownTo": 5});
		U_wait(standardWaitTime);
		U_show_details('P10',0);
		C_prepare_and_place_plate('Corning384','P11','B4a',null,{"columnShownTo": 5});
		U_wait(standardWaitTime);
		U_show_details('P11',0);
		U_wait(standardWaitTime);

					U_show_narrative_extended(
						'Deck setup is finished. Now the operator starts the run. ' +
						'');
		U_wait(standardWaitTime);
}

function autoQuantSeq2() {

		//  REVERSE TRANSCRIPTION

		U_show_details('PIPETTOR1',	1);

	// prearray FS1

					U_show_narrative_extended(
						'The machine run starts by aliquoting some reagents to a 384-well plate ' +
						'in order to prepare it for transfer with 24 tips in parallel, to make sure all ' +
						'reactions(wells) receive the reagents at the same time.' +
						'We call this process <em>pre-arraying</em>.' +
						'<p> Now, we are pre-arraying the reagents <mark>FS1 (First strand cDNA synthesis mix No.1)</mark> ' +
						'and <mark> FS2/E1 (First strand cDNA synthesis mix No.2 with enzyme E1)</mark>.</p> ' +
						'');

		U_show_details('TIPBOX1',1);
		U_wait(standardWaitTime);
		C_load_tips('TIPBOX1','C3',1,12);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		C_pipette('D2','P6',1,12,'FS1',0.6);
		U_show_details('P6',0);

		U_show_details('P10',1);
		U_wait(standardWaitTime);
		C_pipette_384('A3','P10',1,1,'A1','FS1',-0.2);
		C_pipette_384('A3','P10',1,2,'A1','FS1',-0.2);
		C_pipette_384('A3','P10',1,3,'A1','FS1',-0.2);
		U_show_details('P10',0);
		C_discard_tips	();

	// prearray FS2/E1

		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',1,11);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		C_pipette('D2','P6',1,11,'FS2/E1',0.9);
		U_show_details('P6',0);

		U_show_details('P10',1);
		C_pipette_384('A3','P10',1,1,'A2','FS2/E1',-0.3);
		C_pipette_384('A3','P10',1,2,'A2','FS2/E1',-0.3);
		C_pipette_384('A3','P10',1,3,'A2','FS2/E1',-0.3);
		U_show_details('P10',0);
		C_discard_tips	();

	// add FS1

					U_show_narrative_extended(
						'We discard the lid of the plate with samples and add the ' +
						'<mark>FS1 (First strand cDNA synthesis mix No.1)</mark> reagent ' +
						'from the prearrayed aliquots.' +
						'');

		C_discard_labware('P7Lid');

		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',3,8);
		U_show_details('TIPBOX1',0);

		U_show_details('P7',1);
		U_show_details('P10',1);
		C_pipette_384('A3','P10',3,1,'A1','FS1',+0.2);
		U_show_details('P10',0);
		C_pipette('D4','P7',3,1,'FS1',-0.2);
		C_mix('D4','P7',3,1,'FS1',0.25);
		C_move_head('A5');

	// intervention #1

					U_show_narrative_extended(
						'The machine stops, the operator is asked to take the plate with samples ' +
						'seal it with film and place it on a PCR cycler. In the cycler,' +
						'the samples are incubated at 85&#x2103; for 3 minutes, then cooled down to 37&#x2103;. ' +
						'<p> The oligodT primer containing an Illumina-compatible sequence at its 5end ' +
						'is hybridized to the RNA. ' +
						'<p>The operator then removes the sealing film, places the plate back on the deck, ' +
						'and resumes the run.' +
						'');

		C_move_labware('P7','Desk');
		C_move_labware('P7','PCR');
		C_prepare_and_place_plate('SealingFilmForHSP96','P7Film','PCR',null);
		C_heat('PCR',standardHeatTime,1);
		C_discard_labware('P7Film');
		C_move_labware('P7','Desk');
		C_move_labware('P7','D4');

	// add FS2/E1
					U_show_narrative_extended(
						'We now add the ' +
						'<mark>FS2/E1 reagent (First strand cDNA synthesis mix No.2 with E1 enzyme)</mark>, ' + 				'then discard the tips and let the plate incubate on the thermal unit (location D4), ' +
						' at 37&#x2103; for 15 minutes. ' +
						'<p>The reverse transription takes place.' +
						'');

		U_show_details('P10',1);
		C_pipette_384('A3','P10',3,1,'A2','FS2/E1',+0.3);
		U_show_details('P10',0);
		C_pipette('D4','P7',3,1,'FS2/E1',-0.3);
		C_mix('D4','P7',3,1,'FS2/E1',0.25);

		C_discard_tips	();

	// incubate

		C_heat('D4',extraLongHeatTime,0);

	// prearray RS1

					U_show_narrative_extended(
						'During the incubation, we again pre-array two of the reagents. This ' +
						'time, these are the <mark>RS1 (RNA Removal solution No.1)</mark> and ' +
						'the <mark>RS2 (RNA Removal solution No.2)</mark>. ' +
						'<p> Note that we use the 384-well plate at A3 four times, as there are four well quadrants ' +
						'corresponding to each well of a 96-well plate.' +
						'');


		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',1,7);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		C_pipette('D2','P6',1,10,'RS1',0.6);
		U_show_details('P6',0);

		U_show_details('P10',1);
		C_pipette_384('A3','P10',1,1,'B1','RS1',-0.2);
		C_pipette_384('A3','P10',1,2,'B1','RS1',-0.2);
		C_pipette_384('A3','P10',1,3,'B1','RS1',-0.2);
		U_show_details('P10',0);
		C_discard_tips	();

	// prearray RS2

		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',1,6);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		C_pipette('D2','P6',1,9,'RS2',0.6);
		U_show_details('P6',0);

		U_show_details('P10',1);
		C_pipette_384('A3','P10',1,1,'B2','RS2',-0.2);
		C_pipette_384('A3','P10',1,2,'B2','RS2',-0.2);
		C_pipette_384('A3','P10',1,3,'B2','RS2',-0.2);
		U_show_details('P10',0);
		C_discard_tips	();

}

function autoQuantSeq3() {

	//  RNA REMOVAL
					U_show_narrative_extended(
						'We now add the ' +
						'<mark>RS1 (RNA Removal solution No.1)</mark> reagent ' +
						'(from the prearrayed aliquots) ' +
						'to degrade the RNA template. '+
						'');

	// add RS1

		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',3,3);
		U_show_details('TIPBOX1',0);

		U_show_details('P7',1);
		U_show_details('P10',1);
		C_pipette_384('A3','P10',3,1,'B1','RS1',+0.2);
		U_show_details('P10',0);
		C_pipette('D4','P7',3,1,'RS1',-0.2);
		C_mix('D4','P7',3,1,'RS1',0.35);
		C_move_head('A5');

	// intervention #2
					U_show_narrative_extended(
						'The machine stops again, the operator is asked to take the plate with samples ' +
						'seal it with film and place it on a PCR cycler. In the cycler,' +
						'the samples are <mark>incubated at 95&#x2103; for 10 minutes, then cooled down to 25&#x2103;.</mark> ' +
						'<p> The RNA template is being removed. ' +
						'<p>The operator then removes the sealing film, places the plate back on the deck, ' +
						'and resumes the run.' +
						'');

		C_move_labware('P7','Desk');
		C_move_labware('P7','PCR');
		C_prepare_and_place_plate('SealingFilmForHSP96','P7Film','PCR',null);
		C_heat('PCR',standardHeatTime,1);
		C_discard_labware('P7Film');
		C_move_labware('P7','Desk');
		C_move_labware('P7','D4');

	// add RS2
					U_show_narrative_extended(
						'We now add the ' +
						'<mark>RS2 (RNA Removal solution No.2)</mark> reagent ' +
						'(from the prearrayed aliquots). ' +
						'');

		U_show_details('P7',1);
		U_show_details('P10',1);
		C_pipette_384('A3','P10',3,1,'B2','RS2',+0.2);
		U_show_details('P10',0);
		C_pipette('D4','P7',3,1,'RS2',-0.2);
		C_mix('D4','P7',3,1,'RS2',0.35);

		C_discard_tips	();

}

function autoQuantSeq4() {

	//  SECOND STRAND SYNTHESIS
					U_show_narrative_extended(
						'<em>Second strand synthesis</em> follows. It is initiated by a random primer ' +
						'containing an Illumina-compatible linker sequence at its 5&#8217;end ' +
						'<p>We broadcast the <mark>SS1 (Second strand synthesis mix No.1)</mark> reagent ' +
						'from the reagent plate to the samples. We do it column-by-column, and we ' +
						'save the tips used for the given column in a dedicated empty tip box (at C2). ' +
						'Then, we take all the saved tips and use them for simultaneous mixing (the tips are again ' +
						'seeing only the well which they were in before, so there is no contamination).' +
						'');

	// SS1 transfer Col1
		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',1,2);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		U_show_details('P7',1);
		C_pipette('D2','P6',1,7,'SS1',+0.2);
		C_pipette('D4','P7',1,1,'SS1',-0.2);
		U_show_details('TIPBOX4',1);
		U_show_details('P6',0);
		U_show_details('P7',0);
		C_drop_tips('TIPBOX4','C2',1,1);
		U_show_details('TIPBOX4',0);

	// SS1 transfer Col2
		U_show_details('TIPBOX1',1);
		C_load_tips('TIPBOX1','C3',1,1);
		U_show_details('TIPBOX1',0);

		U_show_details('P6',1);
		U_show_details('P7',1);
		C_pipette('D2','P6',1,7,'SS1',+0.2);
		C_pipette('D4','P7',1,2,'SS1',-0.2);
		U_show_details('TIPBOX4',1);
		U_show_details('P6',0);
		U_show_details('P7',0);
		C_drop_tips('TIPBOX4','C2',1,2);
		U_show_details('TIPBOX4',0);

	// Changing tip boxes

					U_show_narrative_extended(
						'We ran out of the tips in the tip box at C3, so we ' +
						'discard it and place a full one (from A1) to its position. ' +
						'');

		C_discard_labware('TIPBOX1');
		C_move_labware('TIPBOX2','C3');

	// SS1 transfer Col3

		U_show_details('TIPBOX2',1);
		C_load_tips('TIPBOX2','C3',1,12);
		U_show_details('TIPBOX2',0);

		U_show_details('P6',1);
		U_show_details('P7',1);
		C_pipette('D2','P6',1,7,'SS1',+0.2);
		C_pipette('D4','P7',1,3,'SS1',-0.2);
		U_show_details('TIPBOX4',1);
		U_show_details('P6',0);
		U_show_details('P7',0);
		C_drop_tips('TIPBOX4','C2',1,3);

	// SS mixing

					U_show_narrative_extended(
						'Now we can take the saved tips and use them for mixing.' +
						'');

		C_load_tips('TIPBOX4','C2',3,1);
		U_show_details('TIPBOX4',0);
		U_show_details('P7',1);
		C_mix('D4','P7',3,1,'SS1',0.2);
		C_discard_tips	();
		C_move_head('A5');

	// intervention #3
					U_show_narrative_extended(
						'The machine stops for the third time, the operator is asked to take the plate with samples, ' +
						'seal it with film and place it on a PCR cycler. In the cycler,' +
						'the samples are <mark>incubated at 98&#x2103; for 10 minutes, ' +
						'then cooled down slowly to 25&#x2103;.</mark> ' +
						'<p>The operator then removes the sealing film, places the plate back on the deck, ' +
						'and resumes the run.' +
						'');

		C_move_labware('P7','Desk');
		C_move_labware('P7','PCR');
		C_prepare_and_place_plate('SealingFilmForHSP96','P7Film','PCR',null);
		C_heat('PCR',standardHeatTime,1);
		C_discard_labware('P7Film');
		C_move_labware('P7','Desk');
		C_move_labware('P7','D4');

					U_show_narrative_extended(
						'We now leave the samples <mark> incubate at 25&#x2103; for 30 minutes.</mark> ' +
						' on the thermal unit located at D4.' +
						'The second strand of th cDNA is being synthetized.' +
						'');

		C_heat('D4',extraLongHeatTime,0);

	// during incubation

		C_discard_labware('P10');
		C_move_labware('P11','A3');

	// prearray SS2/E2

					U_show_narrative_extended(
						'During the incubation, we pre-array the reagents ' +
						'<mark>SS2/E2 (Second strand synthesis mix No.2 with enzyme E2)</mark> and ' +
						'<mark>PM/E3 (PCR mix with enzyme E3)</mark>. ' +
						'<p> But since the first 384-well plate has already been used up, we took a second one to its place. ' +	'');

		U_show_details('TIPBOX2',1);
		C_load_tips('TIPBOX2','C3',1,11);
		U_show_details('TIPBOX2',0);
		U_show_details('P6',1);
		C_pipette('D2','P6',1,6,'SS2/E2',0.6);
		U_show_details('P6',0);

		U_show_details('P11',1);
		C_pipette_384('A3','P11',1,1,'A1','SS2/E2',-0.2);
		C_pipette_384('A3','P11',1,2,'A1','SS2/E2',-0.2);
		C_pipette_384('A3','P11',1,3,'A1','SS2/E2',-0.2);
		U_show_details('P11',0);
		C_discard_tips	();

	// prearray PM/E3

		U_show_details('TIPBOX2',1);
		C_load_tips('TIPBOX2','C3',1,10);
		U_show_details('TIPBOX2',0);
		U_show_details('P6',1);
		C_pipette('D2','P6',1,6,'PM/E3',0.9);
		U_show_details('P6',0);

		U_show_details('P11',1);
		C_pipette_384('A3','P11',1,1,'A2','PM/E3',-0.3);
		C_pipette_384('A3','P11',1,2,'A2','PM/E3',-0.3);
		C_pipette_384('A3','P11',1,3,'A2','PM/E3',-0.3);
		U_show_details('P11',0);
		C_discard_tips	();

		C_discard_labware('P6');
		C_move_labware('P12','D2');

	// add SS2/E2
					U_show_narrative_extended(
						'We add the ' +
						'<mark>SS2/E2 (Second strand synthesis mix No.2 with enzyme E2)</mark> reagent ' +
						'from the prearrayed aliquots. ' +
						'');

		U_show_details('TIPBOX2',1);
		C_load_tips('TIPBOX2','C3',3,7);
		U_show_details('TIPBOX2',0);

		U_show_details('P7',1);
		U_show_details('P11',1);
		C_pipette_384('A3','P11',3,1,'A1','SS2/E2',+0.2);
		U_show_details('P11',0);
		C_pipette('D4','P7',3,1,'SS2/E2',-0.2);
		C_mix('D4','P7',3,1,'SS2/E2',0.50);

	// incubation at D4 for 15 minutes

					U_show_narrative_extended(
						'We now leave the samples <mark> incubate at 25&#x2103; for 15 minutes.</mark> ' +
						' on the thermal unit located at D4. ' +
						'<p> A double-stranded cDNA library is created.' +
						'');

		C_heat('D4',standardHeatTime,0);
		U_wait(standardWaitTime);
}

function autoQuantSeq5() {

	// PURIFICATION
					U_show_narrative_extended(
						'Using <em>magnetic beads</em>, the double-stranded library is purified ' +
						' to remove all other reaction components.' +
						' We begin by thoroughly resuspending/mixing the stock of the magnetic beads.' +
						'');

	// Mix and transfer beads

		U_show_details('P2',1);
		C_mix('B2a','P2',3,1,'PB',0.6);

					U_show_narrative_extended(
						'We transfer the magnetic beads to the reaction, mix and leave ' +
						' <mark>incubate on shaker (D4) at 20&#x2103; and 500 rpm for 5 minutes </mark>. ' +
						'');

		C_pipette('B2a','P2',3,1,'PB',0.6);
		U_show_details('P7',1);
		C_pipette('D4','P7',3,1,'PB',-0.6);
		C_move_head('A5');
		U_show_details('P2',0);

		C_discard_labware('P2');
		C_move_labware('P3','A4');		

	//incubation at D4 for 5 minutes

		C_shake('P7',standardShakeTime);

	// move to magnet and separate

					U_show_narrative_extended(
						'We now move the plate with the beads to the magnetic plate at C4, ' +
						'leave the beads <mark>separate on magnet for 5 minutes </mark>, ' +
						'then aspirate the supernatant and  discard it to waste.' +
						'<p>Then we take new tips</p>' +
						'');

						
		C_move_labware('P7','C4');
		C_incubate_on_magnet('C4',standardHeatTime,1);
		C_pipette('C4','P7',3,1,'SN',1.0);
		U_show_details('WASTE',1);
		C_pipette('A5','WASTE',3,1,'SN',-1.0);
		C_discard_tips	();
		U_show_details('WASTE',0);

	// add elution buffer

					U_show_narrative_extended(
						'We take new tips, move the plate away from the magnet, ' +
						'and transfer <mark>elution buffer</mark> to the beads. ' +
						'We let the beads resuspend in the elution buffer by ' +
						'<mark>incubating on shaker (D4) at 20&#x2103; and 500 rpm for 2 minutes </mark>.' +
						'');

		U_show_details('TIPBOX2',1);
		C_load_tips('TIPBOX2','C3',3,4);
		U_show_details('TIPBOX2',0);
		C_move_labware('P7','D4');

		U_show_details('P4',1);
		C_pipette('C5','P4',3,1,'EB',0.3);
		C_pipette('D4','P7',3,1,'EB',-0.3);
		U_show_details('P4',0);
		C_mix('D4','P7',3,1,'EB',0.25);
		C_move_head('A5');

	//incubation at D4 for 2 minutes

		C_shake('P7',standardShakeTime);
		U_wait(standardShakeTime);		

	// add PS
					U_show_narrative_extended(
						'We add purification solution, mix, and again ' +
						'<mark>incubate on shaker (D4) at 20&#x2103; and 500 rpm for 5 minutes </mark>.' +
						'');

		U_show_details('P3',1);
		C_pipette('A4','P3',3,1,'PS',0.6);
		C_pipette('D4','P7',3,1,'PS',-0.6);
		U_show_details('P3',0);
		C_mix('D4','P7',3,1,'PS',0.7);
		C_move_head('D5');

	//incubation at D4 for 5 minutes

		C_shake('P7',standardShakeTime);
		U_wait(standardShakeTime);		

	// move to magnet and separate

				U_show_narrative_extended(
						'We move the plate back to the magnet, ' +
						'leave the beads <mark>separate on magnet for 5 minutes </mark>, ' +
						'then aspirate the supernatant and  discard it to waste.' +
						'');

		C_move_labware('P7','C4');
		C_incubate_on_magnet('C4',standardHeatTime,1);
		C_pipette('C4','P7',3,1,'SN',1.0);
		U_show_details('WASTE',1);
		C_pipette('A5','WASTE',3,1,'SN',-1.0);
		U_show_details('WASTE',0);

	// wash twice with EtOH

					U_show_narrative_extended(
						'We are now <mark>washing the beads with ethanol</mark>. We first remove the lid from the ethanol deep well plate, ' +
						'transfer some ethanol to the beads on magnet, leave them washing, then remove the ethanol ' +
						'and discard it to waste. <p>We repeat the same process once again for a total of two washes.</p>' +
						'');

		U_show_details('P1',1);
		C_move_labware('P1Lid','B4');

		C_pipette('B5','P1',3,1,'EtOH',0.4);
		C_pipette('C4','P7',3,1,'EtOH',-0.4);
		U_show_details('P1',0);
		U_show_details('WASTE',1);
		C_incubate_on_magnet('C4',standardHeatTime,1);
		C_pipette('C4','P7',3,1,'EtOH',0.4);
		C_pipette('A5','WASTE',3,1,'EtOH',-0.4);

		U_show_details('P1',1);
		C_pipette('B5','P1',3,1,'EtOH',0.4);
		C_pipette('C4','P7',3,1,'EtOH',-0.4);
		U_show_details('P1',0);
		C_incubate_on_magnet('C4',standardHeatTime,1);
		C_pipette('C4','P7',3,1,'EtOH',0.4);
		C_pipette('A5','WASTE',3,1,'EtOH',-0.4);

					U_show_narrative_extended(
						'We aspirate and discard the rests of ethanol once again. Then we close the ethanol plate ' +
						'with the lid again and let the beads dry on the magnet for 5 minutes</mark>. ' +
						'Then we move the plate away from the magnet.' +
						'');

		C_pipette('C4','P7',3,1,'EtOH',0.1);	// EtOH residuals
		C_pipette('A5','WASTE',3,1,'EtOH',-0.1);

		C_discard_tips();
		U_show_details('WASTE',0);
		C_move_labware('P1Lid','B5');

		C_incubate_on_magnet('C4',standardHeatTime,1);  		// drying on magnet

		C_move_labware('P7','D4');

	// changing tip boxes

					U_show_narrative_extended(
						'We ran out of the tips in the work box again, so we discard it and take a new one from B1. ' +
						'');

		C_discard_labware('TIPBOX2');
		C_move_labware('TIPBOX3','C3');

	// add elution buffer

					U_show_narrative_extended(
						'We add <mark>elution buffer</mark>, resuspend the beads in it by mixing and then ' +
						'<mark>incubating on shaker (D4) at 20&#x2103; and 500 rpm for 2 minutes </mark>.' +
						'');

		U_show_details('TIPBOX3',1);
		C_load_tips('TIPBOX3','C3',3,10);
		U_show_details('TIPBOX3',0);

		U_show_details('P4',1);
		C_pipette('C5','P4',3,1,'EB',0.3);
		C_pipette('D4','P7',3,1,'EB',-0.3);
		U_show_details('P4',0);
		C_mix('D4','P7',3,1,'EB',0.25);

		C_discard_tips();

	//incubation at D4 for 2 minutes

		C_shake('P7',standardShakeTime);

	// move to magnet and separate

					U_show_narrative_extended(
						'We move the plate back to the magnet, ' +
						'leave the beads <mark>separate on magnet for 5 minutes </mark>, ' +
						'take new tips, aspirate the eluate and transfer it to a empty plate which is ready at D2.' +
						'');

		C_move_labware('P7','C4');
		C_incubate_on_magnet('C4',standardHeatTime,1);

		U_show_details('TIPBOX3',1);
		C_load_tips('TIPBOX3','C3',3,7);
		U_show_details('TIPBOX3',0);

	// transfer eluate

		U_show_details('P12',1);
		C_pipette('C4','P7',3,1,'Eluate',1);
		C_pipette('D2','P12',3,1,'Eluate',-0.5);
		U_show_details('P7',0);

	// add PM/E3

					U_show_narrative_extended(
						'We add the <mark>PM/E3 (PCR mix with E3 enzyme)</mark> from the prearrayed aliquots, ' +
						'the open the lid of the barcode plate, <mark> add the barcodes</mark>.  ' +
						'and mix.' +
						'');

		U_show_details('P11',1);
		C_pipette_384('A3','P11',3,1,'A2','PM/E3',0.3);
		U_show_details('P11',0);
		C_pipette('D2','P12',3,1,'PM/E3',-0.3);

		C_discard_labware('P5Lid');

	// add BC

		C_pipette('A2','P5',3,1,'BC',0.6);
		C_pipette('D2','P12',3,1,'BC',-0.6);
		C_mix('D2','P12',3,1,'BC',0.5);


	// finalize

				U_show_narrative_extended(
						'We discard the tips, move head to a rear position where it will not obstruct the deck. ' +
						'The plate with the libraries is ready for amplification. ' +
						'<p>This completes the first (prePCR) phase of the <mark>autoQuantSeq</mark> protocol.</p>' +
						'');
		C_discard_tips();
		C_move_head('A1');
		C_move_labware('P12','Desk');

}

function autoQuantSeq6() {

	// PostPCR on Zephyr
				U_show_narrative_extended(
						'To <mark>amplify the libraries</mark>, we place the plate to the PCR cycler ' +
						'and run the following program (typically 12 cycles): ' +
						'<p>98&#x2103; for 10 seconds</p>' +
						'<p>65&#x2103; for 20 seconds</p>' +
						'<p>72&#x2103; for 30 seconds</p>' +
						'');
		C_move_labware('P12','PCR');
		C_prepare_and_place_plate('SealingFilmForHSP96','P12Film','PCR',null);
		C_heat('PCR',standardHeatTime,1);
		C_heat('PCR',standardHeatTime,1);
		C_discard_labware('P12Film');

				U_show_narrative_extended(
						'The PostPCR purification step follows. This step will be presented ' +
						'on another deck type, similar to the <em>PerkinElmer Zephyr</em> liquid handler.' +
						'');
		U_wait(standardWaitTime);
		C_set_deck('ZEPHYR');

	//IH140724 TODO  C_prepare_and_place_plate is not appropriate here, implement some instant plate creator
		C_prepare_and_place_plate('HSP96','P12','PCR',
					[{column:1,liquidClass: 'BC',relativeVolume:0.6},
				     {column:2,liquidClass: 'BC',relativeVolume:0.6},
					 {column:3,liquidClass: 'BC',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );

				U_show_narrative_extended(
						'We have to fill the labware with reagents and place it on the deck.' +
						'');

		U_show_details('PIPETTOR1',0);

		C_prepare_and_place_tip_box('TIPBOX11','C3',1);
		U_show_details('P12',0);
		U_show_details('TIPBOX11',0);

					U_show_narrative_extended(
						'We place a <mark>deepwell plate for waste</mark> ' +
						'and another <mark>deep well plate filled with ethanol</mark>. ' +
						'');

		C_prepare_and_place_plate('DeepWell96','WASTE2','B4',null,{"columnShownTo": 2});

		C_prepare_and_place_plate('DeepWell96','P11','C4',
					[{column:1,liquidClass: 'EtOH',relativeVolume:0.9},
				     {column:2,liquidClass: 'EtOH',relativeVolume:0.9},
					 {column:3,liquidClass: 'EtOH',relativeVolume:0.9}],
					 {"columnShownTo": 2}
					 );
		U_show_details('WASTE2',0);

					U_show_narrative_extended(
						'We fill an <mark>HSP-96 plate with magnetic beads</mark> and place it on deck. ' +
						'');

		C_prepare_and_place_plate('HSP96','P22','C2',
					[{column:1,liquidClass: 'PB',relativeVolume:0.6},
				     {column:2,liquidClass: 'PB',relativeVolume:0.6},
					 {column:3,liquidClass: 'PB',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_show_details('P11',0);

					U_show_narrative_extended(
						'We fill an <mark>HSP-96 plate with elution buffer</mark> and place it on deck. ' +
						'');

		C_prepare_and_place_plate('HSP96','P23','B2',
					[{column:1,liquidClass: 'EB',relativeVolume:0.6},
				     {column:2,liquidClass: 'EB',relativeVolume:0.6},
					 {column:3,liquidClass: 'EB',relativeVolume:0.6}],
					 {"columnShownTo": 2}
					 );
		U_show_details('P22',0);

					U_show_narrative_extended(
						'We add an empty HSP-96 plate to be filled with the final purified libraries. ' +
						'');

		U_show_details('P23',0);
		C_prepare_and_place_plate('HSP96','P24','B3',null,{"columnShownTo": 2});

					U_show_narrative_extended(
						'Finally, we place the plate with amplified libraries ' +
						'on the deck and start the run.' +
						'');

		C_move_labware('P12','A3');

					U_show_narrative_extended(
						'The run starts by adding the samples to the magnetic beads.' +
						'');
		U_show_details('PIPETTOR1',1);
		U_show_details('P24',0);

		U_show_details('TIPBOX11',1);
		C_load_tips('TIPBOX11','C3',3,10);
		U_show_details('TIPBOX11',0);

		U_show_details('P12',1);
		U_show_details('P22',1);
		C_pipette('A3','P12',3,1,'BC',0.6);
		C_pipette('C2','P22',3,1,'BC',-0.6);
		U_show_details('P12',0);
		C_mix('C2','P22',3,1,'BC',0.4);

	// manual intervention
					U_show_narrative_extended(
						'The machine stops and the operator is asked to remove ' +
						'the used plate from the deck, then to resume the run.' +
						'');

		C_discard_labware('P12');
		U_show_details('P22',0);

	// plate moves

			U_show_narrative_extended(
						'We do some labware moves to free the location we will need ... ' +
						'');

		C_move_labware('P24','A3');
		C_move_labware('P22','B3');
		C_move_labware('P24','C2');

					U_show_narrative_extended(
						'The libraries are now ' +
						'<mark>incubating on shaker (B3) at 25&#x2103; and 500 rpm for 10 minutes </mark>.' +
						'');

	//incubation at B3 for 5 minutes

		U_show_details('P22',1);
		C_shake('P22',standardShakeTime);
		U_wait(standardShakeTime);		

	// separation on magnet

				U_show_narrative_extended(
						'We move the plate to the magnet, ' +
						'leave the beads <mark>separate on magnet for 10 minutes </mark>, ' +
						'then aspirate the supernatant and  discard it to waste.' +
						'');

		U_show_details('P22',1);
		C_move_labware('P22','A3');
		C_incubate_on_magnet('A3',standardHeatTime,1);
		C_pipette('A3','P22',3,1,'SN',1);
		U_show_details('WASTE2',1);
		C_pipette('B4','WASTE2',3,1,'SN',-1);
		U_show_details('WASTE2',0);
		C_discard_tips('A4');


	// wash twice with EtOH

					U_show_narrative_extended(
						'We are now <mark>washing the beads with ethanol</mark>. ' +
						' We transfer some ethanol to the beads on magnet, leave them washing, then remove the ethanol ' +
						'and discard it to waste. <p>We repeat the same process once again for a total of two washes.</p>' +
						'');

		U_show_details('P21',1);
		C_load_tips('TIPBOX11','C3',3,7);
		C_pipette('C4','P21',3,1,'EtOH',0.45);
		C_pipette('A3','P22',3,1,'EtOH',-0.45);
		U_show_details('P21',0);
		U_show_details('WASTE2',1);
		C_incubate_on_magnet('A3',standardHeatTime,1);
		C_pipette('A3','P22',3,1,'EtOH',0.45);
		C_pipette('B4','WASTE2',3,1,'EtOH',-0.45);
		U_show_details('WASTE2',0);

		U_show_details('P21',1);
		C_pipette('C4','P21',3,1,'EtOH',0.45);
		C_pipette('A3','P22',3,1,'EtOH',-0.45);
		U_show_details('P21',0);
		U_show_details('WASTE2',1);
		C_incubate_on_magnet('A3',standardHeatTime,1);
		C_pipette('A3','P22',3,1,'EtOH',0.45);
		C_pipette('B4','WASTE2',3,1,'EtOH',-0.45);
	

					U_show_narrative_extended(
						'We aspirate and discard the rests of ethanol once again. Then we close the ethanol plate ' +
						'with the lid again and let the beads dry on the magnet for 5 minutes</mark>. ' +
						'Then we move the plate away from the magnet.' +
						'');
		
		C_pipette('A3','P22',3,1,'EtOH',0.1);	// EtOH residuals
		C_pipette('B4','WASTE2',3,1,'EtOH',-0.1);
		C_discard_tips('A4');

					U_show_narrative_extended(
						'We move the plate to a thermal unit and leave the beads ' +
						'<mark>drying out at 37&#x2103; for 3 minutes </mark>, ' +
						'then we cool down the plate to 25&#x2103;' +
						'');
						
		C_move_labware('P22','B3');
		U_show_details('WASTE2',0);
		C_heat('B3',standardHeatTime,1);
		
	// adding elution buffer
	
					U_show_narrative_extended(
						'We transfer <mark>elution buffer</mark> to the beads and resuspend them by mixing ' +
						' and <mark>shaking (B3) at 25&#x2103; and 500 rpm for 3 minutes </mark>.');
						
		U_show_details('P23',1);
		C_load_tips('TIPBOX11','C3',3,4);
		C_pipette('B2','P23',3,1,'EB',0.6);
		C_pipette('B3','P22',3,1,'EB',-0.6);
		C_mix('B3','P22',3,1,'EB',0.5);
		U_show_details('P23',0);
		
		C_shake('P22',standardShakeTime);
		U_wait(standardShakeTime);		
		
	// separation on magnet

				U_show_narrative_extended(
						'We move the plate to the magnet, ' +
						'leave the beads <mark>separate on magnet for 3 minutes </mark>, ' +
						'then, using new tips,  transfer the supernatant to the final plate' +
						'');

		U_show_details('P22',1);
		C_move_labware('P22','A3');
		
		C_incubate_on_magnet('A3',standardHeatTime,1);
		
		U_show_details('TIPBOX11',1);
		C_load_tips('TIPBOX11','C3',3,1);
		U_show_details('TIPBOX11',0);
		
		U_show_details('P24',1);
		C_pipette('A3','P22',3,1,'SN',0.6);
		C_pipette('C2','P24',3,1,'SN',-0.6);

		C_discard_tips('A4');
		C_move_head('A2');
		C_move_labware('P22','A3');
		
		U_show_narrative_extended(
						'<mark>The protocol is finished</mark>. The final plate contains ' +
						'purified RNA libraries.' +
						'');

						
		C_move_labware('P22','Desk');
		U_wait(standardWaitTime);
}