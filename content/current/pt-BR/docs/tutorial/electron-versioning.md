# Versionamento do Electron

> Uma visão detalhada da nossa política de versionamento e implementação.

As of version 2.0.0, Electron follows [SemVer](#semver). O seguinte comando instalará a versão estável mais recente do Electron:

```sh
npm install --save-dev electron
```

Para atualizar a versão do Electron de um projeto existente para a versão mais recente, use:

```sh
npm install --save-dev electron@latest
```

## Versão 1.x

Electron versions *< 2.0* did not conform to the [SemVer](https://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Por mais que isso seja conveniente para que desenvolvedores do Electron mesclassem funcionalidades, isso cria problemas para desenvolvedores de aplicativos para o usuário final. Os ciclos de testes de QA de grandes aplicativos como Slack, Stride, Teams, Skype, VS Code, Atom e Desktop podem se tornar demorados, e a estabilidade é um resultado bastante desejado. Existe um alto risco ao se adotar novas funcionalidades ao mesmo tempo em que se tenta absorver correções de bugs.

Aqui está um exemplo da estratégia da era 1.x:

![1.x Versioning](../images/versioning-sketch-0.png)

Um app desenvolvido com o Electron versão `1.8.1` não pode receber as correções de bugs da `1.8.3` sem antes ter que ou absorver a funcionalidade da `1.8.2` ou fazer o backport das correções e manter uma nova linha de lançamento.

## Versão 2.0 em diante

Há várias mudanças importantes da nossa estratégia de 1,x descritas abaixo. Cada alteração tem a intenção de satisfazer as necessidades e prioridades dos desenvolvedores/mantenedores e desenvolvedores de aplicativos.

1. Strict use of SemVer
2. Uso de tags `-beta` em conformidade com o semver
3. Uso de [mensagens de commit convencionais](https://conventionalcommits.org/)
4. Branches de estabilização bem definidas
5. A branch `master` não tem versão - apenas as branches de estabilização contêm informações de versão

Explicaremos em detalhes como funcionam o esquema de branches do git, o esquema de tags do npm, o que desenvolvedores devem esperar ver e como é possível fazer o backport de alterações.

# SemVer

From 2.0 onward, Electron will follow SemVer.

Below is a table explicitly mapping types of changes to their corresponding category of SemVer (e.g. Major, Minor, Patch).

| Incrementos maiores de versão                | Incrementos de versão secundária        | Incrementos da versão de correção       |
| -------------------------------------------- | --------------------------------------- | --------------------------------------- |
| Alterações na API do Electron                | Alterações na API do Electron           | Correções de bugs do Electron           |
| Atualizações principais da versão do Node.js | Atualizações de versão menor do Node.js | Atualizações da versão do Node.js patch |
| Atualizações da versão do Chromium           |                                         | correção de crómio                      |

Observe que a maioria das atualizações do Chromium serão consideradas quebras. Correções que podem ser devolvidas provavelmente serão escolhidas como patches como patches.

# Estabilizando Branches

Filiais de estabilização são ramificações que executam paralelamente ao mestre, tomando apenas commits escolhidos por cereja que são relacionados à segurança ou estabilidade. Esses branches nunca mais são mesclados de volta ao mestre.

![Estabilizando Branches](../images/versioning-sketch-1.png)

Como Electron 8, os branches de estabilização são sempre **principais** linhas de versão, e nomeado com o seguinte modelo `$MAJOR-x-y` e. . `8-x-y`.  Antes disso, nós usamos **linhas de versão menores** e nomeamo-las como `$MAJOR-$MINOR-x` ex.: `2-0-x`

Permitimos que existam múltiplos ramos de estabilização simultaneamente, e tencionam apoiar pelo menos duas em paralelo, sempre apoiando correções de segurança conforme necessário. ![Multiple Stability Branches](../images/versioning-sketch-2.png)

Linhas mais antigas não serão suportadas pelo GitHub, mas outros grupos podem tomar posse e manter a estabilidade e correções de segurança por conta própria. Desencorajamos isso, mas reconhecemos que isso torna a vida mais fácil para muitos desenvolvedores de aplicativos.

# Versões Betas e Correções de Bugs

Desenvolvedores querem saber quais lançamentos são _seguros_ para usar. Até recursos aparentemente inocentes podem introduzir regressões em aplicações complexas. Ao mesmo tempo, bloquear uma versão fixa é perigoso, pois você ignora correções de segurança e correções de erros que podem ter saído desde a sua versão. Nosso objetivo é permitir as seguintes variações de semver no `package.json`:

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` para admitir que recurso _razoavelmente estável_ não funciona assim como correções de segurança e erros.

O que é importante no segundo ponto é que aplicativos que usam o `^` ainda devem esperar um nível razoável de estabilidade. To accomplish this, SemVer allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Não importa o que escolher, você terá que subir periodicamente a versão no seu `package.json` pois as alterações de quebra são um fato da vida do Chromium.

O processo é o seguinte:

1. All new major and minor releases lines begin with a beta series indicated by SemVer prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. Após o primeiro beta, os lançamentos beta subsequentes devem satisfazer todas as seguintes condições:
    1. A alteração é compatível com API anterior (deprecations são permitidas)
    2. O risco de cumprir o nosso tempo de estabilidade tem de ser baixo.
2. Se permitidas alterações precisam ser feitas uma vez que o lançamento é beta, elas são aplicadas e a tag de pré-lançamento é aumentada, e. . `2.0.0-beta.2`. .
3. Se uma versão beta específica é _geralmente considerada_ como estável, ela será re-lançada como uma compilação estável, alterando apenas as informações da versão. por exemplo, `2.0.0`. Após a primeira estabilidade do sistema, todas as alterações devem ser de bug ou correções de segurança compatíveis com backward.
4. Se futuras correções de erros ou correções de segurança precisarem ser feitas quando uma versão estiver estável, elas são aplicadas e a versão de _patch_ é incrementada e. . `2.0.1`. .

Especificamente, o significado acima significa:

1. Admitting non-breaking-API changes before Week 3 in the beta cycle is okay, even if those changes have the potential to cause moderate side-effects.
2. Admitindo alterações sinalizadas em recursos, que não alteram de outra forma caminhos de código existentes, na maior parte dos pontos do ciclo beta está tudo bem. Usuários podem habilitar explicitamente essas bandeiras em seus apps.
3. Admitir recursos de qualquer tipo após a Semana 3 no ciclo beta é 👎 sem uma razão muito boa.

Para cada protuberância maior e menor, você deve esperar ver algo parecido com o seguinte:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Um ciclo de vida de exemplo nas imagens:

* Um novo branch de lançamento é criado que inclui o conjunto mais recente de recursos. É publicado como `2.0.0-beta.1`. ![New Release Branch](../images/versioning-sketch-3.png)
* Uma correção de bug entra em master que pode ser reportada para o branch de lançamento. A atualização é aplicada e uma nova versão beta é publicada como `2.0.0-beta.2`. ![Bugfix Backport to Beta](../images/versioning-sketch-4.png)
* A versão beta é considerada _geralmente estável_ e é publicada novamente como uma não-beta em `2.0.0`. ![Beta to Stable](../images/versioning-sketch-5.png)
* Mais tarde, um exploit de dia zero é revelado e uma correção é aplicada ao mestre. Fazemos backup da correção para a linha `2-0-x` e lançamos `2.0.1`. ![Security Backports](../images/versioning-sketch-6.png)

A few examples of how various SemVer ranges will pick up new releases:

![Semvers and Releases](../images/versioning-sketch-7.png)

# Características faltando: Alfa

A nossa estratégia tem alguns compromissos que, por agora, nos parecem adequados. O mais importante é que novos recursos em master possam demorar um pouco antes de atingir uma linha de lançamento estável. Se você quiser tentar um novo recurso imediatamente, você terá que construir o Electron você mesmo.

Como reflexão futura, podemos introduzir um ou ambos os seguintes:

* versões alfa que têm restrições de estabilidade mais estreitas para apostas; por exemplo, seria permitido admitir novos recursos enquanto um canal de estabilidade está em _alpha_

# Feature flag

As bandeiras de recursos são uma prática comum no Chromium, e estão bem estabelecidas no ecossistema de desenvolvimento web. No contexto do Electron, uma feature flag ou um **soft branch** devem ter as seguintes propriedades:

* está habilitado/desativado no tempo de execução, ou no tempo de construção; não suportamos o conceito de sinalizador de recurso com escopo de solicitação
* ele segmenta completamente caminhos de código novos e antigos; refatorar código antigo para suportar um novo recurso _viola_ o contrato da feature flag
* feature flags são eventualmente removidos depois que o recurso é lançado

# Commits semânticos

Procuramos aumentar a clareza em todos os níveis da atualização e do processo de lançamento. Começando com `2.0.0` precisaremos de aderir às especificações de [Commits Convencionais](https://conventionalcommits.org/) , que podem ser resumidas da seguinte forma:

* Commits that would result in a SemVer **major** bump must start their body with `BREAKING CHANGE:`.
* Commits that would result in a SemVer **minor** bump must start with `feat:`.
* Commits that would result in a SemVer **patch** bump must start with `fix:`.

* Autorizamos o esbanjamento de commits, desde que a mensagem esmagada adira ao formato da mensagem acima.
* É aceitável para alguns commits em uma pull request não incluir um prefixo semântico, Contanto que o título do pull request contenha uma mensagem semântica significativa.

# Versionado `mestre`

* O `master` branch sempre conterá a próxima versão maior `X.0.0-nightly.DATE` em seu `package.json`
* Soltar branches nunca mais são mesclados de volta ao mestre
* Release branches _do_ contain the correct version in their `package.json`
* Assim que um branch de lançamento é cortado para um major, o master deve ser chamado para o próximo major.  I.e. `master` is always versioned as the next theoretical release branch
