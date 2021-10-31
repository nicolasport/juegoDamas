### Proyect Base react
Proyecto base en React.
Documentacion => https://es.reactjs.org/docs/getting-started.html

### Comandos
`npm use`: para usar la version de node correspondiente

`npm install`: instala las dependencias necesarias

`npm run start`: para empezar a trabajar localmente
El proyecto levanta localmente en el puerto `9001` configuracional  desde dentro del `webpack.development.config`

`npm run build`: para generar los estaticos finales para produccion

### Consideraciones
Los estilos estan en Sass dentro de la carpeta src/sass. Alli mismo hay un index.scss que importa el resto de los estilos de manera modular
La arquitectura del proyecto se compone de la siguiente manera:

* `Archivos Webpack`: configuracionales dividios por ambientes; Configurados para minificar y uglificar el codigo del proyecto y dividir los JS's finales de los css's. Se pueden pasar variables de entorno por el mismo.

* `src/containers`: Vistas globales que se conectan con el state manager de turno, puede ser redux o context ( Hechos con pure Class Components )

* `src/components`: funciones mas especificas que contienen los componentes mas usados (modulares, hechos con pure Function Components)

* `pulic`: Carpeta con los estaticos como imagenes, tipograficas, plugins externos, etc. Ahi mismo estan los archivos finales que se usan para produccion

* `pulic/index_template.html`: Template basico del index.html de nuestra app que luego el archivo webpack hidrata con variables necesarias

### Extra
Esta configurado el path `~/` para hacer referencia a la carpeta `src/` sea donde sea que este en el proyecto. No es mas necesario el `../../../`