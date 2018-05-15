# Pull Requests

* [Dependances](#dependencies)
* [Configurer votre environnement local](#setting-up-your-local-environment) 
  * [Étape 1 : Dupliquer un projet](#step-1-fork)
  * [Etape 2 : construire, compiler](#step-2-build)
  * [Step 3: Branches](#step-3-branch)
* [Apporter des changements](#making-changes) 
  * [Étape 4 : Code](#step-4-code)
  * [Étape 5 : modifications](#step-5-commit) 
    * [Ecrire un messages de modification](#commit-message-guidelines)
  * [Étape 6 : Refonder - Rebase](#step-6-rebase)
  * [Étape 7 : Tester](#step-7-test)
  * [Étape 8 : Pousser](#step-8-push)
  * [Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull](#step-9-opening-the-pull-request)
  * [Étape 10 : Examiner et mettre à jour](#step-10-discuss-and-update) 
    * [Procédure de validation et de demandes d'évolutions](#approval-and-request-changes-workflow)
  * [Étape 11 : Approbation](#step-11-landing)
  * [Tests en intégration continue](#continuous-integration-testing)

## Configurer votre environnement local

### Étape 1 : Dupliquer un projet

Fork the project [on GitHub](https://github.com/electron/electron) and clone your fork locally.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Etape 2 : Construire, compiler

Le type de système d'exploitation peut faire varier les étapes de construction et les dépendances. Reportez vous au guide dédié pour compiler Electron:

* [Construire sous MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Construire sous Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Construire sous Windows](https://electronjs.org/docs/development/build-instructions-windows)

Dès que le projet est construit, vous pouvez apporter des modifications !

### Step 3: Branches

Pour un environnement de développement ordonné, créez une branche locale qui contiendra votre travail. Votre branche doit être crée directement à partir de la branche `master`.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Apporter des changements

### Étape 4 : Code

La plus-part des demandes d'évolution concernant le dépôt `electron/electron` comprennent des modifications, soit de code C++ dans le répertoire `atom/` ou `brightray/`, soit de code Javascript dans le répertoire `lib/`, soit de la documentation sous `docs/api/`, ou encore des tests dans le répertoire `spec`.

Penser à lancer régulièrement `npm run lint` après chaque évolution du code, pour en garantir la conformité de style du projet.

Voir [coding style](https://electronjs.org/docs/development/coding-style) pour plus d'informations sur les meilleurs usages lors de modification de code dans les différentes parties du projet.

### Étape 5 : modifications

Il est recommandé de regrouper logiquement les modifications dans des commit dédiés. La plus-part des contributeurs préfèrent passer en revue les changements faits de plusieurs commit. Il est possible d'avoir autant de commit que nécessaire lors d'une proposition d'évolution - demande de Pull - .

```sh
$ git add my/changed/files
$ git commit
```

Au final lorsqu'ils sont revus, de nombreux commit sont fusionnés.

#### Ecrire un messages de modification

Un bon message de modification/commit doit décrire le changement et sa raison. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it should include at least one semantic commit message, though it's not necessary for all commits in the pull request to be semantic. Alternatively, you can **update your pull request title** to start with a semantic prefix.

Examples of commit messages with semantic prefixes:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux` 

Common prefixes:

    - fix: A bug fix
    - feat: A new feature
    - docs: Documentation changes
    - test: Adding missing tests or correcting existing tests
    - build: Changes that affect the build system
    - ci: Changes to our CI configuration files and scripts
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code (linting)
    

Other things to keep in mind when writing a commit message:

1. La première ligne doit : 
  * contenir une courte description de la modification (de préférence moins de 50 caractères, et pas plus de 72)
  * être entièrement en minuscules à l’exception des noms propres, acronymes et les mots qui font référence au code, comme les noms de variable/fonction
2. Garder vide la deuxième ligne.
3. Ne pas dépasser 72 caractères pour les lignes suivantes.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### Étape 6 : Refonder - Rebase

Une fois vos changements livrés-"committés", il est recommander d'utiliser `git rebase` plutôt que `git merge` pour réintégrer l'historique général dans votre branche de travail.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Cela garanti à votre branche de contenir les derniers changements du master de `electron/electron`.

### Étape 7 : Tester

Corrections et fonctionnalités doivent toujours être accompagnées de tests. Un [guide du test](https://electronjs.org/docs/development/testing) est fourni pour rendre le travail plus facile. S'inspirer d'autres tests peut aussi aider.

Exécutez toujours la suite de tests complète avant de soumettre une contribution. Pour exécuter les tests:

```sh
$ npm run test
```

Assurez-vous que linter ne renvoie aucun problème et que tous les tests passent. Ne soumettez aucun patch ne passant pas l'un des tests.

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### Étape 8 : Pousser

Dès que vos commit sont prêts -- tests et lint inclus --, la procédure de soumission commence par un push de votre branche vers votre fork sur Github.

```sh
$ git push origin my-branch
```

### Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull

Depuis GitHub, en ouvrant une proposition de contribution dite --pull request--, vous aurez à remplir un caneva :

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Étape 10 : Examiner et mettre à jour

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Procédure de validation et de demandes d'évolutions

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### Étape 11 : Approbation

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Tests en intégration continue

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.