---
title: Interruzione del supporto per Linux a 32-bit
author: felixrieseberg
date: '2019-03-04'
---

Il team Electron interromperà il supporto per Linux a 32 bit (ia32 / i386) a partire da Electron v4.0. L'ultima versione di Electron che supporta installazioni a 32 bit di Linux è Electron v3.1, che riceverà versioni di supporto fino al rilascio di Electron v6. Il supporto per Linux basato su 64 bit e `armv7l` continuerà inalterato.

---

## Che cosa esattamente non supporta più Electron?

Potresti aver visto la descrizione "64-bit" e "32-bit" come adesivi sul tuo computer o come opzioni per il download di software. Il termine è usato per descrivere una specifica architettura informatica. La maggior parte dei computer realizzati negli anni '90 e all'inizio del 2000 sono stati realizzati con CPU basate sull'architettura a 32 bit, mentre la maggior parte dei computer fatti in seguito erano basati sulla più recente e più potente architettura a 64 bit. Il Nintendo 64 (prenderlo? e PlayStation 2 sono stati i primi dispositivi di consumo ampiamente disponibili con la nuova architettura, i computer venduti dopo il 2010 contenevano quasi esclusivamente processori a 64 bit. Di conseguenza, il supporto è stato in diminuzione: Google ha smesso di rilasciare Chrome per Linux a 32 bit nel marzo 2016, Canonico ha smesso di fornire immagini desktop a 32 bit nel 2017 e ha abbandonato il supporto per 32-bit complessivamente con Ubuntu 18.10. Arch Linux, sistema operativo elementare e altre importanti distribuzioni Linux hanno già abbandonato il supporto per l'architettura del processore di invecchiamento.

Fino ad ora, Electron ha fornito e supportato le build che girano sulla vecchia architettura a 32 bit. Dal rilascio v4.0 in poi, il team Electron non sarà più in grado di fornire binari o supporto per Linux a 32 bit.

Electron è sempre stato un vivace progetto open source e continuiamo a sostenere e incoraggiare gli sviluppatori interessati a costruire Electron per architetture esotiche.

## Cosa significa questo per gli sviluppatori?

Se al momento non stai fornendo distribuzioni a 32 bit della tua app per Linux, non è necessaria alcuna azione.

I progetti che spediscono le applicazioni Linux Electron a 32 bit dovranno decidere come procedere. Linux a 32 bit sarà supportato su Electron 3 [fino al](https://electronjs.org/docs/tutorial/support#supported-versions) rilascio di Electron 6, che dà un po' di tempo per prendere decisioni e piani.

## Cosa significa questo per gli utenti?

Se sei un utente Linux e non sei sicuro se stai usando o meno un sistema basato su 64 bit, sei probabilmente in esecuzione su un'architettura basata su 64 bit. Per essere sicuro, puoi eseguire i comandi `lscpu` o `uname -m` nel tuo terminale. Entrambi stamperanno la tua architettura corrente.

Se si utilizza Linux su un processore a 32 bit, è probabile che si siano già riscontrate difficoltà nel trovare software rilasciato di recente per il sistema operativo. Il team di Electron si unisce ad altri membri di spicco nella comunità Linux raccomandando di aggiornare ad un'architettura basata su 64 bit.
