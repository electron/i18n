export type versions = {{#each versions}}{{#unless @first}} {{/unless}}'{{this}}'{{#unless @last}} |{{/unless}}{{/each}}
export type SupportedVersions = Array<versions>
