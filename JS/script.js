// Declaração de variaveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
    {
      "question": "Qual o nome do irmão do Sasuke?",
      "answers": [
        {
          "answer": "Hinata",
          "correct": false
        },
        {
          "answer": "Naruto",
          "correct": false
        },
        {
          "answer": "Itachi",
          "correct": true
        },
        {
          "answer": "Ele não tem irmão",
          "correct": false
        },
      ]
    },
    {
      "question": "Quem são os personagens do time 7",
      "answers": [
        {
          "answer": "Sasuke, Naruto, Sakura, Kakashi",
          "correct": true
        },
        {
          "answer": "Sasuke, Naruto, Hinata, Kakashi",
          "correct": false
        },
        {
          "answer": "Sai, Ino, Naruto, Kakashi",
          "correct": false
        },
        {
          "answer": "Sakura, Naruto, Sai, Kakashi",
          "correct": false
        },
      ]
    },
    {
      "question": "Quem é o líder da Akatsuki?",
      "answers": [
        {
          "answer": "Kona",
          "correct": false
        },
        {
          "answer": "Nakato",
          "correct": false
        },
        {
          "answer": "Tobi",
          "correct": false
        },
        {
          "answer": "Pen",
          "correct": true
        },
      ]
    },
    {
        "question": "Quem são os pais do Sasuke?",
        "answers": [
          {
            "answer": "Koshina, Fugaku",
            "correct": false
          },
          {
            "answer": "Mikoto, Fugaku",
            "correct": true
          },
          {
            "answer": "Koshina, Minato",
            "correct": false
          },
          {
            "answer": "Mikoto, Minato",
            "correct": false
          },
        ]
      },
      {
        "question": "O anime Naruto era para ser um anime de...?",
        "answers": [
          {
            "answer": "Aventura",
            "correct": false
          },
          {
            "answer": "Ninjas",
            "correct": false
          },
          {
            "answer": "Piratas",
            "correct": false
          },
          {
            "answer": "Culinaria",
            "correct": true
          },
        ]
      },
      {
        "question": "O que o Naruto gostava de comer?",
        "answers": [
          {
            "answer": "Bolo de arroz",
            "correct": false
          },
          {
            "answer": "Lamen",
            "correct": true
          },
          {
            "answer": "Sushi",
            "correct": false
          },
          {
            "answer": "Miojo",
            "correct": false
          },
        ]
      },
      {
        "question": "Quem é o amor da sua vida?",
        "answers": [
          {
            "answer": "Sasura",
            "correct": false
          },
          {
            "answer": "Hinata",
            "correct": false
          },
          {
            "answer": "Edinelia",
            "correct": true
          },
          {
            "answer": "Tsunade",
            "correct": false
          },
        ]
      },
  ]

// Substituição do quizz para a primeiro pergunta
function init() {
    //criar a pergunta
    createQuestion(0);
}

// Criar uma pergunta
function createQuestion(i) {

    //Limpar a questão anterios
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    //Alterando o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i){
        
        //Cria o template do botão em quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        //Remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        //Inserir a alternativa na tela
        answersBox.appendChild(answerTemplate);

        //Inserir um evento de clique
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });

    });

    // Incrementar o numero da questão
    actualQuestion++;
}

// Verificando resposta do usuario
function checkAnswer(btn) {
    
    //Seleciona todos os botões
    const buttons = answersBox.querySelectorAll("button");

    //Verifica se a resposta esta correta e adiciona classes nos botões
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            //checa se o usuario acertou a pergunta
            if(btn === button) {
                // Incremento dos pontos
                points++;
            }

        } else {

            button.classList.add("wrong-answer");

        }

    });

    // Exibir prómixa pergunta
    nextQuestion();

}

// Exibir a proxima pergunta no quizz
function nextQuestion() {

    //timer para o usurario ver as respostas
    setTimeout(function() {
        
        // Verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            // Apresentar a msg de sucesso
            showSuccessMessage();
            return;
        }
    
        createQuestion(actualQuestion);
    
    }, 1500);
};

// Exibe a tela final
function showSuccessMessage() {

    hideOrShowQuizz();

    // Trocar dados da tela de sucesso

    // Calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    //alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");

    correctAnswers.textContent = points;

    // Alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");

    totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar quizz
const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function(){

    // Zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

// Inicialização do Quizz
init();