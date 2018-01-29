# Oggetto InfoMemoria

* `pid` Numero Intero - Processi id del processo.
* `ImpostaDimensionilavoro` Numero Intero - La quantità di memoria attualmente occupata nella RAM fisica attuale.
* `ImpostapiccoDimensionilavoro` Numero Intero - La massima quantità di memoria che sia mai stata occupata nella RAM fisica attuale. Su macOS questo valore sarà sempre pari a 0.
* `Byteprivati` Numero intero - La quantità di memoria non condivisa da altri processi, come i mucchi JS o i contenuti HTML.
* `Bytecondivisi` Numero intero - La quantità di memoria condivisa tra i processi, tipicamente la memoria consumata dallo stesso codice Electron

Nota che tutte le statistiche sono riportate in Kilobytes.