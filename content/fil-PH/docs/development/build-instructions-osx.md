# Pagbuo ng mga tagubilin (macOS)

Sundin ang mga alituntunin sa ibaba para sa pagbuo ng Elektron sa macOS.

## Mga Pangunahing Kailangan

- macOS >=10.11.6
- Xcode<0/> >= 8.2.1</li> 
    
    - [node.js](https://nodejs.org) (external)</ul> 
    
    Kung ikaw ay gumagamit ng Python na nakapaloob gamit ang Homebrew, kinakailangang mo ring ikabit ang mga sumusunod na Python modyuls:
    
    - [pyobjc](https://pythonhosted.org/pyobjc/install.html)
    
    ## macOS SDK
    
    Kung ikaw ay bumubuo ng Elektron at walang plano na muling ipakalat ang iyong sariing likha ng Elektron, ang bahaging ito ay maaari nang laktawan.
    
    Para sa ilang tampok (halimbawa ng pinch-zoom) na maaayos na gawa, kinakailangan mong makuha ang mocOS 10.10 SDK.
    
    Official Electron builds are built with [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), which does not contain the 10.10 SDK by default. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.
    
    Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:
    
    ```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Save the file

## Getting the Code

```sh
$ git clone https://github.com/electron/electron
```

## Bootstrapping

The bootstrap script will download all necessary build dependencies and create the build project files. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

## Building

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## 32bit Support

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Cleaning

To clean the build files:

```sh
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Tests

See [Build System Overview: Tests](build-system-overview.md#tests)