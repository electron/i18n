# Goma

> Goma는 크롬과 안드로이드 같은 오픈 소스 프로젝트를 위한 분산 컴파일러 서비스입니다.

Electron은 모든 Electron 메인테이너들이 사용할 수 있도록 커스텀 Goma 백엔드 배포가 있습니다.  자세한 인증 사항은 [Access](#access) 섹션을 참조하십시오.

## Goma 활성화

Currently Electron Goma supports Windows, Linux, and macOS.  If you are on a supported platform you can enable goma by importing the `goma.gn` config file when using `gn`.

```bash
gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") import(\"//electron/build/args/goma.gn\")"
```

You must ensure that you do not have `cc_wrapper` configured, this means you can't use `sccache` or similar technology.

Before you can use goma to build Electron you need to authenticate against the Goma service.  You only need to do this once per-machine.

```bash
cd electron/external_binaries/goma
./goma_auth.py login
```

Once authenticated you need to make sure the goma daemon is running on your machine.

```bash
cd electron/external_binaries/goma
./goma_ctl.py ensure_start
```

## Goma로 개발

Goma를 사용할 때, 일반적으로 기계에서 지원하는 것보다 훨씬 더 높은 `j` 값으로 `ninja`를 실행할 수 있습니다.

Please do not set a value higher than **300** on Windows or Linux and **80** on macOS, we monitor the goma system and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

## Goma 모니터링

로컬 컴퓨터에서 [http://localhost:8088](http://localhost:8088) 에 접속하면 고마 시스템을 통해 작동되는 컴파일 작업을 확인할 수 있습니다.

## 액세스

For security and cost reasons access to Electron Goma is currently restricted to Electron Maintainers.  액세스하려면 Slack의 #access-requests로 가서 ping @ goma-squad로 이동하여 액세스를 요청합니다.  관리자께서 액세스 권한을 자동으로 부여하지 않는 경우에 따라서 액세스 권한이 결정됩니다.
