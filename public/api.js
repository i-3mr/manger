import { customAlert } from "./js/customAlert.js";

export class API {
  static BASE_URL = "/api/v1";
  constructor() {}

  static async send(axiosConfig) {
    axiosConfig.url = `${API.BASE_URL}/${axiosConfig.url}`;
    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    try {
      const { data } = await axios(axiosConfig);
      return data;
    } catch (err) {
      const statusCode = err.response.status;
      const message = err?.response?.data?.message || err.message;

      if (statusCode === 401) location.assign("/login");

      customAlert(message, false);

      throw new Error(message);
    }
  }
}
