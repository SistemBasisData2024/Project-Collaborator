import axios from "axios";
import { BaseResponse } from "../utils";

const API_URL = "http://localhost:3000/applications";


export async function getSentApplications(id) {
    try {
        const res = await axios.get(`${API_URL}/user/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function getReceivedApplications(id) {
    try {
        const res = await axios.get(`${API_URL}/owner/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}
export async function cancelSentApplications(id) {

    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function denyReceivedApplications(id) {
    try {
        const res = await axios.put(`${API_URL}/reject/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function acceptReceviedApplications(id) {
    try {
        const res = await axios.put(`${API_URL}/accept/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function makeApplications(data) {
    try {
        const res = await axios.post(`${API_URL}`, data);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}