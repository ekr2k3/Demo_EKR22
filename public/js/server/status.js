// status.js [server]
const listButton = document.querySelectorAll('button');

function updateQueryString(key, value) {
    const url = new URL(window.location.href);
    if (value === '') {
        url.searchParams.delete(key); // Remove key
    } else {
        url.searchParams.set(key, value); // Add or update key
    }
    return url.href;
}

listButton.forEach(button => {
    button.addEventListener('click', () => {
        const status = button.getAttribute('sta');
        let newUrl;
        if (status === 'active') {
            newUrl = updateQueryString('status', 'active');
        } else if (status === 'inactive') {
            newUrl = updateQueryString('status', 'inactive');
        } else {
            newUrl = updateQueryString('status', '');
        }
        window.location.href = newUrl;
    });
});
