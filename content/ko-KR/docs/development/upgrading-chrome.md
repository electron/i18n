# Upgrading Chrome Checklist

이 문서는 Electron의 각 Chrome 업그레이드에서 필요한 단계에 대한 개요를 제공하기위한 것입니다.

Electron 코드를 업데이트하고 Chrome/Node API도 바꿔주어야 합니다.

- 새 Chrome 버전을 사용할 수 있는지 확인합니다. https://github.com/zcbenz/chromium-source-tarball/releases
- `electron/libchromiumcontent` 저장소의 루트에서 `VERSION</ 0> 파일을 업데이트하십시오.</li>
<li><code> script / update-clang.sh </ 0>에서 <code> CLANG_REVISION </ 0>을 버전과 일치하도록 업데이트하십시오.
Chrome은 <code> libchromiumcontent / src / tools / clang / scripts / update.py </ 0>에서 사용하고 있습니다.</li>
<li><code> vendor/node</ 0>를 v8 버전에 해당하는 노드 릴리스로 업그레이드하십시오. 새로운 Chrome 버전에서 사용됩니다. 자세한 내용은 https://nodejs.org/en/download/releases에서 Node의 v8 버전 보기</li>
<li>필요한 모든 망가진 리포터 변경 사항을 <code>vendor/crashpad</ 0>로 업그레이드하십시오</li>
<li>필요한 모든 빌드 도구 변경 사항을 <code>vendor/depot_tools</ 0>로 업그레이드하십시오</li>
<li><code>script/lib/config.py`에서 다운로하기 위해 `libchromiumcontent` SHA-1을 업데이트하십시오
- 변경 사항과 함께 `electron/libchromiumcontent</ 0>에 pull request를 엽니다.</li>
<li>변경된 것을 <code>electron/electron에서` pull request를 엽니다. 
  - 필요한 경우 `vendor/</ 0>에있는 하위 모듈을 업그레이드해야합니다.</li>
</ul></li>
<li>다음 위치에서 디버그 빌드가 성공하는지 확인하십시오.

<ul>
<li>macOS</li>
<li>32-bit Windows</li>
<li>64-bit Window</li>
<li>32-bit Linux</li>
<li>64-bit Linux</li>
<li>ARM Linux</li>
</ul></li>
<li>릴리스 빌드가 다음에서 성공하는지 확인합니다.

<ul>
<li>macOS</li>
<li>32-bit Windows</li>
<li>64-bit Window</li>
<li>32-bit Linux</li>
<li>64-bit Linux</li>
<li>ARM Linux</li>
</ul></li>
<li>테스트가 통과하는지 확인하십시오.

<ul>
<li>macOS</li>
<li>32-bit Windows</li>
<li>64-bit Window</li>
<li>32-bit Linux</li>
<li>64-bit Linux</li>
<li>ARM Linux</li>
</ul></li>
</ul>

<h2>ffmpeg 지원 확인</h2>

<p>Electron ships with a version of <code>ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.</p> 
    You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.
    
    ```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({target}) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## Links

- [Chrome Release Schedule](https://www.chromium.org/developers/calendar)