import React, { useState, useEffect } from 'react';
import AxiosApiService from '../../AxiosApiService';
import '../managerCss/productDetail.css';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
function ProductDetail({ productUpdateOptionOpen }) {
    const [products, setProducts] = useState({ product: [0] });
    const [productImg, setProductImg] = useState({ img: [] });
    const imgUrl = "/imgs/";
    const history = useHistory();

    useEffect(() => {
        getProductDetail()
    }, [])
    //상세보기 들어올시 먼저 실행
    function getProductDetail() {
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
            .then(res => {
                //백단에서 받은 이미지를 ,로 나눠 배열에 저장
                setProductImg({ img: res.data[0].product_img.split(",") });
                setProducts({
                    product: res.data
                })
            })
            .catch(err => {
                console.log('getProductDetail() Error!', err);
            })
    }
    //상품삭제
    const productDelete = () => {
        AxiosApiService.productDelete(products.product[0].product_id)
            .then(res => {
                history.push('/manager');
            })
            .catch(err => {
                console.log('productDelete() Error!', err);
            })
    }

    const sidebar = () => {
        return (
            <>
                <div className="priview_sidebar">
                    {productImg.img.map((imgs, index) =>
                        <img className="priview_sidebar_img" src={imgUrl + imgs} />
                    )}
                </div>
            </>
        )
    }
    return (
        <>
            <button onClick={() => console.log(products, productImg)}>1234</button>
            <h1>상세 보기</h1>
            <div className="detail_wapper">
                {sidebar()}
                <div className="detail_img_box">
                    <img className="detail_img" src={imgUrl + productImg.img[0]} />
                </div>
                <div className="detail_category">
                    <div className="detail_title">
                        <label>{products.product[0].product_title}</label>
                    </div>
                    <div className="detail_price">
                        <label>{products.product[0].product_price}원</label>
                    </div>
                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>COLOR</p>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.product.map(product =>
                                <div className="detail_box_name">
                                    <div style={{ backgroundColor: product.product_color, width: '20px', height: '20px' }}></div>
                                    <label style={{ marginLeft: "10px" }}>{product.product_color}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>SIZE</p>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.product.map(product =>
                                <div className="detail_box_name">
                                    <label >{product.product_size}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>상품 재고</p>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.product.map(product =>
                                <div className="detail_box_name">
                                    <label >{product.product_stock}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="detail_box_gender_category">
                        <div className="detail_box_low">
                            <p style={{ marginBottom: '10px' }}>상품 성별</p>
                            <div className="detail_box_low_label">
                                <label >{products.product[0].product_gender}</label>
                            </div>
                        </div>
                        <div className="detail_box_low">
                            <p style={{ marginBottom: '10px' }}>상품 종류</p>
                            <div className="detail_box_low_label">
                                <label >{products.product[0].product_category}</label>
                            </div>
                        </div>
                    </div>
                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>상품 판매량</p>
                        <div className="detail_box_name" style={{ width: '60%' }}>
                            <label >{products.product[0].product_saled}</label>
                        </div>
                    </div>

                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>상품 등록일</p>
                        <div className="detail_box_name" style={{ width: '60%' }}>
                            <label >{products.product[0].product_date}</label>
                        </div>
                    </div>
                    <div className="detail_box">
                        <p style={{ marginBottom: '10px' }}>상품 내용</p>
                        <div className="detail_box_name" style={{ width: '60%' }}>
                            <label >{products.product[0].product_content}</label>
                        </div>
                    </div>
                    <div className="detail_button">
                        <button onClick={() => productUpdateOptionOpen()}>상품 수정하기</button>
                        <button onClick={productDelete}>상품 삭제하기</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetail
