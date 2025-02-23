# Protocolo HTTP

## Conjunto de protocolos de internet

Un **protocolo** es una especificación precisa de cómo deben organizarse los datos en cuanto a formato binario y organización de contenido (información/datos).

Denominado en inglés _Internet protocol suite_ es el **conjunto de protocolos** organizados que especifican la transmisión de datos según **capas** con finalidades específicas.

Por ejemplo, el protocolo HTTP organiza el formato de transmisión de datos para hipertexto y otros recursos pero no se encarga de otras tareas como el direccionamiento de datagramas (paquetes de datos) a más bajo nivel.

El conjunto de protocolos de internet también se conoce como **protocolo TCP/IP**. Lo cuál puede resultar confuso.


### Capas

El concepto de *capa* se utiliza para encapsular la información en distintas secciones que no necesitan conocer la estructura de las demás.

Dentro del conjunto de protocolos de internet existen las siguiente capas de la superior a la inferior:

- Capa de Aplicación (protocolo HTTP)
- Capa de Transporte (protocolo TCP/UDP)
- Capa de Internet (protocolo IPv4/6)
- Capa de Interfaz de Red (protocolo Ethernet)

Existen varios protocolos distintos por capas, arriba solo se ejemplifican los que utilizamos.

Estos conceptos son similares los _Modelo OSI_ (sistema de interconexión de sistemas abiertos) que es un modelo estándar teórico pero no es lo mismo que el _Conjuntos de Protocolos de Internet_. Aunque comparten conceptos en común son modelos que se fueron desarrollando en paralelo y la organización general difiere.


## Datos estructurados en capas

A nivel binario, las capas no son más que un formato de organización de pedazos información.

<p><a href="https://commons.wikimedia.org/wiki/File:UDP_encapsulation.svg#/media/File:UDP_encapsulation.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/UDP_encapsulation.svg" alt="UDP encapsulation.svg" height="250" width="400" style="background-color: white"></a><br>By <a href="https://en.wikipedia.org/wiki/User:Cburnett" class="extiw" title="en:User:Cburnett">en:User:Cburnett</a> original work, colorization by <a href="https://en.wikipedia.org/wiki/User:Kbrose" class="extiw" title="en:User:Kbrose">en:User:Kbrose</a> - Original artwork by <a href="https://en.wikipedia.org/wiki/User:Cburnett" class="extiw" title="en:User:Cburnett">en:User:Cburnett</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1546338">Link</a></p>

En la imagen de arriba se puede ver que cada capa contiene a la capa superior, desde la capa de enlace a la capa de aplicación. A su vez, en las capas intermedias se puede ver que tienen un ecabezado con información propia de la capa y la capa superior en la sección de datos (salvo para la capa de enlace que tiene pie al final).

A cada capa no le importa el contenido de los datos, siemplemente los pasa como tales. Para el caso de las páginas HTML, la capa de aplicación sería el protocolo HTTP y para la capa de transporte sería el protocolo TCP.

El siguiente es un gráfico interesante que muestra la transparencia que genera el encapsulamento de las conexiones entre cliente y servidor pese a la utilización de múltiples capas de infraestructura:

<p><a href="https://commons.wikimedia.org/wiki/File:IP_stack_connections.svg#/media/File:IP_stack_connections.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c4/IP_stack_connections.svg" alt="IP stack connections.svg" height="580" width="490" style="background-color: white"></a><br>By <a href="https://en.wikipedia.org/wiki/User:Kbrose" class="extiw" title="en:User:Kbrose">en:User:Kbrose</a> - Prior Wikipedia artwork by en:User:Cburnett, <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1831900">Link</a></p>


## Protocolo HTTP

> Nota: Vamos a ver solo la estructura de las cosas sin entrar los detalles del significado de la infinidad de opciones y variaciones que el protocolo provee. Con esto como puento de partido más adelante podremos analizar los mensajes HTTP.

De todo lo de arriba, que es importante para comprender el contexto, solo nos interesa la capa de aplicación utilizando el protocolo HTTP con su representación en modo de texto plano (HTTP/1.1).

> Nota: El protocolo HTTP es independiente de la capa de transporte, se puede usar cualquier protocolo que cumpla con determinadas condiciones, pero en la actualidad se utiliza el protocolo TPC que garantiza la integridad de los datos y el orden transmitidos por ser requisito del protocolo HTTP.

El protocolo HTTP se basa en mensajes que intercambian información entre un agente del cliente y un servidor. Estos mensajes se denominan **peticiones**, realizadas por el cliente, y **respuestas**, realizadas por el servidor. A cada petición le corresponde una respuesta, recordar que de lo contrario se cuelga la página.

La utilización de este protocolo requiere que siempre sea la aplicación cliente quien inicie la comunicación con el servidor haciendo un petición, por ejemplo, pedir una página web. La capa de internet se va a encargar de que el mensaje llegue al servidor de destino y la capa de transporte se va a encargar de establecer la conexión con la aplicación servidor.

