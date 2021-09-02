# AV Client Library Stub Implementation

This module is a stub implementation of the Assembly Voting Client API.

## Prequisites

*   [NodeJS](https://nodejs.org/en/)

## Installation

*   Clone this repository wherever you like.
*   Run `npm install` to install dependencies.
*   Run `npm test` to test.

## Codes for Testing

The method stubs return values and throw errors based on a sequence of testing codes.

- **00000**: `requestAccessCode(00000)` throws VoterRecordNotFound error
- **00001**: `requestAccessCode(00001)` throws NetworkError.
- **00002**: `validateAccessCode(00002)` throws CallOutOfOrderError.
- **00003**: `validateAccessCode(00003)` throws AccessCodeExpired error.
- **00004**: `validateAccessCode(00004)` throws AccessCodeInvalid error.
- **00005**: `validateAccessCode(00005)` throws NetworkError.

Validating the following codes will trigger errors later in the workflow.

- **00006**: `constructBallotCryptograms()` throws CallOutOfOrderError.
- **00007**: `constructBallotCryptograms()` throws NetworkError.
- **00008**: `constructBallotCryptograms()` throws CorruptCVError.
- **00009**: `spoilBallotCryptograms()` throws CallOutOfOrderError.
- **00010**: `spoilBallotCryptograms()` throws NetworkError.
- **00011**: `spoilBallotCryptograms()` throws ServerCommitmentError.
- **00012**: `submitBallotCryptograms()` throws NetworkError

## Testing the Flow

AVClient.test(code) simulates running the entire workflow using a code.

First it purges any cached data, then it invokes the methods in flow order.  It 
calls `constructBallotCryptograms()` twice: once after validating the code, and again
after spoiling the cryptograms.

```js
const AVClient = require('./src/avclient');
const client = new AVClient('http://exampleserver.org');
client.test('00000');
client.test('00005');
client.test('12345');

```
