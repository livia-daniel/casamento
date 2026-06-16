const form = document.getElementById('rsvp-form');
const btn = document.getElementById('btn-rsvp');
const mensagem = document.getElementById('mensagem-rsvp');

/* RSVP */

if (localStorage.getItem('rsvp-enviado') && btn) {
    btn.disabled = false;
    btn.innerText = 'Confirmar Presença';
}

if (form) {

form.addEventListener('submit', async function(e) {

    e.preventDefault();

    const nome = document.getElementById('nome').value;
    
  const dados = {
    nome: document.getElementById('nome').value,
    presenca: document.getElementById('presenca').value,
    convidados: document.getElementById('convidados').value,
    acompanhantes: document.getElementById('acompanhantes').value
};

    try {

        btn.disabled = true;
        btn.innerText = 'Enviando...';

        await fetch(
            'https://script.google.com/macros/s/AKfycbww51odkrkSVQIJFQWXSWVRyWlnJgvBhjNoOSttMKZXvPhG5gEOz0eSWefLNarUp65RVw/exec',
            {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(dados)
            }
        );

        mensagem.className = 'sucesso';
        mensagem.style.display = 'block';
        mensagem.innerHTML =
            '✓ Obrigado! Sua presença foi confirmada.';
setTimeout(() => {
    mensagem.style.display = 'none';
}, 5000); // 5 segundos
       btn.innerText = 'Confirmar Presença';

        localStorage.setItem(
    'rsvp-enviado',
    nome
);

        form.reset();

    } catch (erro) {

        mensagem.className = 'erro';
        mensagem.style.display = 'block';
        mensagem.innerHTML =
            'Não foi possível enviar sua confirmação.';
setTimeout(() => {
    mensagem.style.display = 'none';
}, 5000);

        btn.disabled = false;
        btn.innerText = 'Confirmar Presença';
    }

});

}

/* CONTAGEM REGRESSIVA */

const weddingDate = new Date("July 18, 2026 12:45:00").getTime();

function updateCountdown() {

const now = new Date().getTime();
const distance = weddingDate - now;

const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
);

const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
);

const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
);

const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
);

const elDays = document.getElementById("days");
const elHours = document.getElementById("hours");
const elMinutes = document.getElementById("minutes");
const elSeconds = document.getElementById("seconds");

if (elDays) elDays.innerHTML = days;
if (elHours) elHours.innerHTML = hours;
if (elMinutes) elMinutes.innerHTML = minutes;
if (elSeconds) elSeconds.innerHTML = seconds;

}

updateCountdown();
setInterval(updateCountdown, 1000);