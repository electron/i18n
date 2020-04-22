---
title: SQLite Vulnerability Fix
author: ckerr
date: '2018-12-18'
---

A remote code execution vulnerability, "[Magellan](https://blade.tencent.com/magellan/index_en.html)," has been discovered affecting software based on SQLite or Chromium, including all versions of Electron.

---

## 범위

Electron applications using Web SQL are impacted.


## 대처법

Affected apps should stop using Web SQL or upgrade to a patched version of Electron.

이 취약점을 해결한 다음의 새로운 Electron 버전을 출시하였습니다.
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3.1.0-beta.4](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

There are no reports of this in the wild; however, affected applications are urged to mitigate.

## 추가 정보

This vulnerability was discovered by the Tencent Blade team, who have published [a blog post that discusses the vulnerability](https://blade.tencent.com/magellan/index_en.html).

Electron 애플리케이션의 보안을 안전하게 유지하는 법을 알아보시려면 [보안 자습서](https://electronjs.org/docs/tutorial/security)를 읽어보세요.

Electron의 취약점을 보고하시려면, security@electronjs.org로 이메일을 보내주시길 바랍니다.
