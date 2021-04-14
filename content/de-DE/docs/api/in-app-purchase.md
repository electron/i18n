# inAppPurchase

> In-App-Käufe im Mac App Store.

Prozess: [Main](../glossary.md#main-process)

## Ereignisse

Das `inAppPurchase` -Modul gibt die folgenden Ereignisse aus:

### Ereignis: 'Transaktionen aktualisiert'

Emittiert, wenn eine oder mehrere Buchungen aktualisiert wurden.

Rückgabewert:

* `event` Event
* `transactions` Transaction[] - Array von [`Transaction`](structures/transaction.md) -Objekten.

## Methoden

Das `inAppPurchase` Modul verfügt über die folgenden Methoden:

### `inAppPurchase.purchaseProduct(productID[, menge])`

* `productID` String - Die Kennungen des zu erwerbenden Produkts. (Der Bezeichner von `com.example.app.product1` ist `product1`).
* `quantity` Ganzzahl (optional) - Die Anzahl der Artikel, die der Benutzer kaufen möchte.

Gibt `Promise<Boolean>` zurück : Gibt `true` zurück, wenn das Produkt gültig ist und der Zahlungswarteschlange hinzugefügt wurde.

Sie sollten so schnell wie möglich und sicherlich vor dem Anruf `purchaseProduct`auf das `transactions-updated` Ereignis hören.

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Die Kennungen der zu erhaltenden Produkte.

Gibt `Promise<Product[]>` zurück : Löst mit einem Array von [`Product`](structures/product.md) -Objekten auf.

Ruft die Produktbeschreibungen ab.

### `inAppPurchase.canMakePayments()`

Gibt `Boolean` zurück - ob ein Benutzer eine Zahlung leisten kann.

### `inAppPurchase.restoreCompletedTransactions()`

Stellt abgeschlossene Transaktionen wieder her. Diese Methode kann aufgerufen werden, um Käufe auf zusätzlichen Geräten zu installieren oder um Käufe für eine Anwendung wiederherzustellen, die der Benutzer gelöscht und neu installiert hat.

[Die Zahlungswarteschlange](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) liefert eine neue Transaktion für jede zuvor abgeschlossene Transaktion, die wiederhergestellt werden kann. Jede Transaktion enthält eine Kopie der ursprünglichen Transaktion.

### `inAppPurchase.getReceiptURL()`

Gibt `String` zurück - den Pfad zum Empfang.

### `inAppPurchase.finishAllTransactions()`

Schließt alle ausstehenden Transaktionen ab.

### `inAppPurchase.finishTransactionByDate(Datum)`

* `date` String - Das ISO-formatierte Datum der transaktion, die abgeschlossen werden soll.

Schließt die ausstehenden Buchungen ab, die dem Datum entsprechen.
