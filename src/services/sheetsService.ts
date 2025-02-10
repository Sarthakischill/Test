// src/lib/googleSheets.ts
interface UserData {
    name: string;
    designation: string;
    responses: Record<string, any[]>;
  }
  
  const API_URL = 'http://localhost:3001/api/save-responses'; // Update this when you deploy
  
  export const saveToGoogleSheets = async (userData: UserData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save responses');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error saving to sheets:', error);
      throw error;
    }
  };