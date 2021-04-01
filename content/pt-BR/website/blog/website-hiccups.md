---
title: Site Hiccups
author: zeke
date: '2018-02-12'
---

Na semana passada, o site [electronjs.org](https://electronjs.org) teve alguns minutos de tempo de inatividade. Se você foi afetado por estas breves interrupções, lamentamos pelo inconveniente. Após um pouco de investigação hoje, diagnosticamos a causa raiz e implantamos uma [correção](https://github.com/electron/electronjs.org/pull/1076).

---

Para evitar esse tipo de tempo de inatividade no futuro, nós permitimos [Heroku Alertas](https://devcenter.heroku.com/articles/metrics#threshold-alerting) em nossa aplicação. Sempre que nosso servidor web acumular solicitações falhadas ou respostas lentas além de um determinado limite, nossa equipe será notificada para que possamos resolver o problema rapidamente.

## Documentação Offline em Todos os Idiomas

Na próxima vez que você estiver desenvolvendo um aplicativo Electron em um avião ou em uma loja de café subterrânea, você pode querer ter uma cópia da documentação para referência off-line. Felizmente, a documentação do Electron está disponível como arquivos Markdown em mais de 20 idiomas.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Documentação Offline com uma interface

[devdocs. o/electron](https://devdocs.io/electron/) é um site útil que armazena documentos para uso offline, não apenas para Electron mas muitos outros projetos como JavaScript, TypeScript, Node. s, React, Angular, e muitos outros. E é claro há um aplicativo Electron também para isso. Confira [devdocs-app](https://electronjs.org/apps/devdocs-app) no site Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Se você gosta de instalar aplicativos sem usar seu mouse ou trackpad, dê ao [Electron Forge](https://electronforge.io/) `do comando` uma tentativa:

```sh
npx electron-forge install egoist/devdocs-app
```