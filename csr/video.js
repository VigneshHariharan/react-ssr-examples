const videoFileListener = () => {
    const input = document.querySelector('input')
    input.addEventListener('change', (event) => {
    console.log("video fiel", { t: event.target });

    })
}

videoFileListener()