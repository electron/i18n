# Ilalabas

Ang Dokumentong ito ay nag papakita ng proseso ng pag papalabas ng bersyon ng Electron.

## Alamin kung aling sangay nagmula ang ilalabas

- **If releasing beta,** patakbuhin ang scrip sa ilalim ng `master`.
- **If releasing a stable version,** paganahin na ang script sa ilalim ng `1-7-x` ok kaya `1-6-x`, depende kung anung bersyon ang ilalabas.

## Hanapin kung aling bersyon ang nabago ito ay kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` para makita ang kusang pag generate ng paglabas ng mga tala. Ang mga talang nabuo ay makakatulong upang matukoy kung ito ay major, minor, patch, o kaya beta na nabago ang bersyon. [Version Change Rules](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

## Paganahing ang prepare-release script

Ang hanada ng ilabas na script ay gagawin ang mga sumusunod: 1. Tingnan ang nilabas kung nasa proseso na at kung ganon ito ay ihinto na. 2. Gumawa ng isang sangay na ilalabas. 3. Bump the version number in several files. Tingnan ang [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) para sa halimbawa. 4. Gumawa ng isang draft na I rerelease sa GitHub kasama ang auto-generated na release ng mga tala. 5. Push the release branch. 6. Call the APIs to run the release builds.

Once you have determined which type of version change is needed, run the `prepare-release` script with arguments according to your need: - `[major|minor|patch|beta]` to increment one of the version numbers, or - `--stable` to indicate this is a stable version

Halimbawa:

### Pangunahing pagbabago ng bersyon

```sh
npm run prepare-release -- major
```

### Minor bersyon ay nabago

```sh
npm paganahin ang prepare-release -- minor
```

### Patch bersyon ay nabago

```sh
npm paganahin ang prepare-release -- patch
```

### Beta bersyon ay nabago

```sh
npm paganahin ang prepare-release -- beta
```

### Pataasin ang beta para maging maayos

```sh
npm paganahin ang prepare-release -- stable
```

## Hintayin ang pagkabuo ng :hourglass_flowing_sand:

Ang `prepare-release` script ang nag-trigger ng pag buo ang via API calls. para masubaybayan ang pagbuo ng proseso. tingnan ang mga sumusunod na pahina:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) ito ay para sa Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) ito ay para sa OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) ito ay para sa Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) ito ay para sa Windows

## Tipunin ang mga talang nailabas na

Isulatang mga talang nailabas na ito ay mabuting paraan upang mapanatiling abala ang iyong sarili habang tumatakbo pa ang pagbuo. Para sa bagong art, tingnan ung mga dating nailabas na sa [the releases page](https://github.com/electron/electron/releases).

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Paglabas ng patch

Para sa `patch` na nilabas, gumamit ng mga sumusunod na format:

```sh
# # Bug fix 

* Naayos na ang bahagi ng cross-platform na ito. #123

### Linux

* Naayos na ang bahagi ng Linux. #123

### macOS

* Naayos na ang bahagi ng macOS. #123

###Windows

* Naayos na ang bahagi ng Windows. #1234
```

### Mga Minor na nailabas na

Para sa `minor` na nilabas, e.g. `1.8.0`, gamitin ang format na ito:

```sh
- Itinaas ang Node ' mula sa lumang bersyon' patungo sa 'bagong berston'. #123 

## Mga pagbabago sa ApI 

* Nabago ang isang bahagi. #123

### Linux

* Nabago ang isang bahagi ng Linux. #123

### macOS

* Nabago ang isang bahagi macOS. #123

### Windows

* Nabago ang isang bahagi Windows. #123
```

### Mga pangunahing nilabas

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. #123
- Upgraded from Node `oldVersion` to `newVersion`. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Nabago ang isang bahagi ng Linux. #123

### macOS

* Nabago ang isang bahagi macOS. #123

### Windows

* Nabago ang isang bahagi Windows. #123

## Other Changes

- Some other change. #123
```

### Beta releases

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some instability and/or regressions.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron) under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Edit the release draft

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Wait for all builds to pass before proceeding.
6. You can run `npm run release --validateRelease` to verify that all of the required files have been created for the release.

## Merge temporary branch

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## Publish the release

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Fix missing binaries of a release manually

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite
```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```