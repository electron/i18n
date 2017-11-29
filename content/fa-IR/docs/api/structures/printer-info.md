# شئ PrinterInfo

* `نام` رشته
* `توضیحات` رشته
* `وضعیت` عدد
* `isDefault` بولین

## مثال

Below is an example of some of the additional options that may be set which may be different on each platform.

```javascript
{
  نام: 'Zebra_LP2844',
  توضیحات: 'Zebra LP2844',
  وضعیت: 3,
  isDefault: false,
  گزینه ها: {
    کپی ها: '1',
    'device-uri': 'usb://Zebra/LP2844?location=14200000',
    finishings: '3',
    'job-cancel-after': '10800',
    'job-hold-until': 'no-hold',
    'job-priority': '50',
    'job-sheets': 'none,none',
    'marker-change-time': '0',
    'number-up': '1',
    'printer-commands': 'none',
    'اطلاعات چاپگر': 'Zebra LP2844',
    'printer-is-accepting-jobs': 'true',
    'چاپگر به اشتراک گذاشته شده است': 'true',
    'مکان چاپگر': '',
    'printer-make-and-model': 'Zebra EPL2 Label Printer',
    'وضعیت چاپگر': '3',
    'printer-state-change-time': '1484872644',
    'printer-state-reasons': 'offline-report',
    'نوع چاپگر': '36932',
    'printer-uri-supported': 'ipp://localhost/printers/Zebra_LP2844',
    system_driverinfo: 'Z'
  }
}
```