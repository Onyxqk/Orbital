const codeEditor = document.querySelector('.code-editor');
const iframe = document.querySelector('.iframe');
const lineNumbers = document.querySelector('.line-numbers');
const menuBar = document.querySelector('.menu-bar');
const body = document.querySelector('body');

function toggleLineNumbers(event) {
    if (event.target.id === 'line-numbers') {
        lineNumbers.classList.toggle('hidden');
    }
}

function toggleDarkMode(event) {
    if (event.target.id === 'dark-mode') {
        menuBar.classList.toggle('dark-mode');
        codeEditor.classList.toggle('dark-mode');
        lineNumbers.classList.toggle('dark-mode');
        body.classList.toggle('dark-mode');
        iframe.classList.toggle('dark-mode');
    }
}

function exportFile(event) {
    if (event.target.id === 'export') {
        let promptInput = prompt("What is the name of your file?");
        if (promptInput !== null) {
            let iframeHtml = iframe.contentWindow.document.documentElement.outerHTML,
                a = document.createElement('a'),
                file = new Blob([iframeHtml], { type: 'text/html' });
            a.href = URL.createObjectURL(file);
            a.download = promptInput + '.html';
            a.click();
        }
    }
}

codeEditor.addEventListener('input', () => {
    const lines = codeEditor.value.split('\n');
    lineNumbers.innerHTML = '';
    for (let i = 0; i < lines.length; i++) {
        const lineNumber = document.createElement('div');
        lineNumber.textContent = i + 1;
        lineNumbers.appendChild(lineNumber);
    }

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(codeEditor.value);
    iframe.contentWindow.document.close();
});

menuBar.addEventListener('click', (event) => {
    exportFile(event);
    toggleLineNumbers(event);
    toggleDarkMode(event);
});

menuBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        exportFile(event);
        toggleLineNumbers(event);
        toggleDarkMode(event);
      }
});