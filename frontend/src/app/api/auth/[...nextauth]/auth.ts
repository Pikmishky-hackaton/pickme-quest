import axios from "axios";

export async function registerUser(data: object) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, data);
}
