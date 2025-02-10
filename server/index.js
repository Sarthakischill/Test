// server/index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());


app.post('/api/save-responses', async (req, res) => {
    console.log('Received Data:', req.body);
    const { name, designation, responses } = req.body;
    if (!name || !designation || !responses) {
        console.error('Missing fields:', { name, designation, responses });
        return res.status(400).json({ error: 'Missing required fields' });
    }
    fs.readFile('responses.json', (err, data) => {
      let existingData = [];
      if (!err) {
        existingData = JSON.parse(data);
      }
      existingData.push({
        userInfo: { name, designation },
        responses,
      });
      fs.writeFile('responses.json', JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
          console.error('Failed to write to responses.json:', err);
          return res.status(500).json({ error: 'Failed to save responses' });
        }
        console.log('Responses saved to responses.json');
        res.status(200).json({ message: 'Responses saved successfully' });
      });
    });
});

app.get('/api/get-data', async (req, res) => {
});



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});