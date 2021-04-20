---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Il s’agit du deuxième post d’une série en cours expliquant les internes Electron. Consultez le [premier post](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) sur l'intégration de la boucle d'événement si vous ne l'avez pas déjà fait.

La plupart des gens utilisent [Node](https://nodejs.org) pour les applications côté serveur, mais à cause du riche ensemble d'API de Node et de la communauté florissante, il est aussi idéal pour une bibliothèque embarquée. Ce message explique comment Node est utilisé comme une bibliothèque dans Electron.

---

## Construire le système

Node et Electron utilisent [`GYP`](https://gyp.gsrc.io) comme systèmes de construction. Si vous voulez intégrer Node dans votre application, vous devez l'utiliser comme votre système de compilation.

Nouveau sur `GYP`? Lisez [ce guide](https://gyp.gsrc.io/docs/UserDocumentation.md) avant de continuer dans ce post.

## Drapeaux du nœud

Le nœud [`yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) dans le répertoire de code source de Node décrit comment Node est construit, avec beaucoup de [`GYP`](https://gyp.gsrc.io) variables qui contrôlent quelles parties de Node sont activées et si pour ouvrir certaines configurations.

Pour changer les drapeaux de construction, vous devez définir les variables dans le fichier `.gypi` de votre projet . Le script `configure` dans Node peut générer des configurations communes pour vous, par exemple en exécutant `. configure --shared` générera un `config.gypi` avec des variables qui demandent à Node d'être construit en tant que bibliothèque partagée.

Electron n'utilise pas le script `configure` car il a ses propres scripts de compilation. Les configurations pour Node sont définies dans le fichier [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) dans le répertoire du code source d'Electron.

## Lier un noeud avec Electron

Dans Electron, Le noeud est lié en tant que bibliothèque partagée en définissant la variable `GYP` `node_shared` à `true`, de sorte que le type de build de nœud sera changé de `exécutable` à `shared_library`, et le code source contenant le point d'entrée `principal` du noeud ne seront pas compilés.

Puisque Electron utilise la bibliothèque V8 fournie avec Chromium, la bibliothèque V8 incluse dans le code source de Node n'est pas utilisée. Ceci est fait en définissant `node_use_v8_platform` et `node_use_bundled_v8` à `false`.

## Bibliothèque partagée ou bibliothèque statique

Lorsque vous liez avec Node, il y a deux options : vous pouvez soit compiler Node en tant que bibliothèque statique et l'inclure dans l'exécutable final, ou vous pouvez le compiler en tant que bibliothèque partagée et l'expédier à côté de l'exécutable final.

Dans Electron, Node a été construit comme une bibliothèque statique pendant longtemps. Cela rendait la construction simple, permettait les meilleures optimisations de compilateur et permettait à Electron d'être distribué sans un fichier `node.dll` supplémentaire.

Cependant, cela a changé après que Chrome ait basculé pour utiliser [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL est un fork de [OpenSSL](https://www.openssl.org) qui supprime plusieurs API inutilisées et modifie de nombreuses interfaces existantes. Parce que Node utilise toujours OpenSSL, le compilateur générera de nombreuses erreurs de liaison à cause de symboles conflictuels s'ils étaient liés ensemble.

Electron n'a pas pu utiliser BoringSSL dans le nœud, ou utiliser OpenSSL dans Chromium, la seule option était donc de basculer vers la construction d'un noeud en tant que bibliothèque partagée, et [cachent les symboles BoringSSL et OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) dans les composantes de chacune.

Ce changement a apporté à Electron quelques effets secondaires positifs. Avant ce changement de vous n'avez pas pu renommer le fichier exécutable d'Electron sous Windows si vous avez utilisé des modules natifs car le nom de l'exécutable était codé en dur dans la bibliothèque d'importation . Après que Node ait été construit en tant que bibliothèque partagée, cette limitation a été supprimée parce que tous les modules natifs étaient liés au nœud `. ll`, dont le nom n'a pas besoin de être changé.

## Supporte les modules natifs

[Modules natifs](https://nodejs.org/api/addons.html) dans le travail de Noeude en définissant une fonction d'entrée pour le chargement de Noeud, puis la recherche des symboles de V8 et libuv à partir de Node. Ceci est un peu gênant pour les embedders car par défaut les symboles de V8 et libuv sont cachés lors de la construction d'un Node en tant que bibliothèque et les modules natifs échoueront à charger car ils ne peuvent pas trouver les symboles.

Ainsi, afin de faire fonctionner les modules natifs, les symboles V8 et libuv ont été exposés dans Electron. Pour V8, ceci est fait en [forçant tous les symboles dans le fichier de configuration de Chromium à être exposés](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Pour libuv, il est réalisé en [définissant la `définition BUILDING_UV_SHARED=1` définition](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Démarrage de Node dans votre application

Après tout le travail de construction et de liaison avec Node, l'étape finale est d'exécuter Node dans votre application.

Le noeud ne fournit pas beaucoup d'API publiques pour s'intégrer dans d'autres applications. Habituellement, vous pouvez juste appeler [`node::Start` et `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) pour démarrer une nouvelle instance de Node. Cependant, si vous construisez une application complexe basée sur Node, vous devez utiliser des APIs comme `node::CreateEnvironment` pour piloter précisément chaque pas.

Dans Electron, le noeud est démarré en deux modes : le mode autonome qui s'exécute dans le processus principal, qui est similaire aux binaires officiels de Node, et le mode embarqué qui insère les APIs de Node dans les pages Web. Les détails de ceci seront expliqués dans un futur post.

