require("./constants.js");
require("./elements_data.js");

const Connection = require('./Connection');
const Services = require('./Services');

class DicomDimseServices {
  constructor(host, port) {
    this.HOST = host;
    this.PORT = port;
  }

  doEcho(config, callback) {

    const client = new Connection(this.HOST, this.PORT, {
      hostAE: config.hostAE || '',
      sourceAE: config.sourceAE || 'DICOMDIMSE'
    });

    client.connect(function () {
      const cEcho = new Services.CEcho();
      this.addService(cEcho);

      cEcho.doEcho([0, (result) => {
        callback(null, result.getStatus() == C.STATUS_SUCCESS, result);
      }]);
    });

    client.on('error', function (err) {
      callback(null, false, err);
    });
  }
}

module.exports = DicomDimseServices;
