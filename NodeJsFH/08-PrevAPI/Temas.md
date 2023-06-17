Aquí cubriremos varios temas como:


Integración de Google Sing in 
 **Documentación necesaria**
```
    https://developers.google.com/identity/gsi/web/guides/overview
```


La validación que se realiza con google permite que el desarrollador no tenga que almacenar la información 
sensible como las contraseñas, dado que funciona con un cambio de Tokens, el cual permite mas agilidad
para la comprobación de la existencia de un
usuario

Debe estar unicamente implementado en https y lcoalhost con un puerto

* Ejemplo TOKEN de GOOGLE
*1234567890-abc123def456.apps.googleusercontent.com`


## Generar API Key de Google
> Las aplicaciones web deben obtener un token de acceso para llamar de forma segura a las API de Google.
>
> TOKEN DE CLIENTE -> GOOGLE CLIENT ID
> Si es utilizado cuando requerimos 
>  - Solo funciona cuando es requerido
>  - 
>378002869684-pqebinjvnmao8o8leb3t52ivcngcq23q.apps.googleusercontent.com

## Generar API Secret

>**link : https://console.cloud.google.com/apis/credentials?highlightClient=378002869684-pqebinjvnmao8o8leb3t52ivcngcq23q.apps.googleusercontent.com&project=driven-lore-313416**

TOKEN unico de ACCESO
>GOOGLE CLIENT SECRET : 
> **_`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`_**

- Se utiliza cuando queremos realizar algun tipo de verivicación de la cuenta de Google
- Solo es del lado del BACKEND


## Usar librerías de Google para la validación de tokens
## Tips importantes en PostMan
## Despliegues a Heroku
## Uso del Google SignIn en el Front-End
## Crear usuarios personalizados en base a respuestas de Google