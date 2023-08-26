import md5 from 'md5';

// defining the server port
const port = 5200

// initializing installed dependencies
import express, {Router} from 'express';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

// const axios = require('axios');
const app = express();
import cors from 'cors';
// const cors = require('cors');
app.use(cors());

// listening for port 5000
app.listen(5200, ()=> console.log(`Server is running on ${port}` ));

const router = Router();

// API request
router.get('/:amount', (req,res)=>{
  let qty = req.params.amount ?? 0;

  const ts = Date.now();
  const hash = md5(`${ts}${process.env.VITE_API_SECRET_KEY}${process.env.VITE_API_KEY}`);   
  const url = `${process.env.VITE_API_URL}?apikey=${process.env.VITE_API_KEY}&ts=${ts}&hash=${hash}&limit=40`;
  const options = {
    method: 'GET',
    url: url,
  };
   
  axios.request(options).then(function (response) {
    let data = response.data.data.results;
    let newCharacters = [];
    data.map((hero) => newCharacters.push({name: hero.name, image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}));
    // Remove heroes without images
    let characters = newCharacters.filter((hero) => !hero.image.includes('image_not_available'));
    
    // Manually Removing Non-X-men Characters
    let xMenCharacters = characters.filter((hero) => {
      return hero.name != 'Captain America' && hero.name != 'Black Panther' && hero.name != 'Iron Man' && hero.name != 'X-Factor' && hero.name != 'X-Men';
    });
    
    if(qty == 0 || qty > xMenCharacters.length) {
      res.json({error: "wrong quantity of characters"});
    }
    
    let finalCharacters = [];
    while (finalCharacters.length < qty) {
      let pickedHero = xMenCharacters.splice(Math.floor(Math.random() * xMenCharacters.length), 1);
      finalCharacters.push(pickedHero[0]);
    }

    res.json(finalCharacters);
  }).catch(function (error) {
      console.error(error);
  });
});

app.use('/api/', router);

export const handler = serverless(app); 