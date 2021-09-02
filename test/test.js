const AVClient = require('../src/avclient');
const statusCodes = require('../src/statusCodes').statusCodes;
const expect = require('chai').expect;

describe('AVClient', function () {
    describe('constructor', function() {
	it('throws an AVClient', function() {
	    let client = new AVClient('someURL');
	    expect(client.serverURL).to.equal('someURL');
	});
    });

    describe('requestAccessCode', function() {
	it('throws VoterRecordNotFound if voter id is 00000', function() {
	    let client = new AVClient('someURL');
	    let opaqueVoterId = '00000';
	    return client.requestAccessCode(opaqueVoterId).catch(e => {
		expect(e.message).to.equal(statusCodes.VoterRecordNotFound);
	    });
	});
	it('throws NetworkError if voter id is 00001', function() {
	    let client = new AVClient('someURL');
	    let opaqueVoterId = '00001';
	    return client.requestAccessCode(opaqueVoterId).catch(e => {
		expect(e.message).to.equal(statusCodes.NetworkError);
	    });
	});
	it('returns undefined otherwise', function() {
	    let client = new AVClient('someURL');
	    let opaqueVoterId = '12345';
	    return client.requestAccessCode(opaqueVoterId).then(r => {
		expect(r).to.be.undefined;
	    });
	});

    });

    describe('validateAccessCode', function() {
	it('throws CallOutOfOrder if OTP code is 00002', function() {
	    let client = new AVClient('someURL');
	    let code = '00002';
	    return client.validateAccessCode(code, '').catch(e => {
		expect(e.message).to.equal(statusCodes.CallOutOfOrderError);
	    });
	});
	it('throws AccessCodeExpired if OTP code is 00003', function() {
	    let client = new AVClient('someURL');
	    let code = '00003';
	    return client.validateAccessCode(code, '').catch(e => {
		expect(e.message).to.equal(statusCodes.AccessCodeExpired);
	    });
	});
	it('throws AccessCodeInvalid if OTP code is 00004', function() {
	    let client = new AVClient('someURL');
	    let code = '00004';
	    return client.validateAccessCode(code, '').catch(e => {
		expect(e.message).to.equal(statusCodes.AccessCodeInvalid);
	    });
	});
	it('throws NetworkError if OTP code is 00005', function() {
	    let client = new AVClient('someURL');
	    let code = '00005';
	    return client.validateAccessCode(code, '').catch(e => {
		expect(e.message).to.equal(statusCodes.NetworkError);
	    });
	});
	it('returns undefined otherwise', function() {
	    let client = new AVClient('someURL');
	    let code = '12345';
	    return client.validateAccessCode(code, '').then(r => {
		expect(r).to.be.undefined;
		expect(client.cachedAccessCode).to.equal('12345');
	    });
	});
    });

    describe('constructBallotCryptograms', function() {
	it('throws CallOutOfOrderError if prior code was 00006', function() {
	    let client = new AVClient('someURL');
	    let code = '00006';
	    let cvr = { '1': 'option1', '2': 'optiona' };
	    client.validateAccessCode(code, '');
	    return client.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).to.equal(statusCodes.CallOutOfOrderError);
	    });
	});

	it('throws NetworkError if prior code was 00007', function() {
	    let client = new AVClient('someURL');
	    let code = '00007';
	    let cvr = { '1': 'option1', '2': 'optiona' };
	    client.validateAccessCode(code, '');
	    return client.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).to.equal(statusCodes.NetworkError);
	    });
	});

	it('throws CorruptCVRError if prior code was 00008', function() {
	    let client = new AVClient('someURL');
	    let code = '00008';
	    let cvr = { '1': 'option1', '2': 'optiona' };
	    client.validateAccessCode(code, '');
	    return client.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).to.equal(statusCodes.CorruptCVRError);
	    });
	});

	it('returns a fingerprint otherwise', function() {
	    let client = new AVClient('someURL');
	    let code = '12345';
	    let cvr = { '1': 'option1', '2': 'optiona' };
	    client.validateAccessCode(code, '');
	    return client.constructBallotCryptograms(cvr).then(fingerprint => {
		expect(fingerprint).to.equal('zyx098-wvu765-tsr432-1234');
	    });
	});
    });

    describe('spoilBallotCryptograms', function() {
	it('throws CallOutOfOrder if prior code was 00009 and returns undefined', function() {
	    let client = new AVClient('someURL');
	    let code = '00009';
	    client.validateAccessCode(code, '');
	    return client.spoilBallotCryptograms().then(r => {
		expect(r).to.be.undefined; }).catch(e => {
		expect(e.message).to.equal(statusCodes.CallOutOfOrderError);
	    });
	});

	it('throws NetworkError if prior code was 00010 and returns undefined', function() {
	    let client = new AVClient('someURL');
	    let code = '00010';
	    client.validateAccessCode(code, '');
	    return client.spoilBallotCryptograms().then(r => {
		expect(r).to.be.undefined; }).catch(e => {
		expect(e.message).to.equal(statusCodes.NetworkError);
	    });
	});

	it('throws ServerCommitmentError if prior code was 00011 and returns undefined', function() {
	    let client = new AVClient('someURL');
	    let code = '00011';
	    client.validateAccessCode(code, '');
	    return client.spoilBallotCryptograms().then(r => {
		expect(r).to.be.undefined; }).catch(e => {
		expect(e.message).to.equal(statusCodes.ServerCommitmentError);
	    });
	});

	it('returns undefined otherwise', function() {
	    let client = new AVClient('someURL');
	    let code = '12345';
	    client.validateAccessCode(code, '');
	    return client.spoilBallotCryptograms().then(r => {
		expect(r).to.be.undefined;
	    });
	});
    });

    describe('submitBallotCryptograms', function() {
	it('throws NetworkError if prior code was 00012', function() {
	    let client = new AVClient('someURL');
	    let code = '00012';
	    client.validateAccessCode(code, '');
	    return client.submitBallotCryptograms().catch(e => {
		expect(e.message).to.equal(statusCodes.NetworkError);
	    });
	});

	it('returns a vote receipt otherwise', function() {
	    let client = new AVClient('someURL');
	    let code = '12345';
	    client.validateAccessCode(code, '');
	    return client.submitBallotCryptograms().then(r => {
		expect(r.boardHash).to.equal('zyx098-wvu765-tsr432-1234');
	    });
	});
    });

    describe('purgeData', function() {
	it('deletes the serverURL and cachedAccessCode properties of the stub', function() {
	    let client = new AVClient('someURL');
	    let code = '12345';
	    client.validateAccessCode(code, '');
	    expect(client.serverURL).to.equal('someURL');
	    expect(client.cachedAccessCode).to.equal('12345');
	    client.purgeData();
	    expect(client.serverURL).to.equal('someURL');
	    expect(client.cachedAccessCode).to.be.undefined;
	});
    });
});

