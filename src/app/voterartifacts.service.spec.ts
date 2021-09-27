import { TestBed } from '@angular/core/testing';
import { VoterArtifactsService } from './voterartifacts.service';

describe('VoterArtifactsService', () => {

    describe('constructor', function () {
	it('selects precinct_1 if last name begins with letter A', function() {
	    let artifact = new VoterArtifactsService("Allen");
	    expect(artifact.precinctId).toEqual('precinct_1');
	    expect(artifact.precinct).toEqual('Precinct 1 Spaceport');
	});
	it('selects precinct_2 if last name begins with letter B', function() {
	    let artifact = new VoterArtifactsService("Binda");
	    expect(artifact.precinctId).toEqual('precinct_2');
	    expect(artifact.precinct).toEqual('Precinct 2 Bedrock');
	});
	it('selects precinct_3 if last name begins with letter C', function() {
	    let artifact = new VoterArtifactsService("Cooper");
	    expect(artifact.precinctId).toEqual('precinct_3');
	    expect(artifact.precinct).toEqual('Precinct 3 Downtown');
	});
	it('selects precinct_4 by default', function() {
	    let artifact = new VoterArtifactsService("Zi");
	    expect(artifact.precinctId).toEqual('precinct_4');
	    expect(artifact.precinct).toEqual('Precinct 4 Spacetown');
	});
    });

    describe('cvr', () => {
	it('returns a string', () => {
	    let artifact = new VoterArtifactsService("Zi");
	    expect(artifact.cvr).toEqual("this is a cvr")
	});
    });

    describe('affidavit', () => {
	it('returns a string', () => {
	    let artifact = new VoterArtifactsService("Zi");
	    expect(artifact.affidavit).toEqual("this is an affidavit")
	});
    });
    
    describe('ballot', () => {
	it('returns a string', () => {
	    let artifact = new VoterArtifactsService("Zi");
	    expect(artifact.ballot).toEqual("this is a ballot")
	});
    });
});
