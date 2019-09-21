# Objeto ProcessMemoryInfo

* `residentSet` Integer *Linux* e *Windows* - A quantidade de memória atualmente fixada para RAM física real em Kilobytes.
* `private` Integer - A quantidade de memória não compartilhada por outros processos, como JS heap ou conteúdo HTML em Kilobytes.
* `shared` Integer - A quantidade de memória compartilhada entre processos, normalmente memória consumida pelo próprio código Electron em Kilobytes.