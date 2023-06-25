import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://localhost:3002/api/v1";

// async function getValueFor(key: string) {
//   let result = await SecureStore.getItemAsync(key);
//   const token = JSON.stringify(result);
//   if (result) {
//     return token.replace(/\\""/g, "");
//   } else {
//     alert("No values stored under that key.");
//   }
// }

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
      return response;
    },
    (error) => {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};

export async function fetchTweets(token: string) {
  const response = await fetchData(token).get("/tweets");

  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status !== 200) {
    console.warn("Error fetching tweets");
  }

  return response.data;
}

export async function fetchTweet(id: string, token: string) {
  const response = await fetchData(token).get(`/tweets/${id}`);
  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status !== 200) {
    console.warn("Error fetching tweet");
  }

  return response.data;
}

export async function createTweet<T>(tweet: T, token: string) {
  const response = await fetchData(token).post("/tweets", tweet);

  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status !== 200) {
    console.warn("Error creating tweet");
  }

  return response.data;
}
