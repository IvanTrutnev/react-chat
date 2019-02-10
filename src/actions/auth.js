import * as types from '../constants';

export function signup(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.SIGNUP_REQUEST
		});
		fetch('http://localhost:8000/v1/signup', {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.success) {
					return json;
				} else {
					throw new Error(json.message);
				}
			})
			.then((json) => {
				if (!json.token) {
					throw new Error('Token has not been provided');
				}

				localStorage.setItem('token', json.token);

				dispatch({
					type: types.SIGNUP_SUCCESS,
					payload: json
				});
			})
			.catch((reason) =>
				dispatch({
					type: types.SIGNUP_FAILURE,
					payload: reason
				})
			);
	};
}

export function login(username, password) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_REQUEST
		});
		fetch('http://localhost:8000/v1/login', {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.success) {
					return json;
				} else {
					throw new Error(json.message);
				}
			})
			.then((json) => {
				if (!json.token) {
					throw new Error('Token has not been provided');
				}

				localStorage.setItem('token', json.token);

				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: json
				});
			})
			.catch((reason) =>
				dispatch({
					type: types.LOGIN_FAILURE,
					payload: reason
				})
			);
	};
}

export function logout() {
	return (dispatch) => {
		dispatch({
			type: types.LOGOUT_REQUEST
		});
	};
}

export function receiveAuth() {
	return (dispatch, getState) => {
		const { token } = getState();

		if (!token) {
			dispatch({
				type: types.RECEIVE_AUTH_FAILURE
			});
    }
    fetch('http://localhost:8000/v1/users/me', {
			method: 'GET',
			headers: {
        'Authorization': `Barear ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.success) {
					return json;
				} else {
					throw new Error(json.message);
				}
			})
			.then((json) => {
				dispatch({
					type: types.RECEIVE_AUTH_SUCCESS,
					payload: json
				});
			})
			.catch((reason) =>
				dispatch({
					type: types.RECEIVE_AUTH_FAILURE,
					payload: reason
				})
			);
	};
}
