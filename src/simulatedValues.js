require('fs');


const simulatedValues = {
    precinct_1: {
	cvr: fs.readFileSync('./src/files/port_precinct1/jetsons_port_precinct1_cvr.xml', 'utf-8'),
	affidavit: fs.readFileSync('./src/files/port_precinct1/precinct1_voter_affidavit.pdf', 'base64'),
	ballot: fs.readFileSync('./src/files/port_precinct1/jetsons_port-precinct1_ballot_marked.pdf', 'base64'),
    },
    precinct_2: {
	cvr: fs.readFileSync('./src/files/bedrock_precinct2/jetsons_bedrock-precinct2_cvr.xml', 'utf-8'),
	affidavit: fs.readFileSync('./src/files/bedrock_precinct2/precinct2_voter_affidavit.pdf', 'base64'),
	ballot: fs.readFileSync('./src/files/bedrock_precinct2/jetsons_bedrock-precinct2_ballot_marked.pdf', 'base64'),

    },
    precinct_3: {
	cvr: fs.readFileSync('./src/files/downtown_precinct3/jetsons_downtown-precinct3_cvr.xml', 'utf-8'),
	affidavit: fs.readFileSync('./src/files/downtown_precinct3/precinct3_voter_affidavit.pdf', 'base64'),
	ballot: fs.readFileSync('./src/files/downtown_precinct3/jetsons_downtown-precinct3_ballot_marked.pdf', 'base64'),

    },
    precinct_4: {
	cvr: fs.readFileSync('./src/files/spacetown_precinct4/jetsons_spacetown_precinct4_cvr.xml', 'utf-8'),
	affidavit: fs.readFileSync('./src/files/spacetown_precinct4/precinct4_voter_affidavit.pdf', 'base64'),
	ballot: fs.readFileSync('./src/files/spacetown_precinct4/jetsons_spacetown-precinct4_ballot_marked.pdf', 'base64'),

    },
}

exports.simulatedValues = simulatedValues;
