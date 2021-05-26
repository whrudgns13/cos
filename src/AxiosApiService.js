import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/cos";

class ApiService {

    //백엔드와 통신
    seachList(keyword){
        return axios.get(User_API_BASE_URL+'/seach/' + keyword);
    }

    getUserEmail(user_email) {
        return axios.get(User_API_BASE_URL+'/signUp/' + user_email);
    }

    insertUser(user){
        console.log("insertUser접근");
        console.log(user);
        return axios.post(User_API_BASE_URL+'/signUp' ,user);
    }

    //상품등록
    insertProduct(product){
        return axios.post(User_API_BASE_URL+'/productInsert' ,product);
    }
}


export default new ApiService();