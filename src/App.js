import React, { useState } from "react";
import palavras from "./palavras";

let palavraArraySemAcento;
let tentativasErradas;
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
  const [resultado, setResultado] = useState();
  const [forca, setForca] = useState(forcas[0]);
  const [letrasClicadas, setLetrasClicadas] = useState([...alfabeto]);
  const [textoChute, setTextoChute] = useState("");
  const [perdeu, setPerdeu] = useState(false);
  const [ganhou, setGanhou] = useState(false);

  const condicaoInicial = function () {
    tentativasErradas = 0;
    setForca(forcas[0]);
    setLetrasClicadas([]);
    setGanhou(false);
    setPerdeu(false);
    setTextoChute("");
  };

  const finalizarJogo = function (status) {
    setResultado(palavraArray.map((letra) => letra));
    setLetrasClicadas([...alfabeto]);
    if (status === "ganhou") {
      setGanhou(true);
    } else {
      setForca(forcas[maxErros]);
      setPerdeu(true);
    }
  };

  const iniciarJogo = () => {
    setIniciou(true);

    palavra = sample(palavras);
    const novaPalavraArray = Array.from(palavra.toUpperCase());
    setPalavraArray([...novaPalavraArray]);

    palavraArraySemAcento = novaPalavraArray.map(retiraAcento);
    setResultado(novaPalavraArray.map(() => "_"));

    condicaoInicial();
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
      if (!novoResultado.includes("_")) {
        finalizarJogo("ganhou");
      }
    } else {
      tentativasErradas++;
      setForca(forcas[tentativasErradas]);
      if (tentativasErradas === maxErros) {
        finalizarJogo("perdeu");
      }
    }
  };

  const chutar = () => {
    if (textoChute) {
      if (retiraAcento(textoChute) === retiraAcento(palavra)) {
        finalizarJogo("ganhou");
      } else {
        finalizarJogo("perdeu");
      }
    }
  };

  return (
    <>
      <section className="box--superior">
        <img
          src={forca}
          className="forca-img"
          alt="Forca"
          data-identifier="game-image"
        />
        <aside className="forca-opcoes">
          <button
            className="forca-btn-iniciar btn"
            onClick={iniciarJogo}
            data-identifier="choose-word"
          >
            Escolher Palavra
          </button>
          <div className="forca-resultado" data-identifier="word">
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
        </aside>
      </section>
      <section className="box--inferior">
        <div className="box-alfabeto">
          {alfabeto.map((letra, index) => (
            <button
              key={index}
              className="alfabeto-letra "
              onClick={() => sugestao(letra)}
              disabled={letrasClicadas.includes(letra) ? true : false}
              data-identifier="letter"
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
            data-identifier="type-guess"
          ></input>
          <input
            className="input-btn btn"
            onClick={chutar}
            disabled={!iniciou | perdeu | ganhou}
            value="Chutar"
            type="Submit"
            data-identifier="guess-button"
          ></input>
        </div>
      </section>
    </>
  );
}
