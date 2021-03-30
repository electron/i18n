---
title: Nova Cadência de Lançamento no Electron
author: sofiangria
date: '2019-05-13'
---

🎉 Electron está sendo movido para lançar uma nova versão estável a cada 12 semanas! 🎉

---

## ⚡ Uau é rápido! Mas porquê?

Simplificando, o Chromium não interrompe o envio, então o Electron também não vai ficar mais lento.

O Chromium lança um calendário consistente de [6 semanas](https://www.chromium.org/developers/calendar). Para entregar as versões mais atualizadas do Chromium no Electron, a nossa programação precisa rastrear as suas versões. Mais informações sobre o ciclo de lançamento do Chromium podem ser encontradas [aqui](https://chromium.googlesource.com/chromium/src/+/master/docs/process/release_cycle.md).

## 🚀 Por que a cada 12 semanas?

A cada 6 semanas, uma nova versão do Chromium vem com novos recursos, correções de bugs/correções de segurança e melhorias na V8. Os utilizadores do Electron têm manifestado alto e bom som sobre o desejo destas mudanças em tempo oportuno. então ajustamos nossas datas de lançamento estáveis para corresponder a todas as outras versões estáveis do Chromium. Antes disso, Electron v6.0. irá incluir M76 e é agendado para lançamento estável em [30 de julho 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), o mesmo dia de lançamento que [Chromium M76](https://www.chromestatus.com/features/schedule).

## 🚧 O que isso significa para mim e para meu aplicativo Electron?

Você terá acesso aos novos recursos e correções do Chromium e V8 antes de antes. Importante, você também saberá _quando_ essas novas mudanças estiverem chegando, então você será capaz de planejar com melhores informações do que antes.

A equipe do Electron continuará [a suportar](https://electronjs.org/docs/tutorial/support#supported-versions) as três últimas versões principais. Por exemplo, quando a [v6.0.0 for estável em 30 de julho de 2019](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule), nós apoiaremos a v6.x, v5.x e a v4.x, enquanto a v3.x alcançará o End-Of-Life.

## 💬 Programa de Feedback de Aplicativos

Por favor, considere juntar-se ao nosso [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) para nos ajudar a testar nossas versões beta e estabilização. Projetos que participam deste programa testam as apostas do Electron em seus aplicativos; e, em troca, os novos bugs que eles encontram são priorizados para a versão estável.

## 📝 Um breve histórico de versões do Electron

As decisões em torno de lançamentos estáveis antes da v3.0.0 não seguiram uma agenda. We added internal schedules to the project with v3.0.0 and v4.0.0. Earlier this year, we decided to publicize our stable release date for the first time for [Electron v5.0.0](https://electronjs.org/blog/electron-5-0-timeline). Anunciar nossas datas de lançamento estável foi recebido de forma geral e estamos animados para continuar fazendo isso para versões futuras.

Para racionalizar melhor estes esforços de atualização, nossos [Upgrades](https://github.com/electron/governance/tree/master/wg-upgrades) e [Releases](https://github.com/electron/governance/tree/master/wg-releases) Grupos de Trabalho foram criados dentro de nosso sistema de [governança](https://electronjs.org/blog/governance). Permitiram-nos definir melhor as nossas prioridades e delegar este trabalho, que esperamos venha a tornar-se mais evidente a cada nova libertação.

Aqui é onde nossa nova cadência nos colocará em comparação com a cadência do Chromium:
<img alt="comparação gráfico de linha do Electron versus versões do Chromium" src="https://user-images.githubusercontent.com/2138661/57543187-86340700-7308-11e9-9745-a9371bb29275.png" />

📨 Se tiver dúvidas, envie-nos um e-mail para [info@electronjs.org](mailto:info@electronjs.org).
