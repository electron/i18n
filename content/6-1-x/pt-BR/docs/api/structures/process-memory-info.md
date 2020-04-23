# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - A quantidade de memória não compartilhada por outros processos, como JS heap ou conteúdo HTML em Kilobytes.
* `shared` Integer - A quantidade de memória compartilhada entre processos, normalmente memória consumida pelo próprio código Electron em Kilobytes.
