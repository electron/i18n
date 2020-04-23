# Supporto Electron

## Trovare Supporto

If you have a security concern, please see the [security document](https://github.com/electron/electron/tree/master/SECURITY.md).

Se stai cercando un aiuto di programmazione o vuoi partecipare ad una discussione con altri sviluppatori che usano Electron, puoi interagirci in queste posizioni:
- Categoria [`electron`](https://discuss.atom.io/c/electron) sui forum Atom
- Canale `#atom-shell` su Freenode
- `#electron` channel on [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Russo)*
- [`electron-br`](https://electron-br.slack.com) *(Brasiliano Portoghese)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
- [`electron-jp`](https://electron-jp.slack.com) *(Giapponese)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Polonia)*

If you'd like to contribute to Electron, see the [contributing document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Se hai trovato bug in una [versione supportata](#supported-versions) di Electron, riportalo con il [tracciatore di problemi](../development/issues.md).

[fantastico-electron](https://github.com/sindresorhus/awesome-electron) è una lista mantenuta dalla community di utili app esemplari, strumenti e risorse.

## Versioni Supportate

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.1.x, then the 5.0.x as well as the 4.2.x series are supported.  We only support the latest minor release for each stable release series.  This means that in the case of a security fix 6.1.x will receive the fix, but we will not release a new version of 6.0.x.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

When an API is changed or removed in a way that breaks existing functionality, the previous functionality will be supported for a minimum of two major versions when possible before being removed. For example, if a function takes three arguments, and that number is reduced to two in major version 10, the three-argument version would continue to work until, at minimum, major version 12. Past the minimum two-version threshold, we will attempt to support backwards compatibility beyond two versions until the maintainers feel the maintenance burden is too high to continue doing so.

### Currently supported versions
- 8.1.x
- 7.1.x
- 6.1.x

### End-of-life

Quando una branca di rilasci raggiunge la fine del suo ciclo di supporto, la serie è deprecata in NPM e viene fatto un rilascio di fine supporto. Questo rilascio aggiunge un avviso per informare che si sta usando una versione di Electron non supportata.

Queste fasi aiutano gli sviluppatori di app ad imparare quando una branca in uso non è supportata, ma senza essere troppo intrusivi con gli utenti.

Se un'app ha circostanze eccezionali e necessita di girare su una serie non supportata di Electron, gli sviluppatori possono silenziare l'avviso di fine supporto omettendo il rilascio finale dal `pacchetto.json` `devDependencies` dell'app. Per esempio, dalla fine serie 1-6-x con una fine del supporto al rilascio 1.6.18 gli sviluppatori possono scegliere di rimanere alla prima versione senza avvisi con `devDipendenza` di `"electron": 1.6.0 - 1.6.17`.

## Piattaforme supportate

Le seguenti piattaforme sono supportate da Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.10 (Yosemite).

### Windows

Windows 7 e superiori sono supportati, sistemi operativi più vecchi non sono supportati (e non funzioneranno).

Sia `ia32` (`x86`) che `x64` (`amd64`) binari sono forniti per Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

I binari `ia32` (`i686`) e `x64` (`amd64`) di Electron sono compilati su Ubuntu 12.04, i binari `armv7l` sono compilati tramite ARM v7 con hard-float ABI e NEON per Debian Wheezy.

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Se il binario precompilato può essere eseguito su una distribuzione dipende dal fatto che la distribuzione includa le librerie a cui Electron è collegato dalla piattaforma di compilazione, quindi solo su Ubuntu 12.04 è garantita l'esecuzione, ma le seguenti piattaforme sono anche verificate per essere in grado di eseguire i binari precompilati di Electron:

* Ubuntu 12.04 and più nuove
* Fedora 21
* Debian 8
