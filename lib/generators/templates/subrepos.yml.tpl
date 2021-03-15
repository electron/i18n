{{#each versions}}
- name: i18n/{{this}}
  directory: temp/i18n-{{this}}
  url: https://github.com/vhashimotoo/i18n-content.git
  branch: content/{{this}}
  # TODO: Remove this, we don't need hard reset
  commit: 379e9bf26c8627c17e42dbe43e2c72d7f1844d61
{{/each}}
