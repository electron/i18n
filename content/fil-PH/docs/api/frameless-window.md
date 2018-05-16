# Window na Walang Frame

> Magbukas ng window na walang mga toolbar, mga border, o iba pang graphical na "chrome".

Ang isang frameless window ay isang window na walang  chrome </ 0>, ang mga bahagi ng window, tulad ng mga toolbar, na hindi bahagi ng web page. Ang mga ito ay mga pagpipilian sa klase ng ` BrowserWindow </ 0>.</p>

<h2>Gumawa ng isang frameless window</h2>

<p>Upang lumikha ng isang frameless window, kailangan mong itakda ang <code> frame </ 0> sa <code> false </ 0> sa
<a href="browser-window.md"> BrowserWindow </ 1> 's <code> options </ 0>:</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
`</pre> 

### Mga alternatibo sa macOS

Sa macOS 10.9 Mavericks at mas bago, mayroong isang alternatibong paraan upang tukuyin ang isang chromeless window. Sa halip na setting ` frame </ 0> sa <code> false </ 0> na hindi pinapagana
parehong kontrol sa titlebar at window, maaaring gusto mong magkaroon ng title bar na
nakatago at ang iyong content ay umaabot sa full window size, gayunman ay pinananatili pa rin
ang mga kontrol ng window ("mga ilaw ng trapiko") para sa karaniwang mga aksyon ng window.
Magagawa mo ito sa pamamagitan ng pagtukoy sa pagpipiliang <code> titleBarStyle </ 0>:</p>

<h4><code>nakatago`</h4> 

Mga resulta sa isang nakatagong title bar at isang full size content window , gayon pa man ang title bar ay mayroon ding mga karaniwang mga kontrol ng window ("traffic lights") sa kaliwang tuktok.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

Mga resulta sa isang nakatagong title bar na may isang alternatibong hitsura kung saan ang mga pindutan ng traffic lights ay bahagyang higit pa mula sa gilid ng window.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover
`

Gumagamit ng custom drawn close, miniaturize,and fullscreen buttons na nagpapakita kapag naghovering sa itaas ng kaliwang window. Pinipigilan ng mga custom buttons ang mga isyu na may mga kaganapan sa mouse na nangyayari sa mga standard na window toolbar buttons. Ito ang opsyon na naaangkop lamang para sa mga frameless window.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Transparent window 

Sa pamamagitan ng pagtatakda ng opsyon na ` transparent </ 0> sa <code> true </ 0>, maaari mo ring gawin ang frameless
transparent window:</p>

<pre><code class="javascript">const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
`</pre> 

### Mga limitasyon

* Hindi ka maaaring mag-click sa transparent area. Kami ay magpapakilala ng isang API upang itakda ang window shape upang malutas ito, kita n'yo  ang aming isyu </ 0> para sa mga detalye.</li> 
    
    * Ang mga transparent windows ay hindi resizable. Ang pagtatakda ng ` resizable </ 0> sa <code> totoo </ 0> ay maaring gumawa ng transparent window para itigil ang pagtratrabaho sa ilang mga platforms.</li>
<li>Nalalapat lamang ang filter na <code> lumabo </ 0> sa web page, kaya walang paraan upang mag-apply
ng blur effect sa nilalaman sa ibaba ng window (ibig sabihin, iba pang mga application bukas sa
ang sistema ng gumagamit).</li>
<li>Sa mga operating system ng Windows, ang mga transparent windows ay hindi gagana kapag ang DWM ay
hindi pinagana.</li>
<li>On Linux users have to put <code>--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
    * On Mac the native window shadow will not be shown on a transparent window.</ul> 
    
    ## Click-through window 
    
    Upang lumikha ng isang click-through window, i.e. paggawa ng window huwag pansinin ang lahat ng mouse mga kaganapan, maaari mong tawagan ang  win.setIgnoreMouseEvents (ignore) </ 0> API:</p> 
    
    ```javascript
    const {BrowserWindow} = require('electron')
    let win = new BrowserWindow()
    win.setIgnoreMouseEvents(true)
    ```
    
    ## Draggable region 
    
    By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.
    
    Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.
    
    To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:
    
    ```html
    <body style="-webkit-app-region: drag">
    </body>
    ```
    
    And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:
    
    ```css
    button {
      -webkit-app-region: no-drag;
    }
    ```
    
    If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.
    
    ## Text selection 
    
    In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:
    
    ```css
    .titlebar {
      -webkit-user-select: none;
      -webkit-app-region: drag;
    }
    ```
    
    ## Context menu 
    
    On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.