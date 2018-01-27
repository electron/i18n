# Oggetto InfoStampante

* `nome` Stringa
* `descrizione` Stringa
* `stato` Numero
* `isDefault` Booleano

## Esempio

Sotto c'è un esempio di alcune opzioni addizionali che possono essere impostati e che potrebbero differenziarsi per piattaforma.

```javascript
{
  nome: 'Zebra_LP2844',
  descrizione: 'Zebra LP2844',
  stato: 3,
  isDefault: false,
  opzioni: {
    copie: '1',
    'device-uri': 'usb://Zebra/LP2844?località=14200000',
    conclusioni: '3',
    'cancella-lavoro-dopo': '10800',
    'tieni-lavoro-fino': 'non-tenere',
    'priorità-lavoro': '50',
    'lavoro-tabelle': 'none,none',
    'evidenziatore-cambia-tempo': '0',
    'numero-su': '1',
    'stampante-comandi': 'nessuno',
    'info-stampante': 'Zebra LP2844',
    'stampante-accetta-lavori': 'true',
    'stampante-condivisa': 'true',
    'località-stampante': '',
    'stampante-marca-e-modello': 'Zebra EPL2 Label Printer',
    'stato-stampante': '3',
    'stato-stampante-cambia-tempo': '1484872644',
    'ragioni-stato-stampante': 'rapporto-offline',
    'tipo-stampante': '36932',
    'uri-stampante-supportato':
    'ipp://localhost/printers/Zebra_LP2844',
    sistema_infodriver: 'Z'
  }
}
```