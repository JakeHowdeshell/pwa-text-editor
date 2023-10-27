const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
const promptevent = window.deferPrompt
if(!promptevent){
    return;
} 
promptevent.prompt();
window.diferPrompt = null;
butInstall.classList.toggle('hidden', true);
});

// Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.diferPrompt = null;
});
