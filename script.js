// Definição de variáveis globais
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;
var criaMosquitoTempo = 1500;

// Captura o nível da URL
var urlParams = new URLSearchParams(window.location.search);
var nivel = urlParams.get('nivel'); // Obtém o valor do nível

// Ajusta o tempo de criação do mosquito com base no nível
if (nivel === 'normal') {
    criaMosquitoTempo = 1500;
} else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000;
} else if (nivel === 'chuknorris') {
    criaMosquitoTempo = 750;
} else {
    // Caso o nível não seja reconhecido
    alert('Nível não reconhecido, configurando como normal');
    criaMosquitoTempo = 1500;
}

// Ajusta o tamanho do palco do jogo com base na tela do usuário
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

// Contador de tempo (conometro)
var conometro = setInterval(function () {
    tempo -= 1;

    if (tempo < 0) {
        clearInterval(conometro);
        clearInterval(criaMosquito);
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('conometro').innerHTML = tempo;
    }

}, 1000);

// Função para criar mosquitos em posições aleatórias
function posicaoRandomica() {
    // Verifica se o mosquito já existe e, caso exista, remove
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = "imagens/imagens/coracao_vazio.png";
            vidas++;
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // Criação do mosquito com classe aleatória
    var mosquito = document.createElement('img');
    mosquito.src = 'imagens/imagens/mosca.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';

    mosquito.onclick = function () {
        this.remove();
    };

    document.body.appendChild(mosquito);

    // Ajusta o tamanho e lado do mosquito
    tamanhoAleatorio();
    ladoAleatorio();
}

// Função que retorna um tamanho aleatório para o mosquito
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

// Função que retorna um lado aleatório para o mosquito
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

// Intervalo para criação dos mosquitos
var criaMosquito = setInterval(function () {
    posicaoRandomica();
}, criaMosquitoTempo);

// Ajuste o tamanho do palco do jogo quando a janela for redimensionada
window.onresize = ajustaTamanhoPalcoJogo;
