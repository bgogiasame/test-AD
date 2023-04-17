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
    const accounts = await msalInstance.getAllAccounts();
    const silentRequest = {
      scopes: ['user.read', 'mail.read'], // the scopes you need to access the Graph API
      account: accounts[0] // the signed-in user account
    };
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (error) {
    console.log(error);
  }
}
