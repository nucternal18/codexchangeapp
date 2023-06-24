import axios from "axios";

const API_URL = "http://localhost:3002/api/v1";

const fetchData = () => {
  // create an axios instance that will be used to make requests
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Get the token from local storage
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbklkIjoiNjQ5NmRhYmVlZmI0MmI2MTE4YjVmOTYyIn0.yYpShAlebt0zDTy0hJ3mrApAtWRVGOLBA6u8dtz0Law";
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

export async function fetchTweets() {
  const response = await fetchData().get("/tweets");

  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status >= 400 && response.status < 500) {
    console.warn("Error fetching tweets");
  }
  
  return response.data;
}

export async function fetchTweet(id: string) {
  const response = await fetchData().get(`/tweets/${id}`);
  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status >= 400 && response.status < 500) {
    console.warn("Error fetching tweet");
  }

  return response.data;
}

export async function createTweet<T>(tweet: T) {
  const response = await fetchData().post("/tweets", tweet);

  // Check if the response is successful is 404, 400, 401
  // If it is, throw an error
  // If it is not, return the data
  if (response.status >= 400 && response.status < 500) {
    console.warn("Error creating tweet");
  }

  return response.data;
}
