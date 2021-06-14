import React, { useState, useEffect, useRef } from 'react';
import AxiosApiService from '../../AxiosApiService';
import '../managerCss/productDetail.css';
import '../managerCss/productUpdate.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
function ProductUpdate(props) {

    const [products, setProducts] = useState([0]);
    const imgUrl = "/imgs/";
    const imageInput = useRef();
    const [productImg, setProductImg] = useState({ img: [0] });
    const history = useHistory();
    const [sidebarOpen, setsidebarOpen] = useState(true);

    useEffect(() => {
        getProductDetail();
    }, [])

    function onTitle(e) {
        let title = products;
        title.map(product => {
            product.product_title = e.currentTarget.value;
        })
        setProducts(title);
    }
    function selectGender(e) {
        let gender = products;
        gender.map(product => {
            product.product_gender = e.currentTarget.value;
        })
        setProducts(gender);
    }
    function selectCategory(e) {
        let category = products;
        category.map(product => {
            product.product_category = e.currentTarget.value;
        })
        setProducts(category);
    }
    function onPrice(e) {
        let price = products;
        price.map(product => {
            product.product_price = parseInt(e.currentTarget.value);
        })
        setProducts(price);
    }
    const onContent = (e) => {
        let content = products;
        content.map(product => {
            product.product_content = e.currentTarget.value;
        })
        setProducts(content);
    }
    const onMaterial = (e) => {
        let material = products;
        material.map(product => {
            product.product_material = e.currentTarget.value;
        })
        setProducts(material);
    }
    const onSize = (e, index) => {
        let size = products;
        size[index].product_size = e.currentTarget.value;
        setProducts(size);
    }
    const onColor = (e, index) => {
        let color = products;
        color[index].product_color = e.currentTarget.value;
        setProducts(color);
    }
    const onStock = (e, index) => {
        let stock = products;
        stock[index].product_stock = parseInt(e.currentTarget.value);
        setProducts(stock);
    }
    const sidebarIsOpen = () => {
        setsidebarOpen(true);
    }
    //로컬에 있는 값을 보내 그에 해당하는 값을 db에서 가져옴
    function getProductDetail() {
        AxiosApiService.getProductDetail(window.localStorage.getItem("product_seq"))
            .then(res => {
                let productList = res.data;
                //,기준으로 배열로 나눔
                setProductImg({ img: res.data[0].product_img.split(",") });
                setProducts(productList);
                console.log(products);
            })
            .catch(err => {
                console.log('getProductDetail() Error!', err);
            })
    }
    //상품 업데이트
    const productUpdate = () => {
        AxiosApiService.productUpdate(products)
            .then(res => {
                history.push('/manager');
                window.localStorage.removeItem('product_seq');
            })
            .catch(err => {
                console.log('Update() Error!', err);
            })
    }
    //상품삭제
    const productDelete = () => {
        AxiosApiService.productDelete(products[0].product_id)
            .then(res => {
                history.push('/manager');
            })
            .catch(err => {
                console.log('productDelete() Error!', err);
            })
    }
    const fileClick = () => {
        imageInput.current.click();
    }
    function onImg(e) {
        let prodimg = productImg;
        if (e.target.files.length > 0) {
            const imageFile = e.target.files[0];
            const imageUrl = URL.createObjectURL(imageFile);
            prodimg = prodimg.img.concat(imageFile.name);
            setProductImg({ img: prodimg });
            let imgStr = prodimg.join(',');
            let productCopy = products;
            productCopy.map((product, index) =>
                productCopy[index].product_img = imgStr
            )
            setProducts(productCopy);
        }
    }

    const ImgDelete = (e, index) => {
        console.log(index);
        //productImg를 복사
        let prodimg = productImg;
        //img의 0번부터 index값을 읽어 저장
        prodimg = prodimg.img.slice(0, index);
        console.log(productImg);
        //productImg.img에 할당
        setProductImg({ img: prodimg });

    }
    const sidebar = () => {
        return (
            <>
                <div className="priview_sidebar">
                    {productImg.img.map((imgs) =>
                        <img className="priview_sidebar_img" src={imgUrl + imgs} />
                    )}
                </div>
            </>
        )
    }
    function tablePlus() {
        setProducts(products.concat(
            [{
                product_title: products[0].product_title,
                product_gender: products[0].product_gender,
                product_category: products[0].product_category,
                product_price: products[0].product_price,
                product_content: products[0].product_content,
                product_img: products[0].product_img,
                product_material: products[0].product_material,
                product_size: '',
                product_color: '',
                product_stock: '',
            }]
        ))
    }
    const tableMinus = (index) => {
        setProducts(products.slice(0, index));
    }
    return (
        <>
            <button onClick={() => console.log(products, productImg.img)} />
            <h1>상품 수정</h1>
            <div className="detail_wapper">
                {sidebarIsOpen && sidebar()}
                <div className="detail_img_box">
                    {productImg.img.map((imgs, index) =>
                        <>
                            <button className="priview_button" onClick={(e) => ImgDelete(e, index)}><CancelIcon /></button>
                            <img className="detail_img" src={imgUrl + productImg.img[index]} />
                        </>
                    )}
                </div>
                <div className="detail_category">
                    <div className="product_update_catagoryBox">
                        <label className="product_update_label">상품 제목</label>
                        <input className="product_update_input" onChange={onTitle} placeholder={products[0].product_title} />
                    </div>

                    <div className="product_update_catagoryBox">
                        <label className="product_update_label">상품가격</label>
                        <input className="product_update_input" onChange={onPrice} placeholder={products[0].product_price} />
                    </div>

                    <div className="product_update_catagoryBox">
                        <label className="product_update_label">상품재질</label>
                        <input className="product_update_input" onChange={onMaterial} placeholder={products[0].product_material} />
                    </div>

                    <div className="product_update_rowBox">
                        <div className="product_update_genderCategory">
                            <p style={{ marginBottom: '10px', fontWeight: '600' }}>성별</p>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <select className='genderCategory_selectbox' onChange={selectGender} >
                                    <option value="MAN">MAN</option >
                                    <option value="WOMAN">WOMAN</option >
                                    <option value="KID">KID</option>
                                </select>
                            </div>
                        </div>

                        <div className="product_update_genderCategory">
                            <p style={{ marginBottom: '10px', fontWeight: '600' }}>종류</p>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
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
                    <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
                        <button className='optionPage' style={{ marginTop: '5px', width: '94%' }} onClick={tablePlus}>옵션추가</button>
                    </div>
                    <div className="product_update_catagoryBox">
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.map((product, index) =>
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <p style={{ marginBottom: '10px', fontWeight: '600', textAlign: 'left' }}>색상</p>
                                            <button className='optionPage' style={{ width: '40%', marginLeft: '5px', marginTop: '1px', height: '70%', fontSize: '5px' }}
                                                onClick={() => tableMinus(index)}>삭제</button>
                                        </div>
                                        <select className='update_selectbox' onChange={(e) => onColor(e, index)} >
                                            <option value="BLACK">BLACK</option >
                                            <option value="WHITE">WHITE</option >
                                            <option value="BLUE">BLUE</option >
                                            <option value="GRAY">GRAY</option >
                                            <option value="YELLOW">YELLOW</option >
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="product_update_catagoryBox">
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.map((product, index) =>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <p style={{ marginBottom: '10px', fontWeight: '600', textAlign: 'left' }}>사이즈</p>
                                    <select className='update_selectbox' onChange={(e) => onSize(e, index)}>
                                        <option value="XS">XS</option >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="product_update_catagoryBox">
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            {products.map((product, index) =>
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <p style={{ marginBottom: '10px', fontWeight: '600', textAlign: 'left' }}>재고</p>
                                    <input className="product_update_stock" onChange={(e) => onStock(e, index)} placeholder={product.product_stock} />
                                </div>
                            )}
                        </div>
                    </div>
                    <p style={{ marginBottom: '10px', fontWeight: '600' }}>상품 내용</p>
                    <div className="product_content_scroll">
                        <textarea className="product_update_textarea" onChange={onContent} placeholder={products[0].product_content} />
                    </div>
                    <input ref={imageInput} style={{ display: 'none' }} multiple="multiple" name="product_img" type='file' onChange={onImg} />
                    <button className='optionPage' style={{ width: '89%' }} type="button" onClick={fileClick}>이미지 올리기</button>
                    <button className='optionPage' style={{ width: '89%', marginTop: '10px' }} onClick={productUpdate}>상품 수정</button>
                    <button className='optionPage' style={{ width: '89%', marginTop: '10px' }} onClick={productDelete}>상품 삭제하기</button>

                </div>
            </div>

        </>
    )
}

export default ProductUpdate
