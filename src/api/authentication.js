import axios from "axios";

export const ax = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
  },
});

export const LoginService = async (data, closure) => {
    try{
        const res = await ax.post('/auth/signin', data);
        console.log(res.data);
    }
    catch (err) {
        console.log(err);
    }
}


