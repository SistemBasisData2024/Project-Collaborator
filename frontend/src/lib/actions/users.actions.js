import axios from "axios";
import { BaseResponse } from "../utils";

const API_URL = "http://localhost:3000/users";

export async function register(data){
    try {
        const res = await axios.post(`${API_URL}/register`, data);
        console.log(res);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function login(data) {
    try {
        const res = await axios.post(`${API_URL}/login`, data);
        console.log(res);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function getAllAvailableCollaborators() {
    try {
        const res = await axios.get(`${API_URL}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}