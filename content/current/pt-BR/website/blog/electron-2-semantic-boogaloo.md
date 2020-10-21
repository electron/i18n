---
title: 'Electron 2.0 e além - Versionamento Semântico'
author: águas subterrâneas
date: '2017-12-06'
---

Uma nova versão principal do Electron está em funcionamento, e com isso algumas mudanças na nossa estratégia de versionamento. A partir da versão 2.0.0, o Electron obedecerá estritamente à versão Semântica.

---

Esta mudança significa que você verá a versão principal explodir com mais frequência, e normalmente será uma grande atualização para o Chromium. Versões de atualização também serão mais estáveis, uma vez que agora só conterão correções de bugs sem novas funcionalidades.

**Incrementos maiores de versão**

* Atualizações da versão do Chromium
* Atualizações principais da versão do Node.js
* Alterações na API do Electron

**Incrementos de versão secundária**

* Atualizações de versão menor do Node.js
* Alterações na API do Electron

**Incrementos da versão de correção**

* Atualizações da versão do Node.js patch
* correção de crómio
* Correções de bugs do Electron

Como os intervalos semver do Electron agora serão mais significativos, recomendamos instalar o Electron usando o padrão do npm `--save-dev` bandeira, que irá prefixar sua versão com `^`, mantendo-o atualizado com segurança com atualizações menores e corretas :

```sh
npm install --save-dev electron
```

Para desenvolvedores interessados apenas em correções de erros, você deve usar o prefixo semver do tilde, por exemplo, `~2. .0`, que nunca irá introduzir novos recursos, apenas corrige para melhorar a estabilidade.

Para obter mais detalhes, consulte [electronjs.org/docs/tutorial/electron-versioning](https://electronjs.org/docs/tutorial/electron-versioning).
