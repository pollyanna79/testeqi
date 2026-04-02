const questions = [
    {
        question: "Qual número vem a seguir na série? 2, 4, 8, 16, ...",
        answers: [
            { text: "24", correct: false },
            { text: "32", correct: true },
            { text: "64", correct: false },
            { text: "12", correct: false }
        ]
    },
    {
        question: "Se a palavra 'SOL' se lê de trás para frente como 'LOS', como a palavra 'CHÁ' se lê?",
        answers: [
            { text: "ÁCH", correct: true },
            { text: "ÁHC", correct: false },
            { text: "CAH", correct: false },
            { text: "HAC", correct: false }
        ]
    },
    {
        question: "Um tijolo pesa um quilo mais meio tijolo. Quanto pesa o tijolo?",
        answers: [
            { text: "1,5 kg", correct: false },
            { text: "1 kg", correct: false },
            { text: "2 kg", correct: true },
            { text: "2,5 kg", correct: false }
        ]
    },
    {
        question: "Qual é o único número par primo?",
        answers: [
            { text: "1", correct: false },
            { text: "3", correct: false },
            { text: "2", correct: true },
            { text: "7", correct: false }
        ]
    },
    {
        question: "Se um pai é 3 vezes mais velho que seu filho, e daqui a 10 anos a soma das idades deles será 76, qual a idade atual do filho?",
        answers: [
            { text: "14 anos", correct: true },
            { text: "12 anos", correct: false },
            { text: "16 anos", correct: false },
            { text: "18 anos", correct: false }
        ]
    },
    {
        question: "Qual é a resposta para a seguinte sequência: 1, 1, 2, 3, 5, 8, ...",
        answers: [
            { text: "11", correct: false },
            { text: "12", correct: false },
            { text: "13", correct: true },
            { text: "14", correct: false }
        ]
    },
    {
        question: "Você tem 12 meias azuis e 12 meias pretas em uma gaveta. No escuro total, quantas meias você precisa pegar para garantir que terá um par da mesma cor?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "13", correct: false },
            { text: "24", correct: false }
        ]
    },
    {
        question: "Qual é o nome que se dá à fêmea do elefante?",
        answers: [
            { text: "Elefanta", correct: false },
            { text: "Elefantoa", correct: false },
            { text: "Fêmea de elefante", correct: false },
            { text: "Elefoa", correct: true }
        ]
    },
    {
        question: "O que é que entra na água e não se molha?",
        answers: [
            { text: "O peixe", correct: false },
            { text: "A luz", correct: false },
            { text: "A sombra", correct: true },
            { text: "A pedra", correct: false }
        ]
    },
    {
        question: "Se hoje é segunda-feira, que dia da semana será daqui a 20 dias?",
        answers: [
            { text: "Domingo", correct: false },
            { text: "Sexta-feira", correct: true },
            { text: "Sábado", correct: false },
            { text: "Quinta-feira", correct: false }
        ]
    },
    {
        question: "Qual o próximo número da sequência? 1, 4, 9, 16, 25, ...",
        answers: [
            { text: "30", correct: false },
            { text: "36", correct: true },
            { text: "49", correct: false },
            { text: "64", correct: false }
        ]
    },
    {
        question: "Em uma corrida, se você ultrapassa a segunda pessoa, em que posição você fica?",
        answers: [
            { text: "Primeiro", correct: false },
            { text: "Segundo", correct: true },
            { text: "Terceiro", correct: false },
            { text: "Quarto", correct: false }
        ]
    },
    {
        question: "Qual o erro na frase: 'Eu e o João fomos ao cinema'?",
        answers: [
            { text: "Nenhum erro", correct: true },
            { text: "O 'e' não deveria estar ali", correct: false },
            { text: "O 'João' não deveria estar ali", correct: false },
            { text: "O 'cinema' não deveria estar ali", correct: false }
        ]
    },
    {
        question: "Em qual planeta do sistema solar a gravidade é menor?",
        answers: [
            { text: "Marte", correct: false },
            { text: "Vênus", correct: false },
            { text: "Mercúrio", correct: true },
            { text: "Júpiter", correct: false }
        ]
    }
];

// Variáveis de estado do quiz
let currentQuestionIndex = 0;
let score = 0;

// Seleção dos elementos do DOM
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultArea = document.getElementById('result-area');

// Função para iniciar o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    resultArea.style.display = 'none';
    showQuestion();
}

// Função para exibir a pergunta e as opções de resposta
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Função para limpar o estado anterior
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Função para verificar a resposta selecionada
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score += 10; // Adiciona pontos por resposta correta
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Exibe a resposta correta e desabilita os botões
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextButton.style.display = 'block';
}

// Função para ir para a próxima pergunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Função para exibir o resultado final
function showResult() {
    resetState();
    const totalQuestions = questions.length;
    const maxScore = totalQuestions * 10;
    const percentage = (score / maxScore) * 100;

    let message = "";
    if (percentage >= 80) {
        message = "Excelente! Você tem um QI de Gênio!";
    } else if (percentage >= 50) {
        message = "Muito bom! Sua lógica está afiada.";
    } else {
        message = "Continue praticando! A lógica é uma habilidade a ser desenvolvida.";
    }
    
    resultArea.innerHTML = `
        <h2>Quiz Finalizado!</h2>
        <p>Sua pontuação: ${score} de ${maxScore}</p>
        <p>Aproveitamento: ${percentage.toFixed(0)}%</p>
        <h3>${message}</h3>
        <button onclick="startQuiz()" class="btn">Tentar Novamente</button>
    `;

    resultArea.style.display = 'block';
}

// Evento de clique para o botão "Próxima Pergunta"
nextButton.addEventListener('click', nextQuestion);

// Inicia o quiz quando a página é carregada
startQuiz();