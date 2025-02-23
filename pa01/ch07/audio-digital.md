# Audio Digital

En esta sección se da una descripción muy breve de los conceptos y parámetros que vamos a usar para trabajar con sonido y poder interpretar los datos del sonido como imagen.


## Frecuencia y Período

- La **frecuencia** de algo es la cantidad de veces que ese algo sucede por unidad de tiempo.
- La **frecuencia** del colectivo es la cantidad de veces que pasa por día. Lo que sucede es el paso del un colectivo y la unidad es el día.
- En audio, la **frecuencia** refiere a la cantidad de veces que algo se sucede por segundo, a esta unidad de medida se la denomina Hertz, también se la refiere como ciclos por segundo.
- **Frecuencias famosas**: Frecuencia de muestreo (Sample Rate, en inglés), Frecuencia de Nyquist, frecuencia de una señal periódica (las que definen altura).
- El **período** es la inversa de la frecuencia, no es un parámetro distinto sino otra forma de medir lo mismo. En vez de medir la cantidad de veces que algo sucede por unidad de tiempo, medimos la duración de ese algo. Mientras menor sea la duración más veces va a entrar por unidad de tiempo, mientras mayor sea menos veces.


## Amplitud

- La **amplitud** es la distancia que recorre un movimiento con respecto a un punto de referencia o eje, a mayor distanciamiento del eje mayor amplitud.
- En audio no interesa medir la **distancia** que se desplazan las moléculas del aire, en vaivén con respecto a su punto de reposo, para generar ondas sonoras. Esto refleja la energía que se transmite en el medio.
- Esta **energía**, además de ser medida como amplitud se la suele medir como **presión**. La presión es la fuerza aplica sobre un área, por ejemplo el tímpano o la membrana de un micrófono.
- La **presión** se mide en Pascales, y acá se complica, los Pascales son una unidad derivada, Newtons por metro cuadrado, el Newton también es una unidad derivada que define “la cantidad de fuerza aplicada durante un segundo a una masa de un kilogramo para que esta adquiera la velocidad de un metro por segundo respecto a la velocidad colineal que tenía previamente a la aplicación de la fuerza” (fuente: Wikipedia).


## Amplitud (para nosotres en el audio digital)

- Se mide como la distancia que se aleja el valor de una muestra con respecto al cero, que es el valor de reposo (silencio).
- La **amplitud** se puede representar de manera **normalizada**, entre -1 y 1, siendo los extremos el mínimo y máximo posible (en rango) para una señal.
- También se puede medir en **decibelios** (dB), la décima parte de un Bell, que además es unidad en **escala logarítmica**.
- En **dB FS** (full scale) el máximo posible es cero y el mínimo es -infinito (silencio), con representación discreta en punto flotante.


## Fase

- La **fase** ya la estamos usando para los movimientos circulares, es la posición dentro de un giro. En los sonidos periódicos es la posición dentro de un ciclo.


## Parámetros de la Señal Digital

- **Frecuencia de Muestreo**: Define la cantidad de muestras que se toman de la variaciones de voltaje por segundo. Esto define la máxima frecuencia representable que equivale a la frecuencia de muestreo dividida por dos y se llama frecuencia de Nyquist.
- **Cuantización**: De cada muestra de voltaje que se toma se mide su amplitud y se le asigna un número binario. La cantidad de variaciones de amplitud representables va a estar definida por la resolución en bits (lo mismo que sucede con la profundidad del color pero aplicado en otro dominio).


## Archivos de Audio

- Los **formatos** de archivos de audio pueden ser **con o sin compresión**.
- Los formatos **sin compresión** representan cada muestra con la resolución original (la del ADC si no se convierte). Por ejemplo WAV o AIFF.
- Los formatos **con compresión** pueden ser con o sin pérdida. Los formatos con pérdida no reconstruyen la señal original tal cual era sino una versión simplificada a los fines de la compresión, se pierde información y no se puede reconstruir el original. Por ejemplo MP3 u OGG-Vorbis.
- Todos los tipos de archivos de audio **son descomprimidos para se procesados**. La información que nos interesa es la **frecuencia de muestreo**, y el **tipo de dato** que se usa para representar cada **muestra**, por lo general float.
- Los archivos de audio guardan las señales de audio en **canales**. Los archivos mono tienen un solo canal, los estéreo tienen dos, y pueden haber archivos con mayor número de canales.
- Los **procesamientos básicos** que podemos aplicar sobre los archivos de audio son: cambiarle la amplitud, cambiarle la velocidad de reproducción (afecta el tiempo y la altura), si el archivo es estéreo o se convierte en estéreo a la salida podemos controlar el paneo (la posición izquierda-derecha del sonido).
- Se pueden **mezclar** varios archivos de audio **sumando** las señales por canal (superpone sonidos).
- Con **algoritmos de procesamiento** en tiempo real se pueden cambiar otras cualidades del sonido como la **ecualización** (balance espectral), agregar **reverberación**, **delays**, y demás.


## Representación Espectral

- La **transformada de Fourier** es un procedimiento matemático que descompone las señales periódicas complejas en **sumas de señales simples** (sinusoidales) representadas como **amplitud y fase por banda**.
- En el ámbito digital se utiliza la **transformada discreta de Fourier** (TDF), las señales ya no se consideran continuas, algunas propiedades matemáticas cambian.
- **Transformada Rápida de Fourier** (FFT, por su acrónimo en inglés) es un algoritmo que calcula de forma más rápida la TDF para valores de ventana que son potencias de dos.
- Los **parámetros de la FFT** son el **tamaño de la ventana** de análisis y la **frecuencia de análisis** que se define como **sr/ventana**.
- Mientras mayor sea el **tamaño de la ventana**, menor será la frecuencia de análisis, los parciales armónicos de esa frecuencia van a estar más cerca y por lo tanto vamos a tener **mayor cantidad de bandas** de análisis (mayor resolución espectral). Al achicar la ventana de análisis vamos a temer **menos bandas** (menor resolución espectral).
- La **FFT** es útil para obtener cualidades del sonido que no se pueden deducir de la forma de onda.
- Los **datos espectrales** se utilizan en conjunto con los datos temporales y con ellos se pueden realizar tipos de análisis de características particulares.
