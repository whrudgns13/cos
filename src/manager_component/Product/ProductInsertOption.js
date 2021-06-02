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
    const [product_color,setProduct_color]= useState();           //상품컬러
    const [product_size,setProduct_size]= useState();             //상품사이즈
    const [product_stock,setProduct_stock]= useState(0);           //상품재고
    const [tableAdd,setTableAdd] =useState({productRow:[1,2,3,4,5,6,7]});
    const history = useHistory();

    function onSize(e){
        setProduct_size(e.currentTarget.value);
    }
    function onColor(e){
        setProduct_color(e.currentTarget.value);
        console.log(product_size);
    }
    function onStock(e){
        setProduct_stock(e.currentTarget.value);
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
    function saveProduceOption(e){
        e.preventDefault();
        //사용자가 입력한 값들을 객체에 담음
        let productOption = {
            product_size : product_size,
            product_color : product_color,
            product_stock: product_stock,
        }
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertProduct(productOption)
            .then( res => {
                history.push('/manager'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveProducet() 에러', err);
            });
        }
        /*
        function tablePlus(){
            setProduct_size(product_size.concat(e.currentTarget.value))   
            setTableAdd(tableAdd.concat('puls')]);
        }*/

    return (
        <>
            <h1>상품 옵션</h1>
                <div className="product_selectOption">
                        <TableContainer component={Paper}>
                            <Table aria-label="caption table">
                                <caption>더 필요하면 여길 누르세요 <button>+</button></caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>상품제목</TableCell>
                                            <TableCell align="left">상품사이즈</TableCell>
                                            <TableCell align="left">상품컬러</TableCell>
                                            <TableCell align="left">상품개수</TableCell>
                                        </TableRow>
                                    </TableHead>
                                <TableBody>
                                {tableAdd.productRow.map(productRow =>
                                    <TableRow key={productRow}>
                                    <TableCell align="left">{product.product.product_title}</TableCell>
                                    <TableCell align="left">
                                        <Select onChange={onSize}>
                                            <option value="XS" >XS</option >
                                            <option value="S">S</option >
                                            <option value="M">M</option >
                                            <option value="L">L</option >
                                            <option value="XL">XL</option >
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
                                            <Input onChange={onStock} style={{textAlign:'left'}}></Input>
                                        </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                    
                <button className="signUp-butten" >등록</button>
        </>
    )
}

export default ProductInsert
