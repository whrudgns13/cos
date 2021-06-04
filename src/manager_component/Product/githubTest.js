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
    
    function onclick(){
        console.log(gitTest);
    }
    function onchange(e){
        e.target.value;
    }
    return (
        <>
        <input onChange={onchange}></input>
        <button onClick={onclick}>쿨릭시 콘솔찍음</button>       
        </>
    )
    }
export default githubTest
