import controller from "@/controller";

export default {
    async updateAccount(data) {
        try {
            var request = await controller.put("/user/" + userId + "/account", data);

            return request.data;
        } catch (err) {
            throw err;
        }
    }
}