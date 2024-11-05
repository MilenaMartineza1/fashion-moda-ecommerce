document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Mostrar el formulario de registro y ocultar el de inicio de sesión
    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    });

    // Mostrar el formulario de inicio de sesión y ocultar el de registro
    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
    });

    // Manejo del registro
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevenir la recarga de la página

            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const acceptTerms = document.getElementById('accept-terms').checked;

            // Validar que los términos y condiciones han sido aceptados
            if (!acceptTerms) {
                alert('Debes aceptar los términos y condiciones.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.text();

                if (response.ok) {
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                    loginContainer.style.display = 'block';
                    registerContainer.style.display = 'none';
                } else {
                    alert('Error al registrar: ' + data);
                }
            } catch (error) {
                console.error('Error al intentar registrar el usuario:', error);
                alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
            }
        });
    }
});