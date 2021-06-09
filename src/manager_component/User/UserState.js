import React, {useState,useEffect} from 'react';
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

function UserState({openNoResult,openResult}) {
    //서버에서 받아올 유저 저장소
    const [users,setUsers] = useState({user:[]});
    
    //새로고침시에만 실행
    useEffect(()=>{
        getUserState()
    },[])

    //서버 유저목록 가져옴
    function getUserState(){
        AxiosApiService.UserState()
        .then(res=>{
            setUsers({user:res.data});
        })
        .catch(err => {
            console.log('getUserState() Error!', err);
        })
    }


    return (
        <>
            <div style={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                
                <h1>고객 상태</h1>
                </div>
            <Table style={{width:'100%',marginTop:'30px'}}>
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
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th" scope="board"> {user.user_crud} </TableCell>
                                <TableCell alingn="right"> {user.user_email} </TableCell>
                                <TableCell alingn="right">{user.user_name}</TableCell>
                                <TableCell alingn="right">{user.user_phone}</TableCell>
                                <TableCell alingn="right">{user.user_regdate}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
        </>
    )
}

export default UserState
