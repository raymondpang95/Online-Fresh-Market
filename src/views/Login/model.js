import controller from "@/controller";

export default {
    async login(data) {
        try {
            const request = await controller.post("/login_check", data);

            return request;
        } catch (err) {
            throw err;
        }
    },
    async setToken(token, callBack) {
        const req = await controller.setToken(token, callBack);

        return req;
    }
}