import React, {useState} from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import '../managerCss/productinsert.css'
import AxiosApiService from '../../AxiosApiService';
function ProductInsert(props) {
    //const [user_email,setUser_email] = useState('');            //메일
    //const [user_password,setUser_password] = useState('');      //패스워드 
    const [product_title,setProduct_title]= useState('');
    const [product_gender,setProduct_gender]= useState('');
    const [product_size,setProduct_size]= useState('');
    const [product_color,setProduct_color]= useState('');
    const [product_price,setProduct_price]= useState();
    const [product_stock,setProduct_stock]= useState('');
    const [product_content,setProduct_content]= useState('');
    const [product_img,setProduct_img]= useState(null);
    


    function onTitle(e){
        setProduct_title(e.currentTarget.value);
    }
    function selectGender(e){
        setProduct_gender(e.currentTarget.value);
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
    }
    function onImg(e){
        setProduct_img(e.target.files[0]);
    }
    

    function saveProduce(e){
        e.preventDefault();
        
       //사용자가 입력한 값들을 객체에 담음
        let product = {
            product_title : product_title,
            product_gender: product_gender,
            product_size : product_size,
            product_color : product_color,
            product_price: product_price,
            product_stock: product_stock,
            product_content: product_content
        }
        console.log(product);
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertProduct(product)
            .then( res => {
                props.history.push('/manager'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveProduce() 에러', err);
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
             <div className="select-box">
                 <div className="select-box-child">
            <label className="selectLabel">성별</label>
             <NativeSelect style={{fontSize:'12px'}} onChange={selectGender}>
                 <option value="남자">남자</option>
                 <option value="여자">여자</option>
             </NativeSelect>
             </div>
             <div className="select-box-child">
             <label className="selectLabel">사이즈</label>
             <NativeSelect style={{fontSize:'12px'}} onChange={selectSize}>
                 <option value="xs">XS</option>
                 <option value="s">S</option>
                 <option value="m">M</option>
                 <option value="l">L</option>
             </NativeSelect>
             </div>

             <div className="select-box-child">
             <label className="selectLabel">색상</label>
             <NativeSelect style={{fontSize:'12px'}} onChange={selectColor}>
                 <option value="red">RED</option>
                 <option value="orange">orange</option>
                 <option value="yellow">yellow</option>
                 <option value="green">green</option>
             </NativeSelect>
             </div>
            </div>
            <div>
            <label className="price_label">상품가격</label>
            <input className="product_price" name="product_price"
             type="text" placeholder="상품가격" onChange={onPrice}></input>

             <label className="price_label">상품수량</label>
            <input className="product_stock" name="product_stock"
             type="text" placeholder="상품수량" onChange={onStock}></input>
            </div>
            <div className="img_content_box">
            <div className="img-priview"></div>
            <input type="text" name="product_content" className="product_content" 
            placeholder="상품설명" onChange={onContent}></input>
            </div>
            <div>
            <input name="product_img" type='file' onChange={onImg}/>
            </div>
            <button className="signUp-butten" onClick={saveProduce}>등록</button>
        </div>
    )
}

export default ProductInsert
