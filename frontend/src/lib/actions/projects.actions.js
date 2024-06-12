import axios from "axios";
import { BaseResponse } from "../utils";

const API_URL = "http://localhost:3000/projects";

export async function getAllOpenProject() {
    try {
        const res = await axios.get(`${API_URL}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}


export async function createProject(data) {
    try {
        const res = await axios.post(`${API_URL}`, data);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function getProjectDetail(id) {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function getUserProjects(userId){
    try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function finishProjects(id) {
    try {
        const res = await axios.put(`${API_URL}/finish/${id}`);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}

export async function updateProjects(id, data) {
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return BaseResponse(true, res.data);
    }
    catch(err){
        console.log(err.response.data);
        return BaseResponse(false, err.response.data);
    }
}