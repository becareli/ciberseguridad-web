/* ========================================
   ARCHIVO: main.js
   DESCRIPCIÓN: JavaScript para interactividad del sitio de ciberseguridad
   AUTOR: Proyecto BootCamp Python - Módulo 2
   
   CONTENIDO:
   1. Efectos visuales con jQuery
   2. Validación del formulario de contacto
   3. Test de seguridad interactivo
   4. Animaciones al hacer scroll
   5. Efectos adicionales
   ======================================== */

// ========================================
// ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO
// Esto es como esperar a que la casa esté construida antes de decorarla
// ========================================
$(document).ready(function() {
    console.log("🚀 JavaScript cargado correctamente");
    
    // Llamar a todas las funciones de inicialización
    inicializarEfectos();
    inicializarFormularioContacto();
    inicializarTestSeguridad();
    inicializarAnimacionesScroll();
    inicializarTooltips();
});

// ========================================
// 1. EFECTOS VISUALES CON JQUERY
// Mejoras de interacción visual
// ========================================
function inicializarEfectos() {
    
    // EFECTO: Cambiar color de navbar al hacer scroll
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        
        // Si bajamos más de 100px, la navbar se vuelve más oscura
        if (scroll > 100) {
            $('.navbar').css('background-color', 'rgba(33, 37, 41, 0.98)');
            $('.navbar').css('box-shadow', '0 4px 12px rgba(0,0,0,0.3)');
        } else {
            $('.navbar').css('background-color', 'rgba(33, 37, 41, 1)');
            $('.navbar').css('box-shadow', '0 2px 4px rgba(0,0,0,0.1)');
        }
    });
    
    // EFECTO: Botón "Volver arriba" (aparece al hacer scroll)
    // Primero creamos el botón
    $('body').append('<button id="btnVolverArriba" title="Volver arriba"><i class="fas fa-arrow-up"></i></button>');
    
    // Estilos del botón (lo agregamos dinámicamente)
    $('#btnVolverArriba').css({
        'position': 'fixed',
        'bottom': '30px',
        'right': '30px',
        'width': '50px',
        'height': '50px',
        'border-radius': '50%',
        'background-color': '#667eea',
        'color': 'white',
        'border': 'none',
        'cursor': 'pointer',
        'box-shadow': '0 4px 8px rgba(0,0,0,0.3)',
        'display': 'none',  // Inicialmente oculto
        'z-index': '9999',
        'transition': 'all 0.3s ease'
    });
    
    // Mostrar/ocultar botón según scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#btnVolverArriba').fadeIn();  // jQuery: aparecer con fade
        } else {
            $('#btnVolverArriba').fadeOut(); // jQuery: desaparecer con fade
        }
    });
    
    // Acción al hacer clic: volver arriba suavemente
    $('#btnVolverArriba').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);  // 800ms de duración
        return false;
    });
    
    // EFECTO: Hover en botón volver arriba
    $('#btnVolverArriba').hover(
        function() { // Mouse entra
            $(this).css('background-color', '#764ba2');
            $(this).css('transform', 'scale(1.1)');
        },
        function() { // Mouse sale
            $(this).css('background-color', '#667eea');
            $(this).css('transform', 'scale(1)');
        }
    );
    
    // EFECTO: Resaltar enlaces del navbar según página actual
    var paginaActual = window.location.pathname.split("/").pop();
    $('.navbar-nav .nav-link').each(function() {
        var href = $(this).attr('href');
        if (href === paginaActual || (paginaActual === '' && href === 'index.html')) {
            $(this).addClass('active');
        }
    });
    
    console.log("✅ Efectos visuales inicializados");
}

