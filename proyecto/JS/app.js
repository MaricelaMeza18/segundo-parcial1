let estudiantes = [];
window.onload = cargarDesdeLocalStorage;

function cargarArreglo() {
  let nombre = document.getElementById('nombre').value.trim();
  let identidad = document.getElementById('identidad').value.trim();
  let edad = document.getElementById('edad').value.trim();
  let carrera = document.getElementById('carrera').value;

  if (!nombre || !identidad || !edad || !carrera) {
    Swal.fire({ icon: 'error', title: 'Todos los campos son obligatorios' });
    return;
  }

  let existe = estudiantes.find(est => est.identidad === identidad);
  if (existe) {
    Swal.fire({ icon: 'warning', title: 'Este cliente ya está registrado' });
    return;
  }

  estudiantes.push({ nombre, identidad, edad, carrera });
  guardarEnLocalStorage();
  limpiarFormulario();
  mostrarEstudiantes();
  Swal.fire({ icon: 'success', title: 'Cliente guardado correctamente' });
}

function mostrarEstudiantes() {
  let tabla = document.querySelector('#estudiantes tbody');
  tabla.innerHTML = '';
  estudiantes.forEach(est => {
    tabla.innerHTML += `
      <tr>
        <td>${est.nombre}</td>
        <td>${est.identidad}</td>
        <td>${est.edad}</td>
        <td>${est.carrera}</td>
      </tr>
    `;
  });
}

function buscarEstudiante() {
  let identidad = document.getElementById('identidad').value.trim();
  if (!identidad) {
    Swal.fire({ icon: 'error', title: 'Ingresa una identidad para buscar' });
    return;
  }

  let estudiante = estudiantes.find(est => est.identidad === identidad);
  if (estudiante) {
    document.getElementById('nombre').value = estudiante.nombre;
    document.getElementById('edad').value = estudiante.edad;
    document.getElementById('carrera').value = estudiante.carrera;

    Swal.fire({
      icon: 'info',
      title: 'Cliente encontrado',
      html: `
        <strong>Nombre:</strong> ${estudiante.nombre}<br>
        <strong>Edad:</strong> ${estudiante.edad}<br>
        <strong>Modelo:</strong> ${estudiante.carrera}
      `
    });
  } else {
    Swal.fire({ icon: 'error', title: 'Cliente no encontrado' });
  }
}

function actualizarEstudiante() {
  let nombre = document.getElementById('nombre').value.trim();
  let identidad = document.getElementById('identidad').value.trim();
  let edad = document.getElementById('edad').value.trim();
  let carrera = document.getElementById('carrera').value;

  if (!nombre || !identidad || !edad || !carrera) {
    Swal.fire({ icon: 'error', title: 'Todos los campos son obligatorios' });
    return;
  }

  let indice = estudiantes.findIndex(est => est.identidad === identidad);
  if (indice !== -1) {
    estudiantes[indice] = { nombre, identidad, edad, carrera };
    guardarEnLocalStorage();
    limpiarFormulario();
    mostrarEstudiantes();
    Swal.fire({ icon: 'success', title: 'Cliente actualizado correctamente' });
  } else {
    Swal.fire({ icon: 'error', title: 'Cliente no encontrado' });
  }
}

function eliminarEstudiante() {
  let identidad = document.getElementById('identidad').value.trim();
  if (!identidad) {
    Swal.fire({ icon: 'error', title: 'Ingresa una identidad para eliminar' });
    return;
  }

  let indice = estudiantes.findIndex(est => est.identidad === identidad);
  if (indice !== -1) {
    estudiantes.splice(indice, 1);
    guardarEnLocalStorage();
    limpiarFormulario();
    mostrarEstudiantes();
    Swal.fire({ icon: 'success', title: 'Cliente eliminado correctamente' });
  } else {
    Swal.fire({ icon: 'error', title: 'Cliente no encontrado' });
  }
}

function guardarEnLocalStorage() {
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

function cargarDesdeLocalStorage() {
  let datos = localStorage.getItem('estudiantes');
  if (datos) {
    estudiantes = JSON.parse(datos);
    mostrarEstudiantes();
  }
}

function limpiarFormulario() {
  document.getElementById('nombre').value = '';
  document.getElementById('identidad').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('carrera').selectedIndex = 0;
}

// Validación visual Bootstrap
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();
