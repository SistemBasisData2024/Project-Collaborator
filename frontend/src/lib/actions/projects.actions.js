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