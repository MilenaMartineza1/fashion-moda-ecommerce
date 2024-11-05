function currentSlide(element) {
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        var colors = document.querySelectorAll('.colors span');
        colors.forEach(function(color) {
            color.classList.remove('active');
        });
        element.classList.add('active');
    }
}
function seleccionarTalla(elemento) {
    // Quitar la clase 'active' de todos los botones
    var botones = document.querySelectorAll('.talla-boton');
    botones.forEach(function(boton) {
        boton.classList.remove('active');
    });

    // Agregar la clase 'active' al botón seleccionado
    elemento.classList.add('active');

    // Obtener la talla seleccionada
    var tallaSeleccionada = elemento.getAttribute('data-talla');

    // Guardar la talla seleccionada en el input oculto
    document.getElementById('tallaSeleccionada').value = tallaSeleccionada;

    console.log("Talla seleccionada: " + tallaSeleccionada); // Para verificar en consola
}


function aumentarCantidad() {
    var cantidad = document.getElementById("cantidad");
    cantidad.value = parseInt(cantidad.value) + 1;
}

function disminuirCantidad() {
    var cantidad = document.getElementById("cantidad");
    if (parseInt(cantidad.value) > 1) {
        cantidad.value = parseInt(cantidad.value) - 1;
    }
}
