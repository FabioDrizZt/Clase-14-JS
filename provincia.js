document.addEventListener("DOMContentLoaded", () => {
  const detalleProvincia = document.getElementById("detalle-provincia");

  //obtenemos el ID de la provincia de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idProvincia = urlParams.get("id");

  //Obtenemos los datos de las provincias desde el localStorage
  const datosProvincias = JSON.parse(localStorage.getItem("provincias"));

  //Buscamos la provincia por ID
  const provinciaSeleccionada = datosProvincias.provincias.find(
    (provincia) => provincia.id == idProvincia
  );

  if (provinciaSeleccionada) {
    //Creamos un elemento div para mostrar los detalles de la provincia y lo agregamos al DOM
    const contenedorDetallesProvincia = document.createElement("div");
    contenedorDetallesProvincia.classList.add("detalles-provincia");
    contenedorDetallesProvincia.innerHTML = `
    <h2>${provinciaSeleccionada.nombre}</h2>
    <p>ID: ${provinciaSeleccionada.id}</p>
    <p>Latitud: ${provinciaSeleccionada.centroide.lat}</p>
    <p>Longitud: ${provinciaSeleccionada.centroide.lon}</p>
    <div id="map" style="width: 100%; height: 300px;"></div>
    `;
    //agregar a pagina principal
    detalleProvincia.appendChild(contenedorDetallesProvincia);

    // Crea un mapa de Leaflet
    const map = L.map("map").setView(
      [provinciaSeleccionada.centroide.lat, provinciaSeleccionada.centroide.lon],
      10 // Ajusta el nivel de zoom según tus preferencias
    );

    // Agrega un mapa base (puedes usar diferentes proveedores de mapas base)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    // Agrega un marcador en la ubicación de la provincia
    L.marker([provinciaSeleccionada.centroide.lat, provinciaSeleccionada.centroide.lon])
      .addTo(map)
      .bindPopup(provinciaSeleccionada.nombre);
  }
});
