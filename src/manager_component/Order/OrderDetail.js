import React, {useState,useEffect} from 'react';
import AxiosApiService from '../../AxiosApiService'

function OrderDetail({orderStatusOpen}) {
    //서버에서 받아올 유저 저장소
    const [orders,setOrders] = useState({order:[]});
    const imgUrl = "/imgs/";

    //새로고침시에만 실행
    useEffect(()=>{
        getOrderDetail()
    },[])

    //주문상세 가져옴
    const getOrderDetail=()=>{
        let order_detail_num = window.localStorage.getItem('order_detail_num');
        let user_email = window.localStorage.getItem('user_email');
        console.log(order_detail_num,user_email);
        AxiosApiService.orderDetail(order_detail_num,user_email)
        .then(res=>{
            setOrders({order:res.data})
        })
        .catch(err => {
            console.log('getOrderDetail() Error!', err);
        })
    }

    const deliveryStatus=(status)=>{
        AxiosApiService.stateChange(status,orders.order.order_id)
        .then(res=>{
            orderStatusOpen();    
        })
        .catch(err => {
            console.log('deliveryStatus() Error!', err);
        })
        
    }

    return (
        <>
        
        <button onClick={()=>console.log(orders)}>1234</button>
         <h1>주문 상세</h1>
        <div style={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
           
            <div className="detail_wapper">
                <div className="detail_img_box">
                    <img className="detail_img" src={imgUrl+orders.order.product_img}/>
            </div>
            <div className="detail_category">
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>상품 제목</p>
                            <div style={{width:'100%'}}className="detail_box_low_label">
                               <label >{orders.order.product_title}</label>
                            </div>
                    </div>
                </div>
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>입금 가격</p>
                            <div style={{width:'100%'}}className="detail_box_low_label">
                               <label >{orders.order.money}원</label>
                            </div>
                    </div>
                </div>
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>유저 이메일</p>
                            <div style={{width:'100%'}}className="detail_box_low_label">
                               <label >{orders.order.user_email}</label>
                            </div>
                    </div>
                </div>
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>주소</p>
                            <div style={{width:'100%'}}className="detail_box_low_label">
                               <p style={{textAlign:'left'}}>{orders.order.address}<br></br>{orders.order.detail_address}</p>
                            </div>
                    </div>
                </div>
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>배송 상태</p>
                               <button className='optionPage' style={{border:'1px solid lightgray',width:'100%',textAlign:'left',marginTop:'0px',}}>
                                   {orders.order.order_status}</button>
                    </div>
                </div>
                <div className="detail_box_gender_category">
                    <div style={{width:'100%'}} className="detail_box_low">
                        <p style={{marginBottom:'5px'}}>배송 상태 변경</p>
                               <button className='optionPage' onClick={()=>deliveryStatus('배송중')} style={{border:'1px solid lightgray',width:'100%',textAlign:'left',marginTop:'0px'}}>
                                   배송중</button>
                                <button className='optionPage' onClick={()=>deliveryStatus('배송완료')} style={{border:'1px solid lightgray',width:'100%',textAlign:'left',marginTop:'5px'}}>
                                   배송완료</button>
                    </div>
                </div>
            </div>
          
            </div>
        </div>
        </>
    )
}

export default OrderDetail
