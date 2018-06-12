# Objeto Certificado

* `dados` String - Dados codificados em PEM
* `emissor` [CertificatePrincipal](certificate-principal.md) - Emissor principal
* `emissorNome` String - Nome comum do emissor
* `issuerCert` Certificate - Emissor do certificado (se não for auto-assinado)
* `sujeito` [CertificatePrincipal](certificate-principal.md) - Sujeito principal
* `sujeitoNome` String - Nome comum do sujeito
* `serialNumber` String - Uma valor Hex representado por uma string
* `validStart` Number - Data do inicio de validade do certificado em segundos
* `validExpiry` Number - Data do fim da validade do certificado em segundos
* `fingerprint` String - Impressão digital do certificado