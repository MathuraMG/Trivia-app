let express = require('express');
let app = express();
let users = [];
app.use('/', express.static('public'));
let answers = {
    total: 0,
    right: 0,
    wrong: 0
}

let quiz = [{
    question : "what is 3+7",
    options : ["10", "20", "23","37"],
    answer : 0
}, {
    question : "Which of these is the largest mammal",
    options : ["dog", "cat", "elephant","whale"],
    answer : 3
}, {
    question : "How many planets are there in the milky way?",
    options : ["8", "9", "10","I'm not ever sure anymore"],
    answer : 1
}];

let quizNo = 0;

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require('socket.io').listen(server);

let output = io.of('/output');
let input = io.of('/input');


output.on('connect', (socket)=> {
    console.log("Output socket connected : " + socket.id);


    socket.on('getquestion',()=> {
      quizNo = Math.floor(Math.random()*quiz.length);

        answers.total = 0;
        answers.right = 0;
        answers.wrong = 0;
        console.log(quiz[quizNo]);
        let outputdata = {
            question : quiz[quizNo].question,
            options : quiz[quizNo].options,
            answer : quiz[quizNo].answer
        };
        let inputdata = {
            question : quiz[quizNo].question,
            options : quiz[quizNo].options
        };
        output.emit("question", outputdata );
        input.emit("question", inputdata);
    })

    socket.on('getanswer', () => {
        socket.emit('answers', answers);
    })

})


input.on('connect', (socket)=> {

    console.log("Input socket connected : " + socket.id);

    socket.on('answer', (data) => {

        answers.total++;
        if(data.answer == quiz[quizNo].answer) {
            socket.emit('answer', {answer: true})
            answers.right++;
        } else {
            socket.emit('answer', {answer: false})
            answers.wrong++;
        }
    })
})
