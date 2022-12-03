class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  editProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(this._checkResponse);
  }

  likeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes/`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteLikeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes/`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
