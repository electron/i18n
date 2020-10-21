---
title: Governança do Electron
author:
  - ckerr
  - sofiangria
date: '2019-03-18'
---

À medida que o Electron cresce em popularidade para aplicações desktops, a equipa que está a trabalhar nisso também cresceu: temos mais mantenedores a tempo inteiro que trabalham para diferentes empresas. viva em fusos horários diferentes e tenha interesses diferentes. Estamos introduzindo uma estrutura de governança para que possamos continuar a crescer sem problemas.

---

## Por que as coisas estão a mudar?

Pessoas no projeto Electron coordenam em fusos horários ao redor do mundo com voluntários, com mantenedores em tempo integral e com várias empresas que dependem todas da Electron. Até agora, fomos bem-sucedidos com coordenação informal; mas como a equipe cresceu, descobrimos que a abordagem não escala. Também queremos tornar mais fácil para novos contribuintes encontrar um lugar onde possam chamar a atenção para o projecto.

## Grupos de Trabalho

A governação do Electron inclui grupos de trabalho responsáveis por diferentes partes do projecto. Estamos começando com sete grupos:
 * Comunidade & segurança: Gerencia o [Código de Conduta](https://github.com/electron/governance/blob/master/CODE_OF_CONDUCT.md) problemas.
 * Documentação & Ferramenta: Representa ferramentas focadas externamente (por exemplo, [Fiddle](https://electronjs.org/fiddle), [Forge](https://electronforge.io/)) e a documentação [Electron](https://electronjs.org/docs).
 * Outreach: Ajuda a crescer a comunidade do Electron.
 * Versões: Garante que os lançamentos são estáveis e dentro do horário.
 * Segurança: Realiza testes de segurança e responde a problemas de segurança.
 * Upgrades: Integra atualizações a montante, como novas versões do V8, Chrome e Node.
 * Site: Mantem e melhora [o site Electron](https://electronjs.org/).

Estes grupos coordenar-se-ão entre si, mas cada um tem os seus próprios calendários de reuniões e agendas para ser produtivo por si só. Mais detalhes sobre estes grupos estão disponíveis no [repositório de governança](https://github.com/electron/governance/blob/master/README.md).

## Isso muda a direção do projeto do Electron?

Isto não deve ter nenhum efeito direto na direção do Electron. Se a nossa estratégia for bem-sucedida, grupos de trabalho facilitarão para novos colaboradores encontrar tópicos que os interessam, e tornar a vida dos mantenedores mais simples fazendo com que a discussão não esteja relacionada com o seu trabalho quotidiano para outros grupos. Se isso acontecer, poderá afectar indirectamente as coisas se houver mais pessoas desbloqueadas a trabalhar em conjunto.

## Onde posso aprender mais?

 * A [repo de governação](https://github.com/electron/governance/) e [charter](https://github.com/electron/governance/tree/master/charter) têm informações sobre a nova estrutura de governança.
 * Cada grupo de trabalho tem sua própria página: [Comunidade](https://github.com/electron/governance/tree/master/wg-community-safety), [Documentos & Ferramentas](https://github.com/electron/governance/tree/master/wg-docs-tools), [Outreach](https://github.com/electron/governance/tree/master/wg-outreach), [Lançamentos](https://github.com/electron/governance/tree/master/wg-releases), [Segurança](https://github.com/electron/governance/tree/master/wg-security), [Atualização](https://github.com/electron/governance/tree/master/wg-upgrades)e [Site](https://github.com/electron/governance/tree/master/wg-website).
 * Você pode entrar em contato com os mantenedores [abrindo uma issue](https://github.com/electron/governance/issues) ou enviando-nos em [info@electronjs.org](mailto:info@electronjs.org).
