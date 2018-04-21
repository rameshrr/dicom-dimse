Thanks to OHIF DICOM DIMSE. Little improved version of original version.

Nodejs implementation of DIMSE(part104) - Alpha stage
============

This is a library that implements dimse tcp protocol in ecmascript 6, it's still in development stage, current supported service include C-ECHO, C-GET, C-FIND, C-STORE.

# Installation
install via [NPM](https://www.npmjs.com/):
> npm install dicom-dimse

# Usage
### Initializing:
```javascript

const DicomDimseServices = require('dicom-dimse');

```

# Examples

Below it's a example that perform C-ECHO.

```javascript
    const DicomDimseServices = require('dicom-dimse');

    const services = new DicomDimseServices('192.168.1.1', 4242);

    services.doEcho({
      hostAE: 'TEST_AE1',
      sourceAE: 'TEST_AE2'
    }, (err, status, data) => {
      console.log("Error: ", err);
      console.log("Can ECHO: ", status);
      console.log(data);
    });

```

above code will output:

```
> Connection established
> Error: null
> Can ECHO: true

```

Example that perform C-FIND.

```javascript
    const DicomDimseServices = require('dicom-dimse');

    const services = new DicomDimseServices('192.168.1.1', 4242);

    /// qrLevel --> can be any one of following
    /// STUDY
    /// SERIES
    /// IMAGE
    /// Here I'm trying to find studies with accession#: 1056513
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

```

More examples will follow..
   
# Issues 
Please file your issues [here](https://github.com/rameshrr/dicom-dimse/issues):
