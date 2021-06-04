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
        return axios.post(User_API_BASE_URL+'/manager/productInserttest' ,product);
        //return axios.post(User_API_BASE_URL+'/manager/productInserttest' ,product);
    }
    //이미지 업로드
    uploadFile(FormData){
        console.log("uploadFile 접근");
        return axios.post(User_API_BASE_URL+'/manager/upload',FormData);
    }
    //상품목록
    getProductList(){
        return axios.get(User_API_BASE_URL+"/manager/productList");
    }

    //항목들 개수
    itemsCnt(){
        console.log("itemsCnt 접근");
        return axios.get(User_API_BASE_URL+"/manager");
    }
    //상품상세보기
   
    getProductDetail(seq){
        console.log('getProductDetail 접근');
        return axios.get(User_API_BASE_URL+"/manager/productDetail/"+seq);
    }
    /*
    getProductCnt(){
        return axios.get(User_API_BASE_URL+"/manager/product");
    }
    getUserCnt(){
        return axios.get(User_API_BASE_URL+"/manager/user");
    }*/
}


export default new ApiService();