// ========================================
// 2. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE CONTACTO
// Formulario de la página consejos.html
// ========================================
function inicializarFormularioContacto() {
    
    // Capturamos el evento "submit" del formulario
    $('#contactForm').on('submit', function(event) {
        event.preventDefault();  // Evita que se recargue la página
        
        console.log("📧 Procesando formulario de contacto...");
        
        // Resetear estados previos de validación
        $(this).removeClass('was-validated');
        $('.form-control, .form-select, .form-check-input').removeClass('is-invalid is-valid');
        
        // Variables para validación
        var esValido = true;
        
        // VALIDAR NOMBRE (debe tener al menos 3 caracteres)
        var nombre = $('#nombre').val().trim();
        if (nombre.length < 3) {
            $('#nombre').addClass('is-invalid');
            esValido = false;
        } else {
            $('#nombre').addClass('is-valid');
        }
        
        // VALIDAR EMAIL (formato correcto)
        var email = $('#email').val().trim();
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Expresión regular para email
        if (!regexEmail.test(email)) {
            $('#email').addClass('is-invalid');
            esValido = false;
        } else {
            $('#email').addClass('is-valid');
        }
        
        // VALIDAR TELÉFONO (opcional, pero si se llena debe tener al menos 8 dígitos)
        var telefono = $('#telefono').val().trim();
        if (telefono !== '' && telefono.length < 8) {
            $('#telefono').addClass('is-invalid');
            esValido = false;
        } else if (telefono !== '') {
            $('#telefono').addClass('is-valid');
        }
        
        // VALIDAR TEMA (debe seleccionar una opción)
        var tema = $('#tema').val();
        if (tema === '') {
            $('#tema').addClass('is-invalid');
            esValido = false;
        } else {
            $('#tema').addClass('is-valid');
        }
        
        // VALIDAR MENSAJE (debe tener al menos 10 caracteres)
        var mensaje = $('#mensaje').val().trim();
        if (mensaje.length < 10) {
            $('#mensaje').addClass('is-invalid');
            esValido = false;
        } else {
            $('#mensaje').addClass('is-valid');
        }
        
        // VALIDAR TÉRMINOS (debe estar marcado)
        var terminos = $('#terminos').is(':checked');
        if (!terminos) {
            $('#terminos').addClass('is-invalid');
            esValido = false;
        } else {
            $('#terminos').addClass('is-valid');
        }
        
        // Si todo está válido, procesamos el envío
        if (esValido) {
            console.log("✅ Formulario válido. Datos a enviar:");
            console.log({
                nombre: nombre,
                email: email,
                telefono: telefono,
                tema: tema,
                mensaje: mensaje
            });
            
            // Simular envío (en un proyecto real aquí harías una petición AJAX a un servidor)
            // Por ahora solo mostramos un mensaje de éxito
            
            // Deshabilitar botón mientras "envía"
            var botonEnviar = $(this).find('button[type="submit"]');
            var textoOriginal = botonEnviar.html();
            botonEnviar.prop('disabled', true);
            botonEnviar.html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
            
            // Simular delay de 2 segundos (como si estuviera enviando al servidor)
            setTimeout(function() {
                // Mostrar mensaje de éxito con efecto slideDown de jQuery
                $('#mensajeExito').slideDown('slow');
                
                // Limpiar formulario
                $('#contactForm')[0].reset();
                $('.form-control, .form-select, .form-check-input').removeClass('is-valid');
                
                // Restaurar botón
                botonEnviar.prop('disabled', false);
                botonEnviar.html(textoOriginal);
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(function() {
                    $('#mensajeExito').slideUp('slow');
                }, 5000);
                
                console.log("✅ Formulario enviado exitosamente");
            }, 2000);
            
        } else {
            console.log("❌ Formulario inválido. Por favor corrige los errores.");
            
            // Hacer scroll al primer campo con error
            var primerError = $('.is-invalid').first();
            if (primerError.length) {
                $('html, body').animate({
                    scrollTop: primerError.offset().top - 100
                }, 500);
            }
        }
    });
    
    // EFECTO: Limpiar estado de validación cuando el usuario empieza a escribir
    $('#contactForm input, #contactForm select, #contactForm textarea').on('input change', function() {
        $(this).removeClass('is-invalid is-valid');
    });
    
    console.log("✅ Formulario de contacto inicializado");
}

