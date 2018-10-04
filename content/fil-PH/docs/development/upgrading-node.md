# Pag-upgrade ng node

## Pagtatalakay

Chromium and Node.js both depend on V8, and Electron contains only a single copy of V8, so it's important to ensure that the version of V8 chosen is compatible with the build's version of Node.js and Chromium.

Upgrading Node is much easier than upgrading Chromium, so fewer conflicts arise if one upgrades Chromium first, then chooses the upstream Node release whose version of V8 is closest to the one Chromium contains.

Ang Elektron ay may sariling [Node fork](https://github.com/electron/node) na may kasamang modipikasyon para sa V8 na ang mga detalye ay naibanggit sa itaas at para sa paglalantad ng API na kinakailangan ng Elektron. Kapag ang isang upstream Node release ay napili, ito'y nilalagay sa isang branch ng Elektron's Node fork at bawat Elektron Node patch ay inilalapat doon.

Isa pang dahilan sa mga proyekto ng Node ay nagpapatch ito sa bersyon V8. Tulad ng naibanggit sa itaas, ang Elektron ay ginagawa ang lahat sa isang kopya ng V8, kaya lahat ng Node's V8 patches ay kailangang mailagay sa kopyang iyon.

Kapag lahat ng nagdedepende sa Elektron ay tumataas at gumagamit ng parehong kopya ng V8, ang sususnod na hakbang ay ang pag-ayos ng Elektron code na nagbibigay problema sa pag-upgrade ng Node.

[FIXME] isang bagay tungkol sa Node debugger na nasa Atom na (hal. deepak) gagamitin at kailangan para kumpirmahin na hindi masisira sa pag-uupgrade ng Node?

Sa madaling salita, ang kinakaylangan nating gawin ay:

1. I-update ang Elektron's Node fork sa dapat na bersyon
2. I-patch ang backport Node's V8 sa kopya ng ating V8
3. Update the GN build files, porting changes from node's GYP files
4. Update Electron's DEPS to use new version of Node

## Pag-uupdate ng Elektron's Node [fork](https://github.com/electron/node)

1. Siguraduhin na `master` sa `electron/node` ay may updated na release tags galing sa `nodejs/node`
2. Gumawa ng sangay sa https://github.com/electron/node: `electron-node-vX.X.X` kung saan galing ang base na ginamit mo sa branching ay ang tag na kailangan para sa update 
  - `vX.X.X` Must use a version of Node compatible with our current version of Chromium
3. Re-apply our commits from the previous version of Node we were using (`vY.Y.Y`) ang to `v.X.X.X` 
  - Suriin ang mga release tag at piliin ang range of commits na kailangan nating muling i-aplay
  - Ang range para sa Cherry-pick commit: 
    1. Suriin pareho `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resolbahin ang mga naaipon at dumadating na problema bawat file, at pagkatapos ay: 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Ulit-ulitin hanggang sa matapos

## Pag-uupdate ng [V8](https://github.com/electron/node/src/V8) Patches

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

## Mga Tala

- Pinapanatili ng Node ang sariling fork ng V8 
  - Bina-backport nila ang isang maliit na halaga sa mga bagay na kinakailangan
  - Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of Electron 
  - E.g Electron, Chromium, and Node.js
- Hindi namin maiging sinusubaybayan ang upstream dahil sa logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
- Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
  - Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
  - Building Node: 
    - We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.