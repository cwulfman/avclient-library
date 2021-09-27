import { TestBed } from '@angular/core/testing';

import { AvclientService } from './avclient.service';
import { StatusCode } from './statuscode';
import { Receipt } from './receipt';
import { CastVoteRecord } from './castvoterecord';
import { Affidavit } from './affidavit'

describe('AvclientService', () => {
    let service: AvclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvclientService);
  });
    
    it('should return a test code', () => {
	expect(service.generateTestCode()).
	    toEqual('5e4d8fe41fa3819cc064e2ace0eda8a847fe322594a6fd5a9a51c699e63804b7')
    });

    describe('requestAccessCode', () => {
	it('throws VoterRecordNotFound if voter id is 00000', function() {
	    let opaqueVoterId = '00000';
	    return service.requestAccessCode(opaqueVoterId).catch(e => {
		expect(e.message).toEqual(StatusCode.VoterRecordNotFound);
	    });
	});

	it('throws NetworkError if voter id is 00001', function() {
	    let opaqueVoterId = '00001';
	    return service.requestAccessCode(opaqueVoterId).catch(e => {
		expect(e.message).toEqual(StatusCode.NetworkError);
	    });
	});

	it('returns undefined otherwise', function() {
	    let opaqueVoterId = '12345';
	    return service.requestAccessCode(opaqueVoterId).then(r => {
		expect(r).not.toBeDefined();
	    });
	});

    });

    describe('validateAccessCode', function() {
	it('throws CallOutOfOrder if OTP code is 00002', function() {
	    let code = '00002';
	    return service.validateAccessCode(code, '').catch(e => {
		expect(e.message).toEqual(StatusCode.CallOutOfOrderError);
	    });
	});
	it('throws AccessCodeExpired if OTP code is 00003', function() {
	    let code = '00003';
	    return service.validateAccessCode(code, '').catch(e => {
		expect(e.message).toEqual(StatusCode.AccessCodeExpired);
	    });
	});
	it('throws AccessCodeInvalid if OTP code is 00004', function() {
	    let code = '00004';
	    return service.validateAccessCode(code, '').catch(e => {
		expect(e.message).toEqual(StatusCode.AccessCodeInvalid);
	    });
	});
	it('throws NetworkError if OTP code is 00005', function() {
	    let code = '00005';
	    return service.validateAccessCode(code, '').catch(e => {
		expect(e.message).toEqual(StatusCode.NetworkError);
	    });
	});
	it('returns undefined otherwise', function() {
	    let code = '12345';
	    return service.validateAccessCode(code, '').then(r => {
		expect(r).not.toBeDefined();
		expect(service._cachedAccessCode).toEqual('12345');
	    });
	});
    });

    describe('constructBallotCryptograms', function() {
	let cvr: CastVoteRecord = { '1': 'option1', '2': 'optiona' };

	it('throws CallOutOfOrderError if prior code was 00006', function() {
	    let code = '00006';
	    service.validateAccessCode(code, '');
	    return service.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).toEqual(StatusCode.CallOutOfOrderError);
	    });
	});

	it('throws NetworkError if prior code was 00007', function() {
	    let code = '00007';
	    service.validateAccessCode(code, '');
	    return service.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).toEqual(StatusCode.NetworkError);
	    });
	});

	it('throws CorruptCVRError if prior code was 00008', function() {
	    let code = '00008';
	    service.validateAccessCode(code, '');
	    return service.constructBallotCryptograms(cvr).catch(e => {
		expect(e.message).toEqual(StatusCode.CorruptCVRError);
	    });
	});

	it('returns a fingerprint otherwise', function() {
	    let code = '12345';
	    service.validateAccessCode(code, '');
	    return service.constructBallotCryptograms(cvr).then(fingerprint => {
		expect(fingerprint).toEqual('zyx098-wvu765-tsr432-1234');
	    });
	});
    });

    describe('spoilBallotCryptograms', function() {
	it('throws CallOutOfOrder if prior code was 00009 and returns undefined', function() {
	    let code = '00009';
	    service.validateAccessCode(code, '');
	    return service.spoilBallotCryptograms().then(r => {
		expect(r).not.toBeDefined(); }).catch(e => {
		expect(e.message).toEqual(StatusCode.CallOutOfOrderError);
	    });
	});

	it('throws NetworkError if prior code was 00010 and returns undefined', function() {
	    let code = '00010';
	    service.validateAccessCode(code, '');
	    return service.spoilBallotCryptograms().then(r => {
		expect(r).not.toBeDefined(); }).catch(e => {
		expect(e.message).toEqual(StatusCode.NetworkError);
	    });
	});

	it('throws ServerCommitmentError if prior code was 00011 and returns undefined', function() {
	    let code = '00011';
	    service.validateAccessCode(code, '');
	    return service.spoilBallotCryptograms().then(r => {
		expect(r).not.toBeDefined(); }).catch(e => {
		expect(e.message).toEqual(StatusCode.ServerCommitmentError);
	    });
	});

	it('returns undefined otherwise', function() {
	    let code = '12345';
	    service.validateAccessCode(code, '');
	    return service.spoilBallotCryptograms().then(r => {
		expect(r).not.toBeDefined();
	    });
	});
    });

    describe('submitBallotCryptograms', function() {
	it('throws NetworkError if prior code was 00012', function() {
	    let code = '00012';
	    service.validateAccessCode(code, '');
	    return service.submitBallotCryptograms().catch(e => {
		expect(e.message).toEqual(StatusCode.NetworkError);
	    });
	});

	it('returns a vote receipt otherwise', function() {
	    let code = '12345';
	    service.validateAccessCode(code, '');
	    return service.submitBallotCryptograms().then(r => {
		expect(r.boardHash).toEqual('zyx098-wvu765-tsr432-1234');
	    });
	});
    });

    describe('purgeData', function() {
	it('deletes the serverURL and cachedAccessCode properties of the stub', function() {
	    let code = '12345';
	    service.validateAccessCode(code, '');
	    expect(service._cachedAccessCode).toEqual('12345');
	    service.purgeData();
	    expect(service._cachedAccessCode).not.toBeDefined();
	});
    });


});
