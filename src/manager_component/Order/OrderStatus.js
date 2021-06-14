import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function OrderStatus({orderDetailOpen}) {
    //서버에서 받아올 유저 저장소
    const [orders,setOrders] = useState({order:[]});
    const [pageNums,setPageNums] = useState(0);
    //새로고침시에만 실행
    useEffect(()=>{
        getProductOrder(0);
        getOrderCount();
    },[])

    //서버 상품주문목록 가져옴
    const getProductOrder=(pageNum)=>{
        AxiosApiService.orderState(pageNum)
        .then(res=>{
            setOrders({order:res.data});
        })
        .catch(err => {
            console.log('getUserState() Error!', err);
        })
        window.scrollTo(0,0);
    }
    //주문개수
    function getOrderCount(){
        AxiosApiService.orderCount()
        .then(res=>{
            setPageNums(res.data)
        })
        .catch(err => {
            console.log('getOrderCount() Error!', err);
        })
    }
    const returnOrderDetail=(order_detail_num,user_email)=>{
        window.localStorage.setItem('order_detail_num',order_detail_num);
        window.localStorage.setItem('user_email',user_email);
        orderDetailOpen();
    }

    return (
        <>
            <div style={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
                <button onClick={()=>console.log(orders,pageNums)}></button>
                <h1>주문 현황</h1>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.order.map((order,index) =>
                            <TableRow style={{height:'20%'}}>
                                <TableCell component="th">{order.user_email}</TableCell>
                                <TableCell alingn="right">
                                    <button style={{border:'none', backgroundColor:'#FFFFFF'}} onClick={()=>returnOrderDetail(orders.order[index].order_detail_num,orders.order[index].user_email)}>{order.product_title}</button>
                                </TableCell>
                                <TableCell alingn="right"> {order.product_size}</TableCell>
                                <TableCell alingn="right">{order.product_color}</TableCell>
                                <TableCell alingn="right">{order.amount}</TableCell>
                                <TableCell alingn="right">{order.order_date}</TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
                <div style={{display:'flex',marginTop:'10px'}}>
                {[...new Array(pageNums)].map((page,index)=>
                    <div style={{marginRight:'5px'}}>
                   <button style={{border:'none',padding:'5px',cursor:'pointer'}} onClick={()=>getProductOrder(index+1)}>{index+1}</button>
                   </div>
                )}
                </div>
        </>
    )
}

export default OrderStatus
