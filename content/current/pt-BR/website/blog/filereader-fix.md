---
title: Correção de vulnerabilidade Chromium FileReader
author: marshallofsound
date: '2019-03-07'
---

Foi descoberta uma vulnerabilidade de alta gravidade no Chrome, que afeta todos os programas baseados no Chromium, incluindo o Electron.

Esta vulnerabilidade foi atribuída `CVE-2019-5786`.  Você pode ler mais sobre isso no [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Por favor, note que o Chrome tem relatos de que essa vulnerabilidade está sendo usada na natureza selvagem, por isso é altamente recomendável que você atualize o Electron ASAP.

---

## Escopo

Isso afeta qualquer aplicativo do Electron que possa executar JavaScript de terceiros ou não confiáveis.

## Mitigação

Os aplicativos afetados devem ser atualizados para a versão alterada do Electron.

Nós publicamos novas versões do Electron que incluem correções para esta vulnerabilidade:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

A versão beta mais recente do Electron 5 estava rastreando o Chromium 73 e, portanto, já está atualizada:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Informações Adicionais

Esta vulnerabilidade foi descoberta pelo Clement Le├ne do Grupo de Análise de Ameaças do Google e relatada à equipe do Chrome.  O post do blog do Chrome pode ser encontrado [aqui](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Para saber mais sobre as melhores práticas para manter seus aplicativos Electron seguros, consulte nosso tutorial de segurança [][].

Se você deseja relatar uma vulnerabilidade no Electron, envie e-mail security@electronjs.org.

[1]: https://electronjs.org/docs/tutorial/security

[2]: https://electronjs.org/docs/tutorial/security
