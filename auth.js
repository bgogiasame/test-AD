const msalConfig = {
  auth: {
    clientId: '94829e70-426d-44f2-922f-12fa2a96469a',
    authority: 'https://login.microsoftonline.com/f535660a-7493-4c77-8b92-5bbceef5bdcc',
    redirectUri: window.location.href // your redirect URI
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Call this function when you need to get an access token
async function getAccessToken() {
  try {
    try {
    const accounts = msalInstance.getAllAccounts();
    console.log(accounts);
  } catch (error) {
    console.error(error);
  }
    const silentRequest = {
      scopes: ['user.read'], // the scopes you need to access the Graph API
      account: accounts[0] // the signed-in user account
    };
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (error) {
    console.log(error);
  }
}

async function getProfile() {
  const accessToken = await getAccessToken();

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const response = await fetch('https://graph.microsoft.com/v1.0/me', options);
  const data = await response.json();

  console.log(data);
}

