# Descripción del Proyecto Roommates

Este proyecto es una aplicación web diseñada para ayudar a personas que comparten una vivienda, conocidos como "roommates",
a gestionar sus gastos compartidos de manera sencilla. El proyecto incluye las siguientes funciones:
  - agregar roommates:Puedes agregar un nuevo roommate de manera aleatoria usando https://randomuser.me/api, cada vez que se presione el boton 'agregar roommate' se agregara uno al json
  - Registrar gastos: Se puede registrar un gasto seleccionando el roommate, una descripción y un monto, esto se agrega al archivo json correspondiente
  - Editar un gasto: Se pueden editar los atributos de un resgitro de gastos
  - Eliminar gasto: Se puede eliminar un gasto
  - ver Gasto y roommates: Desde el template se pueden ver los usuarios y los gastos

## Instrucciones para ejecutar el proyecto

Primero para instalar las dependencias se debe ejecutar el comando:
```
npm install
```
Luego considerando que se esta ejecutando con nodemon, para ejecutar el proyecto en local se debe ejecutar el comando:
```
npm run dev
```

## Posibles mejoras y opcionales

Este proyecto tenia como opción Enviar un correo electrónico a todos los roommates cuando se registre un nuevo gasto. La integración de nodemailer para gestionar correo queda como
una futura mejora y además se podría completar el CRUD para los roommates, dado que en los requerimientos solo se solicito el crear y leer, por lo tanto en una futura mejora se
podría incluir el eliminar y editar roommate
:)
