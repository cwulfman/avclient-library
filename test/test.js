const avclient = require('../avclient');
const expect = require('chai').expect;



describe('avclient', function () {
    describe('AccessCodeRequest', function () {
	it('returns `network error` if ID# is all zeros', function() {
	    expect(avclient.AccessCodeRequest('Jane', 'Doe', '01-01-2001','0')).to.equal('network error');
	    expect(avclient.AccessCodeRequest('John', 'Doe', '01-01-2001','000')).to.equal('network error');
	});

	it('returns `success` otherwise', function () {
	    expect(avclient.AccessCodeRequest('Jane', 'Doe', '01-01-2001','12345')).to.equal('success');
	});
    });

    describe('AccessCodeConstruct status', function () {
	let CVR = '_';
	it('returns `invalid` if accessCode is `00000`', function () {
	    expect(avclient.AccessCodeConstruct(CVR, '00000').Status).to.equal('invalid')
	});
	it('returns `expired` if accessCode is `00001`', function () {
	    expect(avclient.AccessCodeConstruct(CVR, '00001').Status).to.equal('expired')
	});
	it('returns `network error` if accessCode is `00002`', function () {
	    expect(avclient.AccessCodeConstruct(CVR, '00002').Status).to.equal('network error')
	});
	it('returns `success` if accessCode is anything else', function () {
	    var fprint = avclient.AccessCodeConstruct(CVR, '12345');
	    expect(fprint.Status).to.equal('success');
	    expect(fprint.Fingerprint).to.equal('zyx098-wvu765-tsr432-1234');
	});
	it('returns alternating fingerprints', function() {
	    fprint = avclient.AccessCodeConstruct(CVR, '99999');
	    expect(fprint.Fingerprint).to.equal('tsr432-wvu765-zyx098-4321');
	    fprint = avclient.AccessCodeConstruct(CVR, '99999');
	    expect(fprint.Fingerprint).to.equal('zyx098-wvu765-tsr432-1234');
	});
    });

    describe('Spoil', function() {
	let CVR = '_';
	let fingerprint = {'Status': 'a', 'Fingerprint': 'b'};
	it('returns `network error` if the current access code is `00003`',
	   function() {
	       avclient.currentCode('00003');
	       expect(avclient.Spoil(fingerprint)).to.equal('network error');
	   });
	if('returns `invalid` if the current access code is `00004`',
	   function() {
	       avclient.currentCode('00004');
	       expect(avclient.Spoil(fingerprint)).to.equal('invalid');
	   });
	if('returns `success` for everything else',
	   function() {
	       avclient.currentCode('999999');
	       expect(avclient.Spoil(fingerprint)).to.equal('success');
	   });
    });

    describe('Send', function() {
	let _ = "";
	it('returns `network error` if the current access code is `00005`',
	   function() {
	       avclient.currentCode('00005');
	       expect(avclient.Send(_,_,_)).to.equal('network error');
	   });
	if('returns `invalid` if the current access code is `00006`',
	   function() {
	       avclient.currentCode('00004');
	       expect(avclient.Send(_,_,_)).to.equal('invalid');
	   });
	if('returns `success` for everything else',
	   function() {
	       avclient.currentCode('999999');
	       expect(avclient.Send(_,_,_)).to.equal('success');
	   });
    });
    
    describe('toggle', function() {
	it('toggles', function() {
	    let a = avclient.Toggle()
	    let b = avclient.Toggle()
	    let c = avclient.Toggle()
	    expect(a).to.equal(0)
	    expect(b).to.equal(1)
	    expect(c).to.equal(0)
	});
    });

    describe('currentCode', function() {
	it('returns stashed value', function() {
	    avclient.currentCode('123');	    
	    expect(avclient.currentCode()).to.equal('123');
	});
    });
});

