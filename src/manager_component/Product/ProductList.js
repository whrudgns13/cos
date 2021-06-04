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
                            <TableCell alingn="right">상품성별</TableCell>
                            <TableCell alingn="right">상품가격</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.product.map(product =>
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th" scope="board"> {product.product_id} </TableCell>
                                <TableCell alingn="right"><img style={imgStyle} src={imgUrl+product.imgs[0]}></img></TableCell>
                                <TableCell alingn="right"><button style={{border:'none', backgroundColor:'#FFFFFF'}} 
                                onClick={()=>{returnProductDetail(product.product_seq)}}>{product.product_title}</button></TableCell>
                                <TableCell alingn="right">{product.product_gender}</TableCell>
                                <TableCell alingn="right">{product.product_price}</TableCell> 
                                
                            </TableRow>
                           )}
                    </TableBody>
                </Table>
                <button onClick={()=>console.log(products)}></button>
        </>
    )
}

export default ProductList
