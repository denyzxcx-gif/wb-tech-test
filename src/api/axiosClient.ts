import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://6894a818be3700414e140965.mockapi.io/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
