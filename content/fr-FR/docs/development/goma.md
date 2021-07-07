# Goma

> Goma est un service de compilation distribué pour les projets open source tels que Chrome et Android.

Electron has a deployment of a custom Goma Backend that we make available to all Electron Maintainers.  See the [Access](#access) section below for details on authentication.  There is also a `cache-only` Goma endpoint that will be used by default if you do not have credentials.  Requests to the cache-only Goma will not hit our cluster, but will read from our cache and should result in significantly faster build times.

## Enabling Goma

Currently the only supported way to use Goma is to use our [Build Tools](https://github.com/electron/build-tools). La configuration de Goma est automatiquement incluse lorsque vous configurez `build-tools`.

Si vous êtes un maintenant et avez accès à notre cluster, assurez-vous d’exécuter des `e init` avec `--goma=cluster` afin de configurer des `build-tools` pour utiliser cluster Goma.  If you have an existing config, you can just set `"goma": "cluster"` in your config file.

## Building with Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.

Veuillez ne pas définir une valeur supérieure à **200** sous Windows ou Linux et **50** sur macOS. We monitor Goma system usage, and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

If you're using `build-tools`, appropriate `-j` values will automatically be used for you.

## Monitoring Goma

Si vous accédez à [http://localhost:8088](http://localhost:8088) sur votre machine, vous pouvez surveiller les tâches de compilation au fur et à mesure qu'elles transitent par le système goma.

## Access

Pour des raisons de sécurité et de coût, l'accès au cluster Goma d'Electron est actuellement restreint aux mainteneurs d'Electron.  Si vous souhaitez y accéder, rendez-vous sur `#access-requests` dans Slack et ping `@goma-squad` pour demander l'accès.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.

## Uptime / Support

Nous avons une surveillance automatisée de notre cluster et de notre cache Goma sur https://status.notgoma.com

We do not provide support for usage of Goma and any issues raised asking for help / having issues will _probably_ be closed without much reason, we do not have the capacity to handle that kind of support.
