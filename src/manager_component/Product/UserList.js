import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function UserList() {
    //서버에서 받아올 유저 저장소
    const [users,setUsers] = useState({user:[]});
    
    //새로고침시에만 실행
    useEffect(()=>{
        getUserList()
    },[])

    //서버 유저목록 가져옴
    function getUserList(){
        AxiosApiService.getUserList()
        .then(res=>{
            setUsers({user:res.data});
        })
        .catch(err => {
            console.log('getUserList() Error!', err);
        })
    }

    return (
        <>
            <h1>고객 목록</h1>
            <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell alingn="right">고객이메일</TableCell>
                            <TableCell alingn="right">고객이름</TableCell>
                            <TableCell alingn="right">고객전화번호</TableCell>
                            <TableCell alingn="right">고객주소</TableCell>
                            <TableCell alingn="right">고객가입일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.user.map(user =>
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th" scope="board"> {user.user_email} </TableCell>
                                <TableCell alingn="right">{user.user_name}</TableCell>
                                <TableCell alingn="right">{user.user_phone}</TableCell>
                                <TableCell alingn="right">{user.address} {user.detailaddress}</TableCell>
                                <TableCell alingn="right">{user.user_regdate}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
        </>
    )
}

export default UserList
