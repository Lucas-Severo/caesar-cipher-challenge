const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

async function cesarCypher() {
    // get the data
    const url = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${process.env.TOKEN}`;
    const response = await axios.get(url);
    
    // save the data
    await fs.writeFile('answer.json', JSON.stringify(response.data), (err) => {
        if(err)
            throw err;
        console.log('Arquivo criado com sucesso!');
    });
}

cesarCypher()