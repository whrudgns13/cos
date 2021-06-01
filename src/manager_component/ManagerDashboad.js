import React,{useState,useEffect} from 'react'
import AxiosApiService from '../AxiosApiService';
import './managerCss/managerDashboard.css';

function ManagerDashboad() {
    const [managerItems, setManagerItems] = useState({items:[]});

    useEffect(()=>{
        reloadCnt();
        console.log(managerItems);
    },[])

    function reloadCnt(){
        AxiosApiService.itemsCnt()
        .then(res=>{
            setManagerItems({items:res.data});
        })
        .catch(err=>{
            console.log("reloadCnt error", err);
        })
    }
    
    return (
        <>
        <h1>Dash Board</h1>
         {managerItems.items.map(items =>
            <div className="dashboard_wapper">
                <div className="Cnt" >
                    <h2>상품개수</h2><br/>
                    <h1>{items.product_cnt}</h1>
                </div>
                <div className="Cnt" >
                    <h2>유저수</h2><br/>
                    <h1>{items.user_cnt}</h1>
                </div>
                
            </div>
         )}
        </>
    )
}

export default ManagerDashboad
