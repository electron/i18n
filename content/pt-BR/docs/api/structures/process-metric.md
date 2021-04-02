# Processamento de Objeto

* `pid` Inteiro - id de processo do processo.
* `type` String - Tipo de processo. Um dos seguintes valores:
  * `Browser`
  * `Tab`
  * `Utilidade`
  * `Zigoto`
  * `Ajuda ao Sandbox`
  * `GPU`
  * `Plugin de pimenta`
  * `Corretor de plugins de pimenta`
  * `Desconhecido`
* `serviceName` String (opcional) - O nome não localizado do processo.
* `name` String (opcional) - O nome do processo. Exemplos de utilidade: `Audio Service`, `Content Decryption Module Service`, `Network Service`, `Video Capture`, etc.
* `CPU` [CPUUsage](cpu-usage.md) - uso da CPU.
* `creationTime` Número - Tempo de criação para este processo. O tempo é representado como número de milissegundos desde a época. Uma vez que o `pid` pode ser reutilizado após a morte de um processo, é útil usar tanto o `pid` quanto o `creationTime` para identificar um processo exclusivamente.
* `memória` [MemoryInfo](memory-info.md) - informações de memória para o processo.
* `sandboxed` Boolean (opcional) __ _o_ do iCarros - Se o processo é sandboxed no nível do SISTEMA OPERACIONAL.
* `integrityLevel` String (opcional) __ do Windows - Um dos seguintes valores:
  * `Untrusted`
  * `baixo`
  * `Média`
  * `alto`
  * `desconhecido`
