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

Nilai yang mungkin:

*  disabled_software </ 0> - Perangkat lunak saja. Akselerasi perangkat keras dinonaktifkan (kuning)</li>
<li><code> disabled_off </ 0> - Dimatikan (merah)</li>
<li><code> disabled_off_ok </ 0> - Dinonaktifkan (kuning)</li>
<li><code> unavailable_software </ 0> - Perangkat lunak saja, akselerasi perangkat keras tidak tersedia (kuning)</li>
<li><code> unavailable_off </ 0> - Tidak tersedia (merah)</li>
<li><code> tidak tersedia_off_ok </ 0> - Tidak tersedia (kuning)</li>
<li><code> enabled_readback </ 0> - Perangkat keras dipercepat namun dengan performa berkurang (kuning)</li>
<li><code> enabled_force </ 0> - Perangkat keras dipercepat di semua halaman (hijau)</li>
<li><code> diaktifkan </ 0> - Akselerasi perangkat keras (hijau)</li>
<li><code> enabled_on </ 0> - Diaktifkan (hijau)</li>
<li><code> enabled_force_on </ 0> - Paksa diaktifkan (hijau)</li>
</ul>