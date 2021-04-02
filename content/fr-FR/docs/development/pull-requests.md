# Pull Requests

* [Configurer votre environnement local](#setting-up-your-local-environment)
  * [Étape 1 : Dupliquer un projet](#step-1-fork)
  * [Etape 2 : Construire, compiler](#step-2-build)
  * [Step 3: Branches](#step-3-branch)
* [Apporter des changements](#making-changes)
  * [Étape 4 : Code](#step-4-code)
  * [Étape 5 : modifications](#step-5-commit)
    * [Ecrire un messages de modification](#commit-message-guidelines)
  * [Étape 6 : Refonder - Rebase](#step-6-rebase)
  * [Étape 7 : Tester](#step-7-test)
  * [Étape 8 : Pousser](#step-8-push)
  * [Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull](#step-9-opening-the-pull-request)
  * [Étape 10 : Examiner et mettre à jour](#step-10-discuss-and-update)
    * [Procédure de validation et de demandes d'évolutions](#approval-and-request-changes-workflow)
  * [Étape 11 : Approbation](#step-11-landing)
  * [Tests en intégration continue](#continuous-integration-testing)

## Configurer votre environnement local

### Étape 1 : Dupliquer un projet

Fourche le projet [sur GitHub](https://github.com/electron/electron) cloner votre fourchette localement.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Etape 2 : Construire, compiler

Le type de système d'exploitation peut faire varier les étapes de construction et les dépendances. Reportez vous au guide dédié pour compiler Electron:

* [S’construire sur macOS](build-instructions-macos.md)
* [Construire sous Linux](build-instructions-linux.md)
* [Construire sous Windows](build-instructions-windows.md)

Dès que le projet est construit, vous pouvez apporter des modifications !

### Step 3: Branches

Pour un environnement de développement ordonné, créez une branche locale qui contiendra votre travail. Votre branche doit être crée directement à partir de la branche `master`.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Apporter des changements

### Étape 4 : Code

La plupart des requêtes de traction ouvertes contre le référentiel `electron/electron` incluent des modifications de au code C/C++ dans le dossier `shell/` , le code JavaScript dans le dossier `lib/` , la documentation en `docs/api/` ou les tests dans le dossier `spec/` .

Penser à lancer régulièrement `npm run lint` après chaque évolution du code, pour en garantir la conformité de style du projet.

Voir [coding style](coding-style.md) pour plus d'informations sur les meilleurs usages lors de modification de code dans les différentes parties du projet.

### Étape 5 : modifications

Il est recommandé de regrouper logiquement les modifications dans des commit dédiés. La plus-part des contributeurs préfèrent passer en revue les changements faits de plusieurs commit. Il est possible d'avoir autant de commit que nécessaire lors d'une proposition d'évolution - demande de Pull - .

```sh
$ git add my/changed/files
$ git commit
```

Au final lorsqu'ils sont revus, de nombreux commit sont fusionnés.

#### Ecrire un messages de modification

Un bon message de modification/commit doit décrire le changement et sa raison. Le projet Electron utilise [messages de validation sémantiques](https://conventionalcommits.org/) rationaliser le de sortie.

Avant qu’une demande de traction puisse être fusionnée, **doit** avoir un titre de demande de traction avec un préfixe sémantique.

Exemples de messages de validation avec préfixes sémantiques :

* `correction: ne pas écraser les prevent_default défaut n’a pas été empêché`
* `feat: ajouter app.isPackaged () méthode`
* `docs: app.isDefaultProtocolClient est maintenant disponible sur Linux`

Préfixes communs :

* correction: Un correctif de bogue
* feat: Une nouvelle fonctionnalité
* docs: Modifications de la documentation
* test : Ajout de tests manquants ou correction des tests existants
* build: Modifications qui affectent le système de construction
* ci : Modifications apportées à nos fichiers et scripts de configuration CI
* perf: Un changement de code qui améliore les performances
* refactor: Un changement de code qui ne corrige pas un bogue ni ajoute une fonctionnalité
* style: Changements qui n’affectent pas la signification du code (linting)
* fournisseur: Bumping une dépendance comme libchromiumcontent ou nœud

Autres choses à garder à l’esprit lors de l’écriture d’un message de validation:

1. La première ligne doit :
   * contenir une courte description du changement (de préférence 50 caractères ou moins, et pas plus de 72 caractères)
   * être entièrement en minuscules à l’exception des noms propres, acronymes et les mots qui font référence au code, comme les noms de variable/fonction
2. Garder vide la deuxième ligne.
3. Ne pas dépasser 72 caractères pour les lignes suivantes.

#### Briser les changements

Un commit dont le texte `BREAKING CHANGE:` au début de sa section optionnelle du corps ou du pied introduit un changement d’API de rupture (corrélant avec le major dans la version sémantique). Une modification de rupture peut faire partie de commits de tout type. par exemple, un `fix:`, `feat:` & `chore:` types seraient tous valides, en plus de tout autre type.

Voir [conventionalcommits.org](https://conventionalcommits.org) plus de détails.

### Étape 6 : Refonder - Rebase

Une fois vos changements livrés-"committés", il est recommander d'utiliser `git rebase` plutôt que `git merge` pour réintégrer l'historique général dans votre branche de travail.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Cela garanti à votre branche de contenir les derniers changements du master de `electron/electron`.

### Étape 7 : Tester

Corrections et fonctionnalités doivent toujours être accompagnées de tests. Un [guide du test](testing.md) est fourni pour rendre le travail plus facile. S'inspirer d'autres tests peut aussi aider.

Exécutez toujours la suite de tests complète avant de soumettre une contribution. Pour exécuter les tests:

```sh
$ npm run test
```

Assurez-vous que linter ne renvoie aucun problème et que tous les tests passent. Ne soumettez aucun patch ne passant pas l'un des tests.

Si vous mettez à jour des tests et que vous souhaitez exécuter une seule spécification pour le vérifier :

```sh
$ npm run test -match=menu
```

Ce qui précède ne serait exécuter des modules spec correspondant à `menu`, ce qui est utile pour toute personne qui travaille sur des tests qui seraient autrement à la toute fin de cycle de test.

### Étape 8 : Pousser

Dès que vos commit sont prêts -- tests et lint inclus --, la procédure de soumission commence par un push de votre branche vers votre fork sur Github.

```sh
$ git push origin my-branch
```

### Étape 9 : Ouvrir la proposition d'évolution - la demande de Pull

Depuis GitHub, en ouvrant une proposition de contribution dite --pull request--, vous aurez à remplir un caneva :

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Étape 10 : Examiner et mettre à jour

Vous obtiendrez probablement des commentaires ou des demandes de modifications à votre demande de traction. Il s’agit d’une grande partie du processus de soumission alors ne vous découragez pas! Certains peuvent signer la demande de traction immédiatement. D’autres peuvent avoir commentaires ou commentaires détaillés. Il s’agit d’une partie nécessaire processus afin d’évaluer si les changements sont corrects et nécessaires.

Pour apporter des modifications à une demande de traction existante, modifiez votre branche d' locale, ajoutez un nouvel engagement avec ces modifications et poussez-les à votre fourche. GitHub mettra automatiquement à jour la demande de traction.

```sh
$ git ajouter mon / changé / fichiers
$ git
$ git push origin my-branch
```

Il existe un certain nombre de mécanismes plus avancés pour gérer les commits à l’aide de `git rebase` qui peuvent être utilisés, mais qui dépassent le cadre de ce guide.

N’hésitez pas à poster un commentaire dans la demande de traction aux examinateurs ping si vous êtes 'attente d’une réponse sur quelque chose. Si vous rencontrez des mots ou des acronymes qui semblent inconnus, se référer à cette [glossaire](https://sites.google.com/a/chromium.org/dev/glossary).

#### Procédure de validation et de demandes d'évolutions

Toutes les demandes de traction nécessitent l’approbation d' [propriétaire du Code](https://github.com/electron/electron/blob/master/.github/CODEOWNERS) de la zone que vous avez modifiée afin d’atterrir. Chaque fois qu’un demande, il peut demander des modifications. Ceux-ci peuvent être petits, tels que la fixation d’une faute de frappe, ou peuvent impliquer des changements substantiels. Ces demandes sont destinées à être utiles, mais les peuvent parfois être considérées comme abruptes ou inutiles, surtout si elles n’incluent pas de suggestions concrètes sur *la façon dont* les modifier.

Essayez de ne pas vous décourager. Si vous estimez qu’un examen est injuste, dites-le ou cherchez à obtenir 'avis d’un autre contributeur au projet. Souvent, ces commentaires sont le résultat d' un examinateur n’ayant pas pris suffisamment de temps pour examiner et ne sont pas mal intentions. De telles difficultés peuvent souvent être résolues avec un peu de patience. Cela dit, il devrait s’attendre à ce que les examinateurs fournissent des commentaires utiles.

### Étape 11 : Approbation

Pour atterrir, une demande de traction doit être examinée et approuvée par au moins un propriétaire de code électronique et passer CI. Après cela, s’il n’y a les objections des autres contributeurs, la demande de traction peut être fusionnée.

Félicitations et merci pour votre contribution!

### Tests en intégration continue

Chaque demande de traction est testée sur le système d’intégration continue (CI) pour confirmer qu’elle fonctionne sur les plates-formes supportées d’Electron.

Idéalement, la demande de traction passera (« être vert ») sur toutes les plates-formes de CI. Cela signifie que tous les tests passent et qu’il n’y a pas d’erreurs de linting. Toutefois, il n’est pas rare que l’infrastructure CI elle-même échoue sur des plates-formes de spécifiques ou que des tests dits « floconneux » échouent (« être rouge »). Chaque CI défaillance doit être inspecté manuellement pour en déterminer la cause.

CI démarre automatiquement lorsque vous ouvrez une demande de traction, mais seuls les de base peuvent redémarrer une course CI. Si vous croyez que CI donne un faux négatif, demandez à un maintenant de redémarrer les tests.
