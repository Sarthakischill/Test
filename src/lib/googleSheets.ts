// googleSheets.ts
interface UserData {
  name: string;
  designation: string;
  responses: Record<string, any>;
}

export const saveToGoogleSheets = async (data: UserData) => {
  const endpoint = 'http://localhost:3001/api/save-responses'; // Replace with your actual endpoint

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.text();
    console.log('Data sent successfully:', responseData);
  } catch (error) {
    console.error('Failed to send data to Google Sheets:', error);
    throw error;
  }
};