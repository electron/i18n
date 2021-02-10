# Objeto PrinterInfo

* `name` String - el nombre de la impresora tal como lo entiende el sistema operativo.
* `displayName` String - el nombre de la impresora tal como se muestra en al vista previa de la impresión.
* `description` String - una descripción más larga del tipo de impresora.
* `status` Number - el estado actual de la impresora.
* `isDefault` Boolean - si una impresora determinada está establecida como predeterminada o no en el sistema operativo.
* `options` Object - un objeto que contiene un número variable de información de la impresora específica de la plataforma.

The number represented by `status` means different things on different platforms: on Windows it's potential values can be found [here](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2), and on Linux and macOS they can be found [here](https://www.cups.org/doc/cupspm.html).

## Ejemplo

A continuación hay un ejemplo de algunas de las opciones adicionales que pueden ser establecidas, las cuales pueden ser diferentes en cada plataforma.

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
