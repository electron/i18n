# GPUFeatureStatus オブジェクト

* `2d_canvas` String - キャンバス.
* `flash_3d` String - フラッシュ.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Flash Stage3D 標準プロファイル.
* `gpu_compositing` String - 合成.
* `multiple_raster_threads` String - 多重ラスタースレッド.
* `native_gpu_memory_buffers` String - ネイティブの GpuMemoryBuffers.
* `rasterization` String - ラスター化.
* `video_decode` String - ビデオデコード.
* `video_encode` String - ビデオエンコード.
* `vpx_decode` String - VPx ビデオデコード.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

取りうる値:

* `disabled_software` - ソフトウェアのみ。 ハードウェアアクセラレーションは無効 (黄色)
* `disabled_off` - 無効 (赤)
* `disabled_off_ok` - 無効 (黄色)
* `unavailable_software` - ソフトウェアのみ。ハードウェアアクセラレーションは使用不可 (黄色)
* `unavailable_off` - 使用不可 (赤)
* `unavailable_off_ok` - 使用不可 (黄色)
* `enabled_readback` - ハードウェアアクセラレーションがされていますが、低パフォーマンス (黄色)
* `enabled_force` - 全てのページでハードウェアアクセラレーションされています (緑)
* `enabled` - ハードウェアアクセラレーションされています (緑)
* `enabled_on` - 有効 (緑)
* `enabled_force_on` - 強制的に有効 (緑)
