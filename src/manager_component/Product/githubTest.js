import React, {useState,useEffect} from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
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

function githubTest() {
    const [gitTest,setGitTest] = useState([1,2,3,4,5,6,7,8,9])
    
    return (
        <>
            <h1>상품등록</h1>
             <div className="img-category">
                    <div className="priview_grid">
                        <input multiple="multiple" name="product_img" type='file' onChange={onImg}/>
                        <div className="priview_img" >
                            <img className="priview" src={imgPriView}/>
                        </div>
                    </div>
                <div className="displaybox">
                    <div className="title_box">
                        <label className="titleLabel">상품제목</label>
                        <input className="product_title" name="product_title"
                        type="text" placeholder="상품제목" onChange={onTitle}></input>
                    </div>
                    <div className="select-box">
                        <div className="select-box-div">
                            <label className="selectLabel">성별</label>
                            <select className="select_category" onChange={selectGender} defaultValue="남자">
                                <option value="남자">남자</option>
                                <option value="여자">여자</option>
                            </select>

                            <label className="selectLabel">카테고리</label>
                            <select className="select_category" onChange={selectCategory} defaultValue="상의">
                                <option value="상의">상의</option>
                                <option value="하의">하의</option>
                                <option value="치마">치마</option>
                                <option value="악세사리">악세사리</option>
                                <option value="신발">신발</option>
                            </select>
                        </div>
                    </div>
            
                    <div className="product_price_stock">
                        <div style={{padding:10, paddingLeft:0}}>
                            <label className="selectLabel">상품가격</label>
                            <input className="product_price" name="product_price"
                            type="text" placeholder="상품가격" onChange={onPrice}></input>
                        </div>
                    </div>
                    <div className="content_box">
                        <label className="selectLabel">상품설명</label>
                        <textarea type="text" name="product_content" className="product_content" 
                        placeholder="상품설명" onChange={onContent}></textarea>
                    </div>
                    <TableCell align="left">
                        <Input onChange={onMaterial} style={{textAlign:'left'}}></Input>
                    </TableCell>
                </div>
            </div>
            <button type="button" onClick={optionPage}>옵션 설정</button>
            
        </>
    )
    }
export default githubTest
