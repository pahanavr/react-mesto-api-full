const baseUrl = "https://api.mesto.pahanavr.nomoredomains.club";

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  })
  .then((res) => {
    console.log("data: ", res);
    if (res.token){
      localStorage.setItem("jwt", res.token);
      return res;
    } else {
      return;
    }
  })
  .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
  .then(res => {if (res.ok) { 
    return res.json(); 
  } 
  return Promise.reject(`Ошибка: ${res.status}`); })
  .catch(err => console.log(err))
}
