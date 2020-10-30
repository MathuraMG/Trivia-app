let socket = io('/output');
let quiz;
socket.on('connect', ()=> {
    console.log('output socket connected');
})

socket.on('question', (data) => {
    console.log(data);
    quiz = data;
    document.getElementById('question').innerHTML = quiz.question;
})

socket.on('answers', (data)=> {
    console.log(data);
    document.getElementById('answer-total').innerHTML = "Number of people who answered the question : " + data.total;
    document.getElementById('answer-right').innerHTML = "How many got it correct : " +  data.right;
    document.getElementById('answer-wrong').innerHTML = "How many got it incorrect : " + data.wrong;
})

window.addEventListener('load', ()=> {
    document.getElementById('get-question').addEventListener('click', () => {
        socket.emit('getquestion');

    })
    document.getElementById('get-answer').addEventListener('click', () => {
        socket.emit('getanswer');
        document.getElementById('answer').innerHTML = quiz.answer;
    })
})
