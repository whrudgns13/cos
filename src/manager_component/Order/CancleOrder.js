import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function CancleOrder() {
    //서버에서 받아올 유저 저장소
    const [orders,setOrders] = useState({order:[]});
    const [pageNums,setPageNums] = useState(0);
    //새로고침시에만 실행
    useEffect(()=>{
        getCancleOrder(0);
        getCancleOrderCount();
    },[])

    //서버 상품주문목록 가져옴
    const getCancleOrder=(pageNum)=>{
        AxiosApiService.cancleOrder(pageNum)
        .then(res=>{
            setOrders({order:res.data});
        })
        .catch(err => {
            console.log('getUserState() Error!', err);
        })
        window.scrollTo(0,0);
    }
    //취소요청 페이지개수
    function getCancleOrderCount(){
        AxiosApiService.cancleOrderCount()
        .then(res=>{
            setPageNums(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log('getOrderCount() Error!', err);
        })
    }
    //배송상태 변경
    const deliveryStatus=(status,order_id)=>{
        AxiosApiService.stateChange(status,order_id)
        .then(res=>{

        })
        .catch(err => {
            console.log('deliveryStatus() Error!', err);
        })
    }
    return (
        <>
            <div style={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                <h1>취소 요청</h1>
                </div>
            <Table style={{width:'100%',marginTop:'30px'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell alingn="right">고객이메일</TableCell>
                            <TableCell alingn="right">상품제목</TableCell>
                            <TableCell alingn="right">상품사이즈</TableCell>
                            <TableCell alingn="right">상품컬러</TableCell>
                            <TableCell alingn="right">주문개수</TableCell>
                            <TableCell alingn="right">주문일</TableCell>
                            <TableCell alingn="right">취소버튼</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.order.map((order,index) =>
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th">{order.user_email}</TableCell>
                                <TableCell alingn="right">{order.product_title}</TableCell>
                                <TableCell alingn="right"> {order.product_size}</TableCell>
                                <TableCell alingn="right">{order.product_color}</TableCell>
                                <TableCell alingn="right">{order.amount}</TableCell>
                                <TableCell alingn="right">{order.order_date}</TableCell>
                                <TableCell><button className='optionPage' onClick={()=>deliveryStatus('취소완료',orders.order[index].order_id)} style={{border:'1px solid lightgray',width:'100%',textAlign:'left',marginTop:'0px'}}>
                                   취소완료</button></TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
                <div style={{display:'flex',marginTop:'10px'}}>
                {[...new Array(pageNums)].map((page,index)=>
                    <div style={{marginRight:'5px'}}>
                   <button style={{border:'none',padding:'5px',cursor:'pointer'}} onClick={()=>getCancleOrder(index+1)}>{index+1}</button>
                   </div>
                )}
                </div>
        </>
    )
}

export default CancleOrder
