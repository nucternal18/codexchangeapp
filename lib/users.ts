import axios, { Axios, AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { UserType } from "../types";

const API_URL = "http://localhost:3002/api/v1";

// async function getValueFor(key: string) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     return result;
//   } else {
//     alert("No values stored under that key.");
//   }
// }

// This is a function that fetches data from the API and returns it as a promise.

const fetchData = (token: string) => {
  // create an axios instance that will be used to make requests
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    async function (config) {
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      console.log(response);
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};

// get user
export async function fetchUser(token: string) {
  try {
    const response = await fetchData(token).get("/users/me");

    // Check if the response is successful is 404, 400, 401
    // If it is, throw an error
    // If it is not, return the data
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    return response.data;
  } catch (error: any) {
    console.warn(error.message);
  }
}
