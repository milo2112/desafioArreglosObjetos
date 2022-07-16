// Req N°1: Implementación de todos los elementos necesarios para aplicar las funcionalidad del Desafio.


// Req N°2: Arreglo de objetos propiedades
const propiedadesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    m: 170
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    m: 130
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    m: 80
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    m: 6
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    m: 200
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
    rooms: 5,
    m: 500
  }
];

// Obteniendo div contenedor desde el DOM
const div = document.querySelector(".propiedades");

// Variables globales
let metersMin = 100000;
let roomsMax = 0;
let metersMax = 0;

// Generamos variable btnCollection para capturar el evento Click
const btnCollection = document.getElementsByClassName("btn");

// Generamos variable formControlCollection para capturar ingreso de parametros
const formControlCollection = document.getElementsByClassName("form-control");

// variable para modificación de total en el DOM
const total = document.getElementById("total");

// 
/**********************************************************************
 *                                                                    *
 *  Req N°6: Utilización de interpolación y el innerHTML              *
 *                                                                    *
 *   Expresion de Funcion generica para generación de                 *
 *          template que se inserta en el DOM                         *
 **********************************************************************/
templateCards = (card) => {
  return `
    <div class="propiedad">
      <div class="img" style="background-image: url('${card.src}')"></div>
      <section>
        <h5>${card.name}</h5>
        <div class="d-flex justify-content-between">
          <p>Cuartos: ${card.rooms}</p>
          <p>Metros: ${card.m}</p>
        </div>
        <p class="my-3">${card.description}</p>
        <button class="btn btn-info">Ver más</button>
      </section>
    </div>`;
};

// Se invoca función solo con el 1er artgumento ingresando al ELSE "CASO INICIAL"
renderCards("render");

/********************************************************************************
 *                                                                              *
 *            Req N°4: Agrupar la lógica en funciones reutilizables             *
 *                                                                              *
 * Renderización de elementos del DOM, realiza recorrido de arreglo solo 1 vez  *
 * por evento (click) y renderiza según condicionales de control de flujo       *
*********************************************************************************/
function renderCards(caso, valueRooms, valueFrom, valueTo) {
  let html = "";
  let cardsTotal = 0;
 /**************************************************************************
 * Req N°5 - Utilización de ciclos para recorrer el arreglo de propiedades *
 ***************************************************************************/
  for (let property of propiedadesJSON) {
     /********************************************************************
      * Req N°7 - Utilización de condicionales para evaluación de campos *
      ********************************************************************/
    if (caso == "2.3") { // CASO 2.3: Con valor en 'habitaciones' entre 1 y valor máximo de habitaciones en objetos del arreglo
      if (valueRooms == property.rooms) {
        html += templateCards(property);
        cardsTotal += 1;
      }
    } else if (caso == "3.2") { // CASO 3.2: Con valor mayor a 1 en "metros cuadrados desde"
      if (valueFrom <= property.m) {
        html += templateCards(property);
        cardsTotal += 1;
      }
    } else if (caso == "4.2") { // CASO 4.2: Con valor mayor a 1 en "metros cuadrados Hasta"
      if (valueTo >= property.m) {
        html += templateCards(property);
        cardsTotal += 1;
      }
    } else if (caso == "5.2") { // CASO 5.2: Con valor mayor a 1 en "metros cuadrados Desde" y valor mayor que 1 en 'habitaciones'
      if (valueRooms == property.rooms && valueFrom <= property.m) {
        html += templateCards(property);
        cardsTotal += 1;
      }
    } else if (caso == "6.2") { // CASO 6.2: Con valor mayor a 1 en "metros cuadrados Hasta" y en 'habitaciones'
      if (valueRooms == property.rooms && valueTo >= property.m) {
        html += templateCards(property);
        cardsTotal += 1;
      }
    } else if (caso == "7.2") { // CASO 7.2: Con valor mayor a 1 en 'metros cuadrados Desde' y 'metros cuadrados Hasta'
      if (property.m >= valueFrom && property.m <= valueTo) {
          html += templateCards(property);
          cardsTotal += 1;
       }
    } else if (caso == "8.2") { // CASO 8.2: Con valor mayor a 1 en todos los campos
      if (property.m >= valueFrom && property.m <= valueTo && property.rooms == valueRooms) {
          html += templateCards(property);
          cardsTotal += 1;
       }
    } else { // CASO INICIAL: carga todas las cards y setea variables solo la 1era vez
          html += templateCards(property);
          cardsTotal += 1;
      // Setea variables globales para usar en listener
      if (metersMax < property.m) {
        metersMax = property.m;
      }
      if (roomsMax < property.rooms) {
        roomsMax = property.rooms;
      }
      if (metersMin > property.m) {
        metersMin = property.m;
      }
    }
  }
  /************************************************************************
  *  Req: 8 - Actualiza el total de resultados en cada búsqueda generada  *
  *************************************************************************/
  total.innerHTML = cardsTotal;
  div.innerHTML = html;
  formControlCollection[0].value = "";
  formControlCollection[1].value = "";
  formControlCollection[2].value = "";
}

