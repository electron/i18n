---
title: "Usando GN para construir Electron"
author: nornagon
date: '2018-09-05'
---

Electron agora usa GN para se construir. Aqui está uma discussão sobre o porquê.

---

# GYP e GN

Quando a Electron foi lançada pela primeira vez em 2013, a configuração de construção do Chromium foi escrita com [GYP][], abreviação de "Generate Your Projects".

Em 2014, o projeto Chromium introduziu uma nova ferramenta de configuração de compilação chamada [GN][] (abreviação de "Gerar [Ninja][]") Os arquivos de construção do Chromium foram migrados para GN e GYP foi removido do código fonte.

O elétron historicamente manteve uma separação entre o principal código [Electron][] e [][]libcromiumcontent , a parte de Elétron que envolve o submodulo de "conteúdo" do Cromoium. O Electron continuou a usar o GYP, enquanto libchromiumcontent -- como um subconjunto de Chromium -- mudou para GN quando o Chromium fez.

Como as engrenagens que não são tão malhadas, havia fricção entre o uso dos dois sistemas de construção. Manter a compatibilidade era pronunciado por erro, a partir das bandeiras do compilador e `#define` que precisava ser meticulosamente mantido em sincronia entre o Chromium, Node, V8 e Electron.

Para resolver este problema, a equipe do Electron tem estado a trabalhar em transferir tudo para o GN. Hoje, o [commit](https://github.com/electron/electron/pull/14097) para remover o último código GYP do Electron foi desembarcado em master.

# O que isso significa para você

Se você está contribuindo para o Electron em si, o processo de verificação e construção do Electron do `master` ou 4. .0 é muito diferente do que estava em 3.0.0 e anterior. Veja as [instruções de compilação do GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) para detalhes.

Se você estiver desenvolvendo um aplicativo com Electron, há algumas pequenas alterações que você pode notar no novo Electron 4. .0-noturnoitamente; mas mais do que provável, a mudança do Electron's no sistema de compilação será totalmente transparente para você.

# O que isso significa para o Electron

GN é [mais rápido](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) do que GYP e seus arquivos são mais legíveis e mantidos. Além disso, esperamos que usar um único sistema de configuração de compilação reduza o trabalho necessário para atualizar o Electron para novas versões do Chromium.

 * Isso já ajudou a desenvolver com o Electron 4.0.0 substancialmente porque o Chromium 67 removeu o suporte para MSVC e mudou para o edifício com Clang no Windows. Com a compilação de GN, herdamos todos os comandos do compilador do Chromium diretamente, então conseguimos que o Clang construa no Windows gratuitamente!

 * Também tornou mais fácil para a Electron usar [][] BoringSSL em uma compilação unificada entre Electron, Chromium e Node - algo que era [problemático antes de](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).


[7]: https://boringssl.googlesource.com/boringssl/


[8]: https://boringssl.googlesource.com/boringssl/
[Electron]: https://github.com/electron/electron
[GN]: https://gn.googlesource.com/gn/
[GYP]: https://gyp.gsrc.io/
[Ninja]: https://ninja-build.org/
[5]: https://github.com/electron/libchromiumcontent
[6]: https://github.com/electron/libchromiumcontent
