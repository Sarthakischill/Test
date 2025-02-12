// src/services/storageService.ts
import { UserResponse } from '../types';

interface UserData {
  name: string;
  designation: string;
  responses: UserResponse;
}

// src/services/storageService.ts
const API_URL = 'http://172.16.33.57:3001/api/save-response'; // Replace with your IP address;

export const saveResponse = async (data: UserData): Promise<void> => {
  try {
    console.log('Sending data to server:', data);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Server responded with error:', responseData);
      throw new Error(responseData.details || 'Failed to save response');
    }
    
    console.log('Save successful:', responseData);
  } catch (error) {
    console.error('Error saving response:', error);
    throw error;
  }
};