/*******************************************************************************************
 *                  Req N°3 - Función anónima para evento click en boton                   *
 *                                                                                         *
 * Se desarrolla una estructura de control de flujo para dar flexibilidad en la            *
 * búsqueda, de modo que se pueda realizar búsqueda en los siguientes casos:               *
 *   con valor en campo 'habitaciones' y 0 ó vacío en los demás campos                     *
 *   con valor en campo 'metros cuadrados desde' y 0 ó vacío en los demás campos           *
 *   con valor en campo 'metros cuadrados hasta' y 0 ó vacío en los demás campos           *
 *   con valor en campo 'habitaciones' y valor en campo 'metros cuadrados desde'           *
 *   con valor en campo 'habitaciones' y valor en campo 'metros cuadrados Hasta'           *
 *   con valor en campo 'metros cuadrados Desde' y valor en campo 'metros cuadrados Hasta' *
 *   con valor en todos los campos                                                         *
 * Los demás casos son evaluados en el listener de modo que no realizan render en el DOM   *
 * arrojando una alerta correspondiente al caso.                                           *
********************************************************************************************/
btnCollection[0].addEventListener("click", function () {

  // 1.- capturar los valores desde el DOM para los 3 campos
  rooms = formControlCollection[0].value;
  metersFrom = formControlCollection[1].value;
  metersTo = formControlCollection[2].value;
  
  // variable que despliegue mensaje informativo en el DOM
  const message = document.getElementById("message");

   /*******************************************************************
   * Req N°7: Utilización de condicionales para evaluación de campos *
   *******************************************************************/
  // CASO 1: Todos los campos vacios o todos con 0
  if ((rooms == "" || rooms == 0) && (metersFrom == "" || metersFrom == 0) && (metersTo == "" || metersTo == 0)) {
    alert("No puede consultar propiedades si los campos están vacíos o tienen 0");
    return false;
    // CASO 2: Con valor solo en campo 'Habitaciones' y demases vacios o con 0
  } else if (rooms != "" && (metersFrom == "" || metersFrom == 0) && (metersTo == "" || metersTo == 0)) {
    // CASO 2.1: Con valor de 'Habitaciones' menor que 1
    if (rooms < 1) {
      alert("No puede consultar propiedades con menos de 1 habitación");
      return false;
      // CASO 2.2: Con valor de 'Habitaciones' mayor a la cantidad de habitaciones de objetos del arreglo
    } else if (rooms > roomsMax) {
      alert(`La propiedad con más habitaciones que tenemos, posee ${roomsMax}, por favor vuelva a ingresar`);
      return false;
      // CASO 2.3: Con valor de 'Habitaciones' entre 1 y valor máximo de habitaciones en objetos del arreglo
    } else {
      renderCards("2.3", rooms);
      message.innerHTML = `Resultado de busqueda de propiedad con ${rooms} habitaciones` ;
    }
    // CASO 3: Con valor solamente en 'M² desde' y demases con 0 ó vacío
  } else if ((rooms == "" || rooms == 0) && metersFrom != "" && (metersTo == "" || metersTo == 0)) {
    // CASO 3.1: Con valor inferior a 1 en 'M² desde'
    if (metersFrom < 1) {
      alert("No puede consultar propiedades con menos de 1 metro cuadrado ");
      return false;
      // CASO 3.2: Con valor mayor a 1 en 'M² desde'
    } else {
      renderCards("3.2", 0, metersFrom, 0);
      message.innerHTML = `Resultado de busqueda de propiedades desde ${metersFrom}M²`;
    }
    // CASO 4: Con valor solamente en 'M² Hasta' y demases con 0 ó vacío
  } else if ((rooms == "" || rooms == 0) && (metersFrom == "" || metersFrom == 0) && (metersTo != "")) {
    // CASO 4.1: Con valor inferior a 1 en 'M² Hasta'
    if (metersTo < 1) {
      alert("No puede consultar propiedades con menos de 1 metro cuadrado ");
      return false;
      // CASO 4.2: Con valor mayor a 1 en 'M² Hasta'
    } else {
      renderCards("4.2", 0, 0, metersTo);
      message.innerHTML = `Resultado de busqueda de propiedades hasta ${metersTo}M²`;
    }
    // CASO 5: valor en campo 'habitaciones' y 'M² Desde', 'M² Hasta' vacio o con 0
  } else if ((rooms != "") && (metersFrom != "") && (metersTo == "" || metersTo == 0)) {
    // CASO 5.1: Con valor inferior a 1 en 'M² Hasta'
    if (metersFrom < 1 || rooms < 1) {
      alert("No puede consultar propiedades con menos de 1 metro cuadrado o con menos de 1 habitación");
      return false;
      // CASO 5.2: Con valor mayor a 1 en 'Habitaciones' y valor mayor que 1 en 'M² desde'
    } else {
      renderCards("5.2", rooms, metersFrom, 0);
      message.innerHTML = `Resultado de busqueda de propiedades con ${rooms} habitaciones y desde ${metersFrom}M²`;
    }
    // CASO 6: valor en campo 'habitaciones' y 'M² Hasta', 'M² Desde' vacio o con 0
  } else if ((rooms != "") && (metersFrom == "" || metersFrom == 0) && (metersTo != "")) {
    // CASO 6.1: Con valor inferior a 1 en 'habitaciones' y 'M² Hasta'
    if (metersTo < 1 || rooms < 1) {
      alert("No puede consultar propiedades con menos de 1 metro cuadrado o con menos de 1 habitación");
      return false;
      // CASO 6.2: Con valor mayor a 1 en 'Habitaciones' y en 'M² Hasta'
    } else {
      renderCards("6.2", rooms, 0, metersTo);
      message.innerHTML = `Resultado de busqueda de propiedades con ${rooms} habitaciones y hasta ${metersTo}M²`;
    }
     // CASO 7: valor en campo 'M² Desde' y 'M² Hasta', 'Habitaciones' vacio o con 0
  } else if ((rooms == "" || rooms == 0) && (metersFrom != "") && (metersTo != "")) {
    // CASO 7.1: Con valor inferior a 1 en 'M² Desde' y 'M² Hasta'
    if (metersFrom < 1 || metersTo < 1) {
      alert("No puede consultar propiedades con menos de 1 metro cuadrado o con menos de 1 habitación");
      return false;
      // CASO 7.2: Con valor mayor a 1 en 'M² Desde' y 'M² Hasta'
    } else {
      renderCards("7.2", 0, metersFrom, metersTo);
      message.innerHTML = `Resultado de busqueda de propiedades desde ${metersFrom}M² hasta ${metersTo}M²`;
    }
    // CASO 8: valor en todos los campos
  } else if ((rooms != "") && (metersFrom != "") && (metersTo != "")) {
    // CASO 8.1: Con valor inferior a 1 en alguno de los campos
    if (metersFrom < 1 || metersTo < 1 || rooms < 1) {
      alert("No puede consultar propiedades si los campos están vacíos o tienen 0");
      return false;
      // CASO 8.2: Con valor mayor a 1 en todos los campos
    } else {
      renderCards("8.2", rooms, metersFrom, metersTo);
      message.innerHTML = `Resultado de busqueda de propiedades con ${rooms} habitaciones y desde ${metersFrom}M² hasta ${metersTo}M²`;
    }
  }
});
