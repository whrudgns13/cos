import React, { useState, useEffect } from 'react';
import '../managerCss/productinsert.css'
import AxiosApiService from '../../AxiosApiService';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import InsertOptionComponent from './component/InsertOptionComponent'
import { Input } from '@material-ui/core';

import '../managerCss/managerInsertOption.css';

function ProductInsert() {
    const [product, setProduct] = useState({ product: [] });            //받아온 상품
    const [productOptions, setProductOptions] = useState([]);
    const history = useHistory();
    const [products, setProducts] = useState({ product: [] });

    const onSize = (e, index) => {
        //setProduct_size(product_size.concat(e.currentTarget.value)); 
        let size = productOptions;
        size[index].product_size = e.currentTarget.value;
        setProductOptions(size);
    }

    const onColor = (e, index) => {
        let color = productOptions;
        color[index].product_color = e.currentTarget.value;
        setProductOptions(color);
    }
    const onStock = (e, index) => {
        let stock = productOptions;
        stock[index].product_stock = e.currentTarget.value;
        setProductOptions(stock);
    }

    useEffect(() => {
        console.log("getProduct 실행");
        getProduct();
    }, [])
    //랜더링시 로컬스토리지에 있는 객체를 가져옴(로컬에있는 객체를 가져올시 json으로 형변환)  
    function getProduct() {
        const products = window.localStorage.getItem('product');
        console.log(products);
        setProduct({
            product: JSON.parse(products)
        })
    }

    function saveProduceOption(e) {
        e.preventDefault();
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertProduct(productOptions)
            .then(res => {
                history.push('/manager'); //입력성공시 이동
                //로컬스토리지에 있는 데이터 삭제
                window.localStorage.removeItem('product');
            })
            .catch(err => {
                console.log('saveProducet() 에러', err);
            });
    }

    //테이블 행 추가삭제
    function tablePlus() {
        setProductOptions(productOptions.concat(
            [{
                product_title: product.product.product_title,
                product_gender: product.product.product_gender,
                product_category: product.product.product_category,
                product_price: product.product.product_price,
                product_content: product.product.product_content,
                product_img: product.product.product_img,
                product_material: product.product.product_material,
                product_size: '',
                product_color: '',
                product_stock: '',
            }]
        ))
    }
    function tableMinus() {
        setProductOptions(productOptions.splice(1));
    }
    return (
        <>
            <h1>상품 옵션</h1>
            <InsertOptionComponent
                product={product}
                productOptions={productOptions}
                tablePlus={tablePlus}
                tableMinus={tableMinus}
                onSize={onSize}
                onColor={onColor}
                onStock={onStock}
            />
            <div className="product_selectOption">
                <TableContainer component={Paper}>
                    <Table aria-label="caption table">
                        <caption>행 추가<button onClick={tablePlus}>+</button> 행 삭제<button onClick={tableMinus}>-</button></caption>
                        <TableHead>
                            <TableRow>
                                <TableCell>상품제목</TableCell>
                                <TableCell align="left">상품사이즈</TableCell>
                                <TableCell align="left">상품컬러</TableCell>
                                <TableCell align="left">상품개수</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productOptions.map((productRow, index) =>
                                <TableRow>
                                    <TableCell align="left">{product.product.product_title}</TableCell>
                                    <TableCell align="left">
                                        <Select name="size" onChange={(e) => onSize(e, index)}>
                                            <option name="XS" value="XS" >XS</option >
                                            <option name="S" value="S">S</option >
                                            <option name="M" value="M">M</option >
                                            <option name="L" value="L">L</option >
                                            <option name="XL" value="XL">XL</option >
                                        </Select>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Select onChange={(e) => onColor(e, index)}>
                                            <option value="BLACK">BLACK</option >
                                            <option value="WHITE">WHITE</option >
                                            <option value="BLUE">BLUE</option >
                                            <option value="GRAY">GRAY</option >
                                            <option value="YELLOW">YELLOW</option >
                                        </Select>
                                    </TableCell>

                                    <TableCell align="left">
                                        <Input onChange={(e) => onStock(e, index)} style={{ textAlign: 'left' }}></Input>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <button onClick={saveProduceOption} className="productInsertSubmit" >상품 등록</button>
            <button onClick={() => console.log(productOptions)} className="signUp-butten" >출력</button>
        </>
    )
}

export default ProductInsert
