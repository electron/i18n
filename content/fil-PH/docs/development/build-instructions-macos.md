# Pagbuo ng mga tagubilin (macOS)

Sundin ang mga alituntunin sa ibaba para sa pagbuo ng Elektron sa macOS.

## Mga Pangunahing Kailangan

- macOS >=10.11.6
- Xcode<0/> >= 8.2.1</li> 
    
    - [node.js](https://nodejs.org) (external)
    - Python 2.7 with support for TLS 1.2</ul> 
    
    ## Python
    
    Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):
    
    ```sh
    $ brew install python@2 && brew link python@2 --force
    ```
    
    If you are using Python as provided by Homebrew, you also need to install the following Python modules:
    
    - [pyobjc](https://pythonhosted.org/pyobjc/install.html)
    
    ## macOS SDK
    
    If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.
    
    Para sa ilang tampok (halimbawa ng pinch-zoom) na maaayos na gawa, kinakailangan mong makuha ang mocOS 10.10 SDK.
    
    Ang Elektron ay opisyal na itinayo gamit ang [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), na hindi naglalaman 10.10 SDK bilang pagtakda. Upang makamit ito, kinakailangang makuha at maikabit ang Xcode 6.4<0/> DMG.</p> 
    
    Ipagpalagay na ang Xcode 6.4 ay nakakonekta sa `/Volumes/Xcode` at ang iyong Xcode 8.2.1 ay nakakabit sa `Applicatios/Xcode.app`, ay gumagana:
    
    ```sh
    cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
    ```
    
    Kinakailangan mo ring paganahin ang Xcode upang makabuo laban sa 10.10 SDK:
    
    - Buksan ang `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
    - Itakda ang `MinimumSDKVersion` to `10.10`
    - Panatilihin ang file na ito
    
    ## Building Electron
    
    See [Build Instructions: GN](build-instructions-gn.md).