// ========================================
// 3. TEST DE SEGURIDAD INTERACTIVO
// Quiz con cálculo de puntuación
// ========================================
function inicializarTestSeguridad() {
    
    // Capturamos el evento "submit" del formulario del test
    $('#testForm').on('submit', function(event) {
        event.preventDefault();  // Evita recarga de página
        
        console.log("🎯 Calculando puntuación del test...");
        
        // Verificar que todas las preguntas estén respondidas
        var preguntasRespondidas = 0;
        var totalPreguntas = 5;
        
        for (var i = 1; i <= totalPreguntas; i++) {
            if ($('input[name="pregunta' + i + '"]:checked').length > 0) {
                preguntasRespondidas++;
            }
        }
        
        // Si no respondió todas las preguntas, mostrar alerta
        if (preguntasRespondidas < totalPreguntas) {
            alert('⚠️ Por favor responde todas las preguntas antes de continuar.');
            return;
        }
        
        // CALCULAR PUNTUACIÓN
        var puntuacion = 0;
        
        // Sumar los valores de cada respuesta seleccionada
        for (var i = 1; i <= totalPreguntas; i++) {
            var respuesta = $('input[name="pregunta' + i + '"]:checked').val();
            puntuacion += parseInt(respuesta);
        }
        
        console.log("📊 Puntuación obtenida: " + puntuacion + "/50");
        
        // DETERMINAR NIVEL DE SEGURIDAD según puntuación
        var nivel, color, icono, mensaje, recomendaciones;
        
        if (puntuacion <= 15) {
            // NIVEL BAJO (0-15 puntos)
            nivel = "🔴 NIVEL BAJO";
            color = "danger";
            icono = "fas fa-exclamation-triangle";
            mensaje = "¡Cuidado! Tu seguridad digital está en riesgo. Necesitas mejorar urgentemente tus prácticas.";
            recomendaciones = [
                "Cambia TODAS tus contraseñas inmediatamente",
                "Activa la autenticación de dos factores en tus cuentas importantes",
                "Instala un antivirus actualizado",
                "Lee detenidamente los consejos de nuestra página"
            ];
        } else if (puntuacion <= 35) {
            // NIVEL MEDIO (16-35 puntos)
            nivel = "🟡 NIVEL MEDIO";
            color = "warning";
            icono = "fas fa-shield-alt";
            mensaje = "Vas por buen camino, pero aún hay áreas importantes que mejorar para estar verdaderamente protegido.";
            recomendaciones = [
                "Implementa contraseñas únicas para cada sitio",
                "Activa 2FA en más servicios",
                "Revisa regularmente la seguridad de tus cuentas",
                "Ten cuidado con enlaces sospechosos"
            ];
        } else {
            // NIVEL ALTO (36-50 puntos)
            nivel = "🟢 NIVEL ALTO";
            color = "success";
            icono = "fas fa-check-circle";
            mensaje = "¡Excelente! Tienes muy buenas prácticas de seguridad. Sigue así y mantente actualizado.";
            recomendaciones = [
                "Mantén tus hábitos actuales de seguridad",
                "Comparte estos conocimientos con familiares y amigos",
                "Mantente informado sobre nuevas amenazas",
                "Considera usar un gestor de contraseñas profesional"
            ];
        }
        
        // CONSTRUIR HTML DEL RESULTADO
        var resultadoHTML = `
            <div class="alert alert-${color} border-0 shadow-sm">
                <h3 class="text-center mb-3">
                    <i class="${icono}"></i> ${nivel}
                </h3>
                <div class="text-center mb-3">
                    <div class="display-4 fw-bold">${puntuacion} / 50</div>
                    <div class="progress mt-3" style="height: 25px;">
                        <div class="progress-bar bg-${color}" role="progressbar" 
                             style="width: ${(puntuacion/50)*100}%;" 
                             aria-valuenow="${puntuacion}" aria-valuemin="0" aria-valuemax="50">
                            ${Math.round((puntuacion/50)*100)}%
                        </div>
                    </div>
                </div>
                <p class="lead mb-3">${mensaje}</p>
                <h5 class="mt-4 mb-2"><i class="fas fa-list-check"></i> Recomendaciones:</h5>
                <ul class="list-unstyled">
                    ${recomendaciones.map(rec => `<li class="mb-2"><i class="fas fa-arrow-right text-${color} me-2"></i>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // MOSTRAR RESULTADO con efecto de jQuery
        $('#resultadoContenido').html(resultadoHTML);
        $('#resultadoTest').slideDown('slow');
        
        // Hacer scroll suave hasta el resultado
        setTimeout(function() {
            $('#resultadoTest')[0].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
        
        console.log("✅ Resultado del test mostrado");
    });
    
    // EFECTO: Resaltar respuesta al seleccionarla
    $('input[type="radio"]').on('change', function() {
        // Quitar resaltado de todas las opciones del grupo
        var nombrePregunta = $(this).attr('name');
        $('input[name="' + nombrePregunta + '"]').parent().removeClass('bg-light');
        
        // Resaltar la opción seleccionada
        $(this).parent().addClass('bg-light');
    });
    
    console.log("✅ Test de seguridad inicializado");
}

// ========================================
// 4. ANIMACIONES AL HACER SCROLL
// Elementos que aparecen cuando son visibles en pantalla
// ========================================
function inicializarAnimacionesScroll() {
    
    // Función para detectar si un elemento es visible en el viewport
    function esVisible(elemento) {
        var rect = elemento.getBoundingClientRect();
        var windowHeight = $(window).height();
        
        // Retorna true si el elemento está al menos 20% visible
        return (rect.top <= windowHeight * 0.8 && rect.bottom >= 0);
    }
    
    // Agregar clase para animación a elementos específicos
    $('.card, .accordion-item, .stat-box').each(function() {
        $(this).css('opacity', '0');
        $(this).css('transform', 'translateY(30px)');
    });
    
    // Función que se ejecuta al hacer scroll
    function animarAlScroll() {
        $('.card, .accordion-item, .stat-box').each(function() {
            if (esVisible(this) && $(this).css('opacity') === '0') {
                $(this).animate({
                    opacity: 1
                }, 600);
                
                $(this).css('transform', 'translateY(0)');
                $(this).css('transition', 'transform 0.6s ease');
            }
        });
    }
    
    // Ejecutar al hacer scroll
    $(window).on('scroll', animarAlScroll);
    
    // Ejecutar al cargar la página
    animarAlScroll();
    
    console.log("✅ Animaciones de scroll inicializadas");
}

// ========================================
// 5. TOOLTIPS DE BOOTSTRAP
// Pequeños mensajes informativos al pasar el mouse
// ========================================
function inicializarTooltips() {
    // Inicializar todos los tooltips (si existen en el HTML)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    console.log("✅ Tooltips inicializados");
}

// ========================================
// 6. FUNCIONES ADICIONALES DE UTILIDAD
// ========================================

// Función para mostrar el año actual en el footer (opcional)
function actualizarAnio() {
    var anioActual = new Date().getFullYear();
    $('footer').find('strong').text('CiberSeguridad ' + anioActual);
}

// Llamar función al cargar
$(document).ready(function() {
    actualizarAnio();
});

// ========================================
// 7. MANEJO DE MODALES
// Efectos adicionales cuando se abren/cierran modales
// ========================================
$('.modal').on('shown.bs.modal', function() {
    console.log("📱 Modal abierto: " + $(this).attr('id'));
});

$('.modal').on('hidden.bs.modal', function() {
    console.log("📱 Modal cerrado: " + $(this).attr('id'));
    
    // Resetear formulario del test cuando se cierra el modal
    if ($(this).attr('id') === 'testModal') {
        $('#testForm')[0].reset();
        $('#resultadoTest').hide();
        $('input[type="radio"]').parent().removeClass('bg-light');
    }
});

// ========================================
// 8. CONTADOR DE CARACTERES EN TEXTAREA
// Muestra cuántos caracteres lleva escritos el usuario
// ========================================
$('#mensaje').on('input', function() {
    var caracteresActuales = $(this).val().length;
    var caracteresMaximos = 500;
    
    // Si no existe el contador, lo creamos
    if ($('#contadorCaracteres').length === 0) {
        $(this).after('<small id="contadorCaracteres" class="text-muted"></small>');
    }
    
    // Actualizar contador
    $('#contadorCaracteres').text(caracteresActuales + ' / ' + caracteresMaximos + ' caracteres');
    
    // Cambiar color si se acerca al límite
    if (caracteresActuales > caracteresMaximos * 0.9) {
        $('#contadorCaracteres').removeClass('text-muted').addClass('text-warning');
    } else {
        $('#contadorCaracteres').removeClass('text-warning').addClass('text-muted');
    }
});

// ========================================
// FIN DEL ARCHIVO JAVASCRIPT
// ========================================
console.log("🎉 Todos los scripts inicializados correctamente");