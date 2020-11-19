# Objek ProcessMetric

* ` pid </ 0>  Integer - Proses id proses.</li>
<li><code>type` String - Tipe proses. Salah satu nilai berikut:
  * `Browser`
  * `Tab`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `serviceName` String (optional) - The non-localized name of the process.
* `name` String (optional) - The name of the process. Examples for utility: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* ` cpu </ 0> <a href="cpu-usage.md"> CPUUsage </ 1> - Penggunaan CPU pada proses.</li>
<li><code>Creationtime` Waktu pembuatan nomor untuk proses ini. Waktu direpresentasikan dalam satuan milisecond. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* ` memori </ 0>  <a href="memory-info.md"> MemoryInfo </ 1> - Informasi memori untuk proses ini.</li>
<li><code>sandboxed` Boolean (optional) _macOS_ _Windows_ - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) _Windows_ - One of the following values:
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`
