import React, { useState, useEffect } from 'react';
import AxiosApiService from '../../AxiosApiService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Select from '@material-ui/core/Select';
import IconButton from "@material-ui/core/IconButton";
import SearchErr from '../SearchErr';
import Input from '@material-ui/core/Input';

function UserList({ openNoResult, openResult }) {
    //서버에서 받아올 유저 저장소
    const [users, setUsers] = useState({ user: [] });
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('user_name');
    const [result, setResult] = useState(false);
    const [pageNums, setPageNums] = useState(0);

    function onChangeSearch(e) {
        setKeyword(e.currentTarget.value);
    }
    function onSearchType(e) {
        setSearchType(e.currentTarget.value);
    }
    //새로고침시에만 실행
    useEffect(() => {
        getUserList(0)
        getUserCount()
    }, [])

    //서버 유저목록 가져옴
    const getUserList = (pageNum) => {
        AxiosApiService.getUserList(pageNum)
            .then(res => {
                setUsers({
                    user: res.data
                })
                window.scrollTo(0, 0);
            })
            .catch(err => {
                console.log('getUserList() Error!', err);
            })
    }

    function getUserCount() {
        AxiosApiService.userCount()
            .then(res => {
                setPageNums(res.data)
            })
            .catch(err => {
                console.log('getProductCount() Error!', err);
            })
    }

    function search() {
        console.log(searchType, keyword);
        AxiosApiService.userseachList(searchType, keyword)
            .then(res => {
                const userCheck = {
                    user: res.data
                }
                userCheck.user.length > 0 ? setResult(false) : setResult(true);
                setUsers({
                    user: res.data
                })
            })
            .catch(err => {
                console.log('search() 에러', err);
            });
    }

    return (
        <>
            <button onClick={() => console.log(users)}></button>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div></div>
                <h1>고객목록</h1>
                <div style={{ height: '30px', width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
                    <select style={{ border: '1px solid lightGray', marginRight: '10px', fontSize: '12px' }} name="searchType" onChange={onSearchType}>
                        <option name="user_name" value="user_name" >고객 이름</option >
                        <option name="user_email" value="user_email">고객 이메일</option >
                        <option name="user_phone" value="user_phone">고객 전화번호</option>
                    </select>
                    <Input style={{ fontSize: '12px' }} type="text" placeholder="유저 검색" onChange={onChangeSearch} />
                    <IconButton className="menuButton" onClick={search}>
                        <SearchOutlinedIcon />
                    </IconButton>
                </div>
            </div>
            <Table style={{ width: '100%', marginTop: '30px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell alingn="right">고객이메일</TableCell>
                        <TableCell alingn="right">고객이름</TableCell>
                        <TableCell alingn="right">고객전화번호</TableCell>
                        <TableCell alingn="right">고객주소</TableCell>
                        <TableCell alingn="right">고객가입일</TableCell>
                    </TableRow>
                </TableHead>
                {result && <div style={{ marginTop: '20px' }}><h4>검색결과가 없습니다.</h4></div>}
                <TableBody>
                    {users.user.map(user =>
                        <TableRow style={{ height: '20%' }}>
                            <TableCell component="th" scope="board"> {user.user_email} </TableCell>
                            <TableCell alingn="right">{user.user_name}</TableCell>
                            <TableCell alingn="right">{user.user_phone}</TableCell>
                            <TableCell alingn="right">{user.address} {user.detailaddress}</TableCell>
                            <TableCell alingn="right">{user.user_regdate}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', marginTop: '10px' }}>
                {[...new Array(pageNums)].map((page, index) =>
                    <div style={{ marginRight: '5px' }}>
                        <button style={{ border: 'none', padding: '5px', cursor: 'pointer' }} onClick={() => getUserList(index + 1)}>{index + 1}</button>
                    </div>
                )}
            </div>
        </>
    )
}

export default UserList
