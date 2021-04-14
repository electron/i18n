# Goma

> Goma est un service de compilateur distribué pour des projets open-source tels que Chrome et Android.

Electron a un déploiement d’un Backend Goma personnalisé que nous rendons disponible pour tous les entretiens d’électrons.  Consultez la section ['accès](#access) ci-dessous pour plus de détails sur 'authentification.  Il existe également un `cache-only` goma qui sera utilisé par défaut si vous n’avez pas d’informations d’identification.  Les demandes à la Goma ne frapperont pas notre cluster, mais liront à partir de notre cache et devraient se traduire temps de construction significativement plus rapides.

## Activation de Goma

Actuellement, la seule façon prise en charge d’utiliser Goma est d’utiliser nos [construire des](https://github.com/electron/build-tools). La configuration Goma est automatiquement incluse lorsque vous configurez `build-tools`.

Si vous êtes un maintenant et avez accès à notre cluster, assurez-vous d’exécuter des `e init` avec `--goma=cluster` afin de configurer des `build-tools` pour utiliser cluster Goma.  Si vous avez un config existant, vous pouvez simplement définir `"goma": "cluster"` dans votre fichier config.

## Construction avec Goma

Lorsque vous utilisez Goma, vous pouvez exécuter `ninja` avec une valeur de `j` nettement plus élevée que ce qui serait normalement pris en charge par votre machine.

S’il vous plaît ne pas définir une valeur supérieure **200** sur Windows ou Linux et **50** sur macOS. Nous surveillons l’utilisation du système Goma, et les utilisateurs qui abusent 'utiliser avec une concurrence déraisonnable seront désactivés.

```bash
ninja -C out/Testing electron -j 200
```

Si vous utilisez des `build-tools`, les valeurs `-j` appropriées seront automatiquement utilisées pour vous.

## Surveillance de Goma

Si vous accédez [http://localhost:8088](http://localhost:8088) votre machine locale, vous pouvez surveiller les travaux de compilation au fur et à mesure qu’ils traversent le système goma.

## Accès

Pour des raisons de sécurité et de coût, l’accès au cluster Goma d’Electron est actuellement limité aux responsables électrons.  Si vous voulez accéder s’il vous plaît `#access-requests` vous slack et ping `@goma-squad` pour demander l’accès.  Sachez qu’être un n’est pas *automatiquement* 'accès et l’accès à la subvention est déterminé au cas par cas.

## Disponibilité / Support

Nous avons une surveillance automatisée de notre cluster goma et cache à https://status.notgoma.com

Nous ne fournissons pas de soutien pour l’utilisation de Goma et toutes les questions soulevées demandant de l’aide / ayant des problèmes de _probablement_ être fermé sans raison, nous n’avons pas la capacité de gérer ce genre de soutien.
