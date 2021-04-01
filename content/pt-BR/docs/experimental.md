# APIs Experimentais

Algumas das APIs do Electrons são marcadas com `_Experimental_` na documentação. Esta tag indica que a API pode não ser considerada estável e a API pode ser removida ou modificada com mais frequência do que outras APIs com menos aviso.

## Condições para uma API ser marcada como Experimental

Qualquer pessoa pode solicitar que uma API seja marcada como experimental em um recurso PR, desacordos sobre a natureza experimental de um recurso pode ser discutido na API WG se eles não puderem ser resolvidos no PR.

## Processo de remoção da Tag Experimental

Uma vez que uma API esteja estável e em pelo menos duas principais linhas de versão estável, ela pode ser nomeada para ter a sua tag experimental removida.  Esta discussão ocorrerá em uma reunião de API WG.  Coisas a considerar ao discutir / nomear:

* A condição acima "duas grandes linhas de liberação de estábulos" deve ter sido atendida
* Durante esse tempo, nenhum erro importante / issues deveria ter sido causado pela adoção deste recurso
* A API é estável o suficiente e não foi fortemente afetada pelas atualizações do Chromium
* Alguém está usando a API?
* A API está a cumprir os casos de utilização originais propostos, tem alguma lacuna?
