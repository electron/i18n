---
title: Suporte para Apple Silicon
author: Som
date: '2020-10-15'
---

Com o hardware do Apple Silicon sendo lançado mais tarde, este ano, Como é o caminho para você executar sua aplicação Electron no novo hardware?

---

Com o lançamento do Electron 11.0.0-beta. , a equipe do Electron agora está enviando compilações do Electron que executam no novo hardware da Apple Silicon que a Apple planeja enviar no final do ano. Você pode pegar o beta mais recente com `npm install electron@beta` ou baixá-lo diretamente em nosso [site de versões](https://electronjs.org/releases/stable).

## Como é que funciona?

A partir do Electron 11, enviaremos versões separadas do Electron para Intel Macs e Apple Silicon Macs. Antes dessa mudança, nós já estávamos enviando dois artefatos, `darwin-x64` e `mas-x64`, , com este último sendo para uso de compatibilidade da Mac App Store. Agora estamos enviando outros dois artefatos, `darwin-arm64` e `mas-arm64`, que são os equivalentes Apple Silicon dos artefatos mencionados.

## O que eu preciso fazer?

Você precisará enviar duas versões do seu aplicativo: uma para x64 (Intel Mac) e uma para arm64 ((Apple Silicon). The good news is that [`electron-packager`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) and [`electron-forge`](https://github.com/electron-userland/electron-forge/) already support targeting the `arm64` architecture. Desde que você esteja executando as versões mais recentes desses pacotes, seu aplicativo deve funcionar sem falhas uma vez que você atualize a arquitetura de alvos para `arm64`.

No futuro vamos lançar um pacote que permite que você "mesclar" seus aplicativos `arm64` e `x64` em um único binário universal, mas vale a pena notar que esse binário seria _enorme_ e provavelmente não é o ideal para envio para os usuários.

## Problemas em potencial

### Módulos Nativos

Como você está direcionando para uma nova arquitetura, você precisará atualizar várias dependências o que pode causar problemas de construção. A versão mínima de certas dependências está abaixo para sua referência.

| Dependência         | Requisito da Versão |
| ------------------- | ------------------- |
| Xcode               | `>=12.2.0`       |
| `node-gyp`          | `>=7.1.0`        |
| `Reconstruir`       | `>=1.12.0`       |
| `electron-packager` | `>=15.1.0`       |

Como resultado desses requisitos da versão das dependências, você pode ter que corrigir/atualizar certos módulos nativos.  Uma coisa é que o upgrade do Xcode introduzirá uma nova versão do macOS SDK, o que pode causar falhas de criação para seus módulos nativos.


## Como eu o teste?

Atualmente, aplicativos do Apple Silicon são executados apenas em hardware do Apple Silicon, que não está disponível comercialmente no momento de escrever este post. Se você tem um [Kit de Transição de Desenvolvedor](https://developer.apple.com/programs/universal/), você pode testar seu aplicativo nisso. Caso contrário, você terá que esperar o lançamento da produção de hardware do Apple Silicon para testar se o seu aplicativo funciona.

## E quanto ao Rosetta 2?

Rosetta 2 é a mais recente iteração da Apple sobre sua tecnologia de [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) que permite executar x64 Aplicativos Intel em seus novos hardware do Apple Silicon arm64. Embora acreditemos que x64 apps Electron serão executados em Rosetta 2, existem algumas coisas importantes a serem anotadas (e razões pelas quais você deve enviar um binário nativo do arm664).

* O desempenho do app será significativamente degradado. Electron / V8 usa a compilação [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) para JavaScript e devido a como Rosetta funciona, você estará rodando JIT duas vezes (uma vez em V8 e uma vez em Rosetta).
* Você perde o benefício de novas tecnologias no Apple Silicon, como o aumento no tamanho da página da memória.
* Mencionamos que a performance será **de** significativamente degradada?
