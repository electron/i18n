# PrinterInfo 对象

* `字符串` - 操作系统所理解的打印机名称。
* `显示` 字符串 - 打印机的名称，如"打印预览"所示。
* `description` String - 任务描述.
* `状态` 号码 - 打印机的当前状态。
* `是默认值` 布尔值 - 是否将给定的打印机设置为 OS 上的默认打印机。
* `选项` 对象 - 包含不同数量的平台打印机信息的对象。

`status` 表现的数字在不同的平台代表不同的含义：在 Windows 的可能值可以在上可以在 [这里](https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-2) 找到，在 Linux 和 macOS 上，可以在[这里](https://www.cups.org/doc/cupspm.html)找到 它们。

## 例子

下面是一些可能在每个平台上不同的附加选项的示例。

```javascript
•
  名称： "Austin_4th_Floor_Printer___C02XK13BJHD4"，
  显示名称： "奥斯汀 4 楼打印机 # C02xk13bjhd4"，
  描述： "Toshiba Colormfp"，
  状态： 3，
  是默认： 假，
  选项： +
    副本： "1"，
    设备 uri"： "dnssd://Austin%204 号%20Floor%20Printer%20%40%20C02XK13BJHD4._ipps._tcp.local./？uuid=71687f1e-1147-3274-6674-22de61b110bd"，
    完成： '3'，
    "工作取消后"："10800"，
    "工作保持-直到"："不保留"，
    "工作优先级"："50"，
    "工作表"："无，无"，
    "标记更改时间"："1"" 0'，
    "数字"： "1"，
    "打印机命令"： "报告级别， 打印自我测试页面， com. toshiba. ColourProfiles. update， com. toshiba. EFiling. update， com. toshiba. eFiling. checkPassword"，
    "打印机信息"： "奥斯汀 4 楼打印机 # C02xk13bjhd4"，
    "打印机是接受工作"： "true"，
    "打印机共享"： "假"，
    "打印机是临时的"： "假"，
    "打印机位置"： ''，
    "打印机制造和型号"： "TOSHIBA Colormfp"，
    "打印机状态"："3"，
    "打印机状态更改时间"："1573472937"，
    "打印机状态原因"："脱机报告，com.toshiba.snmp" .failed"，
    "打印机类型"： "10531038"，
    "打印机支持"： "ipp://localhost/printers/Austin_4th_Floor_Printer___C02XK13BJHD4"，
    system_driverinfo：' T
  [
]
```
