# Objeto ProcessMemoryInfo

* `residentSet` Integer _Linux_ _Windows_ - A quantidade de memória atualmente fixada para a RAM física real em Kilobytes.
* `private` Integer - A quantidade de memória não compartilhada por outros prcessos, como JS heap ou conteúdo HTML em Kilobytes.
* `shared` Integer - A quantidade de memória compartilhada entre processos, normalmente memória consumida pelo próprio código Electron em Kilobytes.
