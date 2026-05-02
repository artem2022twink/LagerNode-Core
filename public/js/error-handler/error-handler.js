document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const status = params.get('status') || 'Error';
    const message = params.get('message') || 'Unknown error';

    const errorStatusEl = document.getElementById('error-status');
    const errorMessageEl = document.getElementById('error-message');

    if (errorStatusEl && errorMessageEl) {
        errorStatusEl.textContent = status;
        errorMessageEl.textContent = message;
    };
});