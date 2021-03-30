---
title: "Usando GN para construir Electron"
author: nornagon
date: '2018-09-05'
---

Electron agora usa GN para se construir. Aqui está uma discussão sobre o porquê.

---

# GYP e GN

When Electron was first released in 2013, Chromium's build configuration was written with [GYP][], short for "Generate Your Projects".

In 2014, the Chromium project introduced a new build configuration tool called [GN][] (short for "Generate [Ninja][]") Chromium's build files were migrated to GN and GYP was removed from the source code.

Electron has historically kept a separation between the main [Electron code][] and [libchromiumcontent][], the part of Electron that wraps Chromium's 'content' submodule. O Electron continuou a usar o GYP, enquanto libchromiumcontent -- como um subconjunto de Chromium -- mudou para GN quando o Chromium fez.

Como as engrenagens que não são tão malhadas, havia fricção entre o uso dos dois sistemas de construção. Manter a compatibilidade era pronunciado por erro, a partir das bandeiras do compilador e `#define` que precisava ser meticulosamente mantido em sincronia entre o Chromium, Node, V8 e Electron.

Para resolver este problema, a equipe do Electron tem estado a trabalhar em transferir tudo para o GN. Hoje, o [commit](https://github.com/electron/electron/pull/14097) para remover o último código GYP do Electron foi desembarcado em master.

# O que isso significa para você

Se você está contribuindo para o Electron em si, o processo de verificação e construção do Electron do `master` ou 4. .0 é muito diferente do que estava em 3.0.0 e anterior. Veja as [instruções de compilação do GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) para detalhes.

Se você estiver desenvolvendo um aplicativo com Electron, há algumas pequenas alterações que você pode notar no novo Electron 4. .0-noturnoitamente; mas mais do que provável, a mudança do Electron's no sistema de compilação será totalmente transparente para você.

# O que isso significa para o Electron

GN é [mais rápido](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) do que GYP e seus arquivos são mais legíveis e mantidos. Além disso, esperamos que usar um único sistema de configuração de compilação reduza o trabalho necessário para atualizar o Electron para novas versões do Chromium.

 * Isso já ajudou a desenvolver com o Electron 4.0.0 substancialmente porque o Chromium 67 removeu o suporte para MSVC e mudou para o edifício com Clang no Windows. Com a compilação de GN, herdamos todos os comandos do compilador do Chromium diretamente, então conseguimos que o Clang construa no Windows gratuitamente!

 * It's also made it easier for Electron to use [BoringSSL][] in a unified build across Electron, Chromium, and Node -- something that was [problematic before](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).


[BoringSSL]: https://boringssl.googlesource.com/boringssl/
[Electron code]: https://github.com/electron/electron
[GN]: https://gn.googlesource.com/gn/
[GYP]: https://gyp.gsrc.io/
[Ninja]: https://ninja-build.org/
[libchromiumcontent]: https://github.com/electron/libchromiumcontent
