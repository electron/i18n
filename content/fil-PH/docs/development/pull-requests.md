# Pull Requests

* [Mga Dependency](#dependencies)
* [Setting up your local environment](#setting-up-your-local-environment) 
  * [Unang hakbang: Fork](#step-1-fork)
  * [Ikalawang hakbang: Bumuo](#step-2-build)
  * [Ikatlong hakbang: Sangay](#step-3-branch)
* [Paggawa ng Pagbabago](#making-changes) 
  * [Ikaapat na hakbang: Code](#step-4-code)
  * [Ikalimang hakbang: Magtapat](#step-5-commit) 
    * [Magsagawa ng mga alituntunin ng mensahe](#commit-message-guidelines)
  * [Ikaanim na hakbang: Rebase](#step-6-rebase)
  * [Ikapitong hakbang: Pagsubok](#step-7-test)
  * [Ikawalong hakbang: Itulak](#step-8-push)
  * [Ikasiyam na hakbang: Pagbukas ng Kahilingan ng Pull](#step-9-opening-the-pull-request)
  * [Ikasampong hakbang: Talakayin at I-update](#step-10-discuss-and-update) 
    * [Pag-apruba at Kahilingan sa Pagbabago ng Workflow](#approval-and-request-changes-workflow)
  * [Ikalabin-isang hakbang: Landing](#step-11-landing)
  * [Patuloy na Pagsubok sa Pagsasamasama](#continuous-integration-testing)

## Ang pag-set up ng sariling lokal na kapaligiran

### Unang hakbang: Fork

Ibunsod ang proyekto [on GitHub](https://github.com/electron/electron) at i-clone ang iyong fork na lokal.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Ikalawang hakbang: Bumuo

Gumawa ng mga hakbang at mga dependencies ay bahagyang naiiba na nagdedepende sa iyong operating system. Tingnan ang mga detalyadong gabay sa pagtatayo ng Electron sa isang local:

* [Pagbuo sa MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Pagbuo sa Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Pagbuo sa Windows](https://electronjs.org/docs/development/build-instructions-windows)

Sa sandaling naitayo mo ang proyekto nang lokal, handa ka nang magsimulang gumawa ng mga pagbabago!

### Ikatlong hakbang: Sangay

Upang mapanatili ang iyong kapaligiran sa pag-unlad, lumikha ng mga lokal na sangay at hawakan ang iyong trabaho. Ang mga ito ay dapat na naka direkta sa branched off ng `master` sangay.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Paggawa ng Pagbabago

### Ikaapat na hakbang: Code

Karamihan sa mga hinatak na kahilingan ay binubuksan laban sa `electron/electron` na sisidlan ay kasama ang mga pagbabago sa alinman sa C/C ++ code sa `atom /` o `brightray/` mga folder, ang JavaScript code sa folder na `lib/`, ang dokumentasyon sa `docs/api/` o pagsusulit sa folder na `spec/`.

Siguraduhing magpatakbo ng `npm run lint` mula sa oras-oras sa anumang mga pagbabago sa code upang matiyak na sinusunod nila ang estilo ng code ng proyekto.

Tingnan ang [coding style](https://electronjs.org/docs/development/coding-style) para sa higit pang impormasyon tungkol sa pinakamahusay na kasanayan kapag binabago ang code sa iba't ibang bahagi ng mga proyekto.

### Ikalimang hakbang: Magtapat

Inirerekomenda na panatilihing lohikal ang iyong mga pagbabago sa loob ng indibidwal na gumawa. Maraming taga-ambag na mas madaling suriin ang mga pagbabago na nahati sa maraming mga gumagawa. Walang limitasyon sa bilang ng mga gumagawa sa isang hinahatak na kahilingan.

```sh
$ git add my/changed/files
$ git commit
```

Tandaan na ang maramihang mga gumagawa ay madalas na na-nasquashed kapag sila ay nakarating.

#### Magsagawa ng mga alituntunin ng mensahe

A good commit message should describe what changed and why. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

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

1. The first line should: 
  * naglalaman ng isang maikling paglalarawan ng pagbabago (mas mabuti na 50 karakter o mas mababa, at hindi hihigit sa 72 na karakter)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2. Keep the second line blank.
3. I-wrap ang lahat ng iba pang mga linya sa 72 na mga haligi.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### Ikaanim na hakbang: Rebase

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### Ikapitong hakbang: Pagsubok

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

### Ikawalong hakbang: Itulak

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### Ikasiyam na hakbang: Pagbukas ng Kahilingan ng Pull

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Ikasampung hakbang: Talakayin at i-update

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Pag-apruba at Kahilingan sa Pagbabago ng Workflow

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### Ikalabin-isang hakbang: Landing

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Patuloy na Pagsubok sa Pagsasamasama

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.