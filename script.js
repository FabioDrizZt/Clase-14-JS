fetch("provincias.json")
  .then((respuesta) => respuesta.json())
  .then((datos) => localStorage.setItem("provincias", JSON.stringify(datos)));

document.addEventListener("DOMContentLoaded", () => {
  const gridProvincias = document.getElementById("grid-provincias");
  const datosProvincias = JSON.parse(localStorage.getItem("provincias"));
  console.log(datosProvincias);
  if (datosProvincias) {
    datosProvincias.provincias.forEach((provincia) => {
      //   1.- Creamos un elemento <div> para cada provincia
      const gridItem = document.createElement("div");
      //   2.- Agregamos la clase "grid-item" al div que contiene el nombre de la provincia y su imagen
      gridItem.classList.add("grid-item");
      //    3.- Agregamos una etiqueta h4 con el texto del título a nuestro nuevo elemento <div>.
      gridItem.innerHTML = `<h4>${provincia.nombre}</h4>`;

      gridItem.addEventListener("click", () => {
        mostrarDetallesProvincia(provincia);
      });

      gridProvincias.appendChild(gridItem);
    });
  }
});

function mostrarDetallesProvincia(provincia) {
  //Redireccionar a otra página para mostrar los detalles
  window.location.href = `provincia.html?id=${provincia.id}`;
}
