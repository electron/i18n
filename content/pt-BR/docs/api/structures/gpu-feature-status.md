# GPUFeatureStatus Object

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Flash Stage3D Baseline profile.
* `gpu_compositing` String - Compositing.
* `multiple_raster_threads` String - Multiple Raster Threads.
* `native_gpu_memory_buffers` String - Native GpuMemoryBuffers.
* `rasterization` String - Rasterization.
* `video_decode` String - Video Decode.
* `video_encode` String - Video Encode.
* `vpx_decode` String - VPx Video Decode.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Valores possíveis:

* `disabled_software` - Apenas aceleração de software. Desativado a de hardware (amarelo)
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