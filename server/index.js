// server/index.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Adjust the path to be in the project root instead of src
const RESPONSES_FILE = join(__dirname, '../responses.json');

// Ensure the responses file exists and is valid
const initializeResponsesFile = async () => {
  try {
    try {
      await fs.access(RESPONSES_FILE);
      const content = await fs.readFile(RESPONSES_FILE, 'utf8');
      // Verify if it's valid JSON
      JSON.parse(content);
      console.log('Valid responses.json found');
    } catch (error) {
      // File doesn't exist or is invalid JSON, create new one
      console.log('Creating new responses.json');
      await fs.writeFile(RESPONSES_FILE, JSON.stringify({}, null, 2), 'utf8');
    }
  } catch (error) {
    console.error('Error initializing responses file:', error);
    throw error;
  }
};

// Initialize file before starting server
await initializeResponsesFile();

app.post('/api/save-response', async (req, res) => {
  try {
    console.log('Received save request');
    const { name, designation, responses } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read current data with error handling
    let existingData = {};
    try {
      const fileContent = await fs.readFile(RESPONSES_FILE, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      console.log('Error reading file, initializing new data object');
    }

    // Add new response
    existingData[name] = {
      id: name,
      designation,
      responses,
      timestamp: new Date().toISOString()
    };

    // Write updated data
    await fs.writeFile(
      RESPONSES_FILE, 
      JSON.stringify(existingData, null, 2), 
      'utf8'
    );

    console.log('Response saved successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ 
      error: 'Failed to save response',
      details: error.message 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Responses will be saved to: ${RESPONSES_FILE}`);
});