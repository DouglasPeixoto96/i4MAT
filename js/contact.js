document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const formData = new FormData(form);
        const action = 'forms/contact.php';

        php_email_form_submit(form, action, formData);
    });
});

function php_email_form_submit(form, action, formData) {
    fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => response.json())
    .then(data => {
        const statusMessage = form.querySelector('.status-message');
        if (data.type === 'success') {
            statusMessage.innerHTML = '<p class="text-success">' + data.message + '</p>';
            form.reset();
        } else {
            statusMessage.innerHTML = '<p class="text-danger">' + data.message + '</p>';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        const statusMessage = form.querySelector('.status-message');
        statusMessage.innerHTML = '<p class="text-danger">Ocorreu um erro ao enviar o formulário.</p>';
    });
}
