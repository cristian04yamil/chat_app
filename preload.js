window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    replaceText('electron-version', process.versions.electron);
    replaceText('chrome-version', process.versions.chrome);
    replaceText('node-version', process.versions.node);
});