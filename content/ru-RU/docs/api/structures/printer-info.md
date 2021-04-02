# Объект PrinterInfo

* `name` String - понятное для ОС название принтера.
* `displayName` String - название принтера, отображаемое в предварительном просмотре печати.
* `description` String - более длинное описание типа принтера.
* `status` Number - текущий статус принтера.
* `isDefault` Boolean - установлен ли текущий принтер по умолчанию в ОС.
* `options` Object - объект, содержащий информацию о принтере, специфичной для конкретной платформы.

Число, получаемое из `status`, на разных платформах означает разные вещи: возможные значения для Windows можно найти [здесь](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2), а для Linux и macOS [здесь](https://www.cups.org/doc/cupspm.html).

## Пример

Ниже приведен пример некоторых дополнительных параметров, которые могут быть установлены, могут быть разными на каждой платформе.

```javascript

  имя: 'Austin_4th_Floor_Printer___C02XK13BJHD4',
  displayName: 'Остин 4-й этаж принтера , C02XK13BJHD4', описание
  : 'TOSHIBA ColorMFP',
  статус: 3,
  isDefault: ложные,
  варианты:
    экземпляры: '1',
    'устройство-ури': 'dnssd://Austin%204th%20Floor%20Printer%20%40%20C02XK13BJHD4._ipps.'tcp.local./?uuid-71687f1e-1147-3274-6674-22de61b110bd',
    отделки: '3',
    'job-cancel-after': '10800',
    'job-hold-until': 'no-hold',
    'job-priority': '50',
    'job-sheets': 'none,none',
    'marker-change-time': '0',
    'номер-вверх': '1',
    'принтер-команды': 'ReportLevels,PrintSelfTestPage,com.toshiba.ColourProfiles.update,com.toshiba.EFiling.update,com.toshiba.EFiling.checkPassword',
    'принтер-инфо' : 'Остин 4-й этаж принтера c02XK13BJHD4',
    'принтер-это-прием-рабочих мест': "истинный",
    'принтер-является общим':
    'принтер-это-временный': 'ложный',
    'принтер-местоположение': '',
    'принтер-сделать-и-модель': 'TOSHIBA ColorM', '
    'принтер-государство': '3',
    'принтер-государство-изменение-время': '1573472937',
    'принтер-государство-причины': 'offline-report,com.toshiba.snmp' .failed',
    'принтер типа': '10531038',
    'принтер-uri-supported': 'ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4',
    system_driverinfo: 'T'
  -

```
