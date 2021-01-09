# Goma

> Goma is a distributed compiler service for open-source projects such as Chromium and Android.

Electron has a deployment of a custom Goma Backend that we make available to all Electron Maintainers.  See the [Access](#access) section below for details on authentication.

## Enabling Goma

Actuellement, Electron Goma prend en charge Windows, Linux et macOS.  Si vous travaillez sur une plateforme prise en charge, vous pouvez activer goma en important le fichier de config `goma.gn` lors de l'utilisation de `gn`.

```bash
gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") import(\"//electron/build/args/goma.gn\")"
```

Vous devez vous assurer que vous n'avez pas de `cc_wrapper` configuré et donc vous ne pourrez pas utiliser `sccache` ou une technologie similaire.

Avant de pouvoir utiliser goma pour compiler Electron, vous devez vous authentifier auprès du service Goma.  Vous n'avez besoin de le faire qu'une seule fois par machine.

```bash
cd electron/external_binaries/goma
./goma_auth.py login
```

Une fois authentifié, vous devez vous assurer que le daemon goma est en cours d'exécution sur votre machine .

```bash
cd electron/external_binaries/goma
./goma_ctl.py ensure_start
```

## Building with Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.

Veuillez ne pas définir de valeur supérieure à **300** sur Windows ou Linux et à **80** sur macOS, nous surveillons le système goma et les utilisateurs en abusant avec une concurrence déraisonnable seront désactivés.

```bash
ninja -C out/Testing electron -j 200
```

## Monitoring Goma

If you access [http://localhost:8088](http://localhost:8088) on your local machine you can monitor compile jobs as they flow through the goma system.

## Access

Pour des raisons de sécurité et de coût, l'accès à Electron Goma est actuellement restreint aux Mainteneurs d'Electron.  If you want access please head to `#access-requests` in Slack and ping `@goma-squad` to ask for access.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.
