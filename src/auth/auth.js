// check if user is logged in or not
export const isAuthenticate = () => {
  let token = localStorage.getItem("data");
  if (token != null) return true;
  else return false;
};

// set user data in localStorage
export const doLogin = (data, next) => {
  // NOTE : set this data in localstorage in encrypt
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// logout the user
export const doLogout = (next) => {
  // remove data from localstorage
  localStorage.removeItem("data");
  next();
};

// get current user
export const getCurrentUser = () => {
  if (isAuthenticate()) {
    return JSON.parse(localStorage.getItem("data")).currentUser;
  } else {
    return undefined;
  }
};


// get auth token
export const getToken = () => {
  if(isAuthenticate()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
}