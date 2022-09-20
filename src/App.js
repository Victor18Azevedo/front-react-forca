import { useState } from "react";
import palavras from "./palavras";
// import Footer from "./Footer";
// import Navbar from "./Navbar";

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
  // const sorteiaPalavra = function (palavras) {
  //   return;
  // };

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const [palavra, setPalavra] = useState("");

  let palavraArray;
  let palavraResultado;

  const iniciarJogo = () => {
    setPalavra(palavras.sample());
    console.log(palavra);
    palavraArray = Array.from(palavra);
    palavraResultado = palavraArray.map(() => "_");
    console.log(palavraResultado);
  };

  return (
    <div class="app">
      <section class="box--superior">
        <img src={forcas[0]} class="forca-img" alt="Forca" />
        <div class="forca-opcoes">
          <button class="forca-btn-iniciar btn" onClick={iniciarJogo}>
            Escolher Palavra
          </button>
          <div class="forca-resultado">
            {/* {palavraResultado.map((letra) => (
              <span class="resultado-letra">{letra}</span>
            ))} */}
          </div>
        </div>
      </section>
      <section class="box--inferior">
        <div class="box-alfabeto">
          {alfabeto.map((letra) => (
            <button class="alfabeto-letra " disabled="false">
              {letra.toUpperCase()}
            </button>
          ))}
        </div>
        <form class="box-input">
          <span class="input-text">Já sei a resposta!</span>
          <input class="input-text" type="text" disabled="true"></input>
          <input
            class="input-btn btn"
            type="submit"
            value="Chutar"
            disabled="true"
          ></input>
        </form>
      </section>
    </div>
  );
}
