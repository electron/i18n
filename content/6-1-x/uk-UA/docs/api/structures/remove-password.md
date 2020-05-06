# Об'єкт RemovePassword

* `type` String - `password`.
* `origin` String (опціонально) - Коли передано, то буде видалено тільки інформацію, яка відноситься до конкретного походження, в іншому випадку кеш буде очищено повністю.
* `scheme` String (опціонально) - Схема автентифікації. Може бути `basic`, `digest`, `ntlm`, `negotiate`. Має бути передано, якщо видаляється через `origin`.
* `realm` String (optional) - Realm of the authentication. Має бути передано, якщо видаляється через `origin`.
* `username` String (optional) - Credentials of the authentication. Має бути передано, якщо видаляється через `origin`.
* `password` String (optional) - Credentials of the authentication. Має бути передано, якщо видаляється через `origin`.
