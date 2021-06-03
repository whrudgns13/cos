import React, {useState,useEffect} from 'react';
import '../managerCss/productinsert.css'
import AxiosApiService from '../../AxiosApiService';
import {useHistory} from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Input } from '@material-ui/core';

import '../managerCss/managerInsertOption.css';

function ProductInsert() {
    const [product,setProduct] = useState({product:[]}); //받아온 상품
    const [product_color,setProduct_color]= useState([]);           //상품컬러
    const [product_size,setProduct_size]= useState([]);             //상품사이즈
    const [product_stock,setProduct_stock]= useState([]);           //상품재고
    const [tableAdd,setTableAdd] =useState([1,]);
    const history = useHistory();
    const [productOptions, setProductOptions] = useState({productOption:[]});
    function onSize(e){
        setProduct_size(product_size.concat({productSize:e.currentTarget.value}));
    }

    function onColor(e){
        setProduct_color(product_color.concat({productColor:e.currentTarget.value}));
        
        console.log(product_size);
    }
    function onStock(e){
        const stock = parseInt(e.currentTarget.value);
        setProduct_stock(product_stock.concat({productStock:stock}));
        
        console.log(product_size);
        console.log(product_color);
    }
    
    useEffect(()=>{
        console.log("getProduct 실행");
        getProduct();
    },[])

    function getProduct(){
        const products = window.localStorage.getItem('product');
        console.log(products);
        setProduct({
            product: JSON.parse(products)
        })
    }
    function concat(){
        setProductOptions(
            productOptions.concat({
            productOption:product_color,product_size,product_stock
        })
        );

    }
    function saveProduceOption(e){
        e.preventDefault();
        //사용자가 입력한 값들을 객체에 담음
        let productOption = {
            product_title : product.product.product_title,
            product_gender : product.product.product_gender,
            product_category : product.product.product_category,
            product_price : product.product.product_price,
            product_content : product.product.product_content,
            product_img: product.product.product_img,
            product_size : product_size,
            product_color : product_color,
            product_stock: product_stock
        }
        
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertProduct(productOption)
            .then( res => {
                //history.push('/manager'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveProducet() 에러', err);
            });
        }
        
        function tablePlus(){
            setTableAdd(tableAdd.concat('puls'));
        }

    return (
        <>
            <h1>상품 옵션</h1>
                <div className="product_selectOption">
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <caption>행 추가<button onClick={tablePlus}>+</button></caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>상품제목</TableCell>
                                            <TableCell align="left">상품사이즈</TableCell>
                                            <TableCell align="left">상품컬러</TableCell>
                                            <TableCell align="left">상품개수</TableCell>
                                        </TableRow>
                                    </TableHead>
                                <TableBody>
                                {tableAdd.map(productRow =>
                                    <TableRow key={productRow}>
                                    <TableCell align="left">{product.product.product_title}</TableCell>
                                    <TableCell align="left">
                                        <Select name="size" onChange={onSize}>
                                            <option name="XS" value="XS" >XS</option >
                                            <option name="S" value="S">S</option >
                                            <option name="M" value="M">M</option >
                                            <option name="L" value="L">L</option >
                                            <option name="XL" value="XL">XL</option >
                                        </Select>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Select onChange={onColor}>
                                                <option value="BLACK">BLACK</option >
                                                <option value="WHITE">WHITE</option >
                                                <option value="BLUE">BLUE</option >
                                                <option value="GRAY">GRAY</option >
                                                <option value="YELLOW">YELLOW</option >
                                            </Select>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Input onBlur={onStock} style={{textAlign:'left'}}></Input>
                                        </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                        <button onClick={saveProduceOption}className="signUp-butten" >submit</button>
                        <button onClick={concat}className="signUp-butten" >s</button>
                <button onClick={()=>console.log(product,product_size,product_color,product_stock,productOptions)}className="signUp-butten" >등록</button>
        </>
    )
}

export default ProductInsert
