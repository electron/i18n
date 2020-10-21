---
title: Descontinuar soporte para Linux de 32 bits
author: felixrieseberg
date: '04-03-2019'
---

El equipo de Electron suspenderá el soporte para Linux de 32 bits (ia32 / i386) a partir de Electron v4.0. La última versión de Electron que soporta instalaciones basadas en 32 bits de Linux es Electron v3.1, que recibirá versiones de soporte hasta que Electron v6 sea liberado. El soporte para Linux basado en 64 bits y `armv7l` continuará sin cambios.

---

## ¿Qué es exactamente lo que Electron ya no apoya?

Puede que haya visto la descripción "64 bits" y "32 bits" como etiquetas en su computadora o como opciones para descargar software. El término se utiliza para describir una arquitectura de computadora específica. La mayoría de las computadoras realizadas en los años 1990 y principios de los años 2000 fueron realizadas con CPUs basadas en la arquitectura de 32 bits, mientras que la mayoría de las computadoras hechas más tarde se basaban en la arquitectura de 64 bits más reciente y más potente. El Nintendo 64 (¿lo consigue? y el PlayStation 2 fueron los primeros dispositivos de consumo ampliamente disponibles con la nueva arquitectura, los ordenadores vendidos después de 2010 contenían casi exclusivamente procesadores de 64 bits. Como resultado, el soporte ha estado disminuyendo: Google dejó de lanzar Chrome para Linux de 32 bits en marzo de 2016, Canonical dejó de proporcionar imágenes de escritorio de 32 bits en 2017 y abandonó el soporte para 32 bits por completo con Ubuntu 18.10. Arch Linux, el sistema operativo eluvio y otras distribuciones prominentes de Linux ya han abandonado el soporte para la arquitectura de procesadores envejecida.

Hasta ahora, Electron ha proporcionado y soportado compilaciones que se ejecutan en la arquitectura anterior de 32 bits. A partir de la versión v4.0, el equipo Electron ya no podrá proporcionar binarios o soporte para Linux de 32 bits.

Electron siempre ha sido un proyecto de código abierto vibrante y seguimos apoyando y alentando a los desarrolladores interesados en construir Electron para arquitecturas exóticas.

## ¿Qué significa eso para los desarrolladores?

Si actualmente no estás proporcionando distribuciones de 32 bits de tu aplicación para Linux, no se requiere ninguna acción.

Proyectos que contengan aplicaciones Linux Electron de 32 bits tendrán que decidir cómo continuar. Linux de 32 bits será soportado en Electron 3 [hasta](https://electronjs.org/docs/tutorial/support#supported-versions) la liberación de Electron 6, lo que da un poco de tiempo para tomar decisiones y planes.

## ¿Qué significa eso para los usuarios?

Si es un usuario de Linux y no está seguro de si está ejecutando o no un sistema basado en 64 bits es probable que se ejecute en una arquitectura basada en 64 bits. Para asegurarte, puedes ejecutar los comandos `lscpu` o `uname -m` en tu terminal. Cualquiera de ellos imprimirá su arquitectura actual.

Si está usando Linux en un procesador de 32 bits, probablemente ya haya encontrado dificultades para encontrar software recientemente liberado para su sistema operativo. El equipo Electron se une a otros miembros prominentes de la comunidad Linux recomendando que actualice a una arquitectura basada en 64 bits.
