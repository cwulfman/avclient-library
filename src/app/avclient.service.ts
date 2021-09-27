import { Injectable } from '@angular/core';
import { StatusCode } from './statuscode';
import { Receipt } from './receipt';
import { CastVoteRecord } from './castvoterecord';
import { Affidavit } from './affidavit'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AvclientService {
    _serverURL: any;
    _status: StatusCode = StatusCode.Uninitialized;
    _cachedAccessCode: any;

    constructor() { }

    initialize(): void {
	this._status = StatusCode.Initialized
    }

    get serverURL() {
	return this._serverURL;
    }

    set serverURL(value) {
	this._serverURL = value;
    }

    status() {
	return this._status;
    }

    constructBallotCryptograms(cvr: CastVoteRecord): Promise<string> {
	return new Promise((resolve, reject) => {
	    switch(this._cachedAccessCode) {
		case '00006':
		    reject(new Error(StatusCode.CallOutOfOrderError));
		    break;
		case '00007':
		    reject(new Error(StatusCode.NetworkError));
		    break;
		case '00008':
		    reject(new Error(StatusCode.CorruptCVRError));
		    break;
		default:
		    resolve('zyx098-wvu765-tsr432-1234');
	    }

	})
    }

    generateTestCode():string {
	return '5e4d8fe41fa3819cc064e2ace0eda8a847fe322594a6fd5a9a51c699e63804b7'
    }

    purgeData(): void {
	delete this._cachedAccessCode;
    }

    registerVoter() {}

    requestAccessCode(opaqueVoterId: string): Promise<void> {
	return new Promise((resolve, reject) => {
	    switch(opaqueVoterId) {
		case '00000':
		    reject(new Error(StatusCode.VoterRecordNotFound));
		    break;
		case '00001':
		    reject(new Error(StatusCode.NetworkError))
		    break;
		default:
		    resolve();
	    }
	})
    }


    spoilBallotCryptograms(): Promise<void> {
    	return new Promise((resolve, reject) => {
	    switch(this._cachedAccessCode) {
		case '00009':
		    reject(new Error(StatusCode.CallOutOfOrderError));
		    break;
		case '00010':
		    reject(new Error(StatusCode.NetworkError));
		    break;
		case '00011':
		    reject(new Error(StatusCode.ServerCommitmentError));
		    break;
		default:
		    resolve();
	    }
	})
    }

    submitBallotCryptograms(): Promise<Receipt> {
	return new Promise((resolve, reject) => {
	    switch(this._cachedAccessCode) {
		case '00012':
		    reject(new Error(StatusCode.NetworkError));
		    break;
		default:
		    resolve({
			previousBoardHash: 'tsr432-wvu765-zyx098-4321',
			boardHash: 'zyx098-wvu765-tsr432-1234',
			registeredAt: '2020-03-01T10:00:00.000+01:00',
			serverSignature: 'dbcce518142b8740a5c911f727f3c02829211a8ddfccabeb89297877e4198bc1,46826ddfccaac9ca105e39c8a2d015098479624c411b4783ca1a3600daf4e8fa',
			voteSubmissionId: 6
		    })
	    }
	});
    }

    validateAccessCode(code: string | string[], email: string): Promise<void> {
	return new Promise((resolve, reject) => {
	    this._cachedAccessCode = code;
	    switch(code) {
		case '00002':
		    reject(new Error(StatusCode.CallOutOfOrderError));
		    break;
		case '00003':
		    reject(new Error(StatusCode.AccessCodeExpired));
		    break;
		case '00004':
		    reject(new Error(StatusCode.AccessCodeInvalid));
		    break;
		case '00005':
		    reject(new Error(StatusCode.NetworkError));
		    break;
		default:
		    resolve();
		    
	    }
	})
    }
}
