import * as workboxWindow from 'workbox-window';

const swRegister = async () => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker is not Supported in the browser');
        return;
    }

    const wb = new workboxWindow.Workbox('./sw.bundle.js');

    try {
        await wb.register();
        console.log('Service Worker is registered');
    } catch (error) {
        console.log('Failed to register Service Worker', error.message);
    }
};

export default swRegister;
