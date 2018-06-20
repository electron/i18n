# Electron Support

## Finding Support

If you have a security concern, please see the [security document](../../SECURITY.md).

If you're looking for programming help, for answers to questions, or to join in discussion with other developers who use Electron, you can interact with the community in these locations:

* [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
* `#atom-shell` channel on Freenode
* [`Electron`](https://atom-slack.herokuapp.com) channel on Atom's Slack
* [`electron-ru`](https://telegram.me/electron_ru) *(Russian)*
* [`electron-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Korean)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japanese)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
* [`electron-pl`](https://electronpl.github.io) *(Poland)*

If you'd like to contribute to Electron, see the [contributing document](../../CONTRIBUTING.md).

If you've found a bug in a [supported version](#supported-versions) of Electron, please report it with the [issue tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

## Supported Versions

The latest three release branches are supported by the Electron team. For example, if the latest release is 2.0.x, then the 2-0-x series is supported, as are the two previous release series 1-7-x and 1-8-x.

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Platform yang Didukung

Platform berikut didukung oleh Electron :

### macOS

Hanya binari 64bit yang disediakan untuk macOS , dan versi maco minimum yang didukung adalah macos 10.9.

### Windows

Windows 7 dan yang lebih baru didukung, sistem operasi yang lama tidak didukung (dan tidak berfungsi).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

Berkas-berkas Elektron dibangun pada kode prebuilt  ia32 </ code> (<code> i686 </ code>) dan <code> x64 </ code> Ubuntu 12.04, biner <code> armv7l </ code> dibangun melawan ARM v7 dengan ABI hard-float dan NEON untuk Debian Wheezy.</p>

<p><a href="https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets"> Sampai rilis Electron 2.0 </a> , Elektron juga akan lanjutkan untuk melepaskan <code> armv7l </ code> biner dengan akhiran <code> lengan </ code> yang baru. Kedua binari adalah identik.</p>

<p>Apakah biner prebuilt dapat berjalan pada distribusi bergantung pada apakah distribusi mencakup perpustakaan yang terhubung dengan Elektron pada platform bangunan, jadi hanya Ubuntu 12.04 yang dijamin berhasil, namun mengikuti platform juga diverifikasi untuk dapat menjalankan binari prebuilt dari Elektron :</p>

<ul>
<li>Ubuntu 12.04 and newer</li>
<li>Fedora 21</li>
<li>Debian 8</li>
</ul>