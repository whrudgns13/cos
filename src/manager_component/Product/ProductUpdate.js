import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService';
import '../managerCss/productDetail.css';
import '../managerCss/productUpdate.css';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';

function ProductUpdate(props) {

    const [products,setProducts] = useState([0]);
    const imgUrl = "/imgs/";
    const [productImg,setProductImg] = useState({img:[]});
    const history = useHistory();
    
    useEffect(()=>{
        getProductDetail();
    },[])

    function onTitle(e){
        let title = products;
        title.map(product=>{
            product.product_title = e.currentTarget.value;
        })
        setProducts(title);
    }
    function selectGender(e){
        let gender = products;
        gender.map(product=>{
            product.product_gender = e.currentTarget.value;
        })
        setProducts(gender);
    }
    function selectCategory(e){
        let category = products;
        category.map(product=>{
            product.product_category = e.currentTarget.value;
        })
        setProducts(category);
    }
   function onPrice(e){
        let price = products;
        price.map(product=>{
            product.product_price = parseInt(e.currentTarget.value);
        })
        setProducts(price);
    }
    const onContent= (e)=>{
        let content = products;
        content.map(product=>{
            product.product_content = e.currentTarget.value;
        })
        setProducts(content);
    }
    const onMaterial = (e)=>{
        let material = products;
        material.map(product=>{
            product.product_material = e.currentTarget.value;
        })
        setProducts(material);
    }
    const onSize = (e,index)=>{
        let size = products;
        size[index].product_size = e.currentTarget.value;
        setProducts(size);
    }
    const onColor = (e,index)=>{
        let color = products;
        color[index].product_color = e.currentTarget.value;
        setProducts(color);
    }
    const onStock = (e,index)=>{
        let stock = products;
        stock[index].product_stock = parseInt(e.currentTarget.value);
        setProducts(stock);
    }
    
    function getProductDetail(){
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
        .then( res => {
            let productList = res.data;
            setProductImg({img:res.data[0].product_img.split(",")});
            setProducts(productList);
            console.log(products);
        })
        .catch(err => {
            console.log('getProductDetail() Error!', err);
        })
    }

    const productUpdate=()=>{
        AxiosApiService.productUpdate(products)
        .then( res => {
            history.push('/manager');
            window.localStorage.removeItem('product_seq');
        })
        .catch(err => {
            console.log('Update() Error!', err);
        })
    }

    const productDelete =()=>{
        AxiosApiService.productDelete(products[0].product_id)
        .then( res => {
            history.push('/manager');
        })
        .catch(err => {
            console.log('productDelete() Error!', err);
        })
    }

    return (
        <>
        <button onClick={()=>console.log(products)}/>
        <h1>상품 수정</h1>
        <div className="detail_wapper">
        <div className="detail_img_box">
            {productImg.img.map((imgs) =>
                <img className="detail_img" src={imgUrl+imgs}/>
            )}
            </div>
            <div className="detail_category">
                <div className="product_update_catagoryBox">
                <label className="product_update_label">상품 제목</label>
                    <input className="product_update_input" onChange={onTitle} placeholder={products[0].product_title}/> 
                </div>

                <div className="product_update_catagoryBox">
                <label className="product_update_label">상품가격</label>
                    <input className="product_update_input" onChange={onPrice} placeholder={products[0].product_price}/> 
                </div>

                <div className="product_update_catagoryBox">
                <label className="product_update_label">상품재질</label>
                    <input className="product_update_input" onChange={onMaterial} placeholder={products[0].product_material}/> 
                </div>

                <div className="product_update_rowBox">
                    <div className="product_update_genderCategory">
                        <p style={{marginBottom:'10px',fontWeight:'600'}}>성별</p>
                        <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                            <select className='genderCategory_selectbox' onChange={selectGender} >
                                <option value="MAN">MAN</option >
                                <option value="WOMAN">WOMAN</option >
                                <option value="KID">KID</option>
                            </select>
                        </div>
                    </div>

                    <div className="product_update_genderCategory">
                        <p style={{marginBottom:'10px',fontWeight:'600'}}>종류</p>
                        <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                            <select className='genderCategory_selectbox' onChange={selectCategory} >
                                <option value="상의">상의</option >
                                <option value="하의">하의</option >
                                <option value="치마">치마</option >
                                <option value="악세사리">악세사리</option >
                                <option value="신발">신발</option >
                            </select>
                        </div>
                    </div>
                </div>
                <div className="product_update_catagoryBox">
                    <p style={{marginBottom:'10px',fontWeight:'600'}}>색상</p>
                    <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                        {products.map((product,index) =>
                                 <select className='update_selectbox' onChange={(e)=>onColor(e,index)} >
                                            <option value="BLACK">BLACK</option >
                                            <option value="WHITE">WHITE</option >
                                            <option value="BLUE">BLUE</option >
                                            <option value="GRAY">GRAY</option >
                                            <option value="YELLOW">YELLOW</option >
                                </select>
                        )}
                    </div>
                </div>
                <div className="product_update_catagoryBox">
                    <p style={{marginBottom:'10px',fontWeight:'600'}}>사이즈</p>
                    <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                    {products.map((product,index) =>
                        <select className='update_selectbox'onChange={(e)=>onSize(e,index)}>
                            <option value="XS">XS</option >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    )}
                    </div>
                </div>
                    <div className="product_update_catagoryBox">
                    <p style={{marginBottom:'10px',fontWeight:'600'}}>상품 재고</p>
                        <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                            {products.map((product,index) =>
                                <input className="product_update_stock" onChange={(e)=>onStock(e,index)} placeholder={product.product_stock}/> 
                            )}
                        </div>
                    </div>
                <p style={{marginBottom:'10px',fontWeight:'600'}}>상품 내용</p>
                <div className="product_content_scroll">
                   <textarea className="product_update_textarea" onChange={onContent} placeholder={products[0].product_content}/> 
                </div>
                <div className="update_button">
                    <button onClick={productUpdate}>상품 수정</button> 
                    <button onClick={productDelete}>상품 삭제하기</button>
                </div>
            </div>
        </div>

            </>
    )
}

export default ProductUpdate
