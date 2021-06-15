import React, { useState, useEffect } from 'react';
import AxiosApiService from '../../AxiosApiService';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';

function ProductList({ productDetailOpen }) {
    const [products, setProducts] = useState({ product: [0] });
    const [product_title, setProduct_title] = useState('');
    const imgUrl = "/imgs/";
    const history = useHistory();
    const [pageNums, setPageNums] = useState(0);

    useEffect(() => {
        getProductCount();
        getProductList(0);
    }, [])

    
    function onChangeSearch(e) {
        setProduct_title(e.currentTarget.value);
        console.log(product_title);
    }
    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }
    //검색
    function search() {
        AxiosApiService.seachProductList(product_title)
            .then(res => {
                setProducts({
                    product: res.data
                })

            })
            .catch(err => {
                console.log('search() 에러', err);
            });
    }
    //상품페이지 개수
    function getProductCount() {
        AxiosApiService.productCount()
            .then(res => {
                setPageNums(res.data)
            })
            .catch(err => {
                console.log('getProductCount() Error!', err);
            })
    }
    const getProductList = (pageNum) => {
        console.log(pageNum);
        AxiosApiService.getProductList(pageNum)
            .then(res => {
                res.data.map((data, index) => {
                    //만약 res.data[index]에 product_img를 가져올때 문자열에 ,가 있으면 아래 로직 실행
                    if (res.data[index].product_img.includes(',')) {
                        console.log(res.data[index].product_img);
                        //product_img안에 ,가 몇번째에 있는지 저장
                        let idx = res.data[index].product_img.indexOf(',');
                        //product_img 문자열 0번째부터 ,를 기준으로 배열로 나눔
                        let productImg = res.data[index].product_img.slice(0, idx);
                        res.data[index].product_img = productImg;
                    }
                }
                )
                setProducts({
                    product: res.data
                })
                //페이지 맨위로 올림
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.log('getProductList() Error!', err);
            })
    }

    function returnProductDetail(seq) {
        //로컬스토리지 저장
        window.localStorage.setItem("product_seq", seq);
        console.log(seq);
        productDetailOpen()
    }
    const imgStyle = {
        width: '100px',
        height: '100px',
        objectFit: 'cover'
    };
    return (
        <>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div></div>
                <h1>상품목록</h1>
                <div style={{ height: '30px', width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Input type="text" placeholder="상품이름 검색" onChange={onChangeSearch} onKeyPress={onKeyPress} />
                    <IconButton className="menuButton" onClick={search}>
                        <SearchOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <Table style={{ marginTop: '30px' }}>
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
                        <TableRow style={{ height: '20%' }}>
                            <TableCell component="th" scope="board"> {product.product_id} </TableCell>
                            <TableCell alingn="right">
                                <img style={imgStyle}
                                    src={imgUrl + product.product_img}>

                                </img>
                            </TableCell>
                            <TableCell alingn="right"><button style={{ border: 'none', backgroundColor: '#FFFFFF' }}
                                onClick={() => { returnProductDetail(product.product_id) }}>{product.product_title}</button></TableCell>
                            <TableCell alingn="right">{product.product_gender}</TableCell>
                            <TableCell alingn="right">{product.product_price}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {[...new Array(pageNums)].map((page, index) =>
                    <div style={{ marginRight: '5px' }}>
                        <button style={{ border: 'none', padding: '5px', cursor: 'pointer' }} onClick={() => getProductList(index + 1)}>{index + 1}</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductList
