# Goma

> Goma는 크롬과 안드로이드 같은 오픈 소스 프로젝트를 위한 분산 컴파일러 서비스입니다.

Electron은 모든 Electron 메인테이너들이 사용할 수 있도록 커스텀 Goma 백엔드 배포가 있습니다.  자세한 인증 사항은 [Access](#access) 섹션을 참조하십시오.  자격 증명이 없는 경우 기본적으로 사용되는 `캐시 전용` Goma endpoint가 있습니다.  캐시 전용 Goma 리퀘스트가 클러스터에 충돌하지 않지만 캐시에서 읽히므로 훨씬 더 빠른 빌드 시간이 결과로 나타날 것이다.

## Goma 활성화

현재 Goma를 사용할 수 있는 유일한 방법은 [빌드 도구를](https://github.com/electron/build-tools)사용하는 것입니다. `빌드 도구를`설정할 때 Goma 구성이 자동으로 포함됩니다.

만약에 app 메인테이너이고 클러스터에 액세스 할 수 있다면, 반드시Goma 클러스터를 사용 할 `build-tools`를 구성하기 위해 `e init`을 `--goma=cluster`와 함께 실행하세요.  기존 구성이 있는 경우, `"goma": "cluster"`를 구성 파일에서 설정할 수 있습니다.

## Building with Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.

Please do not set a value higher than **200** on Windows or Linux and **50** on macOS. We monitor Goma system usage, and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

If you're using `build-tools`, appropriate `-j` values will automatically be used for you.

## Monitoring Goma

If you access [http://localhost:8088](http://localhost:8088) on your local machine you can monitor compile jobs as they flow through the goma system.

## 액세스

보안 및 비용 상의 이유로 Electron의 Goma 클러스터에 대한 액세스는 현재 Electron 관리자에게 제한되어 있습니다.  액세스하려면 Slack의 #access-requests로 가서 ping @ goma-squad로 이동하여 액세스를 요청합니다.  관리자께서 액세스 권한을 자동으로 부여하지 않는 경우에 따라서 액세스 권한이 결정됩니다.

## 가동 시간 / 지원

https://status.notgoma.com에서 Goma 클러스터 및 캐시를 자동으로 모니터링 합니다.

우리는 Goma 사용 및 도움 / 요청을 하는 문제에 대해서는 지원하지 않습니다. 많은 이유없이 문제가 해결될 것이므로 이러한 지원을 처리할 수 수 있는 능력이 없습니다.
