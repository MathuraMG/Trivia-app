let socket = io('/input');
let isAnswered = false;


window.addEventListener('load', () => {
    createOptionButtons();
})


socket.on('connect', ()=> {
    console.log('input socket connected');
})

socket.on('question', (data) => {
    console.log(data);
    isAnswered = false;
    document.body.style.background = "#ffffff";
    let options = data.options;
    document.getElementById('questions').innerHTML = data.question;
    populateOptions(data.options);
})

socket.on('answer', (data) => {
    console.log(data);
    if(data.answer) {
        document.body.style.background = "#62ca7a";
    } else {
        document.body.style.background = "#f33a66";
    }
})


/* Functions to populate the HTML via javascript */

// function : create the option buttons on page load
function createOptionButtons() {
  for(let i =0;i<4;i++) {
    let button = document.createElement('button');
    let buttonSpan = document.createElement('span');
    buttonSpan.classList.add("button-span");
    button.innerHTML = 1+i;
    button.classList.add("button-options");
    button.onclick = function() {
        if(!isAnswered) {
            socket.emit('answer',{answer: i});
            isAnswered = true;
        }
    }
    button.appendChild(buttonSpan);
    document.getElementById('answers').appendChild(button);
  }
}

//function : populate the options when question is asked
function populateOptions(options) {
    let optionsElt = document.getElementsByClassName('button-span');
    for(let i=0;i<optionsElt.length;i++ ){
      optionsElt[i].innerHTML = options[i];
    }
}
