# API Sperimentali

Alcune API di Electrons sono taggate con `_Experimental_` nella documentazione. Questo tag indica che l'API non può essere considerata stabile e l'API può essere rimossa o modificata più frequentemente rispetto ad altre API con meno preavviso.

## Condizioni per un'API da contrassegnare come sperimentale

Chiunque può richiedere un'API essere etichettato come sperimentale in una funzione PR, i disaccordi sulla natura sperimentale di una funzione possono essere discussi nell'API WG se non possono essere risolti nella PR.

## Processo per la rimozione del tag sperimentale

Una volta che un'API è stata stabile e in almeno due principali linee di rilascio stabili può essere nominata per avere il suo tag sperimentale rimosso.  Questa discussione dovrebbe accadere in una riunione del WG API.  Cose da considerare quando si discute / nomina:

* La condizione di "due principali linee di sgancio delle stalle" di cui sopra deve essere stata soddisfatta
* Durante quel periodo nessun bug / problemi principali avrebbe dovuto essere causato dall'adozione di questa funzione
* L'API è abbastanza stabile e non è stata pesantemente influenzata dagli aggiornamenti di Chromium
* Qualcuno sta usando l'API?
* L'API soddisfa le usecase proposte originali, ha qualche lacuna?
