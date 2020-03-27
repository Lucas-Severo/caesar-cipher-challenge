const fs = require('fs');
const axios = require('axios');
const sha1 = require('js-sha1');
const FormData = require('form-data');

require('dotenv').config();

async function cesarCypher() {
    // get the data
    const url = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${process.env.TOKEN}`;
    const response = await axios.get(url);

    // decrypt the text
    const { numero_casas, cifrado: sentence } = response.data;
    let decrypted = '';

    for(letter of sentence.toLowerCase()) {
        let charcode = letter.charCodeAt();
        
        if (charcode >= 97 && charcode <= 122) {
            charcode = charcode - numero_casas;

            charcode = charcode < 97 ? 123 - (97 - charcode) : charcode; 
        }

        decrypted += String.fromCharCode(charcode);
    }

    // encrypt the text to sha1
    const shaEncrypted = sha1(decrypted);
    console.log(shaEncrypted);

    // update the data
    response.data.decifrado = decrypted;
    response.data.resumo_criptografico = shaEncrypted;

    // save the data
    await fs.writeFile('answer.json', JSON.stringify(response.data), (err) => {
        if(err)
            throw err;
        console.log('Arquivo salvo com sucesso!');
    });

    // send the file
    const submit_url = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${process.env.TOKEN}`;
    const form = new FormData();
    const file = fs.createReadStream('answer.json');
    form.append('answer', file);

    try {
        const response = await axios.post(submit_url, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log("Score: " + response.data.score);

    } catch(err) {
        console.log("Error: ", err.response.data);
    }
}

cesarCypher()