import axios from "axios";

const API_URL = "http://localhost:3002/api/v1";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type Props = {
   email?: string; 
   oneTimeCode?: string ;
};

// Login or Signup a user
export async function loginOrSignupUser(data:  Props) {
    const response = await instance.post("/auth/login", {
        email: data.email,
    });
    
    return response.data;
}

// Confirm a user's email address with the one time code
export async function confirmUser(data: Props) {
    const response = await instance.post("/auth/authenticate", {
        email: data.email,
        oneTimeCode: data.oneTimeCode,
    });

    return response.data;
}

// logout a user
export async function logoutUser() {
    const response = await instance.post("/auth/logout");

    return response.data;
}
 