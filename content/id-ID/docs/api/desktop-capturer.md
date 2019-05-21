# penangkapDesktop

> Akses informasi tentang sumber media yang dapat digunakan untuk menangkap audio dan video dari desktop menggunakan API [ ` navigator.mediaDevices.getUserMedia `].

Proses: [Renderer](../glossary.md#renderer-process)

Contoh berikut menunjukkan bagaimana menangkap video dari jendela desktop yang judulnya adalah`Elektron `:

```javascript
// Dalam proses renderer.
const { desktopCapturer } = require('electron')

desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  for (const source of sources) {
    if (source.name === 'Electron') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        })
        handleStream(stream)
      } catch (e) {
        handleError(e)
      }
      return
    }
  }
})

function handleStream (stream) {
  const video = document.querySelector('video')
  video.srcObject = stream
  video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
  console.log(e)
}
```

Untuk menangkap video dari sumber yang disediakan oleh ` desktopCapturer </ 0> kendala yang dilewatkan ke [ <code> navigator.mediaDevices.getUserMedia </ 0> ] harus menyertakan
 <code> chromeMediaSource: 'desktop' </ 0> , dan <code> audio: false </ 0> .</p>

<p>Untuk menangkap audio dan video dari keseluruhan desktop, batasan yang dilewatkan ke [ <code> navigator.mediaDevices.getUserMedia </ 0>] harus menyertakan <code> chromeMediaSource: 'desktop' </ 0>, untuk <code> audio < / 0> dan <code> video </ 0>, namun tidak boleh menyertakan batasan < 0> chromeMediaSourceId </ 0>.</p>

<pre><code class="javascript">kendala const = {
   audio: {
     wajib: {
       chromeMediaSource: 'desktop'
     }
   },
   video: {
     wajib: {
       chromeMediaSource: 'desktop'
     }
   }}
`</pre> 

## Methods

The ` desktopCapturer </ 0> modul memiliki metode berikut:</p>

<h3><code>desktopCapturer.getSources (opsi, callback)`</h3> 

* `pilihan` Benda 
  * `jenis `String [] - Kumpulan String yang mencantumkan jenis sumber desktop yang akan ditangkap, jenis yang tersedia adalah`layar `dan`jendela </ 0>.</li>
<li><code> thumbnail ukuran</ 0>  <a href="structures/size.md"> Ukuran </ 1> (opsional) - Ukuran gambar thumbnail sumber media harus diskalakan. Defaultnya adalah <code> 150 </ 0> x <code> 150 </ 0> .</li>
<li><code>fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
* `panggilkembali` Fungsi 
  * Kesalahan `kesalahan`
  * ` sumber </ 0>  <a href="structures/desktop-capturer-source.md"> DesktopCapturerSource [] </ 1></li>
</ul></li>
</ul>

<p>Mulai mengumpulkan informasi tentang semua sumber media desktop yang tersedia, dan panggil <code> callback (kesalahan, sumber) </ 0> setelah selesai.</p>

<p><code> sources </ 0> adalah array dari <a href="structures/desktop-capturer-source.md"><code> objek DesktopCapturerSource </ 1> 
, masing-masing <code> DesktopCapturerSource </ 0> mewakili layar atau jendela individual yang dapat ditangkap.</p>

<p><strong><a href="promisification.md">Deprecated Soon</a></strong></p>

<h3><code>desktopCapturer.getSources(options)`</h3> 
    * `pilihan` Obyek 
      * `jenis `String [] - Kumpulan String yang mencantumkan jenis sumber desktop yang akan ditangkap, jenis yang tersedia adalah`layar `dan`jendela </ 0>.</li>
<li><code> thumbnail ukuran</ 0>  <a href="structures/size.md"> Ukuran </ 1> (opsional) - Ukuran gambar thumbnail sumber media harus diskalakan. Defaultnya adalah <code> 150 </ 0> x <code> 150 </ 0> .</li>
<li><code>fetchWindowIcons` Boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.
    
    Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of [`DesktopCapturerSource`](structures/desktop-capturer-source.md) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.
    
    ### Caveats
    
    `navigator.mediaDevices.getUserMedia` does not work on macOS for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a [signed kernel extension](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/KernelExtensions/KernelExtensions.html). Chromium, and by extension Electron, does not provide this.
    
    It is possible to circumvent this limitation by capturing system audio with another macOS app like Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.