import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class VoterArtifactsService {
    precinctId: string;
    precinct: string;

    constructor(lastName: string) {
	let key = lastName.substring(0,1).toUpperCase();
	switch(key) {
	case 'A':
	    this.precinctId = "precinct_1";
	    this.precinct = "Precinct 1 Spaceport";
	    break;
	case 'B':
	    this.precinctId = "precinct_2";
	    this.precinct = "Precinct 2 Bedrock";
	    break;
	case 'C':
	    this.precinctId = "precinct_3";
	    this.precinct = "Precinct 3 Downtown";
	    break;
	default:
	    this.precinctId = "precinct_4";
	    this.precinct = "Precinct 4 Spacetown";

	};
    }

    public get cvr(): string {
	return "this is a cvr";
    }

    public get affidavit(): string {
	return "this is an affidavit";
    }

    public get ballot(): string {
	return "this is a ballot";
    }
}

