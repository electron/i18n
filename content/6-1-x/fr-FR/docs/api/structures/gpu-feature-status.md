# Objet GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Flash Stage3D Baseline profile.
* `gpu_compositing` String - Compositing.
* `multiple_raster_threads` String - Raster Threads Multiples.
* `native_gpu_memory_buffers` String - GpuMemoryBuffers natif.
* `rasterization` String - Rasterization.
* `video_decode` String - Décodage vidéo.
* `video_encode` String - Encodage vidéo.
* `vpx_decode` String - Décodage vidéo VPx.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Valeurs possibles :

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Désactivé (rouge)
* `disabled_off_ok` - Désactivé (jaune)
* `disabled_software` - Logiciel uniquement, accélération matérielle indisponible (jaune)
* `unavailable_off` - Indisponible (rouge)
* `unavailable_off_ok` - Indisponible (jaune)
* `enabled_readback` - Matériel accéléré en dépit d'une performance réduite (jaune)
* `enabled_force` - Accélération matérielle sur toutes les pages (vert)
* `enabled` - Accélération matérielle (vert)
* `enabled_on` - Activé (vert)
* `enabled_force_on` - Activation forcée (vert)
