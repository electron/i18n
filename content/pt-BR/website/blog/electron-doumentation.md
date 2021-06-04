---
title: Documentação do Electron
author: lorde
date: '2015-06-04'
---

Esta semana demos à documentação do Electron uma home on [electronjs.org](https://electronjs.org). Você pode visitar [/docs/latest](https://electronjs.org/docs/latest) para a documentação mais recente. Nós também manteremos versões da documentação antiga, por isso você pode visitar [/docs/vX.XX.X](https://electronjs.org/docs/v0.26.0) para a documentação que se correlaciona com a versão que você está usando.

---

Você pode visitar [/docs](https://electronjs.org/docs) para ver quais versões estão disponíveis ou [/docs/all](https://electronjs.org/docs/all) para ver a última versão da documentação tudo em uma página (legal para pesquisas `cmd` + `f`).

If you'd like to contribute to the docs content, you can do so in the [Electron repository](https://github.com/electron/electron/tree/main/docs), where the docs are fetched from. Procuramos eles para cada versão menor e adicionamos eles ao [repositório de site do Electron](http://github.com/electron/electronjs.org), que é feito com [Jekyll](http://jekyllrb.com).

Se você estiver interessado em aprender mais sobre como puxamos a documentação de um repositório para outro continue lendo abaixo. Caso contrário, aproveite a [documentação](https://electronjs.org/latest)!

## Os bits Técnicos

Estamos preservando a documentação dentro do repositório do núcleo do Electron. Isso significa que [electron/electron](http://github.com/electron/electron) sempre terá a versão mais recente da documentação. Quando novas versões do Electron são lançadas, duplicamos elas no repositório do site do Electron, [electron/electronjs.org](http://github.com/electron/electronjs.org).

### script/docs

Para buscar a documentação, executamos um [script](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/script/docs) com uma interface de linha de comando do `script/docs vX.XX.` com ou sem a opção `--latest` (dependendo se a versão que você está importando for a última versão). Nosso [script para buscar documentos](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js) usa alguns módulos interessantes de Nó:

- [`nugget`](http://npmjs.com/nugget) para [obter a tarball de lançamento](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L40-L43) e salvá-la em um diretório temporário.
- [`gunzip-talvez`](http://npmsjs.com/gunzip-maybe) para [descompactar o tarball](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L95).
- [`tar-fs`](http://npmjs.com/tar-fs) for [streaming just the `/docs` directory](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L63-L65) from the tarball and [filtering and processing the files](https://github.com/electron/electronjs.org/blob/0205b5ab26c96a95121bc564c5824f92108677e0/lib/fetch-docs.js#L68-L78) (with the help of [`through2`](http://npmjs.com/through2)) so that they work nicely with our Jekyll site (more on that below).

[Testes](https://github.com/electron/electronjs.org/tree/gh-pages/spec) nos ajudam a saber que todos os bits e partes pouparam conforme o esperado.

### Jekyll

O site Electron é um site do Jekyll e nós fazemos uso do recurso [Coleções](http://jekyllrb.com/docs/collections/) para a documentação com uma estrutura como esta:

```bash
electron.atom.io
── _docs
    ── mais recente
    ── v0.27.0
    ── v0.26.0
    ── assim em
    ── mais adiante
```

#### Material inicial

Para o Jekyll renderizar cada página precisa de pelo menos uma frente de assunto vazia. Nós vamos fazer uso da questão frontal em todas as nossas páginas, então enquanto estamos transmitindo o diretório `/docs` para verificar se um arquivo é o `README. d` arquivo (em que caso recebe uma configuração de primeira importação) ou se é qualquer outro arquivo com uma extensão markdown (nesse caso, ele recebe uma questão de frente ligeiramente diferente).

Cada página recebe esse conjunto de variáveis de questão frontal:

```yaml
---
versão: v0.27.0
categoria: Tutorial
título: 'Inicialização rápida'
source_url: 'https://github.com/electron/electron/blob/master/docs/tutorial/quick-start.md'
---
```

O `LEIA-ME. d` recebe uma `permalink adicional` então que tem uma URL tem uma raiz comum do índice `. tml` em vez de um estranho `/readme/`.

```yaml
permalink: /pt_BR/docs/v0.27.0/index.html
```

#### Configuração e redirecionamentos

No _config do site `ml` arquivo uma variável `latest_version` é definida toda vez que a flag `--latest` é usada para buscar a documentação. Também adicionamos uma lista de todas as versões que foram adicionadas ao site, bem como o permalink que gostaríamos de toda a coleção de documentos.

```yaml
latest_version: v0.27.0
available_versions:
    - v0.27.0
collections:
    docs: {output: true, permalink: '/docs/:path/'}
```

O arquivo `último. d` na raiz do nosso site está vazio, exceto este front-matter que permite aos usuários ver o índice (também conhecido como `README`) da versão mais recente da documentação, visitando esta URL, [electron. tom.io/docs/latest](https://electronjs.org/docs/latest), ao invés de usar o número da versão mais recente especificamente (embora você possa fazer isso também).

```yaml
---
permalink: /docs/latest/
redirect_to: /docs/{{ site.data.releases[0].version }}
---
```

#### Layouts

No template de layout `docs.html` nós usamos condicionais para mostrar ou ocultar informações no cabeçalho e no breadcrumb.

```html
{% raw %}
{% if page.category != 'ignore' %}
<h6 class='docs-breadcrumb'>{{ page.version }} / {{ page.category }}
  {% if page.title != 'README' %} / {{ page.title }} {% endif %}</h6>
{% endif %}
{% endraw %}
```

Para criar uma página mostrando as versões que estão disponíveis, basta percorrer a lista em nossa configuração em um arquivo, `versões. d`, na raiz do site. Também fornecemos um permalink: `/docs/`

```html
{% raw %}
{% for version in site.available_versions %}
- [{{ version }}](/docs/{{ version }})
{% endfor %}
{% endraw %}
```

Espero que tenha gostado dessas peças técnicas! Se você estiver interessado em mais informações sobre como usar o Jekyll para sites de documentação, faça check-out como o time da documentação do GitHub publica a documentação do [GitHub no Jekyll](https://github.com/blog/1939-how-github-uses-github-to-document-github).
