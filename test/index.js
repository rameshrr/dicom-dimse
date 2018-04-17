const DicomDimseServices = require('../');
const assert = require('assert');

describe('DIMSE', () => {
  describe('#ECHO', () => {
    it('It should return true or false in status', () => {
      const services = new DicomDimseServices('192.168.1.102', 4242);
      services.doEcho({
        hostAE: 'KM_UVR_P001',
        sourceAE: 'KM_IWS'
      }, (err, status, data) => {
        assert.equal(status, true);
      });
    });
  });
});