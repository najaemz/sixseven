var modo = "visual";
var cores = [];
var coresJogador = [];
var maxPontos = 0;

document.getElementsByClassName("js-start")[0].addEventListener("click", start);

function start() {
	initialize();
	atualizaPontuacao();
	document.getElementsByClassName("js-start")[0].style.display = "none";
	mostrarCores();
}

function initialize() {
	modo = "visual";
	cores = [];
	coresJogador = [];
}

function adicionarCorJogador(e) {
	console.log(e);
	var cor = e.srcElement.classList[1];
	var num = numeroDaCor(cor);
	coresJogador.push(num);
	var div = "<div class=\"quadrado " + cor + "\"></div>";
	document.getElementsByClassName("js-listaCores")[0].innerHTML += div;
}

function habilitarBotoes() {
	var botoes = document.getElementsByClassName("js-botao");
	for(var i = 0; i < botoes.length; i++) {
	  botoes[i].addEventListener("click", adicionarCorJogador)
	}

	document.getElementsByClassName("js-verify")[0].addEventListener("click", verify);
	document.getElementsByClassName("js-clear")[0].addEventListener("click", clear);
	document.getElementsByClassName("js-clearLast")[0].addEventListener("click", clearLast);
}

function desabilitarBotoes() {
	var botoes = document.getElementsByClassName("js-botao");
	for(var i = 0; i < botoes.length; i++) {
	  botoes[i].removeEventListener("click", adicionarCorJogador)
	}

	document.getElementsByClassName("js-verify")[0].removeEventListener("click", verify);
	document.getElementsByClassName("js-clear")[0].removeEventListener("click", clear);
	document.getElementsByClassName("js-clearLast")[0].removeEventListener("click", clearLast);
}

function mostrarCores() {
	modo = "visual";
	desabilitarBotoes();

	var newColor = Math.floor(Math.random() * 4); //numero aleatorio entre 0 e 3
	while(cores.length > 0 && (newColor == cores[cores.length - 1]))
		newColor = Math.floor(Math.random() * 4);
	cores.push(newColor);

	document.getElementsByClassName("js-listaCores")[0].innerHTML = '';
	mostrarCadaCor();
}

function corDoNumero(num) {
	if(num == 0) return "verde";
	if(num == 1) return "vermelho";
	if(num == 2) return "amarelo";
	if(num == 3) return "azul";
}

function numeroDaCor(cor) {
	if(cor == "verde") return 0;
	if(cor == "vermelho") return 1;
	if(cor == "amarelo") return 2;
	if(cor == "azul") return 3;
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// solucao exercício 6
async function mostrarCadaCor() {
	var time = 1000;
	if(cores.length > 5) time = 5000/cores.length;

	await delay(1000);
	for(var i = 0; i < cores.length; i++) {
		var div = "<div class=\"quadrado " + corDoNumero(cores[i]) + "\"></div>";
		document.getElementsByClassName("js-listaCores")[0].innerHTML += div;
		await delay(time);
	}

	jogador();
}

function jogador() {
	modo = "jogador";
	coresJogador = [];

	controlarTempo();

	document.getElementsByClassName("js-verify")[0].style.display = "inline-block";
	document.getElementsByClassName("js-clear")[0].style.display = "inline-block";
	document.getElementsByClassName("js-clearLast")[0].style.display = "inline-block";
	document.getElementsByClassName("js-listaCores")[0].innerHTML = '';

	habilitarBotoes();
}

// solucao exercício 5
async function controlarTempo() {
	var rodada = cores.length;
	document.getElementsByClassName("js-timer")[0].innerHTML = "20s";
	document.getElementsByClassName("js-timer")[0].style.display = "inline-block";
	for(var i = 19; i >= 0; i--) {
		/*
			por ser uma função assíncrona, temos que ter cuidado para não rodar
			duas ao mesmo tempo.
		*/
		if(cores.length != rodada) return;
		await delay(1000);
		document.getElementsByClassName("js-timer")[0].innerHTML = i + "s";
	}
	verify();
}

// solucao exercício 3
function clear() {
	coresJogador = [];
	document.getElementsByClassName("js-listaCores")[0].innerHTML = '';
}

// solucao exercício 4
function clearLast() {
	coresJogador.pop();
	document.getElementsByClassName("js-listaCores")[0].innerHTML = '';
	for(var i = 0; i < coresJogador.length; i++) {
		var div = "<div class=\"quadrado " + corDoNumero(coresJogador[i]) + "\"></div>";
		document.getElementsByClassName("js-listaCores")[0].innerHTML += div;
	}
}

function verify() {
	//desabilitar o botao de verificar? tente clicar verificar varias vezes
	document.getElementsByClassName("js-timer")[0].style.display = "none";

	if(todasCoresIguais()) {
		atualizaPontuacao();
		mostrarCores();
	}
	else {
		atualizaPontuacaoMaxima();
		gameOver();
	}
}

// solucao exercício 1
function atualizaPontuacao() {
	if(cores.length <= 1) document.getElementsByClassName("js-pontos")[0].innerHTML = cores.length + " ponto";
	else document.getElementsByClassName("js-pontos")[0].innerHTML = cores.length + " pontos";
}

// solucao exercício 2
function atualizaPontuacaoMaxima() {
	maxPontos = Math.max(maxPontos, cores.length - 1);
	document.getElementsByClassName("js-maxpontos")[0].innerHTML = "Pontuação Máxima: " + maxPontos;
}

function todasCoresIguais() {
	if(coresJogador.length != cores.length) return false;

	for(var i = 0; i < cores.length; i++)
		if(coresJogador[i] != cores[i])
			return false;

	return true;
}

function gameOver() {
	document.getElementsByClassName("js-gameOver")[0].showModal();
}

document.getElementsByClassName("js-restart")[0].addEventListener("click", function(){
	document.getElementsByClassName("js-gameOver")[0].close();
	start();
});
