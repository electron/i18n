# APIs expérimentaux

Certaines des API Electrons sont taggées avec `_Experimental_` dans la documentation. Cette balise indique que l'API peut ne pas être considérée comme stable et que l'API peut être supprimée ou modifiée plus fréquemment que les autres API avec moins d'avertissement.

## Conditions pour qu'une API soit taguée comme expérimentale

N'importe qui peut demander à une API d'être marqué comme expérimental dans une fonctionnalité PR, les désaccords sur la nature expérimentale d'une fonctionnalité peuvent être discutés dans l'API WG s'ils ne peuvent pas être résolus dans le PR.

## Processus pour supprimer le tag expérimental

Une fois qu'une API a été stable et dans au moins deux lignes de version stable majeures, peut être nommé pour que sa balise expérimentale soit supprimée.  Cette discussion devrait avoir lieu lors d'une réunion de l'API WG.  Choses à considérer lors de la discussion / la nomination :

* La condition ci-dessus "deux lignes de publication des écuries majeures" doit avoir été remplie
* Pendant ce temps, aucun bug / problème majeur n'aurait dû être causé par l'adoption de cette fonctionnalité
* L'API est assez stable et n'a pas été fortement impactée par les mises à jour de Chromium
* Quelqu'un utilise-t-il l'API ?
* L'API respecte-t-elle les usecases proposées initialement, a-t-elle des lacunes?
