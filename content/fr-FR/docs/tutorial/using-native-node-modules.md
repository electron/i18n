# À l’aide de Modules natifs de nœud

Les modules natifs de nœud sont pris en charge par l’électron, mais étant donné que l’électron est très susceptible d’utiliser une version différente de V8 à partir du nœud binaire installée sur votre système, vous devez spécifier manuellement l’emplacement des en-têtes de l’électron, lors de la génération de modules natifs.

## Comment faire pour installer des modules natifs

Trois façons d’installer les modules natifs :

### À l’aide de `npm`

En définissant quelques variables d’environnement, vous pouvez utiliser `npm` pour installer des modules directement.

Un exemple d’installer toutes les dépendances pour les électrons :

```bash
# Version de l’électron.
Export npm_config_target = 1.2.3 # l’architecture de l’électron, peut être ia32 ou x64.
Export npm_config_arch = x64 export npm_config_target_arch = x64 # Télécharger en-têtes pour les électrons.
Export npm_config_disturl = https://atom.io/download/electron # Tell nœud-pre-gyp que nous construisons pour les électrons.
Export npm_config_runtime = électrons # noeud-pre-gyp Tell pour construire le module de code source.
Export npm_config_build_from_source = true # installer toutes les dépendances et magasin cache à ~ / .electron-gyp.
Page d’accueil = ~ / .electron-gyp NGP install
```

### Installation de modules et de reconstruction pour l’électron

Vous pouvez également choisir d’installer les modules comme nœud d’autres projets et puis reconstruire les modules pour l’électron avec le package [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Ce module peut obtenir la version d’électron et gérer les étapes manuelles de téléchargement d’en-têtes et de construction des modules natifs pour votre application.

Un exemple d’installation `electron-rebuild`, puis des modules de reconstruire avec lui :

```bash
NGP install--save-dev électron-reconstruction # chaque fois que vous exécutez « install NGP », lance le présent :./node_modules/.bin/electron-rebuild # sous Windows si vous avez des problèmes, essayez :.\node_modules\.bin\electron-rebuild.cmd
```

### Construire manuellement pour l’électron

Si vous êtes un développeur développer un module natif et tester contre électronique, vous pouvez reconstruire le module pour électron manuellement. Vous pouvez utiliser `node-gyp` directement à construire pour l’électron :

```bash
/path-to-module CD / Accueil = ~ / .electron-gyp nœud-gyp reconstruire--target = 1.2.3--arch = x64--dist-url = https://atom.io/download/electron
```

La `HOME = ~ / .electron-gyp` change où trouver les headers de développement. La`--target = 1.2.3` est la version d’électron. La `--dist-url =...` spécifie l’endroit où télécharger les en-têtes. La `--arch = x64` dit que le module est prévu pour un système 64 bits.

## Dépannage

Si vous avez installé un module natif et trouvé que cela ne fonctionnait pas, vous devrez vérifier suite choses :

* L’architecture du module doit correspondre à de l’électron (ia32 ou x64).
* Après que vous mise à niveau électronique, vous devez reconstruire les modules.
* En cas de doute, exécutez d’abord `electron-rebuild`.

## Modules qui s’appuient sur `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) permet de publier facilement des modules natifs de nœud avec des binaires précompilés pour plusieurs versions de nœud et de l’électron.

Si les modules fournissent des binaires pour l’utilisation en électronique, assurez-vous d’omettre`--build-de-source` et la variable d’environnement `npm_config_build_from_source` pour tirer pleinement parti des binaires précompilés.

## Modules qui s’appuient sur `node-pre-gyp`

Le tool</a> de `node-pre-gyp` fournit un moyen de déployer des modules natifs de nœud avec des binaires précompilés, et l’utilisent beaucoup de modules populaires.</p> 

Habituellement, ces modules fonctionnent très bien en vertu de l’électron, mais parfois lorsque les électrons utilise une version plus récente du V8 que nœud, et il y a changement d’ABI, de mauvaises choses peuvent arriver. En général il est donc recommandé de toujours construire des modules natifs de code source.

Si vous suivez la voie de la `npm` de l’installation de modules, alors c’est faite par défaut, sinon, vous devrez passer `--build-de-source` à `npm`, ou de définir la variable d’environnement `npm_config_build_from_source`.