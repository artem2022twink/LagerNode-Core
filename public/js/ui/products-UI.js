document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    const category = params.get('category');
    const stock = params.get('stock');
    const name = params.get('name');
    const min = params.get('min');
    const max = params.get('max');
});