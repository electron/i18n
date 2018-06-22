# 윈도우 스토어 안내서

윈도우 10부터는 win32 포멧 만이 아닌 새로운 포맷이 생겨났다: 유니버셜 Windows 플랫폼. 새로운 `.appx` 포맷은 코타나 또는 푸시 알림 과 같은 강력한 APIs를 지원하는 것 뿐만 아니라, 윈도우 스토어를 통해 간편한 설치와 업데이트도 지원하게되었다.

마이크로소프트사에서 [일렉트론 어플을 `.appx`로 컴파일해주는 툴을 개발하였다](https://github.com/catalystcode/electron-windows-store). 그로써 개발자들은 새로운 어플리케이션 모델의 장점들을 이용할 수 있게 되었다. 이가이드는 사용하는 방법을 설명해준다 그리고 일렉트론 AppX페키지의 성능 및 한계에 대하여 설명할 것이다.

## 배경 및 요구 사항

Windows 10 "Anniversary Update"는 가상화 된 파일 시스템 및 레지스트리와 함께 실행하여 win32 ` .exe </ 0> 바이너리를 실행할 수 있습니다. 둘 다 Windows 컨테이너에 app과 installer에 의해 컴파일하는 동안 만들어 지므로 Windows가 설치 중에 운영 체제 변경 사항을 정확히 식별 할 수 있습니다. 실행 파일을 가상 파일 시스템 및 가상 레지스트리와 페어링하면 Windows에서 한 번 클릭으로 설치 및 제거 할 수 있습니다.</p>

<p>또한 exe는 appx 모델 내에서 실행됩니다. 즉, Universal Windows Platform에서 사용할 수있는 많은 API를 사용할 수 있습니다.  더 많은 기능을 사용하기 위해, Electron 애플리케이션은 백그라운드로 실행된 UWP 앱과 페어링 하여  <code>exe`와 같이 실행할 수 있습니다 - 이렇게 헬퍼와 비슷하게 실행되고 작업을 실행하기 위해 백그라운드에서 작동하며, 푸시 알림을 받거나, 다른 UWP 애플리케이션과 통신하는 역할을 합니다.

현재 존재하는 Electron 애플리케이션을 컴파일 하려면, 다음 요구 사항을 충족해야 합니다:

* Windows 10 Anniversary Update (2016년 8월 2일 발매)
* Windows 10 SDK, [여기서 다운로드](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Node 4 이상(확인, `node -v`실행)

그리고 CLI에서 `electron-windows-store`를 설치합니다:

```sh
npm install -g electron-windows-store
```

## Step 1: Electron 애플리케이션 패키지.

[electron-packager](https://github.com/electron-userland/electron-packager) (또는 이와 유사한 도구)를 사용하여 응용 프로그램을 패키지화합니다. 실제로 필요하지 않은 모듈은 응용 프로그램의 크기를 증가시킬 것이므로 마지막 응용 프로그램에서 필요하지 않은 `node_modules`을 제거하십시오.

결과물은 대략 아래와 같이 보일것 입니다:

```text
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## 2 단계 : electron-windows-store 실행

관리자 권한으로 실행 된 PowerShell에서 입력 및 출력 디렉토리, 응용 프로그램의 이름 및 버전을 전달하고 `node_modules` 을 평탄화시키는 매개 변수를 전달하여 `electron-windows-store`를 실행합니다.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

명령이 실행되면, 도구는 다음과 같이 작동합니다: Electron 애플리케이션을 입력으로 받고, `node_modules`를 평탄화합니다. 그런 다음 애플리케이션을 `app.zip `으로 압축합니다. 설치 프로그램과 Windows 컨테이너를 사용하여이 도구는 "확장 된"AppX 패키지를 만듭니다. - Windows 응용 프로그램 매니페스트 (`AppXManifest.xml`)는 물론 가상 폴더 시스템과 가상 레지스트리도 출력 폴더 내에 포함됩니다.

확장 된 AppX 파일이 생성되면이 도구는 Windows App Packager (`MakeAppx.exe`)를 사용하여 디스크의 해당 파일에서 단일 파일 AppX 패키지를 만듭니다. 마지막으로이 도구를 사용하여 컴퓨터에 신뢰할 수있는 인증서를 만들어 새 AppX 패키지에 서명 할 수 있습니다. 서명 된 AppX 패키지를 사용하면 CLI가 시스템에 패키지를 자동으로 설치할 수도 있습니다.

## 3 단계 : AppX 패키지 사용

패키지를 실행하려면 소위 "Anniversary Update"와 함께 Windows 10이 필요합니다. - Windows 업데이트 방법은 [여기](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update)에서 확인할 수 있습니다.

기존의 UWP 앱과 달리 패키지 앱은 현재 [여기](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge)를 적용 할 수있는 수동 확인 절차를 거쳐야합니다. 그 동안 모든 사용자가 패키지를 더블클릭하여 설치할 수 있기 때문에 쉬운 설치 방법을 원할 경우 스토어에 제출하지 않아도됩니다. 관리되는 환경 (일반적으로 기업)에서는 `Add-AppxPackage` [PowerShell Cmdlet을 사용하여 자동화 된 방식으로 설치합니다. ](https://technet.microsoft.com/en-us/library/hh856048.aspx)

또 다른 중요한 한계는 컴파일 된 AppX 패키지에 여전히 win32 실행 파일이 포함되어 있으므로 Xbox, HoloLens 또는 Phones에서 실행되지 않습니다.

## Optional : BackgroundTask를 사용하여 UWP 기능 추가

Electron 앱을 푸시 알림, Cortana 통합 또는 라이브 타일과 같은 Windows 10 기능을 최대한 활용하는 보이지 않는 UWP 백그라운드 작업과 페어링 할 수 있습니다.

백그라운드 작업을 사용하여 토스트 알림 및 라이브 타일을 보내는 Electron 앱을 확인하려면 [Microsoft 제공 샘플](https://github.com/felixrieseberg/electron-uwp-background)을 확인하십시오.

## Optional : 컨테이너 가상화를 사용하여 변환

AppX 패키지를 생성하기 위해 `electron-windows-store` CLI는 대부분의 Electron 응용 프로그램에서 작동 할 템플릿을 사용합니다. 그러나 사용자 정의 설치 프로그램을 사용하거나 생성 된 패키지에 문제가 발생하는 경우 Windows 컨테이너가 포함 된 컴파일을 사용하여 패키지를 만들 수 있습니다.이 모드에서는 CLI가 빈 Windows에 응용 프로그램을 설치하고 실행합니다 컨테이너를 사용하여 응용 프로그램이 운영 체제에서 수행중인 수정 작업을 정확하게 확인할 수 있습니다.

CLI를 처음 실행하기 전에 "Windows Desktop App Converter"를 설치해야합니다. 이 작업은 몇 분이 걸리지 만 걱정하지 마십시오. 한 번만 수행하면됩니다. Desktop App Converter 는 [여기](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter)에서 다운로드 합니다. `DesktopAppConverter.zip` 와 `BaseImage-14316.wim` 두 파일을 모두 받아야 합니다.

1. `DesktopAppConverter.zip`의 압축을 풉니다. 관리자 권한으로 실행 된 PowerShell에서 `Set-ExecutionPolicy bypass`를 호출하여 시스템 실행 정책에 따라 실행하려는 모든 작업을 실행할 수 있는지 확인하십시오.
2. 그리고, `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`를 실행하여 Windows 베이스 이미지 (`BaseImage-14316.wim`)를 Desktop App Converter로 전달하고 설치를 진행합니다.
3. 만약 위 명령이 재시작을 요구하면, 기기를 재시작하고 위 명령을 다시 실행시키세요.

설치가 성공하면 Electron 앱을 컴파일 할 수 있습니다.