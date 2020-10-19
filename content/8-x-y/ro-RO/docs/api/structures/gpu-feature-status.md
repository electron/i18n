# Obiect GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Stagiu Flash Stage3D.
* `flash_stage3d_baseline` String - Profilul de bază Flash Stage3D.
* `gpu_compositing` String - Compunere.
* `multiple_raster_threads` String - Teme Raster multiple.
* `native_gpu_memory_buffers` String - Nativ GpuMemoryBuffers.
* `rasterization` String - Rasterizare.
* `video_decode` String - Decodare video.
* `video_encode` String - Codec video.
* `vpx_decode` String - Decodare video VPx.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Valori posibile:

* `disabled_software` - Numai software. Accelerare hardware dezactivată (galben)
* `disabled_off` - Dezactivat (roșu)
* `disabled_off_ok` - Dezactivat (galben)
* `unavailable_software` - Numai software, accelerare hardware indisponibilă (galben)
* `unavailable_off` - Indisponibil (roșu)
* `unavailable_off_ok` - Indisponibil (galben)
* `enabled_readback` - Hardware accelerat, dar la performanță redusă (galben)
* `enabled_force` - Hardware accelerat pe toate paginile (verde)
* `enabled` - Hardware accelerat (verde)
* `enabled_on` - Activat (verde)
* `enabled_force_on` - Forța activată (cu verde)
