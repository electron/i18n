---
title: Complementos nativos de Node.js e Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Se você estiver tendo problemas para usar um complemento nativo do Node.js com Electron 5. , Há uma chance de que ele precise ser atualizado para trabalhar com a versão mais recente do V8.

---

## Adeus `v8::Handle`, Hello `v8::Local`

Em 2014, a equipe V8 descontinuou `v8::Handle` em favor de `v8::Local` para handles locais. Electron 5.0 inclui uma versão do V8 que finalmente removeu `v8::Handle` para o bem e nó nativo. s addons que ainda o usam precisarão ser atualizados para que possam ser usados com Electron 5.0.

A alteração de código necessária é mínima, mas *todos* os módulos nativos do Node que ainda usam `v8::Handle` falharão em construir com Electron 5. e terá de ser modificado. A boa notícia é esse nó. s v12 também incluirá esta alteração V8, então todos os módulos que usam `v8::Handle` precisarão ser atualizados *de qualquer maneira* para trabalhar com a próxima versão do Node.

## Eu mantenho uma extensão nativa, como posso ajudar?

Se você manter um addon nativo para Node.js, assegure-se de substituir todas as ocorrências de `v8::Handle` com `v8::Local`. O primeiro era apenas um apelido deste último, pelo que não é necessário fazer outras alterações para resolver esta questão específica.

Você também pode estar interessado em investigar o [N-API](https://nodejs.org/api/n-api.html), que é mantido separadamente do V8 como parte do Node. O seu objetivo isola complementos nativos de mudanças no motor JavaScript subjacente. Você pode encontrar mais informações [na documentação da N-API no site do Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Ajuda! Eu uso um complemento nativo no meu aplicativo e ele não vai funcionar!

Se você estiver consumindo uma extensão nativa para o nó. s em seu aplicativo e a extensão nativa não serão construídos por causa deste problema, verifique com o autor da extensão para ver se eles lançaram uma nova versão que corrige o problema. Se não, chegar em contato com o autor (ou [abrindo um Pull Request!](https://help.github.com/articles/about-pull-requests/)) é provavelmente a sua melhor aposta.
