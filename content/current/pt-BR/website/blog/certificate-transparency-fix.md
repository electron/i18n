---
title: Correção de Transparência de Certificados
author: kevinsawicki
date: '2016-12-09'
---

O [1.4.12][] contém um patch importante que corrige um problema de do Chrome a montante onde alguns certificados SSL/TLS SSL/TLS de Symantec, GeoTrust e Thawte são incorretamente rejeitados 10 semanas a partir do tempo de construção de [libcromiumcontent][], biblioteca do Chrome subjacente da Electron. Não há problemas com os certificados usados nos sites afetados e a substituição destes certificados não ajudará.

---

No Electron 1.4.0 &mdash; 1.4.11 solicita HTTPS aos sites que usam esses certificados afetados falharão com erros de rede após uma determinada data. Isso afeta as solicitações de HTTPS feitas usando as APIs de rede subjacentes do Chrome como janela `. etch`, pedidos do Ajax, a `rede do Electron` API, `BrowserWindow. oadURL`, `webContents. oadURL`, o atributo `src` em uma `<webview>` tag, e outros.

Atualizar seus aplicativos para 1.4.12 impedirá que estas falhas na requisição ocorram .

**Nota:** Este problema foi introduzido no Chrome 53, então versões anteriores ao Electron do que 1.4.0 não são afetadas.

### Datas de Impacto

Abaixo está uma tabela de cada versão do Electron 1.4 e a data em que solicitar a sites que utilizam estes certificados afetados começará a falhar.

<table class="table table-ruled table-full-width">
    <thead>
        <tr class="text-left">
            <th>Versão do Electron</th>
            <th>Data de Impacto</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.3.x</td>
            <td>Descontaminado</td>
        </tr>
        <tr>
            <td>1.4.0</td>
            <td>Já falhando</td>
        </tr>
        <tr>
            <td>1.4.1</td>
            <td>Já falhando</td>
        </tr>
        <tr>
            <td>1.4.2</td>
            <td>Já falhando</td>
        </tr>
        <tr>
            <td>1.4.3</td>
            <td>10 de dezembro de 2016 PM PST</td>
        </tr>
        <tr>
            <td>1.4.4</td>
            <td>10 de dezembro de 2016 PM PST</td>
        </tr>
        <tr>
            <td>1.4.5</td>
            <td>10 de dezembro de 2016 PM PST</td>
        </tr>
        <tr>
            <td>1.4.6</td>
            <td>14 de janeiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.7</td>
            <td>14 de janeiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.8</td>
            <td>14 de janeiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.9</td>
            <td>14 de janeiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.10</td>
            <td>14 de janeiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.11</td>
            <td>11 de fevereiro de 2017 9:00 PM PST</td>
        </tr>
        <tr>
            <td>1.4.12</td>
            <td>Descontaminado</td>
        </tr>
    </tbody>
</table>

Você pode verificar a data de impacto do seu aplicativo definindo o relógio do seu computador à frente e então confira se [https://symbeta. ymantec.com/welcome/](https://symbeta.symantec.com/welcome/) carrega com sucesso.

## Mais informações

Você pode ler mais sobre esse tópico, a issue original e a correção nos seguintes lugares:

- [O que é Transparência de Certificado?](https://www.certificate-transparency.org/what-is-ct)
- [Artigo da base de conhecimento Symtantc](https://knowledge.symantec.com/support/ssl-certificates-support/index?page=content&id=ALERT2160)
- [Problema Chrome 664177](https://bugs.chromium.org/p/chromium/issues/detail?id=664177)
- [Correção do Chrome para o problema 664177](https://codereview.chromium.org/2495583002)
- [patch libchromiumcontent para issue 664177](https://github.com/electron/libchromiumcontent/pull/248)

[libcromiumcontent]: https://github.com/electron/libchromiumcontent
[1.4.12]: https://github.com/electron/electron/releases/tag/v1.4.12

