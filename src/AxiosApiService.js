import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8080/cos";

class ApiService {

    //백엔드와 통신
    
    //이메일 중복체크
    getUserEmail(user_email) {
        return axios.get(User_API_BASE_URL+'/signUp/' + user_email);
    }
    //회원가입
    insertUser(user){
        console.log("insertUser접근");
        console.log(user);
        return axios.post(User_API_BASE_URL+'/signUp',user);
    }
    //유저목록
    getUserList(){
        return axios.get(User_API_BASE_URL+"/manager/userList");
    }
    userCount(){
        return axios.get(User_API_BASE_URL+"/manager/userCount");
    }
     //유저검색
    userseachList(searchType,keyword){
        console.log(User_API_BASE_URL+"/manager/userSearch/"+keyword+"/"+searchType);
        return axios.get(User_API_BASE_URL+"/manager/userSearch/"+keyword+"/"+searchType);
    }
    //상품등록
    insertProduct(product){
        console.log(product);
        return axios.post(User_API_BASE_URL+'/manager/productInsert' ,product);
        //return axios.post(User_API_BASE_URL+'/manager/productInserttest' ,product);
    }
    //이미지 업로드
    uploadFile(FormData){
        console.log("uploadFile 접근");
        console.log(FormData);
        return axios.post(User_API_BASE_URL+'/manager/upload',FormData);
    }
    //상품페이지개수
    productCount(){
        return axios.get(User_API_BASE_URL+'/manager/productCount');
    }
    //상품목록
    /*
    getProductList(pageNum){
        console.log('getProductList 접근');
        return axios.get(User_API_BASE_URL+"/manager/productList/"+pageNum);
    }*/
   
    //상품검색
    seachProductList(product_title){
        return axios.get(User_API_BASE_URL+'/manager/seach/' + product_title);
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
    //상품업데이트
    productUpdate(products){
        console.log("productUpdate 접근");  
        console.log(products);
        return axios.put(User_API_BASE_URL+"/manager/productUpdate", products);
    }
    //상품리스트
    /*getProductList(){
        return axios.get(User_API_BASE_URL+"/manager/productList");
    }*/
    getProductList(pageNum){
        console.log('getProductList 접근');
        return axios.get(User_API_BASE_URL+"/manager/productList/"+pageNum);
    }
    //상품삭제
    productDelete(productID){
        return axios.delete(User_API_BASE_URL+"/manager/productDelect/"+productID);
    }
    //유저현황
    UserState(){
        return axios.get(User_API_BASE_URL+"/manager/userState");
    }
    
}


export default new ApiService();