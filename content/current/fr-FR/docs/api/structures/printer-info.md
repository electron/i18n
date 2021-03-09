# Objet PrinterInfo

* `nom`Fiche-le nom imprime concu comme OS.
* `afficherNom`Fiche-le nom de l'imprimante comme elle montree dans Print View. ('Vue Imprimee').
* `description`Fiche-une description plus longue du type d'imprimante.
* `etat`Numero-l'etat courant de l'imprimante.
* `estDefaut`Boolean-soit ou non une certane imprimante est installee comme imprimante defaut sur OS.
* `options`Objet-un objet qui contient un nombre variable d'information imprimee sur la plateforme specifique.

Le nombre représenté par `status` a des significations différentes selon la plateforme: sur Windows, il peut prendre les valeurs que l'on peut trouver [ici](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2) et sur Linux et macOS [ici](https://www.cups.org/doc/cupspm.html).

## Example

Ci-dessous, un exemple de certaines des options supplémentaires qui peuvent être définies en étant différentes pour chaque plateforme.

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
