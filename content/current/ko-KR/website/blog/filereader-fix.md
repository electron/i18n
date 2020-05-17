---
title: Chromium FileReader Vulnerability Fix
author: marshallofsound
date: '2019-03-07'
---

Electron을 포함한 Chromium 기반의 모든 소프트웨어에 영향을 주는 심각도 높은 취약점이 Chrome에서 발견되었습니다.

This vulnerability has been assigned `CVE-2019-5786`.  You can read more about it in the [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Please note that Chrome has reports of this vulnerability being used in the wild so it is strongly recommended you upgrade Electron ASAP.

---

## 범위

이 취약점은 제3자나 신뢰되지 않은 JavaScript 코드를 실행하는 모든 Electron 애플리케이션에 영향을 미칩니다.

## 대처법

영향을 받는 애플리케이션들은 취약점이 해결된 버전의 Electron으로 업데이트해야 합니다.

이 취약점을 해결한 다음의 새로운 Electron 버전을 출시하였습니다.
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

The latest beta of Electron 5 was tracking Chromium 73 and therefore is already patched:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## 추가 정보

This vulnerability was discovered by Clement Lecigne of Google's Threat Analysis Group and reported to the Chrome team.  [여기](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html)에서 Chrome 블로그 게시글을 확인할 수 있습니다.

Electron 애플리케이션의 보안을 안전하게 유지하는 법을 알아보시려면 [보안 자습서](https://electronjs.org/docs/tutorial/security)를 읽어보세요.

Electron의 취약점을 보고하시려면, security@electronjs.org로 이메일을 보내주시길 바랍니다.
