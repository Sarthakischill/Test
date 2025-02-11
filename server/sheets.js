// backend/sheets.js
const { google } = require('googleapis');

// Create auth client
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: "parabolic-clock-450508-r0",
    private_key_id: "19d7763df91b26fcb486e1daf948dd64df026703",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcugboq1RdJ4/G\nVx2nBSNfe65zDhOaA/eK3SCm6Jp6HG7iOQwpSeXJycLyQRj5blQ4kZYrOqp64pIR\nGbnaLDKZKhILBfRhqF4Tw9qZksvPmCTvBqqH/Y76dIln3ZpV2iGSzpST6sVMW8ag\nyy5b3/XLB96FgSTVJkz97q01ZfDEmz2G9c+V3dWGZchKGtNmlpJ+UKWjXtSXgifH\nwj0v/2FSnNQZwOzDkR0/R2oCYuknpzo9ETQ8TjwO5oI5ntqvRKzslmWMA22+OKIR\nwos+btHhGEhDhHCZi7odYO77Jx+vea3cBRfXRFB8VI7xj8HEVq99hd+4JanBPSTT\nQMS+lkThAgMBAAECggEAFA1VDvXEwHpsUcMZnyHwKapIYp4dceoqBNFP+SrvgMoc\ngcMsxCeZR90RnS8pA9jS2738yaEi6MAOUjPJbJmVC7WvQ0vKvafuCXdYg6edff0I\nVLC0ptuRLIg2gFyA/5T+EKtvpRE3lxJy8mWsk8KuzwA9vzULwl25IhAkhx141Z6X\n1+s9glf5svuUB35l35ki19sWygjslimt6a/wWrWmL1n26KFuU0y+uab69+OUnh46\np+end1OSMD2WruwI3nCOH+UPluATyach86Q+kdyrMHY0S/AIMXYmnLViucjZRcQ2\nF0ouIuDfA0Srul9FFiznlkl2k/xXk131RzWAKoPbxQKBgQDMBE5xMQACQbvkjzZ8\nXVNAtx1mj7nbArVSPJteXn8CQ4VOEPeTrHIXpKW/EsKBPglk9zal+zJNHDP1VSOI\nuxpVqSqjz7jEKVqLWUen8KTErhxm0GoDZQ9WKz407dRfiVdZ+aiydfhEdPyN9gix\nz8j5zIhT1ukTn2d9Q+t/xFezDwKBgQDEqQ8Rh8diRnysWFs3IbfABlb6aM2nRI6r\n26Kj/xVs630PjpedZU7krgcKj+00qSPuTdASg5LGErshvqHbNJJ+krvqZ4SeuIej\nSnjOLGGijSjcGjfifStEoCknzgP6x5ijdmVjushHntD3dKSaH6nGUyMx5GI+hJXL\njO2LkGTJDwKBgQCoMgyxiOIm+iZ7gg47bX1LZyvX+DoTcyIlkE3O+TzgkuX9vEM/\n/fV5xIXZBxBQGOMJ2D23jWak59F2OyC2gvptELBUqNX88tLw+0P2EpDkjV5g7QXZ\nkqGYOsJoRILH2KSpSwhnSJbLaV8lcmcsoM9iEdt6sz0orkxVm381sJtUxQKBgCkA\nloOxK4Dx8Ux9n4b/ILCIodnTwAz/3j82q9JFfNIYxxpXQIUweiJzpkQtfedc3IDy\n+E7j39YsUZfXhyeM7n41WbilnKD7GEyTWlyiJDkf9UTusngmYL8OJYaHDY1b0BdE\nuB7y8o78LdVqHGeF8n/HFa9xTop6WkD2QRC4KktBAoGACSGUffvRYm6Bp7v6rlPW\nmw0xaARnBEip9dzFKOIYFoqOsVU/BLaSSQS1XxNYU+HnYDOzaso7zkQlM4T3BHGZ\nBvHHoDbwlbrysj2uk5d4pJz2+UbdZPnfEMljbKO22nBuYJo5o9+9kuTlZairFBKe\nidgDjZ1PUwKMH8wVpu0WQ/s=\n-----END PRIVATE KEY-----\n",
    client_email: "career-recommendation@parabolic-clock-450508-r0.iam.gserviceaccount.com",
    client_id: "116220719887419308089",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/career-recommendation%40parabolic-clock-450508-r0.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

// Replace with your Google Sheet ID
const SPREADSHEET_ID = '1EkZJaJquIftaa3DcZSbEYK1Zgr9uIfbe3oquTX3haUQ';

async function appendToSheet(data) {
  try {
    const formattedData = formatDataForSheet(data);
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:M', // Adjust based on your sheet's structure
      valueInputOption: 'RAW',
      resource: {
        values: [formattedData]
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

function formatDataForSheet(data) {
  const { userInfo, responses } = data;
  
  return [
    userInfo.name,
    userInfo.designation,
    JSON.stringify(responses["Academic Strengths"] || []),
    JSON.stringify(responses["Confidence Tasks"] || []),
    JSON.stringify(responses["Interests & Passions"] || []),
    JSON.stringify(responses["Interest Ratings"] || []),
    JSON.stringify(responses["Career Goals"] || []),
    JSON.stringify(responses["Career Factor Rankings"] || []),
    JSON.stringify(responses["Scenario-Based Q7"] || []),
    JSON.stringify(responses["Scenario-Based Q8"] || []),
    JSON.stringify(responses["Skills & Personality"] || []),
    JSON.stringify(responses["Program-Specific Preferences"] || [])
  ];
}

module.exports = {
  appendToSheet
};