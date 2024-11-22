document.querySelector('.sing-up-button').addEventListener('click', async () => {
    const name = document.querySelector('.name-input').value;
    const surname = document.querySelector('.surname-input').value;
    const password = document.querySelector('.password-input').value;
    const email = document.querySelector('.email-input').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, password, email }),
    });

    const data = await response.json();
    console.log(data);
});