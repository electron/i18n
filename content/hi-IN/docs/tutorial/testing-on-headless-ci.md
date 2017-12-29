# हेडलेस सीआई सिस्टम (ट्रेविस सीआई, जेनकिंस) पर परिक्षण

क्रोमियम पर आधारित होने के कारण, इलेक्ट्रॉन को कार्य करने के लिए एक डिस्प्ले ड्राइवर की आवश्यकता होती है । अगर क्रोमियम को एक डिस्प्ले ड्राईवर नहीं मिलता, तो इलेक्ट्रॉन चालु ही नहीं होगा - और इसलिए आपके कोई भी परिक्षण चलेंगें नहीं, चाहे आप उन्हें किसी भी तरह से चला रहे हों | Testing Electron-based apps on Travis, Circle, Jenkins or similar Systems requires therefore a little bit of configuration. In essence, we need to use a virtual display driver.

## Configuring the Virtual Display Server

First, install [Xvfb](https://en.wikipedia.org/wiki/Xvfb). It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Then, create a virtual xvfb screen and export an environment variable called DISPLAY that points to it. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. On Windows or macOS, it will simply do nothing.

```sh
## On Windows or macOS, this just invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

On Travis, your `.travis.yml` should look roughly like this:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

For Jenkins, a [Xvfb plugin is available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI is awesome and has xvfb and `$DISPLAY` [already setup, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor runs on Windows, supporting Selenium, Chromium, Electron and similar tools out of the box - no configuration is required.