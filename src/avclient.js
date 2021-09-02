// avclient.js
const statusCodes = require('./statusCodes').statusCodes;

class AVClient {

    constructor(bulletinBoardURL) {
	this.serverURL = bulletinBoardURL;
    }

    purgeData() {
	delete this.cachedAccessCode;
    }

    requestAccessCode(opaqueVoterId) {
	return new Promise((resolve, reject) => {
	    switch(opaqueVoterId) {
	    case '00000':
		reject(new Error(statusCodes.VoterRecordNotFound));
	    case '00001':
		reject(new Error(statusCodes.NetworkError));
	    default:
		resolve();
	    }
	})
    }

    validateAccessCode(code, email) {
	return new Promise((resolve, reject) => {
	    this.cachedAccessCode = code
	    switch(code) {
	    case '00002':
		reject(new Error(statusCodes.CallOutOfOrderError));
	    case '00003':
		reject(new Error(statusCodes.AccessCodeExpired));
	    case '00004':
		reject(new Error(statusCodes.AccessCodeInvalid));
	    case '00005':
		reject(new Error(statusCodes.NetworkError));
	    default:
		resolve();
	    }
	})
    }

    // Should not be idempotent.  Instead, permute one of
    // john's sample strings.
    constructBallotCryptograms(cvr) {
	return new Promise((resolve, reject) => {
	    switch(this.cachedAccessCode) {
	    case '00006':
		reject(new Error(statusCodes.CallOutOfOrderError));
	    case '00007':
		reject(new Error(statusCodes.NetworkError));
	    case '00008':
		reject(new Error(statusCodes.CorruptCVRError));
	    default:
		resolve('zyx098-wvu765-tsr432-1234');
	    }
	})
    }

    spoilBallotCryptograms() {
	return new Promise((resolve, reject) => {
	    switch(this.cachedAccessCode) {
	    case '00009':
		reject(new Error(statusCodes.CallOutOfOrderError));
	    case '00010':
		reject(new Error(statusCodes.NetworkError));
	    case '00011':
		reject(new Error(statusCodes.ServerCommitmentError));
	    default:
		resolve();
	    }
	})
    }

    submitBallotCryptograms() {
	return new Promise((resolve, reject) => {
	    switch(this.cachedAccessCode) {
	    case '00012':
		reject(new Error(statusCodes.NetworkError));
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

    test(code) {
	this.purgeData();
	this.requestAccessCode(code);
	this.validateAccessCode(code);
	this.constructBallotCryptograms();
	this.spoilBallotCryptograms();
	this.constructBallotCryptograms();
	this.submitBallotCryptograms().then(receipt => {console.log(receipt)});
    }
};

module.exports = AVClient;
