const avclient = require('../src/avclient');
const statusCodes = require('../src/statusCodes').statusCodes;
const expect = require('chai').expect;

describe('avclient', function () {
    describe('New', function() {
	it('returns true', function() {
	    expect(avclient.New("anything")).to.be.true;
	});
    });

    describe('RequestAccessCode', function () {
	it('returns `other error` if ID# is all zeros', function() {
	    expect(avclient.RequestAccessCode('0')).to.equal(statusCodes.otherError);
	    expect(avclient.RequestAccessCode('000')).to.equal(statusCodes.otherError);
	});

	it('returns `success` otherwise', function () {
	    expect(avclient.RequestAccessCode('12345')).to.equal(statusCodes.success);
	});
    });

    describe('ValidateAccessCode', function () {
	it('returns invalidAccessCode if accessCode is 00000', function() {
	    expect(avclient.ValidateAccessCode('00000')).to.equal(statusCodes.invalidAccessCode);
	});
	it('returns expiredAccessCode if accessCode is 00001', function() {
	    accessCode = '00001'
	    expectedStatus = statusCodes.expiredAccessCode;
	    expect(avclient.ValidateAccessCode(accessCode)).to.equal(expectedStatus);
	})

    });

    describe('ConstructBallotCryptograms', function() {
	it('returns otherError for code 00003', function() {
	    avclient.currentCode('00003');	    
	    expect(avclient.ConstructBallotCryptograms('').status).to.equal(statusCodes.otherError);
	});
	it('returns success for anything else (not exhaustively tested)', function() {
	    avclient.currentCode('00001');	    
	    expectedStatus = statusCodes.success;
	    expect(avclient.ConstructBallotCryptograms('').status).to.equal(expectedStatus);
	});
    });

    describe('SpoilBallotCryptograms', function() {
	it('returns otherError if statusCode is 00004', function() {
	    avclient.currentCode('00004')
	    expectedStatus = statusCodes.otherError;
	    expect(avclient.SpoilBallotCryptograms(accessCode)).to.equal(expectedStatus);
	});
	it('returns success for anything else (not exhaustively tested)', function() {
	    avclient.currentCode('00000')
	    expectedStatus = statusCodes.success;
	    expect(avclient.SpoilBallotCryptograms(accessCode)).to.equal(expectedStatus);
	});
    });

    describe('SendBallotCryptograms', function() {
	let _ = "";
	it('returns `otherError` if the current access code is `00005`',
	   function() {
	       avclient.currentCode('00005');
	       result = avclient.SendBallotCryptograms(_);
	       expect(result.status).to.equal(statusCodes.otherError);
	   });
	if('returns `success` for everything else',
	   function() {
	       avclient.currentCode('999999');
	       result = avclient.SendBallotCryptograms(_);
	       expect(result.status).to.equal(statusCodes.success);
	       expect(result.recept).to.equal('AdBoCr1e2m3i');
	   });
    });
    
    describe('PurgeData', function() {
	let _ = "";
	it('returns `otherError` if the current access code is `00006`',
	   function() {
	       avclient.currentCode('00006');
	       expect(avclient.PurgeData()).to.equal(statusCodes.otherError);
	   });
	if('returns `success` for everything else',
	   function() {
	       avclient.currentCode('999999');
	       expect(avclient.PurgeData()).to.equal(statusCodes.success);
	   });
    });
    
    describe('currentCode', function() {
	it('returns stashed value', function() {
	    avclient.currentCode('123');	    
	    expect(avclient.currentCode()).to.equal('123');
	});
    });
});

