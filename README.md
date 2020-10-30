Mention nodemon

# STEPS - Setup the required files/ folders/ connections
1. Setup the express server with express and a public folder
1. Setup multiple namespaces in the server side - one for "input", and one for "output"
1. Create multiple folders in the public folder for each namespace to access - and  "input" and "output" folder

# STEPS - Send information across the socket
1. Get question button
1. What happens when user selects answer
1. Get answer button

# STEPS 
1. Can you add properties to the socket object so that ách socket has its own name + answer information ( add a trivia property? )
1. Create a GET route for a question creation page



1. First - create a button on the "output" page. On clicking the output page, send a signal to the server, and pick a "question"
1. Once the question is picked, send the question, and the options to the "input" namespace, and the "question and the answer" to the "output" namespace
1. Show the answers options in the "input" page, and on selecting an option, send that info to the server, to verify the answer
1. If the answer is correct, make the "input" page green, else, make it red
1. On the server side, total everyones answers, and show a tally
1. On pressing "Next Question", do this whole process again 

