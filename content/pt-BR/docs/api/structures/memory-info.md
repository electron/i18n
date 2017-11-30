# MemoryInfo objeto

* `pid` Inteiro - id de processo do processo.
* `workingSetSize` Inteiro - a quantidade de memória atualmente fixado a RAM físico real.
* `peakWorkingSetSize` Inteiro - a quantidade máxima de memória que já foi atribuída a RAM físico real. No macOS seu valor será sempre 0.
* `privateBytes` Inteiro - a quantidade de memória não compartilhada por outros processos, como JS heap ou conteúdo HTML.
* `sharedBytes` Inteiro - a quantidade de memória compartilhada entre processos, normalmente a memória consumida pelo próprio código do elétron

Note-se que todas as estatísticas são relatadas em Kilobytes.