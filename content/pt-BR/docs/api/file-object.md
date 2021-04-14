# Objeto `File`

> Use a API do HTML5 `File` para funcionar nativamente com arquivos no sistema de arquivos.

A interface de arquivo do DOM fornece abstração em torno de arquivos nativos, a fim de permitir que os usuários trabalhem em arquivos nativos diretamente com a API de arquivo HTML5. A Electron adicionou um atributo `path` à interface `File` que expõe o caminho real de do arquivo no sistema de arquivos.

Exemplo de obter um caminho real de um arquivo arrastado para o aplicativo:

```html
<div id="holder">
  Arraste seu arquivo aqui
</div>

<script>
  documento.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    para (const f de e.dataTransfer.files) { console
      .log('Arquivo(s) que você arrastou aqui: ', f.path)
    }
  });
  document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
</script>
```
