# Objeto GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Perfil básico Flash Stage3D.
* `gpu_compositing` String - Composición.
* `multiple_raster_threads` String - Múltiples Hilos Raster.
* `native_gpu_memory_buffers` String - GpuMemoryBuffers Nativo.
* `rasterization` String - Rasterización.
* `video_decode` String - Decodificación de vídeo.
* `video_encode` String - Codificación de vídeo.
* `vpx_decode` String - Decodificación de vídeo VPx.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Posibles valores:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Deshabilitado (rojo)
* `disabled_off_ok` - Deshabilitado (amarillo)
* `unavailable_software` - Sólo software. Aceleración de hardware no disponible (amarillo)
* `unavailable_off` - No disponible (rojo)
* `unavailable_off_ok` - No disponible (amarillo)
* `enabled_readback` - Hardware acelerado pero a menor rendimiento (amarillo)
* `enabled_force` - Hardware acelerado en todas las páginas (verde)
* `enabled` - Hardware acelerado (verde)
* `enabled_on` - Activado (verde)
* `enabled_force_on` - Activado forzado (verde)
