const DicomDimseServices = require('./');

const services = new DicomDimseServices('192.168.1.1', 4242);

services.doEcho({
  hostAE: 'TEST_AE1',
  sourceAE: 'TEST_AE2'
}, (err, status, data) => {
  console.log(err);
  console.log(status);
  console.log(data);
});