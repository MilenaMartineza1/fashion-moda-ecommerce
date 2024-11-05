document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'flex';
    });

    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    });

    // Manejo del registro
    document.getElementById('register-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const acceptTerms = document.getElementById('accept-terms').checked;

        if (!acceptTerms) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert('Usuario registrado con éxito');
                loginContainer.style.display = 'flex';
                registerContainer.style.display = 'none';
            } else {
                const data = await response.text();
                alert('Error al registrar: ' + data);
            }
        } catch (error) {
            console.error('Error al intentar registrar el usuario:', error);
            alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
        }
    });

    // Manejo del inicio de sesión
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // Redirigir o realizar alguna acción después del inicio de sesión
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Error en el servidor. Por favor, intenta de nuevo más tarde.');
        }
    });
});
