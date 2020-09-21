# Proyecto Final
Asignatura: topicos Especilaes
Facultad: ESFOT
2020-A

### Integrantes
- Bryan Farinango
- Fernando Sanmartin 
### Problema Planteado
El proyecto de fin de semestre consiste en desarrollar una app nativa o multiplataforma de cualquiera de las siguientes opciones:
a.- Desarrollar una app que me permita buscar y revisar las reseñas de una determinada serie o película, dichos datos lo puede consumir del API REST
![](https://raw.githubusercontent.com/SANMH/Consumo_API_Peliculas/master/assets/0.png)

### Desarrollo
1. Creamos un  nuevo proyecto de FireBase al que llamamos "peliculas" a la misma agregamos las aplicaciones tanto web como aplicacion tipo android.
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/1.png)

2. Creamos una base de datos firestore donde se almacenaran los datos recopilados desde la app.
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/2.png)

3. Creamos un nuevo proyecto en Ionic 
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/3.png)

4. instalamos las librerias nesesarias tanto de  como de 
Firebase
```sh
ionic cordova plugin add cordova-plugin-firebase
npm install @ionic-native/firebase
``` 
geolocation
```sh
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation
``` 
	
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/4.png)

5. Configuramos nuestro archivo enviroment.ts con la key de firebase 
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/5.png)

6. Configuramos servicios para iniciar sesion desde Firebase, consumir el API, guardarla y posteriormente presentarla al usuario adminitrador.
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/6.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/6_1.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/6_2.png)

7. Coniguramos nuestro login
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/7.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/7_1.png)
8. Coniguramos nuestro pagna de registro
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/8.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/8_1.png)
9. Configuramos nustra pagian de busquedas
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/9.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/9_1.png)
10. Configuramos la pagina de detalles de la busqueda
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/10.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/10_1.png)
11. configuramos la pagina donde se mostrara al usuario Administrador el historial de busquedas 
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/11.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/11_1.png)

### resultado
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/12.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/13.png)
![](https://raw.githubusercontent.com/Consumo_API_Peliculas/master/assets/14.png)





