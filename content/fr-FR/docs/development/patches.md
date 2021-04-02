# Patchs en électron

Electron est construit sur deux grands projets en amont : chrome et nœud.js. Chacun de ces projets a plusieurs de ses propres dépendances, aussi. Nous faisons de notre mieux pour utiliser ces dépendances exactement telles qu’elles sont, mais parfois nous ne pouvons pas atteindre nos objectifs sans patcher ces dépendances en amont pour s’adapter à nos cas d’utilisation.

## Justification du patch

Chaque patch dans Electron est un fardeau de maintenance. Lorsque le code en amont change, les correctifs peuvent se briser, parfois même sans conflit de patch ou erreur de compilation. Il s’agit d’un effort continu pour maintenir notre patch mis à jour et efficace. Nous nous efforçons donc de garder notre nombre de patchs au minimum. À cette fin, chaque patch doit décrire sa raison d’être dans son message de validation. Cette raison doit être l’une des raisons suivantes :

1. Le patch est temporaire, et est destiné à être (ou a été) commis en amont ou autrement éventuellement supprimé. Incluez un lien vers un examen des relations publiques ou du code en amont s’il est disponible, ou une procédure pour vérifier si le patch est toujours nécessaire à une date ultérieure.
2. Le patch permet au code de compiler dans l’environnement Electron, mais ne peut pas être en amont parce qu’il est spécifique aux électrons (par exemple, patcher les références aux `Profile`de Chrome). Inclure un raisonnement sur les raisons pour lesquelles la modification ne peut pas être implémentée sans patch (par exemple en sous-classant ou en copiant le code).
3. Le patch apporte des modifications spécifiques aux électrons dans les fonctionnalités qui sont fondamentalement incompatibles avec l’amont.

En général, tous les projets en amont avec qui nous travaillons sont des gens sympathiques et sont souvent heureux d’accepter des refactorisations qui permettent au code en question d’être compatible à la fois avec Electron et le projet en amont. (Voir p. ex. [ce changement](https://chromium-review.googlesource.com/c/chromium/src/+/1637040) dans chrome, qui nous a permis de supprimer un patch qui a fait la même chose, ou [ce changement de](https://github.com/nodejs/node/pull/22110) dans Node, qui était un no-op pour nœud, mais fixé un bug dans Electron.) **Nous devrions viser à des changements en amont chaque fois que nous le pouvons, et éviter les correctifs à durée indéterminée**.

## Système de patch

Si vous vous trouvez dans la position malheureuse d’avoir à faire un changement qui ne peut être fait par le patchage d’un projet en amont, vous aurez besoin de savoir comment gérer les correctifs dans Electron.

Tous les correctifs aux projets en amont d’Electron sont contenus dans `patches/` répertoire. Chaque sous-direction de `patches/` contient plusieurs fichiers patch, ainsi qu’un fichier `.patches` qui répertorie l’ordre dans lequel les correctifs doivent être appliqués. Pensez à ces fichiers comme faisant une série de commits git qui sont appliqués sur le dessus du projet en amont après que nous l’avons vérifié.

```text
patchs
ン―― config.json   <-- cela décrit quel répertoire patchset est appliqué à ce projet
ンンン―― chrome
ン ンン―― .patches
ンン―― accelerator.patch
ンンン add_contentgpuclient_precreatemessageloop_callback.patch
ン ⋮
ンン-― nœud
ンンン―― .patches
ンンン-― add_openssl_is_boringssl_guard_to_oaep_hash_check.patch
ンン―― build_add_gn_build_files.patch
ン ⋮
⋮
```

Pour aider à gérer ces ensembles de correctifs, nous fournissons deux outils : `git-import-patches` et `git-export-patches`. `git-import-patches` importe un ensemble de fichiers patch dans un référentiel git en appliquant chaque patch dans le bon ordre et en créant un commit pour chacun d’eux. `git-export-patches` fait l’inverse; il exporte une série de git commits dans un référentiel dans un ensemble de fichiers dans un répertoire et un fichier `.patches` accompagnateur.

> Note latérale : la raison pour laquelle nous utilisons un fichier `.patches` pour maintenir l’ordre des correctifs appliqués, plutôt que de prépendre un nombre comme `001-` à chaque fichier, c’est parce qu’il réduit les conflits liés à la commande de correctifs. Il empêche la situation où deux PR ajoutent tous deux un patch à la fin de la série avec la même numérotation et finissent par être fusionnés résultant en un identificateur en double, et il réduit également le taux de désabonnement lorsqu’un patch est ajouté ou supprimé au milieu de la série.

### Utilisation

#### Ajout d’un nouveau patch

```bash
$ cd src /third_party/electron_node
$ vim some/code/file.cc
$ git commit
$ .. /.. /électron/script/git-export-patches -o .. /.. /électron/patchs/nœud
```

> **NOTE**: `git-export-patches` ignore les fichiers non engagés, vous devez donc créer un commit si vous souhaitez que vos modifications soient exportées. La ligne d’objet du message de validation sera utilisée pour obtenir le nom du fichier patch, et le corps du message de validation doit inclure la raison de l’existence du patch.

Les correctifs réexportants provoquent parfois des changements de shasums dans des patchs non apparentés. Ceci est généralement inoffensif et peut être ignoré (mais allez-y et ajouter ces changements à votre PR, il va les empêcher de se présenter pour d’autres personnes).

#### Modification d’un patch existant

```bash
$ cd src / v8
$ vim certains / code / file.cc
$ git log
# Trouver le commit sha du patch que vous voulez modifier.
$ git commit - fixup [COMMIT_SHA]
$ git rebase - autosquash -i [COMMIT_SHA]^
$ .. /électron/script/git-export-patches -o .. /électron/patchs/v8
```

#### Suppression d’un patch

```bash
$ vim src / électron / patchs / nœud / .patches
# Supprimer la ligne avec le nom du patch que vous voulez supprimer
$ cd src / third_party / electron_node
$ git réinitialiser - refs dur / patchs / tête en amont
$ . . . /.. /électron/script/git-import-patches .. /.. /électron/patchs/nœud
$ .. /.. /électron/script/git-export-patches -o .. /.. /électron/patchs/nœud
```

Notez que `git-import-patches` marquera le commit qui a été `HEAD` quand il a été exécuté comme `refs/patches/upstream-head`. Cela vous permet de garder une trace des commits qui sont des correctifs Electron (ceux qui viennent après `refs/patches/upstream-head`) et qui s’engage sont en amont (ceux avant `refs/patches/upstream-head`).

#### Résolution des conflits

Lors de la mise à jour d’une dépendance en amont, les correctifs peuvent ne pas s’appliquer proprement. Souvent, le conflit peut être résolu automatiquement par git avec une fusion à 3. Vous pouvez demander `git-import-patches` 'utiliser l’algorithme de fusion 3-way en passant l’argument `-3` de travail :

```bash
$ cd src / third_party /electron_node
# Si l’application patch échoué à mi-chemin, vous pouvez le réinitialiser avec:
$ git am - avorter
# Et puis réessayer avec fusion à 3 sens:
$ .. /.. /électron/script/git-import-patches -3 .. /.. /électron/patchs/nœud
```

Si `git-import-patches -3` rencontre un conflit de fusion qu’il ne peut pas résoudre automatiquement, il s’arrêtera et vous permettra de résoudre le conflit manuellement. Une fois que vous avez résolu le conflit, `git add` les fichiers résolus et continuer à appliquer le reste des correctifs en exécutant `git am --continue`.
