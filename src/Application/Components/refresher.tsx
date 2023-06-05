import cogoToast from "cogo-toast";

export const refreshAccessToken = async () => {
    // Make a request to your server with the refresh token to obtain a new access token
    const cookies = document.cookie; 

    const match = cookies.match(/refresh-token=([^;]+)/);

    let refreshToken = null;
    if (match) {
        refreshToken = match[1]; // Extract the cookie value
    }

    const response = await fetch('http://54.252.239.220:3016/user/token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      cogoToast.error("You need to login again")
      throw new Error('Failed to refresh access token');
    }
    
    const { token } = await response.json();
    console.log(token)
    document.cookie = `access-token=${token}; path=/;`;
    
  }