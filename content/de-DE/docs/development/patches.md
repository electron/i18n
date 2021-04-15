# Patches in Electron

Electron is built on two major upstream projects: Chromium and Node.js. Each of these projects has several of their own dependencies, too. We try our best to use these dependencies exactly as they are but sometimes we can't achieve our goals without patching those upstream dependencies to fit our use cases.

## Patch justification

Every patch in Electron is a maintenance burden. When upstream code changes, patches can break—sometimes without even a patch conflict or a compilation error. It's an ongoing effort to keep our patch set up-to-date and effective. So we strive to keep our patch count at a minimum. To that end, every patch must describe its reason for existence in its commit message. That reason must be one of the following:

1. The patch is temporary, and is intended to be (or has been) committed upstream or otherwise eventually removed. Include a link to an upstream PR or code review if available, or a procedure for verifying whether the patch is still needed at a later date.
2. The patch allows the code to compile in the Electron environment, but cannot be upstreamed because it's Electron-specific (e.g. patching out references to Chrome's `Profile`). Include reasoning about why the change cannot be implemented without a patch (e.g. by subclassing or copying the code).
3. The patch makes Electron-specific changes in functionality which are fundamentally incompatible with upstream.

In general, all the upstream projects we work with are friendly folks and are often happy to accept refactorings that allow the code in question to be compatible with both Electron and the upstream project. (See e.g. [this](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) change in Chromium, which allowed us to remove a patch that did the same thing, or [this](https://github.com/nodejs/node/pull/22110) change in Node, which was a no-op for Node but fixed a bug in Electron.) **We should aim to upstream changes whenever we can, and avoid indefinite-lifetime patches**.

## Patch system

If you find yourself in the unfortunate position of having to make a change which can only be made through patching an upstream project, you'll need to know how to manage patches in Electron.

All patches to upstream projects in Electron are contained in the `patches/` directory. Each subdirectory of `patches/` contains several patch files, along with a `.patches` file which lists the order in which the patches should be applied. Think of these files as making up a series of git commits that are applied on top of the upstream project after we check it out.

```text
patches
├── config.json   <-- this describes which patchset directory is applied to what project
├── chromium
│   ├── .patches
│   ├── accelerator.patch
│   ├── add_contentgpuclient_precreatemessageloop_callback.patch
│   ⋮
├── node
│   ├── .patches
│   ├── add_openssl_is_boringssl_guard_to_oaep_hash_check.patch
│   ├── build_add_gn_build_files.patch
│   ⋮
⋮
```

To help manage these patch sets, we provide two tools: `git-import-patches` and `git-export-patches`. `git-import-patches` imports a set of patch files into a git repository by applying each patch in the correct order and creating a commit for each one. `git-export-patches` does the reverse; it exports a series of git commits in a repository into a set of files in a directory and an accompanying `.patches` file.

> Side note: the reason we use a `.patches` file to maintain the order of applied patches, rather than prepending a number like `001-` to each file, is because it reduces conflicts related to patch ordering. Es verhindert die Situation, dass zwei PRs beide einen Patch am Ende der Serie mit der gleichen Nummerierung hinzufügen und am Ende beide zusammengeführt werden, was zu einem doppelten Bezeichner führt, und es reduziert auch die Abwanderung, wenn ein Patch in der Mitte der Serie hinzugefügt oder gelöscht wird.

### Beispiel

#### Hinzufügen eines neuen Patches

```bash
$ cd src/third_party/electron_node
- vim some/code/file.cc
git commit
. /.. /electron/script/git-export-patches -o .. /.. /electron/patches/node
```

> **HINWEIS**: `git-export-patches` ignoriert alle nicht festgeschriebenen Dateien, daher müssen Sie einen Commit erstellen, wenn Sie möchten, dass Ihre Änderungen exportiert werden. Die Betreffzeile der Commitnachricht wird verwendet, um den Patchdateinamen abzuleiten, und der Text der Commitnachricht sollte den Grund für das Vorhandensein des Patches enthalten.

Das erneute Exportieren von Patches führt manchmal dazu, dass sich Shasums in nicht verwandten Patches ändern. Dies ist im Allgemeinen harmlos und kann ignoriert werden (aber gehen Sie vor und fügen Sie diese Änderungen zu Ihrer PR hinzu, es wird sie davon abhalten, für andere Personen zu zeigen).

#### Bearbeiten eines vorhandenen Patches

```bash
$ cd src/v8
- vim some/code/file.cc
' git log
' Suchen Sie den Commit-Sha des Patches, den Sie bearbeiten möchten.
$ git commit --fixup [COMMIT_SHA]
$ git rebase --autosquash -i [COMMIT_SHA].
. /electron/script/git-export-patches -o .. /electron/patches/v8
```

#### Entfernen eines Patches

```bash
$im src/electron/patches/node/.patches
- Löschen Sie die Zeile mit dem Namen des Patches, den Sie entfernen möchten,
cd src/third_party/electron_node
- git reset --hard refs/patches/upstream-head
. /.. /electron/script/git-import-patches .. /.. /electron/patches/node
. /.. /electron/script/git-export-patches -o .. /.. /electron/patches/node
```

Beachten Sie, dass `git-import-patches` den Commit markiert, der `HEAD` wurde, als er ausgeführt wurde, als `refs/patches/upstream-head`. Auf diese Weise können Sie nachverfolgen, welche Commits von Electron-Patches stammen (die nach `refs/patches/upstream-head`) und welche Commits sich im Upstream befinden (die vor `refs/patches/upstream-head`).

#### Konflikte beheben

Beim Aktualisieren einer Upstream-Abhängigkeit können Patches möglicherweise nicht ordnungsgemäß angewendet werden. Häufig kann der Konflikt automatisch durch git mit einer 3-Wege-Zusammenführung gelöst werden. Sie können `git-import-patches` anweisen, den 3-Wege-Zusammenführungsalgorithmus zu verwenden, indem Sie das argument `-3` übergeben:

```bash
electron_node
third_party Wenn die Patch-Anwendung in der Mitte des Vorgangs fehlgeschlagen ist, können Sie sie zurücksetzen mit:
--abort
- Und wiederholen Sie dann mit 3-Wege-Zusammenführung:
. /.. /electron/script/git-import-patches -3 .. /.. /electron/patches/node
```

Wenn `git-import-patches -3` auf einen Zusammenführungskonflikt stößt, den er nicht automatisch lösen kann, wird er angehalten und ermöglicht es Ihnen, den Konflikt manuell zu lösen. Nachdem Sie den Konflikt gelöst haben, `git add` die aufgelösten Dateien und wenden Sie die restlichen Patches weiter an, indem Sie `git am --continue`ausführen.
