
// this is to clear the input fields after form submission


    // declaring send button with DOM MANIPULATION

    let sendBtn = document.querySelector('[data-sendBtn]')
    
    // Event listener for the send button so that it will clear the form
    sendBtn.addEventListener('click', function () {
    // Delay the execution by milliseconds
    setTimeout(formClear, 1)
    })

    function formClear() {
        document.querySelector('[data-First]').value = ''
        document.querySelector('[data-Surname]').value =''
        document.querySelector('[data-Contact]').value = ''
        document.querySelector('[data-Email]').value = ''
        document.querySelector('[data-Message]').value =''
    }