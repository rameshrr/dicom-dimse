const DicomDimseServices = require('../');
const assert = require('assert');

describe('DIMSE', () => {
  describe('#ECHO', () => {
    it('It should return true or false in status', () => {
      const services = new DicomDimseServices('192.168.1.102', 4242);

      services.doEcho({
        hostAE: 'DICOM_SCP',
        sourceAE: 'TEST'
      }, (err, status, data) => {
        assert.equal(status, true);
      });
    });
  });

  describe('#FIND', () => {

    it('It should return result set', () => {
      const services = new DicomDimseServices('192.168.1.102', 4242);

      services.doFind({
        hostAE: 'DICOM_SCP',
        sourceAE: 'TEST_AE2',
        qrLevel: 'STUDY'
      }, {
          0x00080050: '1056513'
        }, (err, result) => {
          assert.ifError(err);
        });
    });

    it('It should return result set', () => {
      const services = new DicomDimseServices('192.168.1.102', 4242);

      services.doFind({
        hostAE: 'DICOM_SCP',
        sourceAE: 'TEST_AE2',
        qrLevel: 'SERIES'
      }, {
          0x0020000D: '1.2.826.0.1.3680043.2.93.9.2.118502834103.1056501'
        }, (err, result) => {
          assert.ifError(err);
        });
    });

    it('It should return result set', () => {
      const services = new DicomDimseServices('192.168.1.102', 4242);

      services.doFind({
        hostAE: 'DICOM_SCP',
        sourceAE: 'TEST_AE2',
        qrLevel: 'IMAGE'
      }, {
          0x0020000D: '1.2.826.0.1.3680043.2.93.9.2.118502834103.1056501'
        }, (err, result) => {
          assert.ifError(err);
        });
    });

  });

});