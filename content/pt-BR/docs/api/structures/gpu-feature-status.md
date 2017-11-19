# GPUFeatureStatus Object

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Flash Stage3D Baseline perfil
* `gpu_compositing` String - Composição
* `multiple_raster_threads` String - Multiple Raster Threads
* `native_gpu_memory_buffers` String - Nativo GpuMemoryBuffers
* `rasterization` String - Rasterização
* `video_decode` String - Tipo de descodificador de vídeo
* `video_decode` String - Tipo de codificador de vídeo
* `vpx_decode` String - VPx Video Descodificador
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Valores possíveis:

* `disabled_software` - Apenas aceleração de software. Desativado a de hardware (amarelo)
* `disabled_off` - Desativado (vermelho)
* `disabled_off_ok` - Desativado (amarelo)
* `unavailable_software` - Apenas aceleração de software. Não está disponível a de hardware (amarelo)
* `unavailable_off` - Indisponível (vermelho)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)