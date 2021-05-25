import React, { useState } from "react";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import IconButton from "@material-ui/core/IconButton";
import AxiosApiService from "../AxiosApiService";
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom'
function SeachCart(props) {
    const [Keyword,setKeyword] = useState('');
    
    
    function onChangeSearch(e){
        setKeyword(e.currentTarget.value);
    }

    function search(){
    AxiosApiService.seachList(Keyword)
            .then( res => {
                console.log(Keyword);
                props.history.push('/search'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('search() 에러', err);
            });
    }

    return (
        <div className="right_menu">
        <input type="text" placeholder="검색하기" onChange={onChangeSearch}></input>
            <IconButton className="menuButton" onCilck={search}>
                <SearchOutlinedIcon/>
            </IconButton>
        <IconButton className="menuButton">
            <ShoppingCartOutlinedIcon/>
        </IconButton>
        <Link to='/signUp'>
        <PersonIcon/>
        </Link>
        </div>
    )
}

export default SeachCart
