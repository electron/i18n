# Proposer une Evolution: Demande de Pull

* [Dependances](#dependencies)
* [Configurer votre environnement local](#setting-up-your-local-environment) 
  * [Étape 1 : Dupliquer un projet](#step-1-fork)
  * [Etape 2 : Construire, compiler](#step-2-build)
  * [Step 3: Branch](#step-3-branch)
* [Apporter des changements](#making-changes) 
  * [Étape 4 : Code](#step-4-code)
  * [Étape 5 : modifications](#step-5-commit) 
    * [Ecrire un messages de modification](#commit-message-guidelines)
  * [Étape 6 : Refonder - Rebase](#step-6-rebase)
  * [Étape 7 : Tester](#step-7-test)
  * [Étape 8 : Pousser](#step-8-push)
  * [Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull](#step-8-opening-the-pull-request)
  * [Étape 10 : Examiner et mettre à jour](#step-9-discuss-and-update) 
    * [Procédure de validation et de demandes d'évolutions](#approval-and-request-changes-workflow)
  * [Étape 11 : Approbation](#step-10-landing)
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

### Etape 2 : construire, compiler

Le type de système d'exploitation peut faire varier les étapes de construction et les dépendances. Reportez vous au guide dédié pour compiler Electron:

* [Construire sous MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Construire sous Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Construire sous Windows](https://electronjs.org/docs/development/build-instructions-windows)

Dès que le projet est construit, vous pouvez apporter des modifications !

### Step 3: Branch

Pour un environnement de développement ordonné, créez une branche locale qui contiendra votre travail. Votre branche doit être crée directement à partir de la branche `master`.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Apporter des changements

### Étape 4 : Code

Most pull requests opened against the `electron/electron` repository include changes to either the C/C++ code in the `atom/` or `brightray/` folders, the JavaScript code in the `lib/` folder, the documentation in `docs/api/` or tests in the `spec/` folder.

Please be sure to run `npm run lint` from time to time on any code changes to ensure that they follow the project's code style.

See [coding style](https://electronjs.org/docs/development/coding-style) for more information about best practice when modifying code in different parts of the project.

### Étape 5 : modifications

It is recommended to keep your changes grouped logically within individual commits. Many contributors find it easier to review changes that are split across multiple commits. There is no limit to the number of commits in a pull request.

```sh
$ git add my/changed/files
$ git commit
```

Note that multiple commits often get squashed when they are landed.

#### Ecrire un messages de modification

A good commit message should describe what changed and why.

1. The first line should:
  
  * contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
    
    Exemples :
  
  * `updated osx build documentation for new sdk`
  
  * `fixed typos in atom_api_menu.h`

2. Keep the second line blank.

3. Wrap all other lines at 72 columns.

See [this article](https://chris.beams.io/posts/git-commit/) for more examples of how to write good git commit messages.

### Étape 6 : Refonder - Rebase

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### Étape 7 : Tester

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and just want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### Étape 8 : Pousser

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Step 10: Discuss and update

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