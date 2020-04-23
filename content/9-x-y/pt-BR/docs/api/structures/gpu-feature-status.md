# GPUFeatureStatus Object

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Flash Stage3D Baseline perfil.
* `gpu_compositing` String - Composição.
* `multiple_raster_threads` String - Multiple Raster Threads.
* `native_gpu_memory_buffers` String - Nativo GpuMemoryBuffers.
* `rasterization` String - Rasterização.
* `video_decode` String - Tipo de descodificador de vídeo.
* `video_decode` String - Tipo de codificador de vídeo.
* `vpx_decode` String - VPx Video Descodificador.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Valores possíveis:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Desativado (vermelho)
* `disabled_off_ok` - Desativado (amarelo)
* `unavailable_software` - Apenas aceleração de software. Não está disponível a de hardware (amarelo)
* `unavailable_off` - Indisponível (vermelho)
* `unavailable_off_ok` - Indisponível (amarelo)
* `enabled_readback` - Aceleração de hardware ativado mas não reduzindo o desempenho (amarelo)
* `enabled_force` - Aceleração de hardware em todas as páginas (verde)
* `enabled_force` - Aceleração de hardware (verde)
* `enabled_on` - Habilitado (verde)
* `enabled_force_on` - Força habilitado (verde)
