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
        this.release();

        let dcmInfo = DicomDimseServices.parseDicomTags(result.elementPairs);
        callback(null, result.getStatus() == C.STATUS_SUCCESS, dcmInfo);
      }]);
    });

    client.on('error', function (err) {
      client.destroy();
      callback(null, false, err);
    });
  }

  doFind(config, data, callback) {

    if (!config.qrLevel) {
      return callback(new Error('Invalid Argument: Query Level'));
    }

    if (!config.hostAE) {
      return callback(new Error('Invalid AE-Title'));
    }

    const client = new Connection(this.HOST, this.PORT, {
      hostAE: config.hostAE,
      sourceAE: config.sourceAE || 'DICOMDIMSE'
    });

    client.connect(function () {
      const cFind = new Services.CFind();
      this.addService(cFind);

      let results = [];

      cFind.retrieve(config.qrLevel, data, [(result) => {
        //studyIds.push(result.getValue(0x0020000D));
        results.push(DicomDimseServices.parseDicomTags(result.elementPairs));
      }, () => {
        this.release();
        callback(null, results);
      }]);
    });

    client.on('error', function (err) {
      client.destroy();
      callback(null, false, err);
    });
  }

  static parseDicomTags(elementPairs) {
    let dcmRecord = {};

    for (let key in elementPairs) {
      let elementPair = elementPairs[key];
      
      if (!elementPair.tag || !elementPair.tag.value) {
        continue;
      }

      let hexTag = elementPair.tag.value.toString(16).padStart(8, '0');
      let dcmTagData = DicomElements.dicomNDict[elementPair.tag.value];

      dcmRecord[hexTag] = {
        tag: elementPair.tag.value,
        value: elementPair.value,
        vr: elementPair.vr,
        vm: elementPair.vm,
        implicit: elementPair.implicit,
        name: dcmTagData ? dcmTagData.keyword : ''
      }
    }

    return dcmRecord;
  }
}

module.exports = DicomDimseServices;
