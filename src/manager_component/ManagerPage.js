import React,{useState} from 'react'
import ManagerHeader from './ManagerHeader'
import './managerCss/managermain.css'
import ManagerSidebar from './ManagerSidebar';
import ProductInsert from './Product/ProductInsert';
import ProductInsertOption from './Product/ProductInsertOption';
import ProductList from './Product/ProductList';
import UserList from './User/UserList';
import ManagerDashboad from './ManagerDashboad';
import ProductDetail from './Product/ProductDetail';
import ProductUpdate from './Product/ProductUpdate';
import Footer from '../Maincomponent/Footer';
import UserState from './User/UserStatus';
import OrderStatus from './Order/OrderStatus';
import OrderDetail from './Order/OrderDetail';
import CancleOrder from './Order/CancleOrder';
function ManagerPage() {

    const [productInsert, setProductInsert] = useState(false);
    const [productList, setProductList] = useState(false);
    const [userList, setUserList] = useState(false);
    const [dashBoard, setDashBoard] = useState(true);
    const [productDetail, setProductDetail] = useState(false);
    const [productInsertOption, setProductInsertOption] = useState(false);
    const [productUpdate, setProductUpdate] = useState(false);
    const [userStatus, setUserStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const [orderDetail, setOrderDetail] = useState(false);
    const [cancleOrder,setCancleOrder]= useState(false);

    const cancleOrderOpen = ()=>{
        setCancleOrder(true);
        setOrderDetail(false);
        setOrderStatus(false);
        setUserStatus(false);
        setProductInsert(false);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
       
    }
    const orderDetailOpen = ()=>{
        setOrderDetail(true);
        setOrderStatus(false);
        setUserStatus(false);
        setProductInsert(false);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setCancleOrder(false);
    }
    const orderStatusOpen = ()=>{
        setOrderStatus(true);
        setUserStatus(false);
        setProductInsert(false);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const userStatusOpen = ()=>{
        setUserStatus(true);
        setProductInsert(false);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const productInsertOpen = ()=>{
        setProductInsert(true);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }

    const productListOpen= ()=>{
        setProductList(true);
        setProductInsert(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }

    const userListOpen= ()=>{
        setUserList(true);
        setProductList(false);
        setProductInsert(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const dashBoardOpen= ()=>{
        setDashBoard(true);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const productDetailOpen=()=>{
        setProductDetail(true);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductInsertOption(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const productInsertOptionOpen=()=>{
        setProductInsertOption(true);
        setProductDetail(false);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductUpdate(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }
    const productUpdateOptionOpen=()=>{
        setProductUpdate(true);
        setProductInsertOption(false);
        setProductDetail(false);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setUserStatus(false);
        setOrderStatus(false);
        setOrderDetail(false);
        setCancleOrder(false);
    }

    return (
        <>  
        <ManagerHeader dashBoardOpen={dashBoardOpen}/>
        <div className="manager-wapper">
        <div className="manager_login"><span>관리자 / 로그아웃</span></div>
                
            <div class="block"></div>
                <div className="manager-main">
                    <ManagerSidebar 
                    productInsertOpen={productInsertOpen} 
                    productListOpen={productListOpen}
                    userListOpen={userListOpen}
                    cancleOrderOpen={cancleOrderOpen}
                    userStatusOpen={userStatusOpen}
                    orderStatusOpen={orderStatusOpen}
                    />
                <div className="division"></div>
                    <div className="manager-content">
                        {dashBoard && <ManagerDashboad/>}
                        {productInsert && <ProductInsert productInsertOptionOpen={productInsertOptionOpen}/>}
                        {productInsertOption && <ProductInsertOption />}
                        {productList && <ProductList productDetailOpen={productDetailOpen}/>}
                        {productDetail&&<ProductDetail productListOpen={productListOpen} productUpdateOptionOpen={productUpdateOptionOpen}/>}
                        {cancleOrder&&<CancleOrder/>}
                        {userList && <UserList/>}
                        {productUpdate && <ProductUpdate productDetailOpen={productDetailOpen} productListOpen={productListOpen}/>}
                        {userStatus && <UserState/>}
                        {orderStatus&&<OrderStatus orderDetailOpen={orderDetailOpen}/>}
                        {orderDetail&& <OrderDetail orderStatusOpen={orderStatusOpen}/>}
                    </div>
                </div>
        </div>
         
         </>
    )
}

export default ManagerPage
