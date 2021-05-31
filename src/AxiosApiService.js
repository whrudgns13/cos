import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/cos";

class ApiService {

    //백엔드와 통신
    seachList(keyword){
        return axios.get(User_API_BASE_URL+'/seach/' + keyword);
    }
    //이메일 중복체크
    getUserEmail(user_email) {
        return axios.get(User_API_BASE_URL+'/signUp/' + user_email);
    }
    //회원가입
    insertUser(user){
        console.log("insertUser접근");
        console.log(user);
        return axios.post(User_API_BASE_URL+'/signUp' ,user);
    }
    //유저목록
    getUserList(){
        return axios.get(User_API_BASE_URL+"/manager/userList");
    }
    //상품등록
    insertProduct(product){
        return axios.post(User_API_BASE_URL+'/manager/productInsert' ,product);
    }
    //이미지 업로드
    uploadFile(formData,config){
        console.log("uploadFile 접근");
        return axios.post(User_API_BASE_URL+'/manager/upload',formData,config);
    }
    getProductList(){
        return axios.get(User_API_BASE_URL+"/manager/productList");
    }
}


export default new ApiService();