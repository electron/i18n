# Upgrade Node

## Diskusi

Chromium and Node.js both depend on V8, and Electron contains only a single copy of V8, so it's important to ensure that the version of V8 chosen is compatible with the build's version of Node.js and Chromium.

Upgrading Node is much easier than upgrading Chromium, so fewer conflicts arise if one upgrades Chromium first, then chooses the upstream Node release whose version of V8 is closest to the one Chromium contains.

Elektron memiliki garpu [Node sendiri](https://github.com/electron/node) dengan modifikasi untuk detail build V8 yang berisiko di atas dan untuk mengekspos API yang dibutuhkan oleh Elektron. Setelah sebuah Node hulu Pelepasan dipilih, itu ditempatkan di cabang di garpu Node Elektron dan setiap patch Elektron Node diterapkan di sana.

Faktor lain adalah bahwa proyek Node menambal versinya dari V8. Seperti disebutkan di atas, Elektron membangun semuanya dengan satu salinan dari V8, jadi patch V8 Node harus dikirim ke salinan itu.

Setelah semua dependensi Elektron sedang membangun dan menggunakan yang sama salinan V8, langkah selanjutnya adalah memperbaiki masalah kode Elektron yang ditimbulkan dengan upgrade Node.

[FIXME] sesuatu tentang debugger Node di Atom yang kami (misalnya mendalam) Penggunaan dan perlu konfirmasi tidak rusak dengan upgrade Node?

Jadi singkatnya, langkah utamanya adalah:

1. Perbarui garpu Node Elektron ke versi yang diinginkan
2. Backport Node's V8 patches to our copy of V8
3. Update the GN build files, porting changes from node's GYP files
4. Update Electron's DEPS to use new version of Node

## Memperbarui Node Elektron [garpu](https://github.com/electron/node)

1. Pastikan `master` pada `electron/node` telah memperbarui tag rilis dari `nodejs/node`
2. Buat cabang di https://github.com/electron/node: `elektron-simpul-vX.X.X` where the base that you're branching from is the tag for the desired update 
  - `vX.X.X` Must use a version of Node compatible with our current version of Chromium
3. Re-apply our commits from the previous version of Node we were using (`vY.Y.Y`) to `v.X.X.X` 
  - Check release tag and select the range of commits we need to re-apply
  - Rentang komando ceri: 
    1. Checkout keduanya `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Selesaikan gabungan konflik di setiap file yang ditemui, lalu: 
    1. `git tambahkan <conflict-file>`
    2. `git cherry-pick --lanjutkan`
    3. Ulangi sampai selesai

## Memperbarui [V8](https://github.com/electron/node/src/V8) Patch

We need to generate a patch file from each patch that Node applies to V8.

```sh
$ cd third_party/electron_node
$ CURRENT_NODE_VERSION=vX.Y.Z
# Find the last commit with the message "deps: update V8 to <some version>"
# This commit corresponds to Node resetting V8 to its pristine upstream
# state at the stated version.
$ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
# This creates a patch file containing all changes in deps/v8 from
# $LAST_V8_UPDATE up to the current Node version, formatted in a way that
# it will apply cleanly to the V8 repository (i.e. with `deps/v8`
# stripped off the path and excluding the v8/gypfiles directory, which
# isn't present in V8.
$ git format-patch \
    --relative=deps/v8 \
    $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
    deps/v8 \
    ':(exclude)deps/v8/gypfiles' \
    --stdout \
    > ../../electron/common/patches/v8/node_v8_patches.patch
```

This list of patches will probably include one that claims to make the V8 API backwards-compatible with a previous version of V8. Unfortunately, those patches almost always change the V8 API in a way that is incompatible with Chromium.

It's usually easier to update Node to work without the compatibility patch than to update Chromium to work with the compatibility patch, so it's recommended to revert the compatibility patch and fix any errors that arise when compiling Node.

## Update Electron's `DEPS` file

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

## Catatan

- Node mempertahankan garpu sendiri dari V8 
  - Mereka mengemas sejumlah barang kecil sesuai kebutuhan
  - Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of Electron 
  - E.g Electron, Chromium, and Node.js
- Kami tidak melacak upstream karena logistik: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
- Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
  - Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
  - Building Node: 
    - We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.