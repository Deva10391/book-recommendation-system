import express from 'express';
import cors from 'cors';
import { load_all, recommend } from './prediction/aiml_handler.js';

const app = express()
const port = 3000

const corsOperations = {
  origin: '*',
}

app.use(cors(corsOperations));
app.use(express.json());

app.get('/load_all/', (req, res) => {
  const books = load_all();
  res.status(200).json({
    data: books
  });
})

app.post('/recommend/', async (req, res) => {
  const title = req.body.title;
  try {
    const recs = await recommend(title)//.catch(err => console.error(`here' ${err}`));
    console.log(recs);
    res.status(200).json({data: recs});
  } catch (err) {
    console.error(err);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// cd "mern deployment"
// node server.js