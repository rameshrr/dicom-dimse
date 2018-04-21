const DicomDimseServices = require('./');

let services = new DicomDimseServices('192.168.1.102', 4242);

// services.doEcho({
//   hostAE: 'TEST_AE1',
//   sourceAE: 'TEST_AE2'
// }, (err, status, data) => {
//   console.log(err);
//   console.log(status);
//   console.log(data ? JSON.stringify(data): (err || '').toString());
// });

// services = new DicomDimseServices('192.168.1.102', 4242);
// services.doFind({
//   hostAE: 'DICOM_SCP',
//   sourceAE: 'TEST_AE2',
//   qrLevel: 'STUDY'
// }, {
//     0x00080050: '1056513'
//   }, (err, studies) => {
//     console.log(err);
//     console.log(studies ? JSON.stringify(studies) : '');
//   });

// services.doFind({
//   hostAE: 'DICOM_SCP',
//   sourceAE: 'TEST_AE2',
//   qrLevel: 'SERIES'
// }, {
//     0x0020000D: '1.2.826.0.1.3680043.2.93.9.2.118502834103.1056501'
//   }, (err, series) => {
//     console.log(err);
//     console.log(series ? JSON.stringify(series) : '');
//   });

services.doFind({
  hostAE: 'DICOM_SCP',
  sourceAE: 'TEST_AE2',
  qrLevel: 'IMAGE'
}, {
    0x0020000D: '1.2.826.0.1.3680043.2.93.9.2.118502834103.1056501'
  }, (err, images) => {
    console.log(err);
    console.log(images ? JSON.stringify(images) : '');
  });