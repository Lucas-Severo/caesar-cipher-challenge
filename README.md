<div align="center">
  <h1>Criptografia de Júlio César</h1>
  <p>Este projeto é referente ao desafio proposto pela codenation no programa <a href="https://www.codenation.dev/aceleradev/react-online-1/">AceleraDev</a></p>
</div>

## Objetivo:
<p align="justify">O objetivo do projeto foi obter um texto através de uma requisição ao servidor, descriptografar este texto e passar ele para SHA1, após isso salvar ambos em um arquivo chamado answer.json e enviar para o servidor da codenation.</p>

## Etapas:
Para a realização do desafio dividi em três partes:

1. A primeira etapa, foi obter o arquivo answer.json, que possuia o texto a ser descriptografado e o número de casas que deve ser utilizada para descriptografar o texto.
2. Após isso, o programa deve descriptografar o texto e o texto descriptografado deve ser convertido para a criptografia SHA1. Assim, tanto o texto descriptografado quanto o SHA1 deve ser salvo em um arquivo answer.json;
3. Com isso, o arquivo answer.json deve ser enviado para o servidor da codenation, que retornará a pontuação como resposta da requisição.

## Dificuldades:
- <p align="justify">A maior dificuldade para a realização do desafio foi enviar um arquivo através de uma requisição post para o servidor, pois para isso é necessário configurar o cabeçalho da requisição como se estivesse enviando um formulário.</p>

### [Solução](script.js#L45) para o envio do arquivo:
```javascript
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

const form = new FormData();
const file = fs.createReadStream('answer.json');
form.append('answer', file);

axios.post(url, form, {
  headers: {
    ...form.getHeaders()
  }
});
```
