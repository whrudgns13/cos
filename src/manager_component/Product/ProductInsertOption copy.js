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

function ProductInsert({saveImg}) {
    const [product,setProduct] = useState({product:[]}); //받아온 상품
    const [product_color,setProduct_color]= useState();           //상품컬러
    const [product_size,setProduct_size]= useState([]);             //상품사이즈
    const [product_stock,setProduct_stock]= useState(0);           //상품재고
    const [tableAdd,setTableAdd] =useState({productRow:[1,2,3,4,5,6,7]});
    const history = useHistory();

    function selectSize(e){
        e.target.checked?setProduct_size(product_size.concat(e.currentTarget.value)):setProduct_size('');
    }
    function selectColor(e){
        e.target.checked?setProduct_color(e.currentTarget.value):setProduct_color('');
    }
    function onStock(e){
        setProduct_stock(e.currentTarget.value);
        console.log(product_size);
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
            setTableAdd([...tableAdd, newTable]);
        }*/

    return (
        <>
            <h1>상품 옵션</h1>
                <div className="check-box-div">
                            <div className="productDetail_ChkBox">
                                <label className="selectLabel">사이즈</label>
                                    <div>
                                        <input className="size_check" type="checkbox" value='XS' onChange={selectSize}/>
                                        <label className="size_label">XS</label>
                                        <input className="size_check" onChange={selectSize} type="checkbox" value='S'/>
                                        <label className="size_label">S</label>
                                        <input className="size_check" onChange={selectSize} type="checkbox" value='M'/>
                                        <label className="size_label">M</label>
                                        <input className="size_check" onChange={selectSize} type="checkbox" value='L'/>
                                        <label className="size_label">L</label>
                                        <input className="size_check" onChange={selectSize} type="checkbox" value='XL'/>
                                        <label className="size_label">XL</label>
                                    </div>
                            </div>
                            <div className="productDetail_color">
                            <label className="selectLabel">색상</label>
                            
                            </div>
                        </div>
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
                                        <Select >
                                            <MenuItem value="XS">XS</MenuItem >
                                            <MenuItem value="S">S</MenuItem >
                                            <MenuItem value="M">M</MenuItem >
                                            <MenuItem value="L">L</MenuItem >
                                            <MenuItem value="XL">XL</MenuItem >
                                        </Select>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Select >
                                                <MenuItem value="BLACK">BLACK</MenuItem >
                                                <MenuItem value="WHITE">WHITE</MenuItem >
                                                <MenuItem value="BLUE">BLUE</MenuItem >
                                                <MenuItem value="GRAY">GRAY</MenuItem >
                                                <MenuItem value="YELLOW">YELLOW</MenuItem >
                                            </Select>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Input style={{textAlign:'left'}}></Input>
                                        </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                    <div className="product_price_stock">
                        <div style={{padding:10, paddingLeft:0}}>
                            <label className="selectLabel">상품수량</label>
                            <input className="product_stock" name="product_stock"
                            type="text" placeholder="상품수량" onChange={onStock}></input>
                        </div>
                    </div>
                    
                <button className="signUp-butten" >등록</button>
        </>
    )
}

export default ProductInsert
