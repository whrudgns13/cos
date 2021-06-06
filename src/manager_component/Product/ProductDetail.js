import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService';
import '../managerCss/productDetail.css';
function ProductDetail(props) {
    const [product,setProduct] = useState({product:[]});
    const imgUrl = "/imgs/";

    
    useEffect(()=>{
        getProductDetail()
    },[])
   
    function getProductDetail(){
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
        .then( res => {
            setProduct({
                product : res.data
            })
        })
        .catch(err => {
            console.log('getProductDetail() Error!', err);
        })
        
    }
    
    return (
        <>
        <h1>상세 보기</h1>
        <div className="detail_wapper">
            <img className="detail_img" src={imgUrl+product.product.product_img}></img>
            <div className="detail_category">
                <div className="detail_title">
                    <label>{product.product.product_title}</label>
                </div>
                <div className="detail_price">
                    <label>{product.product.product_price}원</label>
                </div>
                <div className="detail_box">
                    <p style={{marginBottom:'10px'}}>COLOR</p>
                    <div className="detail_box_name">
                        <div style={{backgroundColor:"green", width:'20px',height:'20px'}}></div>
                        <label style={{marginLeft:"10px"}}>{product.product.product_color}</label>
                    </div>
                </div>
                <div className="detail_box">
                    <p style={{marginBottom:'10px'}}>SIZE</p>
                    <div className="detail_box_name">
                    <label >{product.product.product_size}</label>
                    </div>
                </div>
                <div className="detail_box_row">
                    <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 재고</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{product.product.product_stock}</label>
                        </div>
                    </div>
                    <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 판매량</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{product.product.product_saled}</label>
                        </div>
                    </div>
                </div>
                <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 등록일</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{product.product.product_date}</label>
                        </div>
                </div>
                <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 내용</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{product.product.product_content}</label>
                        </div>
                        <button onClick={()=>console.log(product)}> 출력</button>
                </div>
            </div>
        </div>

            </>
    )
}

export default ProductDetail
