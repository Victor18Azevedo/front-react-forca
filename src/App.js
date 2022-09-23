import React, { useState } from "react";
import palavras from "./palavras";
// import Footer from "./Footer";
// import Navbar from "./Navbar";

let palavraArraySemAcento;
let tamanhoPalavra;
let tentativasErradas;
let tentativasCertas;
let terminoDeJogo = false;
let palavra;

export default function App() {
  const alfabeto = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const forcas = [
    "./assets/forca0.png",
    "./assets/forca1.png",
    "./assets/forca2.png",
    "./assets/forca3.png",
    "./assets/forca4.png",
    "./assets/forca5.png",
    "./assets/forca6.png",
  ];
  const maxErros = forcas.length - 1;

  const sample = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  const retiraAcento = function (str) {
    str = str.toLowerCase();
    str = str.replace(/[àáâãäå]/, "a");
    str = str.replace(/[èéêẽë]/, "e");
    str = str.replace(/[ìíîĩï]/, "i");
    str = str.replace(/[òóôõö]/, "o");
    str = str.replace(/[ùúûũü]/, "u");
    str = str.replace(/[ç]/, "c");

    return str;
  };

  const [iniciou, setIniciou] = useState(false);
  const [palavraArray, setPalavraArray] = useState([]);
  const [letrasClicadas, setLetrasClicadas] = useState([...alfabeto]);
  const [resultado, setResultado] = useState();
  const [forca, setForca] = useState(forcas[0]);
  const [textoChute, setTextoChute] = useState("");
  const [perdeu, setPerdeu] = useState(false);
  const [ganhou, setGanhou] = useState(false);

  const iniciarJogo = () => {
    palavra = sample(palavras);
    const novaPalavraArray = Array.from(palavra.toUpperCase());
    palavraArraySemAcento = novaPalavraArray.map(retiraAcento);
    tamanhoPalavra = palavraArraySemAcento.length;
    setPalavraArray([...novaPalavraArray]);
    setResultado(palavraArraySemAcento.map(() => "_"));

    //Condicao Inicial
    setLetrasClicadas([]);
    setIniciou(true);
    tentativasErradas = 0;
    setForca(forcas[tentativasErradas]);
    setGanhou(false);
    setPerdeu(false);
    setTextoChute("");
    terminoDeJogo = false;

    console.log(palavraArraySemAcento);
    console.log(novaPalavraArray);
    console.log(tentativasErradas);
  };

  const sugestao = (letraSugerida) => {
    setLetrasClicadas([
      ...letrasClicadas,
      letrasClicadas.includes(letraSugerida) ? "" : letraSugerida,
    ]);

    if (palavraArraySemAcento.includes(letraSugerida)) {
      const novoResultado = resultado.map((letra, index) =>
        palavraArraySemAcento[index] === letraSugerida
          ? palavraArray[index]
          : letra
      );
      setResultado(novoResultado);
      const ganhou = !novoResultado.includes("_") ? true : false;
      if (ganhou) {
        console.log("FIM DE JOGO - GANHOU");
        terminoDeJogo = true;
        setLetrasClicadas([...alfabeto]);
        setGanhou(true);
      }
    } else if (tentativasErradas < maxErros) {
      tentativasErradas++;
      console.log(tentativasErradas);
      setForca(forcas[tentativasErradas]);
      if (tentativasErradas === forcas.length - 1) {
        console.log("FIM DE JOGO - PERDEU");
        terminoDeJogo = true;
        setLetrasClicadas([...alfabeto]);
        setResultado(palavraArray.map((letra) => letra));
        setPerdeu(true);
      }
      console.log(resultado);
    }
  };

  const chutar = () => {
    console.log(textoChute);
    if (textoChute) {
      setResultado(palavraArray.map((letra) => letra));
      if (retiraAcento(textoChute) === retiraAcento(palavra)) {
        console.log("FIM DE JOGO - GANHOU");
        terminoDeJogo = true;
        setLetrasClicadas([...alfabeto]);
        setGanhou(true);
      } else {
        console.log("FIM DE JOGO - PERDEU");
        terminoDeJogo = true;
        setForca(forcas[maxErros]);
        setLetrasClicadas([...alfabeto]);
        setPerdeu(true);
      }
    }
  };

  return (
    <div className="app">
      <section className="box--superior">
        <img src={forca} className="forca-img" alt="Forca" />
        <div className="forca-opcoes">
          <button className="forca-btn-iniciar btn" onClick={iniciarJogo}>
            Escolher Palavra
          </button>
          <div className="forca-resultado">
            {iniciou
              ? resultado.map((letra, index) => (
                  <span
                    key={index}
                    className={`
                      resultado-letra 
                      ${perdeu ? "resultado--errado " : ""}
                      ${ganhou ? "resultado--certo " : ""}
                    `}
                  >
                    {letra}
                  </span>
                ))
              : ""}
          </div>
        </div>
      </section>
      <section className="box--inferior">
        <div className="box-alfabeto">
          {alfabeto.map((letra, index) => (
            <button
              key={index}
              className="alfabeto-letra "
              onClick={() =>
                tentativasErradas < maxErros ? sugestao(letra) : null
              }
              disabled={letrasClicadas.includes(letra) ? true : false}
            >
              {letra.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="box-input">
          <span className="input-text">Já sei a resposta!</span>
          <input
            className="input-text"
            onChange={(e) => setTextoChute(e.target.value)}
            value={textoChute}
            type="text"
            disabled={!iniciou}
          ></input>
          <input
            className="input-btn btn"
            onClick={chutar}
            disabled={!iniciou | terminoDeJogo}
            value="Chutar"
            type="Submit"
          >
            {/* Chutar */}
          </input>
        </div>
      </section>
    </div>
  );
}
