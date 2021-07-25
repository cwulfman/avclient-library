// avclient.js

export const statusCodes = {
    success: 'success',
    invalid: 'invalid',
    networkError: 'network error',
    expired: 'expired'
};

export function AccessCodeRequest(firstName, lastName, dob, idNo) {
    if (idNo.match(/^0+$/))
	return statusCodes.networkError
    else
	return statusCodes.success
}

export function AccessCodeConstruct (CVR, accessCode) {
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


export var currentCode = (function(code) {
    var stashed = '';
    return function(code) {
	if (code)
	    stashed = code;
	return stashed; };
}());

export var nextFP = (function() {
    var counter = 0;
    var fingerprints = ['zyx098-wvu765-tsr432-1234',
			'tsr432-wvu765-zyx098-4321'];
    return function() { return fingerprints[counter++ % 2]; };
}());


var Toggle = (function() {
    var counter = 0;
    return function() { return counter++ % 2; };
}());


export function Spoil(fingerPrint) {
    switch(currentCode()) {
    case '00003':
	return statusCodes.networkError;
    case '00004':
	return statusCodes.invalid;
    default:
	return statusCodes.success;
    }
}

export function Send(fingerprint, affidavitPDF, ballotPDF) {
    switch(currentCode()) {
    case '00005':
	return statusCodes.networkError;
    case '00006':
	return statusCodes.invalid;
    default:
	return statusCodes.success;
    }
}
