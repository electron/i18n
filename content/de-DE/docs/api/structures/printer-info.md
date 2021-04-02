# PrinterInfo Objekt

* `Name`Zeile-der Name von Drucker wie vom OS verstanden ist.
* `denNamenanzeigen`Zeile-der Name von Drucker wie der vor dem Druck gezeigt ist.
* `Beschreibung`Zeile-eine laengere Beschreibung von Druckertyp.
* `Status`Nummer-der wesende Status des Druckers.
* `istDefault`Boolean-entweder oder kein bestimmter Drucker als Default Drucker an OS eingestellt ist.
* `Optionen`Objekt-ein Objekt das eine variable Nummer von Information von Drucker nach dieser Plattforme enthaelt.

Die Zahl, die von `status` dargestellt wird, bedeutet verschiedene Dinge auf verschiedenen Plattformen: unter Windows finden sich ihre potenziellen Werte [hier](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2)und unter Linux und macOS finden Sie [hier](https://www.cups.org/doc/cupspm.html).

## Beispiel

Unten ist ein Beispiel von einigen der zusätzlichen Optionen, welche eventuell gesetzt werden können, sich aber zwischen den Plattformen unterscheiden können.

```javascript
•
  Name: 'Austin_4th_Floor_Printer___C02XK13BJHD4',
  Displayname: 'Austin 4th Floor Printer ' C02XK13BJHD4',
  Beschreibung: 'TOSHIBA ColorMFP',
  Status: 3,
  isDefault: false,
  Optionen: '
    Kopien: '1',
    'device-uri': 'dnssd://Austin%204th%20Floor%20Printer%20%40%20C02XK13BJHD4._ipps._tcp.local./?uuid=71687f1e-1147-3274-6674-22de61b10bd',
    Finishings: '3',
    'Job-Cancel-after': '10800',
    'job-hold-until': 'no-hold',
    'job-priority': '50',
    'job-sheets': 'none,none',
    'marker-change-time': '0',
    'Number-up': '1',
    'Druckerbefehle': 'ReportLevels,PrintSelfTestPage,com.toshiba.ColourProfiles.update,com.toshiba.EFiling.update,com.toshiba.EFiling.checkPassword',
    'druckerinfo' : 'Austin 4th Floor Printer 'C02XK13BJHD4',
    'printer-is-accepting-jobs': 'true',
    'printer-is-shared': 'false',
    'printer-is-temporary': 'false',
    'drucker-location': '',
    'printer-make-and-model': 'TOSHIBA ColorMFP',
    'Druckerzustand': '3',
    'Drucker-State-Change-Time': '1573472937',
    'Drucker-State-Gründe': 'offline-report,com.toshiba.snmp.failed',
    'Drucker-Typ': '10531038',
    'drucker-uri-unterstützt': 'ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4',
    system_driverinfo: 'T'


```
