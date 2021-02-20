# PrinterInfo Objekt

* `Name`Zeile-der Name von Drucker wie vom OS verstanden ist.
* `denNamenanzeigen`Zeile-der Name von Drucker wie der vor dem Druck gezeigt ist.
* `Beschreibung`Zeile-eine laengere Beschreibung von Druckertyp.
* `Status`Nummer-der wesende Status des Druckers.
* `istDefault`Boolean-entweder oder kein bestimmter Drucker als Default Drucker an OS eingestellt ist.
* `Optionen`Objekt-ein Objekt das eine variable Nummer von Information von Drucker nach dieser Plattforme enthaelt.

The number represented by `status` means different things on different platforms: on Windows it's potential values can be found [here](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2), and on Linux and macOS they can be found [here](https://www.cups.org/doc/cupspm.html).

## Beispiel

Unten ist ein Beispiel von einigen der zusätzlichen Optionen, welche eventuell gesetzt werden können, sich aber zwischen den Plattformen unterscheiden können.

```javascript
{
  name: 'Austin_4th_Floor_Printer___C02XK13BJHD4',
  displayName: 'Austin 4th Floor Printer @ C02XK13BJHD4',
  description: 'TOSHIBA ColorMFP',
  status: 3,
  isDefault: false,
  options: {
    copies: '1',
    'device-uri': 'dnssd://Austin%204th%20Floor%20Printer%20%40%20C02XK13BJHD4._ipps._tcp.local./?uuid=71687f1e-1147-3274-6674-22de61b110bd',
    finishings: '3',
    'job-cancel-after': '10800',
    'job-hold-until': 'no-hold',
    'job-priority': '50',
    'job-sheets': 'none,none',
    'marker-change-time': '0',
    'number-up': '1',
    'printer-commands': 'ReportLevels,PrintSelfTestPage,com.toshiba.ColourProfiles.update,com.toshiba.EFiling.update,com.toshiba.EFiling.checkPassword',
    'printer-info': 'Austin 4th Floor Printer @ C02XK13BJHD4',
    'printer-is-accepting-jobs': 'true',
    'printer-is-shared': 'false',
    'printer-is-temporary': 'false',
    'printer-location': '',
    'printer-make-and-model': 'TOSHIBA ColorMFP',
    'printer-state': '3',
    'printer-state-change-time': '1573472937',
    'printer-state-reasons': 'offline-report,com.toshiba.snmp.failed',
    'printer-type': '10531038',
    'printer-uri-supported': 'ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4',
    system_driverinfo: 'T'
  }
}
```
