# Ajukan Permintaan

* [Ketergantungan](#dependencies)
* [Atur ulang lingkungan lokal anda](#setting-up-your-local-environment) 
  * [Step 1: Fork](#step-1-fork)
  * [Step 2: Build](#step-2-build)
  * [Step 3: Branch](#step-3-branch)
* [Making Changes](#making-changes) 
  * [Step 4: Code](#step-4-code)
  * [Step 5: Commit](#step-5-commit) 
    * [Commit message guidelines](#commit-message-guidelines)
  * [Step 6: Rebase](#step-6-rebase)
  * [Step 7: Test](#step-7-test)
  * [Step 8: Push](#step-8-push)
  * [Step 9: Opening the Pull Request](#step-9-opening-the-pull-request)
  * [Step 10: Discuss and Update](#step-10-discuss-and-update) 
    * [Approval and Request Changes Workflow](#approval-and-request-changes-workflow)
  * [Step 11: Landing](#step-11-landing)
  * [Continuous Integration Testing](#continuous-integration-testing)

## Atur ulang lingkungan lokal anda

### Step 1: Fork

Fork the project [on GitHub](https://github.com/electron/electron) and clone your fork locally.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Langkah 2: Membangun

Mulai dengan langkah dan dependensi sedikit berbeda tergantung pada sistem operasi Anda. Lihat detail panduan lebih rinci di Building Electron Locally:

* [Membuat di MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Membuat di Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Membuat di Windows](https://electronjs.org/docs/development/build-instructions-windows)

Setelah anda membuat projek secara lokal, anda telah siap untuk membuat perubahan!

### Langkah 3: Cabang

Untuk membuat lingkungan anda tetap terorganisir, buat cabang lokal untuk membantu pekerjaan anda. Ini seharusnya menjadi cabang yang langsung ke `master` cabang.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Membuat Perubahan

### Langkah 4: Kode

Kebanyakan Pull request dibuka berlawanan dengan `electron/electron` repositori termasuk perubahan ke C/C++ code in the `atom/` or `brightray/` folders, the JavaScript code in the `lib/` folder, tempat dokumentasi berada `docs/api/` atau tes di `spec/` folder.

Mohon pastikan untuk menjalankan `npm run lint` dari waktu ke waktu di setiap perubahan kode Untuk memastikan bahwa mereka mengikuti style kode projek.

Lihat [coding style](https://electronjs.org/docs/development/coding-style) untuk informasi lebih lanjut mengenai latihan yang baik ketika memedofikasi kode dalam beberapa bagian projek.

### Langkah 5: Mempercayakan

Hal ini direkomendasikan untuk membuat perubahan pada pengelompokkan secara logika dalam individu mempercayakan. Banyak kontributor menemukan cara yang lebih mudah untuk mereview perubahan yang terpisah di antara beberapa commit. Tidak ada batasan jumlah commit di dalam Pull request.

```sh
$ git add my/changed/files
$ git commit
```

Perhatikan bahwa commit yang bebeapa kali sering terjepit ketika commit tersebut di masukkan.

#### Panduan pesan Commit

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
  * mengandung deskripsi yang singkat tentang perubahan ( Disarankan 50 karakter atau kurang dan tidak lebih dari 72 karakter)
  * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2. Keep the second line blank.
3. Jadikan semua baris pada 72 kolom.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### Langkah 6: Rebase

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### Langkah 7: Tes

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

### Langkah 8: Push

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### Step 9: Opening the Pull Request

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

#### Approval and Request Changes Workflow

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### Step 11: Landing

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Continuous Integration Testing

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.