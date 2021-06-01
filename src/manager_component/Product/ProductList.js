import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useHistory} from "react-router-dom";

function ProductList({productDetailOpen}) {
    const[products,setProducts] = useState({product:[]});
    const imgUrl = "/imgs/";
    const history = useHistory();

    useEffect(()=>{
        getProductList()
    },[])
    
    function getProductList(){
        AxiosApiService.getProductList()
        .then( res => {
            setProducts({
                product : res.data
            })
        })
        .catch(err => {
            console.log('getProductList() Error!', err);
        })
        console.log(products);
    }

    function returnProductDetail(seq){
        window.localStorage.setItem("product_seq",seq);
        productDetailOpen()
    }

    const imgStyle ={
        width: '100px',
        height: '100px',
        objectFit:'cover'
    };
    return (
        <>
            <h1>상품목록</h1>
            <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell alingn="right">상품번호</TableCell>
                            <TableCell alingn="right">상품이미지</TableCell>
                            <TableCell alingn="right">상품제목</TableCell>
                            
                            <TableCell alingn="right">상품가격</TableCell>
                            <TableCell alingn="right">상품재고</TableCell>
                            <TableCell alingn="right">상품판매량</TableCell>
                            <TableCell alingn="right">상품등록일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.product.map(product =>
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th" scope="board"> {product.product_seq} </TableCell>
                                <TableCell alingn="right"><img style={imgStyle} src={imgUrl+product.product_img}></img></TableCell>
                                <TableCell alingn="right"><button style={{border:'none', backgroundColor:'#FFFFFF'}} 
                                onClick={()=>{returnProductDetail(product.product_seq)}}>{product.product_title}</button></TableCell>
                                <TableCell alingn="right">{product.product_price}</TableCell> 
                                <TableCell alingn="right">{product.product_stock}</TableCell>
                                <TableCell alingn="right">{product.product_saled}</TableCell>
                                <TableCell alingn="right">{product.product_date}</TableCell>
                            </TableRow>
                           )}
                    </TableBody>
                </Table>
        </>
    )
}

export default ProductList
