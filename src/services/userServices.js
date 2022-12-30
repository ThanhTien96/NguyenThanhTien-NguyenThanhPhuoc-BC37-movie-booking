import { maNhom, userApiPath } from "../util/apiPath";
import requester from "./apiRequester";

class UserSerVices {
    
   // dang nhap 
    fetchApiLogin = (data) => {
        return requester({
            url: userApiPath.USER_LOGIN,
            method: 'POST',
            data: data
        });
    }

    // lay thong tin nguoi dung
    fetchProfile = () => {
        return requester({
            url: userApiPath.GET_PROFILE,
            method: 'POST',
            
        })
    }

    // dang ky tai khoan 
    fetchApiSignUp = (data) => {
        return requester({
            url: userApiPath.REGISTER_USER,
            method:'POST',
            data: data,
        })
    }

}

export const userServices = new UserSerVices()