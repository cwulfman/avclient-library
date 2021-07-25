// avclient.js

const statusCodes = require('./statuscodes').statusCodes

/**
 * Request that an access code be sent to the user
 * (outside of th app; e.g. email), based on Voter's 
 * input data.
 * @param {string} firstName voter's first name field
 * @param {string} lastName voter's last name field
 * @param {string} dob voter's date of birth field
 * @param {string} idNo either the ID number the voter used before
 * (DLN, state ID, SSN) or, if no ID number was provided, then
 * the voter record ID number returned by the previous lookup call.
 * @returns {string} status (success or network error)
 */
function AccessCodeRequest(firstName, lastName, dob, idNo) {
    if (idNo.match(/^0+$/))
	return statusCodes.networkError
    else
	return statusCodes.success
}

/**
 * If an input access code is valid, constructs crypto-ballot stuff
 * under the covers and returns a ballot fingerprint.
 * @param {string} CVR
 * @param {string} accessCode
 * @returns {object} Status, Fingerprint
 */
function AccessCodeConstruct (CVR, accessCode) {
    var n = 0;
    let status;
    let fingerPrint;
    currentCode(accessCode);
    switch(accessCode) {
    case '00000':
	status = statusCodes.invalid;
	break;
    case '00001':
	status = statusCodes.expired;
	break;
    case '00002':
	status = statusCodes.networkError;
	break;
    default:
	status = statusCodes.success;
	break;
    };

    if (status == statusCodes.success)
	fingerPrint = nextFP();
    else
	fingerPrint = '';

    return {'Status': status, 'Fingerprint': fingerPrint};
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
 * @param {string} fingerprint
 * @return {string} status (success/invalid/networkError)
 */
function Spoil(fingerPrint) {
    switch(currentCode()) {
    case '00003':
	return statusCodes.networkError;
    case '00004':
	return statusCodes.invalid;
    default:
	return statusCodes.success;
    }
}

/**
 * Purpose: input a ballot fingerprint of a ballot to send, along with
 * a couple files
 * @param {string} fingerprint
 * @param {string} affidavitPDF
 * @param {string} ballotPDF
 * @return {string} status
 */
function Send(fingerprint, affidavitPDF, ballotPDF) {
    switch(currentCode()) {
    case '00005':
	return statusCodes.networkError;
    case '00006':
	return statusCodes.invalid;
    default:
	return statusCodes.success;
    }
}

exports.AccessCodeRequest = AccessCodeRequest;
exports.AccessCodeConstruct = AccessCodeConstruct;
exports.Spoil = Spoil;
exports.Send = Send;
exports.currentCode = currentCode;
