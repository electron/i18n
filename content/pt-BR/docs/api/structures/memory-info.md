# MemoryInfo Object

* `pid` Integer - Processo id of proccesso.
* `workingSetSize` Integer - A quantidade de memória atualmente fixado a RAM físico real.
* `peakWorkingSetSize` Integer - A quantidade máxima real de memória que já foi atribuída na RAM. No macOS seu valor será sempre é 0.
* `privateBytes` Inteiro - a quantidade de memória não compartilhada por outros processos, como JS heap ou conteúdo HTML.
* `sharedBytes` Integer - A quantidade de memória compartilhada entre processos, normalmente é consumida pelo próprio código do Electron

Note-se que todas as estatísticas são relatadas em Kilobytes.