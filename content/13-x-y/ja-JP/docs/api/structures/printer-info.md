# PrinterInfo オブジェクト

* `name` String - OS が把握したプリンタ名。
* `displayName` String - 印刷プレビューに表示されるプリンタ名。
* `description` String - プリンタ種別の長い説明。
* `status` Number - このプリンタの現在の状態。
* `isDefault` Boolean - このプリンタが OS のデフォルトプリンタかどうか。
* `options` Object - プラットフォーム固有のプリンタ情報の数値をいくつか含んだオブジェクト。

`status` で表される数値は、プラットフォームごとに異なる意味を持ちます: Windowsでは、その潜在的な値は[ここで ](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2)見つけられます。また、Linux や macOS では [ここで](https://www.cups.org/doc/cupspm.html)見つけられます。

## サンプル

以下は、設定可能な追加オプションの例です。各オプションは、プラットフォームごとに異なる場合があります。

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
