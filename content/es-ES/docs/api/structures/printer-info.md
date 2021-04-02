# Objeto PrinterInfo

* `name` String - el nombre de la impresora tal como lo entiende el sistema operativo.
* `displayName` String - el nombre de la impresora tal como se muestra en al vista previa de la impresión.
* `description` String - una descripción más larga del tipo de impresora.
* `status` Number - el estado actual de la impresora.
* `isDefault` Boolean - si una impresora determinada está establecida como predeterminada o no en el sistema operativo.
* `options` Object - un objeto que contiene un número variable de información de la impresora específica de la plataforma.

El número representado por `status` significa diferentes cosas en diferentes plataformas: en Windows sus potenciales valores pueden ser encontrados [aquí](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2) y en Linux y macOS pueden ser encontrados [here](https://www.cups.org/doc/cupspm.html).

## Ejemplo

A continuación hay un ejemplo de algunas de las opciones adicionales que pueden ser establecidas, las cuales pueden ser diferentes en cada plataforma.

```javascript
{
  Name: ' Austin_4th_Floor_Printer___C02XK13BJHD4 ',
  displayName: ' Austin 4th Floor Printer @ C02XK13BJHD4 ',
  Descripción: ' TOSHIBA ColorMFP ',
  estado: 3,
  isDefault: false,
  Options: {
    copies: ' 1 ',
    ' Device-URI ': ' dnssd://Austin%204th%20FLoor%20Printer%20%40%20C02XK13BJHD4. _ipps. _tcp. local./? UUID = 71687f1e-1147-3274-6674-22de61b110bd ',
    acabados: ' 3 ',
    ' Job-CANCEL-After ': ' 10800 ',
    ' Job-Hold-Until ': ' no-Hold ',
    ' Job-Priority ': ' 50 ',
    ' Job-sheets ': ' none, ninguno ',
    ' Marker-Change-Time ': ' 0 ',
    ' Number-up ': ' 1 ',
    ' Printer-Commands ': ' ReportLevels, PrintSelfTestPage, com. Toshiba. ColourProfiles. Update, com. Toshiba. EFiling. Update, com. Toshiba. EFiling. checkPassword ',
    ' Printer-info ' : ' Austin 4th Floor Printer @ C02XK13BJHD4 ',
    ' Printer-is-aceptando-Jobs ': ' true ',
    ' Printer-is-Shared ': ' false ',
    ' Printer-is-Temporary ': ' false ',
    ' Printer-location ': ' ',
    ' Printer-make-and-Model ': ' TOSHIBA ColorMFP ',
    ' Printer-State ': ' 3 ',
    ' Printer-State-Change-Time ': ' 1573472937 ',
    ' Printer-State-reasons ': ' offline-Report, com. Toshiba. SNMP. Failed ',
    ' type-Printer ': ' 10531038 ',
    ' Printer-URI-Supported ': ' ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4 ',
    system_driverinfo: ' t '
  }
}
```
