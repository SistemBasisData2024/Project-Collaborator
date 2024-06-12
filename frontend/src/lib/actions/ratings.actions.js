import axios from "axios";
import { BaseResponse } from "../utils";

const API_URL = "http://localhost:3000/ratings";

export async function getRatingByUser(id) {
    try {
        const res = await axios.get(`${API_URL}/sent/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function sendReview(id, data){
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}