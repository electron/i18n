# API experimentales

Algunas de las APIs de Electrons están etiquetadas con `_Experimental_` en la documentación. Esta etiqueta indica que la API no puede considerarse estable y la API puede ser eliminada o modificada más frecuentemente que otras APIs con menos advertencia.

## Condiciones para una API a etiquetar como Experimental

Cualquiera puede solicitar que una API sea etiquetada como experimental en una característica PR, los desacuerdos sobre la naturaleza experimental de una característica pueden ser discutidos en el API WG si no pueden ser resueltos en el PR.

## Proceso para eliminar la etiqueta Experimental

Una vez que una API ha sido estable y en al menos dos grandes líneas de lanzamiento estable, puede ser nominado para que se borre su etiqueta experimental.  Esta discusión debería suceder en una reunión de API WG.  Cosas a considerar cuando se discute / nominando:

* La condición anterior de "dos grandes líneas de lanzamiento estables" debe haber sido cumplida
* Durante ese tiempo no debería haber habido errores o problemas importantes debido a la adopción de esta característica
* La API es suficientemente estable y no se ha visto afectada por las actualizaciones de Chromium
* ¿Alguien está usando la API?
* ¿Cumple la API los usos propuestos originalmente, tiene lagunas?
