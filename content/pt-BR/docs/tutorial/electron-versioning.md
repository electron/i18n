# Versionamento do Electron

> Uma visão detalhada da nossa política de versionamento e implementação.

A partir da versão 2.0.0, o Electron segue o padrão de Versionamento Semântico ([semver](#semver)). O seguinte comando instalará a versão estável mais recente do Electron:

```sh
npm install --save-dev electron
```

Para atualizar a versão do Electron de um projeto existente para a versão mais recente, use:

```sh
npm install --save-dev electron@latest
```

## Versão 1.x

As versões do Electron *< 2.0* estavam em desacordo com as especificações de [semver](https://semver.org/lang/pt-BR/): as versões maiores correspondiam a mudanças na API do usuário final, as versões menores correspondiam aos lançamentos maiores do Chromium e as versões de correção correspondiam a novos recursos e correções de bugs. Por mais que isso seja conveniente para que desenvolvedores do Electron mesclassem funcionalidades, isso cria problemas para desenvolvedores de aplicativos para o usuário final. Os ciclos de testes de QA de grandes aplicativos como Slack, Stride, Teams, Skype, VS Code, Atom e Desktop podem se tornar demorados, e a estabilidade é um resultado bastante desejado. Existe um alto risco ao se adotar novas funcionalidades ao mesmo tempo em que se tenta absorver correções de bugs.

Aqui está um exemplo da estratégia da era 1.x:

![](../images/versioning-sketch-0.png)

Um app desenvolvido com o Electron versão `1.8.1` não pode receber as correções de bugs da `1.8.3` sem antes ter que ou absorver a funcionalidade da `1.8.2` ou fazer o backport das correções e manter uma nova linha de lançamento.

## Versão 2.0 em diante

Muito da nossa estratégia das versões 1.x foi revisto. Abaixo você confere as mudanças realizadas. Cada uma delas foi feita na intenção de satisfazer as necessidades e prioridades dos desenvolvedores/mantenedores do Electron e de desenvolvedores de aplicativos.

1. Uso rigoroso do semver
2. Uso de tags `-beta` em conformidade com o semver
3. Uso de [mensagens de commit convencionais](https://conventionalcommits.org/)
4. Branches de estabilização bem definidas
5. A branch `master` não tem versão - apenas as branches de estabilização contêm informações de versão

Explicaremos em detalhes como funcionam o esquema de branches do git, o esquema de tags do npm, o que desenvolvedores devem esperar ver e como é possível fazer o backport de alterações.

# semver

Da versão 2.0 em diante, o Electron segue o padrão semver.

Below is a table explicitly mapping types of changes to their corresponding category of semver (e.g. Major, Minor, Patch).

| Major Version Increments      | Minor Version Increments          | Patch Version Increments      |
| ----------------------------- | --------------------------------- | ----------------------------- |
| Electron breaking API changes | Electron non-breaking API changes | Electron bug fixes            |
| Node.js major version updates | Node.js minor version updates     | Node.js patch version updates |
| Chromium version updates      |                                   | fix-related chromium patches  |

Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Estabilizando Branches

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Versões Betas e Correções de Bugs

Developers want to know which releases are *safe* to use. Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

- Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
- Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions: 
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort very late in the beta cycle is 

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

- A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas, and Nightly

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

- nightly builds off of master; these would allow folks to test new features quickly and give feedback
- alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
- feature flags are eventually removed after the feature is released

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

- Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
- Commits that would result in a semver **minor** bump must start with `feat:`.
- Commits that would result in a semver **patch** bump must start with `fix:`.

- We allow squashing of commits, provided that the squashed message adheres the the above message format.

- It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versionless `master`

- The `master` branch will always contain `0.0.0-dev` in its `package.json`
- Release branches are never merged back to master
- Release branches *do* contain the correct version in their `package.json`