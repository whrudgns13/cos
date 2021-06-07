import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService';
import '../managerCss/productDetail.css';
import Button from '@material-ui/core/Button';
function ProductDetail({productUpdateOptionOpen}) {
const [products,setProducts] = useState({product:[0]});
    const imgUrl = "/imgs/";

    
    useEffect(()=>{
        getProductDetail()
        
    },[])
   
    function getProductDetail(){
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
        .then( res => {
            setProducts({
                product : res.data
            })
        })
        .catch(err => {
            console.log('getProductDetail() Error!', err);
        })
    }
    function productUpdate(){
        
    }
    return (
        <>
        <h1>상세 보기</h1>
        <div className="detail_wapper">
            <img className="detail_img" src={imgUrl+products.product[0].product_img}></img>
            <div className="detail_category">
                <div className="detail_title">
                    <label>{products.product[0].product_title}</label>
                </div>
                <div className="detail_price">
                    <label>{products.product[0].product_price}원</label>
                </div>
                <div className="detail_box">
                    <p style={{marginBottom:'10px'}}>COLOR</p>
                    <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                        {products.product.map(product =>
                            <div className="detail_box_name">
                                <div style={{backgroundColor:"green", width:'20px',height:'20px'}}></div>
                                <label style={{marginLeft:"10px"}}>{product.product_color}</label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="detail_box">
                    <p style={{marginBottom:'10px'}}>SIZE</p>
                    <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                    {products.product.map(product =>
                    <div className="detail_box_name">
                        <label >{product.product_size}</label>
                    </div>
                    )}
                    </div>
                </div>
                    <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 재고</p>
                        <div style={{display:'flex', flexDirection:'row',width:'100%'}}>
                        {products.product.map(product =>
                            <div className="detail_box_name">
                               <label >{product.product_stock}</label>
                            </div>
                        )}
                        </div>
                    <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 판매량</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{products.product[0].product_saled}</label>
                        </div>
                    </div>
                </div>
                <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 등록일</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{products.product[0].product_date}</label>
                        </div>
                </div>
                <div className="detail_box">
                        <p style={{marginBottom:'10px'}}>상품 내용</p>
                        <div className="detail_box_name" style={{ width:'60%'}}>
                        <label >{products.product[0].product_content}</label>
                        </div>
                </div>
                <div className="detail_button">
                    <Button variant="contained" onClick={()=>productUpdateOptionOpen()}>상품 수정하기</Button>
                     <Button variant="contained">상품 삭제하기</Button>
                </div>
            </div>
        </div>

            </>
    )
}

export default ProductDetail
