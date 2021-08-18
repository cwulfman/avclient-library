// avclient.js

const statusCodes = require('./statusCodes').statusCodes

/**
 * Provide a URL for the library to use
 * @param {string} URL
 * @returns true
 */
function New(URL) {
    return true
}

/**
 * Request that an access code be sent to the user (outside of th app;
 * e.g. email), based on Voter’s ID# is either (a) the ID number the
 * voter used before (DLN, state ID, SSN) or (b) if no ID# was
 * provided, then provide the voter record ID number returned by the
 * previous lookup call.
 * @param {string} IDnumber Voter's ID number
 * @returns {string} status (success or otherError)
 */
function RequestAccessCode(IDnumber) {
    if (IDnumber.match(/^0+$/))
	return statusCodes.otherError
    else
	return statusCodes.success
}

/**
 * Validate an access code
 * @param {string} accesCode
 * @return {string} statuscode
 */
function ValidateAccessCode(accessCode) {
    currentCode(accessCode);
    switch(accessCode) {
    case '00000':
	return statusCodes.invalidAccessCode;
    case '00001':
	return statusCodes.expiredAccessCode;
    case '00002':
	return statusCodes.otherError;
    default:
	return statusCodes.success;
    }
}

/**
 * Constructs crypto-ballot stuff under the covers,
 * and returns a ballot fingerprint if return status is "success".
 * Stub Functionality: Any string will do for the CVR, which is not used in
 * the stub.  If the access code from the previous call is 00003
 * return status of “otherError”, and empty fingerprint.  Otherwise
 * return Status of “success” and a fingerprint that is either of two
 * values, depending on prior calls; whichever one was returned
 * previously, use the other one zyx098-wvu765-tsr432-1234 or
 * tsr432-wvu765-zyx098-4321
 * @param {string} CVR
 * @returns {object} Status, Fingerprint
 */
function ConstructBallotCryptograms(CVR) {
    let status;
    let fingerprint;
    switch(currentCode()) {
    case '00003':
	return {'status': statusCodes.otherError,
		'fingerprint': ''};
	break;
    default:
	return {'status': statusCodes.success,
		'fingerprint': nextFP()};
	break;
    }
}

const currentCode = (function(code) {
    var stashed = '';
    return function(code) {
	if (code)
	    stashed = code;
	return stashed; };
}())

const nextFP = (function() {
    var counter = 0;
    var fingerprints = ['zyx098-wvu765-tsr432-1234',
			'tsr432-wvu765-zyx098-4321'];
    return function() { return fingerprints[counter++ % 2]; };
}())

/**
 * Purpose: input a ballot fingerprint to invalidate
 * (aka spoil)
 * @return {string} status (success/otherError)
 */
function SpoilBallotCryptograms() {
    switch(currentCode()) {
    case '00004':
	return statusCodes.otherError;
    default:
	return statusCodes.success;
    }
}

/**
 * Purpose: add a PDF file to the ballot, and send them
 * @param {string} affidavitPDF
 * @return {string} status
 */
function Send(fingerprint, affidavitPDF, ballotPDF) {
    switch(currentCode()) {
    case '00005':
	return statusCodes.otherError;
    default:
	return statusCodes.success;
    }
}

/**
 * Call to tell library to purge data
 * @return {string} status (success or otherError)
 */
function PurgeData() {
    switch(currentCode()) {
    case '00006':
	return statusCodes.otherError;
    default:
	return statusCodes.success;
    }
}



exports.New = New;
exports.RequestAccessCode = RequestAccessCode;
exports.ValidateAccessCode = ValidateAccessCode;
exports.ConstructBallotCryptograms = ConstructBallotCryptograms;
exports.SpoilBallotCryptograms = SpoilBallotCryptograms;
exports.Send = Send;
exports.PurgeData = PurgeData;
exports.currentCode = currentCode;
