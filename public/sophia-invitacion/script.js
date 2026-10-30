const WHATSAPP_NUMBER = '573212065740';
// Fecha de la invitación: 30 de octubre de 2026, hora de Bogotá.
const TARGET = new Date('2026-10-30T07:00:00-05:00').getTime();
const state = { plan: '', time: '', vibe: '', note: '' };
const screens = [...document.querySelectorAll('.screen')];
const bars = [...document.querySelectorAll('.progress i')];
let current = 0, audio = null, ambient = false, ambientTimer;
const $ = id => document.getElementById(id);

function go(step) {
  const next = typeof step === 'number' ? step : Number(step);
  if (!Number.isInteger(next) || next < 0 || next >= screens.length) return;
  const previous = screens[current];
  previous?.classList.remove('active');
  previous?.classList.add('out');
  setTimeout(() => previous?.classList.remove('out'), 550);
  current = next;
  screens[current].classList.add('active');
  bars.forEach((bar, index) => bar.classList.toggle('active', index === Math.min(current, bars.length - 1)));
  if (current === 4) {
    $('sumPlan').textContent = state.plan;
    $('sumTime').textContent = state.time;
  }
}

document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => {
  tone([523, 659, 784][current % 3]);
  go(button.dataset.go);
}));

function updateCountdown() {
  let remaining = Math.max(0, TARGET - Date.now());
  const days = Math.floor(remaining / 86400000); remaining %= 86400000;
  const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  $('days').textContent = String(days).padStart(2, '0');
  $('hours').textContent = String(hours).padStart(2, '0');
  $('minutes').textContent = String(minutes).padStart(2, '0');
  $('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll('.choice').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('selected'));
  button.classList.add('selected');
  state.plan = button.dataset.plan;
  tone(660);
  setTimeout(() => go(3), 260);
}));

document.querySelectorAll('.time-options button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.time-options button').forEach(option => option.classList.remove('selected'));
  button.classList.add('selected');
  state.time = button.dataset.time;
  $('timeChoice').textContent = state.time;
  $('timeNext').classList.remove('disabled');
  tone(660);
}));

$('customTime').addEventListener('input', event => {
  if (!event.target.value) return;
  document.querySelectorAll('.time-options button').forEach(button => button.classList.remove('selected'));
  const [hour, minute] = event.target.value.split(':').map(Number);
  state.time = `${((hour + 11) % 12) + 1}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
  $('timeChoice').textContent = state.time;
  $('timeNext').classList.remove('disabled');
});
$('timeNext').addEventListener('click', () => { if (state.time) go(4); });

document.querySelectorAll('.vibes button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.vibes button').forEach(option => option.classList.remove('selected'));
  button.classList.add('selected');
  state.vibe = button.dataset.vibe;
  tone(720);
}));

function message() {
  return `Soph ✦ Acepto la cita del 30 de octubre.\n\nPlan: ${state.plan}\nHora: ${state.time}${state.vibe ? `\nVibe: ${state.vibe}` : ''}${state.note ? `\nNota: ${state.note}` : ''}\n\nAhora coordinamos el punto de encuentro. 😌`;
}

$('accept').addEventListener('click', () => {
  state.note = $('note').value.trim();
  $('ticketPlan').textContent = state.plan;
  $('ticketTime').textContent = state.time;
  $('ticketVibe').textContent = state.vibe || '—';
  $('whatsapp').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message())}`;
  go(5);
  successSound();
});
$('decline').addEventListener('click', () => go(6));
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(message()); toast('Elección copiada ✦'); }
  catch { toast('No se pudo copiar'); }
});

function toast(text) {
  const element = $('toast');
  element.textContent = text;
  element.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => element.classList.remove('show'), 1800);
}
function context() {
  if (!audio) audio = new (window.AudioContext || window.webkitAudioContext)();
  if (audio.state === 'suspended') audio.resume();
  return audio;
}
function tone(frequency) {
  try {
    const contextAudio = context();
    const oscillator = contextAudio.createOscillator();
    const gain = contextAudio.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(.0001, contextAudio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.025, contextAudio.currentTime + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, contextAudio.currentTime + .14);
    oscillator.connect(gain).connect(contextAudio.destination);
    oscillator.start();
    oscillator.stop(contextAudio.currentTime + .16);
  } catch { /* El audio es opcional. */ }
}
function successSound() { [523, 659, 784].forEach((frequency, index) => setTimeout(() => tone(frequency), index * 100)); }
function ambientLoop() {
  if (!ambient) return;
  [261.63, 329.63, 392].forEach((frequency, index) => setTimeout(() => tone(frequency), index * 180));
  ambientTimer = setTimeout(ambientLoop, 1400);
}
$('soundToggle').addEventListener('click', () => {
  ambient = !ambient;
  const button = $('soundToggle');
  button.classList.toggle('on', ambient);
  button.querySelector('span').textContent = ambient ? 'Sonando' : 'Ambiente';
  if (ambient) { context(); ambientLoop(); toast('Ambiente activado ♫'); }
  else { clearTimeout(ambientTimer); toast('Ambiente apagado'); }
});
