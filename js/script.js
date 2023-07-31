function clearText(element){
    if(element.innerHTML === 'Type your answer here') {
        element.innerHTML = '';
    }
}

function changeColor(element) {
    if(element.innerHTML === '' || element.innerHTML === 'Type your answer here') {
        element.style.color = '#fc89ff';
    }
}

function resetColor(element) {
    if(element.innerHTML === '') {
        element.innerHTML = 'Type your answer here';
        element.style.color = '#3f1753';
    }
}
