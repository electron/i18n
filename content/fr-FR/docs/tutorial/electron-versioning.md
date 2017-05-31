# Versioning des électrons

Si vous avez été à nœud et NGP pendant un certain temps, vous êtes probablement au courant de la [Semantic Versioning](http://semver.org), ou SemVer en abrégé. Il s’agit d’une convention pour les numéros de version pour le logiciel qui permet de communiquer les intentions pour les utilisateurs de votre logiciel.

## Vue d’ensemble du versionnage sémantique

Les versions sémantiques sont toujours constituées de trois nombres :

    Major.minor.patch
    

Numéros de version sémantiques sont cognés (incrémenté) en utilisant les règles suivantes :

* **Major** est pour les modifications qui casser la compatibilité en arrière.
* **Minor** est pour les nouvelles fonctionnalités qui ne cassent la compatibilité en arrière.
* **Patch** est pour les corrections de bugs et autres modifications mineures.

Un simple mnémonique pour se rappeler de ce régime est comme suit :

    Breaking.Feature.Fix
    

## Versioning des électrons

En raison de sa dépendance sur le nœud et le chrome, il n’est pas possible pour le projet d’électrons à adhérer à une politique de SemVer. **You doit donc toujours faire référence à une version spécifique du Electron.**

Numéros de version des électrons sont heurtés en utilisant les règles suivantes :

* **Major** est pour briser les changements dans l’API de l’électron. Si vous mettez à niveau `0.37.0` à `1.0.0`, vous devrez apporter des modifications à votre application.
* **Minor** de Chrome majeur et mineurs mises à niveau de nœud, ou électron significatif change. Si vous mettez à niveau `1.5.0` à `1.6.0`, votre application est supposée fonctionne toujours, mais vous devrez peut-être travailler autour de petits changements.
* **Patch** est pour les nouvelles fonctionnalités et corrections de bugs. Si vous mettez à niveau `1.6.2` à `1.6.3`, votre application continuera à travailler en tant que-est.

Nous vous recommandons de définir une version fixe lors de l’installation électronique de NGP :

```sh
NGP installer électrons--save-exact--save-dev
```

La `--save-exact` drapeau va ajouter `electron` à votre fichier `package.json` sans utiliser un ` ^ ` ou ` ~ `, par exemple `1.6.2` au lieu de ` ^ 1.6.2`. Cette pratique garantit que toutes les mises à niveau des électrons sont une opération manuelle effectuée par vous, le développeur.

Vous pouvez également utiliser le ` ~` préfixe dans votre gamme de SemVer, comme ` ~ 1.6.2`. Cela va verrouiller votre version principale et secondaire, mais permettent de nouvelles versions de correctif doit être installé.