{{#each versions}}
- name: i18n/{{this}}
  directory: temp/i18n-{{this}}
  url: https://github.com/vhashimotoo/i18n-content.git
  branch: content/{{this}}
  # TODO: Remove this, we don't need hard reset
  commit: 7c1792ea27f262e51a19608d405961fe4362d37d
{{/each}}
