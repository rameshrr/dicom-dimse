Thanks to OHIF DICOM DIMSE. Little improved version of original version.

DIMSE in ES6
============

This is a library that implements dimse tcp protocol in ecmascript 6, it's still in development stage, current supported service include C-ECHO, C-GET, C-FIND, C-STORE.

Examples

Below it's a example that perform C-ECHO.

```
    const DicomDimseServices = require('./');

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

More examples will follow..
