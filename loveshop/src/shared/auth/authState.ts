let accessToken = '';

export function setToken(token: string) {
  accessToken = token;
}

export function getToken(){
  if (isAuthenticated()) {
    return accessToken;
  }
  return null;
}

function isAuthenticated(){
   return !!accessToken;
}