> Nota: Existen parámetros de los encabezados HTTP que tienen que ver con la manera en que se establece la conexión mediante sockets, por ejemplo la opción `keep-alive`, por razones que no vamos a tratar. Pero esto no es más que parte del mensaje que se envía desde la aplicación servidor a la aplicación cliente.


### Mensajes HTTP

> Mostrar imágenes de: https://developer.mozilla.org/es/docs/Web/HTTP/Messages

> Especialmente: https://developer.mozilla.org/es/docs/Web/HTTP/Messages/httpmsgstructure2.png

Los mensajes, ya sean peticiones o respuestas, se representan en texto plano y se componen de las siguiente partes:

- Una línea de inicio (start line).
- Un grupo, opciónal, de parámetros que se denominan _cabeceras HTTP_ y se escriben en líneas consecutivas.
- Una línea vacía, que indica el final de toda la meta información de arriba.
- Un cuerpo que contiene los datos del mensaje. Según el tipo de mensaje esto pueden o no tener cuerpo.

En el siguiente ejemplo todo es texto que no significa nada pero cumple con el formato de líneas de HTTP.

```
Línea de inicio
Cabecera1: Tatatá
Cabecera2: Teteté

Cuerpo del mensaje que puede ser cualquier cosa soportada por HTML.
```


### Formato de las peticiones

La **línea de inicio** contiene:

- Un _método HTTP_: GET, POST, PUT, etc.
- El camino de destino de la petición: URL (Uniform Resource Locator) relativa o absoluta.
- La versión del protocolo HTTP utilizada en la comunicación.

El ejemplo siguiente se compone del método `GET`, la ruta principal `/` y la versión del protocolo `HTTP/1.1`:

```http
GET / HTTP/1.1
```

Las **cabeceras HTTP** de la petición, cada cabecera es una línea que contiene dos cadenas de caracteres separadas por `:`, de la siguiente forma:

```
Nombre-de-la-cabecera: Otra cadena de caracteres que varía según la cabecera.
```

Las cabeceras de las peticiones son modificadores de la petición que especifican los detalles del mensaje.

Luego de la línea en blanco viene el **cuerpo de la petición** que puede estar presente o no según el método HTTP. Por ejemplo, el método `POST` envía los datos en el cuerpo pero las peticiones que piden datos no suelen tener cuerpo. Los datos enviados pueden ser únicos, múltiples o por partes ("multipart", ver más abajos en el cuerpo de las respuestas).


### Formato de las Respuestas

En las respuestas HTTP la **línea inicial** es la **línea de estado** y está compuesta por:

- La versión del protocolo: HTTP/1.1.
- El código de estado: 200, 404, 302.
- El texto descriptivo del estado: Ok, Not Found, Found.

Las **cabeceras HTTP** siguen la misma estructura que para las peticiones.

El **cuerpo** de las respuestas pueden ser de distintas maneras:

- Dato único de logitud conocida: Content-Type, Content-Length.
- Dato único de logitud desconocida que se codifica y envía por partes: Transfer-Encoding
- Múltiples datos: Content-Type: multipart/byteranges


## Métodos HTTP

Los métodos HTTP indican distinto tipo de acciones que el cliente requiere del servidor. El protocolo define varios tipos de acciones concretas de las cuales vamos a utilizar solamente GET y POST en este curso.

El método HTTP [GET](https://developer.mozilla.org/es/docs/Web/HTTP/Methods/GET) se utiliza para solicitar recursos al servidor, es el método más usado y la acción por defecto en los navegadores web cada vez que utilizamos la barra de navegación o seguimos un enlace. Con respecto a su formato, la petición no tiene cuerpo y la respuesta sí (los datos pedidos).

El método HTTP [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) se utiliza para enviar información al servidor, es el método que se utiliza para enviar información a través de formularios.

También existe los métodos HEAD, PUT, DELETE, CONNECT, OPTIONS, TRACE y PATCH, que pueden ser consultados en este [enlace](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). Según el protocolo, cada método HTTP define una semántica específica que debe ser implementada por la aplicación servidor.


## En síntesis

Los mensajes HTTP se componen de una línea inicial, encabezados y pueden tener o no un cuerpo. Los encabezados agregan información sobre el tipo de petición o respuesta, el dominio a la que se envía el mensaje, el tipo de contenido esperado, el agente que la realizar (p.e. el tipo de navegador y sistema operativo). El cuerpo son los datos que puede o no tener la petición según los tipos y casos.

La API de express tiene un método de respuesta para cada tipo de petición `app.get()`, `app.post()`, `app.head()`, `app.put()`, `app.delete()`, etc., lo que simplifica mucho la programación porque se encarga de muchas cosas que suceden en la transmisión y recepción de métodos y datos HTTP. En este curso no vamos a usar más que GET y POST.


## Enlaces

https://developer.mozilla.org/en-US/docs/Web/HTTP
