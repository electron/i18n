# Pag-uupdate ng node

## Pagtatalakay

Isang problema ay ang paggawa ng lahat ng Electron sa isang kopya ng V8 para masigurado ang compatabilidad nito. Ito ay mahalaga dahil ang upstrem Node at [libchromiumcontent](upgrading-chromium.md) ay parehong gumagamit ng sariling version ng V8.

Ang pag-uupgrade ng Node ay mas madali kaysa pag-uupgrade ng libchromiumcontent, dahil maliit lang ang nagiging problema kapag unang nag-uupgrade ng libchromiumcontent, at ang pagpili ng bagong upstream Node na mas malapit sa V8.

Ang Elektron ay may sariling [Node fork](https://github.com/electron/node) na may kasamang modipikasyon para sa V8 na ang mga detalye ay naibanggit sa itaas at para sa paglalantad ng API na kinakailangan ng Elektron. Kapag ang isang upstream Node release ay napili, ito'y nilalagay sa isang branch ng Elektron's Node fork at bawat Elektron Node patch ay inilalapat doon.

Isa pang dahilan sa mga proyekto ng Node ay nagpapatch ito sa bersyon V8. Tulad ng naibanggit sa itaas, ang Elektron ay ginagawa ang lahat sa isang kopya ng V8, kaya lahat ng Node's V8 patches ay kailangang mailagay sa kopyang iyon.

Kapag lahat ng nagdedepende sa Elektron ay tumataas at gumagamit ng parehong kopya ng V8, ang sususnod na hakbang ay ang pag-ayos ng Elektron code na nagbibigay problema sa pag-upgrade ng Node.

[FIXME] isang bagay tungkol sa Node debugger na nasa Atom na (hal. deepak) gagamitin at kailangan para kumpirmahin na hindi masisira sa pag-uupgrade ng Node?

Sa madaling salita, ang kinakaylangan nating gawin ay:

1. I-update ang Elektron's Node fork sa dapat na bersyon
2. I-patch ang backport Node's V8 sa kopya ng ating V8
3. I-update din ang Elektron para magamit ang bagong version ng Node 
  - I-update ang mga submodules
  - At i-update rin ang kumpigurasyon ng Node.js

## Pag-uupdate ng Elektron's Node [fork](https://github.com/electron/node)

1. Siguraduhin na `master` sa `electron/node` ay may updated na release tags galing sa `nodejs/node`
2. Gumawa ng sangay sa https://github.com/electron/node: `electron-node-vX.X.X` kung saan galing ang base na ginamit mo sa branching ay ang tag na kailangan para sa update 
  - `vX.X.X` Dapat gumamit ng bersyon ng node na tugma sa aming kasalukayang bersyon ng chromium
3. Gumamit ulit sa aming mga commits galing sa nakaraang bersyon ng node na aming ginagamit (`vY.Y.Y`) hanggang `v.X.X.X` 
  - Suriin ang mga release tag at piliin ang range of commits na kailangan nating muling i-aplay
  - Ang range para sa Cherry-pick commit: 
    1. Suriin pareho `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resolbahin ang mga naaipon at dumadating na problema bawat file, at pagkatapos ay: 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Ulit-ulitin hanggang sa matapos

## Pag-uupdate ng [V8](https://github.com/electron/node/src/V8) Patches

Kailangan natin bumuo ng patch file mula sa bawat patch na inilapat sa V8.

1. Kumuha ng kopya ng Elektron's libcc fork 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. I-run ang `script/update` to get the latest libcc 
  - This will be time-consuming
3. Remove our copies of the old Node v8 patches 
  - (In libchromiumcontent repo) Read `patches/v8/README.md` to see which patchfiles were created during the last update
  - Remove those files from `patches/v8/`: 
    - `git rm` the patchfiles
    - edit `patches/v8/README.md`
    - commit these removals
4. Inspect Node [repo](https://github.com/electron/node) to see what patches upstream Node used with their v8 after bumping its version 
  - `git log --oneline deps/V8`
5. Create a checklist of the patches. This is useful for tracking your work and for having a quick reference of commit hashes to use in the `git diff-tree` step below.
6. Read `patches/v8/README.md` to see which patchfiles came from the previous version of V8 and therefore need to be removed. 
  - Delete each patchfile referenced in `patches/v8/README.md`
7. For each patch, do: 
  - (In node repo) `git diff-tree --patch HASH > ~/path_to_libchromiumcontent/patches/v8/xxx-patch_name.patch` 
    - `xxx` is an incremented three-digit number (to force patch order)
    - `patch_name` should loosely match the node commit messages, e.g. `030-cherry_pick_cc55747,patch` if the Node commit message was "cherry-pick cc55747"
  - (remainder of steps in libchromium repo) Manually edit the `.patch` file to match upstream V8's directory: 
    - If a diff section has no instances of `deps/V8`, remove it altogether. 
      - We don’t want those patches because we’re only patching V8.
    - Replace instances of `a/deps/v8/filename.ext` with `a/filename.ext` 
      - This is needed because upstream Node keeps its V8 files in a subdirectory
  - Ensure that local status is clean: `git status` to make sure there are no unstaged changes.
  - Confirm that the patch applies cleanly with `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch`
  - Create a new copy of the patch: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - This is needed because the first patch has Node commit checksums that we don't want
  - Confirm that checksums are the only difference between the two patches: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Replace the old patch with the new: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Add the patched code to the index *without* committing: 
    - `cd src/v8 && git add . && cd ../..`
    - We don't want to commit the changes (they're kept in the patchfiles) but need them locally so that they don't show up in subsequent diffs while we iterate through more patches
  - Add the patch file to the index: 
    - `git add a patches/v8/`
  - (Optionally) commit each patch file to ensure you can back up if you mess up a step: 
    - `git commit patches/v8/`
8. Update `patches/v8/README.md` with references to all new patches that have been added so that the next person will know which need to be removed.
9. Update Electron's submodule references: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule referefences for node and libc"
      electron$ git pso upgrade-to-chromium-62
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## Notes

- libcc and V8 are treated as a single unit
- Node maintains its own fork of V8 
  - They backport a small amount of things as needed
  - Documentation in node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of electron 
  - E.g electron, libcc, and node
- We don’t track upstream closely due to logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a node version bump in electron.
- libcc is large and time-consuming to update, so we typically choose the node version based on which of its releases has a version of V8 that’s closest to the version in libcc that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new libcc
  - Electron keeps all its patches in libcc because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, node, libcc, etc. patches are all kept in the same place
  - Building node: 
    - There’s a chance we need to change our build configuration to match the build flags that node wants in `node/common.gypi`