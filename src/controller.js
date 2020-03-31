import router from './router';
import store from './store';
import axios from 'axios';

const domain = "apiLink";
axios.defaults.baseURL = domain;

const methods = {
	getUrl() {
		return domain;
	},
	async setToken(token, callBack) {
		axios.defaults.headers.common['Authorization'] = (token == null) ? '' : 'Bearer ' + token;

		try {
			const req = await callBack();
			const jsonObject = {
				token: token,
				userId: req
			}

			localStorage.setItem("userInfo", JSON.stringify(jsonObject));

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
	async get(url) {
		store.commit("setApiCallReload", true);
		store.commit("setLoader");
		try {
			const request = await axios.get(url);

			store.commit("setLoader");
			return request.data;
		} catch (err) {
			store.commit("setLoader");
			if (err.response.data.message == "Invalid JWT Token") {
				methods.handleLogin();
			}
			throw err;
		}
	},
	async delete(url) {
		store.commit("setApiCallReload", false);
		store.commit("setLoader");
		try {
			const request = await axios.delete(url);

			store.commit("setLoader");
			return request.data;
		} catch (err) {
			store.commit("setLoader");
			if (err.response.data.message == "Invalid JWT Token") {
				methods.handleLogin();
			}
			throw err;
		}
	},
	async post(url, data) {
		store.commit("setApiCallReload", false);
		store.commit("setLoader");
		try {
			const request = await axios.post(url, data);

			store.commit("setLoader");
			return request.data;
		} catch (err) {
			store.commit("setLoader");
			if (err.response.data.message == "Invalid JWT Token") {
				methods.handleLogin();
			}
			throw err;
		}
	},
	async put(url, data) {
		store.commit("setApiCallReload", false);
		store.commit("setLoader");
		try {
			const request = await axios.put(url, data);

			store.commit("setLoader");
			return request.data;
		} catch (err) {
			store.commit("setLoader");
			if (err.response.data.message == "Invalid JWT Token") {
				methods.handleLogin();
			}
			throw err;
		}
	},
	handleLogin() {
		if (router.app._route.path != "/") {
			store.commit("setLoginModalState");
		}
	},
	logout() {
		axios.defaults.headers.common['Authorization'] = null;

		localStorage.removeItem("userInfo");

		router.push({ path: "/" });
	},
}

if (localStorage.getItem("userInfo") != null) {
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	axios.defaults.headers.common['Authorization'] = 'Bearer ' + userInfo.token;

	/* const request = methods.get("/seller/me");
	request.then(res => {
		return;
	}).catch(error => {
		if (error.response.data.message == "Invalid JWT Token" || error.response.data.message == "Expired JWT Token") {
			methods.handleLogin();
		} else if (error.response.data.message == "JWT Token Not Found") {
			if (router.app._route.path != "/") {
				router.push({ path: "/" });
			}
		}
	}); */
}

export default methods;