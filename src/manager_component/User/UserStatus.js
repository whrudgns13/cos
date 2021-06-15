import React, { useState, useEffect } from 'react';
import AxiosApiService from '../../AxiosApiService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Input from '@material-ui/core/Input';

function UserStatus({ openNoResult, openResult }) {
    //서버에서 받아올 유저 저장소
    const [users, setUsers] = useState({ user: [] });
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('user_name');
    const [pageNums, setPageNums] = useState(0);

    function onChangeSearch(e) {
        setKeyword(e.currentTarget.value);
    }
    function onSearchType(e) {
        setSearchType(e.currentTarget.value);
    }

    //새로고침시에만 실행
    useEffect(() => {
        getUserState(0);
        getUserLogCount();
    }, [])

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            search();
        }
    }
    //서버 유저목록 가져옴
    const getUserState = (pageNum)=> {
        AxiosApiService.UserState(pageNum)
            .then(res => {
                setUsers({ user: res.data });
            })
            .catch(err => {
                console.log('getUserState() Error!', err);
            })
    }
    
    function search() {
        console.log(searchType, keyword);
        AxiosApiService.userStateSeachList(searchType, keyword)
            .then(res => {
                const userCheck = {
                    user: res.data
                }
                setUsers({
                    user: res.data
                })
            })
            .catch(err => {
                console.log('search() 에러', err);
            });
    }

    function getUserLogCount() {
        AxiosApiService.getUserLogCount()
            .then(res => {
                setPageNums(res.data)
            })
            .catch(err => {
                console.log('getProductCount() Error!', err);
            })
    }


    return (
        <>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div></div>
                <h1>고객 상태</h1>
                <div style={{ height: '30px', width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    <select style={{ border: '1px solid lightGray', marginRight: '10px', fontSize: '12px' }} name="searchType" onChange={onSearchType}>
                        <option name="user_name" value="user_name" >고객 이름</option >
                        <option name="user_email" value="user_email">고객 이메일</option >
                        <option name="user_phone" value="user_phone">고객 전화번호</option>
                    </select>
                    <Input style={{ fontSize: '12px' }} type="text" placeholder="유저 검색" onChange={onChangeSearch} onKeyPress={onKeyPress} />
                    <IconButton className="menuButton" onClick={search}>
                        <SearchOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <Table style={{ width: '100%', marginTop: '30px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell alingn="right">고객상태</TableCell>
                        <TableCell alingn="right">고객이메일</TableCell>
                        <TableCell alingn="right">고객이름</TableCell>
                        <TableCell alingn="right">고객전화번호</TableCell>
                        <TableCell alingn="right">고객변경일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.user.map(user =>
                        <TableRow style={{ height: '20%' }}>
                            <TableCell component="th" scope="board"> {user.user_crud} </TableCell>
                            <TableCell alingn="right"> {user.user_email} </TableCell>
                            <TableCell alingn="right">{user.user_name}</TableCell>
                            <TableCell alingn="right">{user.user_phone}</TableCell>
                            <TableCell alingn="right">{user.user_regdate}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {[...new Array(pageNums)].map((page,index)=>
                    <div style={{marginRight:'5px'}}>
                   <button style={{border:'none',padding:'5px',cursor:'pointer'}} onClick={()=>getUserState(index+1)}>{index+1}</button>
                   </div>
                )}
        </>
    )
}

export default UserStatus
