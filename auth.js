const msalConfig = {
  auth: {
    clientId: '94829e70-426d-44f2-922f-12fa2a96469a',
    authority: 'https://login.microsoftonline.com/f535660a-7493-4c77-8b92-5bbceef5bdcc',
    redirectUri: 'https://zealous-rock-0d241fe00.3.azurestaticapps.net' // your redirect URI
  },
   cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  }
};

// Call this function when you need to get an access token
async function getAccessToken() {
  try {
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    
    const abc = msalInstance.getActiveAccount();
    const accounts = msalInstance.getAllAccounts();

// Print the account information for each account
accounts.forEach((account) => {
  console.log(`Account name: ${account.name}`);
  console.log(`Account username: ${account.username}`);
  console.log(`Account ID: ${account.homeAccountId}`);
});
    const response = await msalInstance.acquireTokenSilent({
  scopes: ['user.read'],
   account: accounts[0]
      });
    abc = msalInstance.getActiveAccount();
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

