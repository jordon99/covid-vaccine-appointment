App Description: Covid-19 vaccine appointment booking app using Ionic/angular.

Components and Pages:
There are two components: Header and Footer components that are added in components module.
Main page is HomePage.
One Page for new appointment boooking inside pages directory: pages/appointment-booking
Page navigation is handle by using Router.navigate method.

Data are saved in localStorage and managed in angular service services/appointment.service.ts
BehaviourSubject instance is create for appointments list and count value.

