import React, {useState,useEffect} from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import '../managerCss/productinsert.css'
import AxiosApiService from '../../AxiosApiService';

function ProductInsert(props) {
    const [product_title,setProduct_title]= useState('');           //제목
    const [product_gender,setProduct_gender]= useState('남자');         //상품성별
    const [product_category,setProduct_category]= useState('상의');     //상품카테고리
    const [product_price,setProduct_price]= useState();             //상품가격
    const [product_color,setProduct_color]= useState('red');           //상품컬러
    const [product_size,setProduct_size]= useState('xs');             //상품사이즈
    const [product_stock,setProduct_stock]= useState();           //상품재고
    const [product_content,setProduct_content]= useState('');       //상품내용
    const [imgPriView, setImgPriView] = useState([]); 
    const [imgStr, setImgStr] = useState("");               
    const [product_img,setProduct_img]= useState();             //상품이미지
    
    function onTitle(e){
        setProduct_title(e.currentTarget.value);
    }
    function selectGender(e){
        setProduct_gender(e.currentTarget.value);
    }
    function selectCategory(e){
        setProduct_category(e.currentTarget.value);
    }
    function selectSize(e){
        setProduct_size(e.currentTarget.value);
    }
    function selectColor(e){
        setProduct_color(e.currentTarget.value);
    }
    function onPrice(e){
        setProduct_price(e.currentTarget.value);
    }
    function onStock(e){
        setProduct_stock(e.currentTarget.value);
    }
    function onContent(e){
        setProduct_content(e.currentTarget.value);
        console.log(product_img);
        console.log(imgPriView);
        console.log(imgStr);
    }
    useEffect(()=>{
        console.log(imgStr);
    })
    function onImg(e){
        setProduct_img(e.target.files);
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setImgPriView(imageUrl); //이미지 주소
        imgStr.indexOf(imageFile.name)?setImgStr(imgStr+imageFile.name+","):console.log("같은 이름 있음");
        }
        
         
        
        /*
        const formData = new FormData();
        for(let i =0; i<imageFile.length; i++){
            formData.append("file",imageFile[i]);
            console.log("file",imageFile[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        AxiosApiService.uploadFile(formData,config);
    }
    /*
    function imgLoop(){
        for(let i =0; i<product_img.length;i++){
            setImgStr(product_img[i].name)
        }
    }*/

    
    function saveImg(){
        const formData = new FormData();
        for(let i =0; i<product_img.length;i++){
            formData.append("file",product_img[i]);
            console.log("file",product_img[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        AxiosApiService.uploadFile(formData,config);
    }
    

    function saveProduce(e){
        e.preventDefault();
        saveImg();
       //사용자가 입력한 값들을 객체에 담음
        let product = {
            product_title : product_title,
            product_gender: product_gender,
            product_size : product_size,
            product_color : product_color,
            product_price: product_price,
            product_stock: product_stock,
            product_content: product_content,
            product_category: product_category,
            product_img:imgStr.slice(0,-1)
        }
        console.log(product);
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertProduct(product)
            .then( res => {
                props.history.push('/manager'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveProducet() 에러', err);
            });
        
        }
    /*const onClick = async () => {
        const formData = new FormData();
        formData.append('file', img);
        // 서버의 upload API 호출
        const res = await axios.post("/api/upload", formData);
        console.log(res);
      }*/

    return (
        <div className="manager-content">
            <h1>상품등록</h1>
            <input className="product_title" name="product_title"
             type="text" placeholder="상품제목" onChange={onTitle}></input>
            
             <div className="img-category">
                <div className="priview_grid">
                <input multiple="multiple" name="product_img" type='file' onChange={onImg}/>
                <div className="priview_img" >
                <img className="priview" src={imgPriView}/>
                
                </div>
            </div>
                <div className="displaybox">
                <div className="select-box">
                    <div className="select-box-div">
                    <label className="selectLabel">성별</label>
                        <select className="select_category" onChange={selectGender} defaultValue="남자">
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                        <label className="selectLabel">카테고리</label>
                        <select className="select_category" onChange={selectCategory} defaultValue="상의">
                            <option value="상의">상의</option>
                            <option value="하의">하의</option>
                            <option value="치마">치마</option>
                            <option value="악세사리">악세사리</option>
                            <option value="신발">신발</option>
                        </select>
                    </div>

             <div className="select-box-div">
             <label className="selectLabel">사이즈</label>
             <select className="select_category" style={{marginRight:50}} onChange={selectSize} defaultValue="xs">
                 <option value="xs">XS</option>
                 <option value="s">S</option>
                 <option value="m">M</option>
                 <option value="l">L</option>
             </select>

             <label className="selectLabel">색상</label>
             <select className="select_category" onChange={selectColor} defaultValue="red">
                 <option value="red">RED</option>
                 <option value="orange">orange</option>
                 <option value="yellow">yellow</option>
                 <option value="green">green</option>
             </select>
             </div>

             </div>
            
            <div className="product_price_stock">
            <div style={{padding:10, paddingLeft:0}}>
            <label className="selectLabel">상품가격</label>
            <input className="product_price" name="product_price"
             type="text" placeholder="상품가격" onChange={onPrice}></input>
             </div>
             <div style={{padding:10, paddingLeft:0}}>
             <label className="selectLabel">상품수량</label>
            <input className="product_stock" name="product_stock"
             type="text" placeholder="상품수량" onChange={onStock}></input>
            </div>
            </div>
            <div className="content_box">
            <label className="selectLabel">상품설명</label>
            <textarea type="text" name="product_content" className="product_content" 
            placeholder="상품설명" onChange={onContent}></textarea>
            </div>
        </div>
        </div>
        
            <button className="signUp-butten" onClick={saveProduce}>등록</button>
        </div>
    )
}

export default ProductInsert
