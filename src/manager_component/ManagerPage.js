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

function ManagerPage() {

    const [productInsert, setProductInsert] = useState(false);
    const [productList, setProductList] = useState(false);
    const [userList, setUserList] = useState(false);
    const [dashBoard, setDashBoard] = useState(true);
    const [productDetail, setProductDetail] = useState(false);
    const [productInsertOption, setProductInsertOption] = useState(false);
    const [productUpdate, setProductUpdate] = useState(false);

    const productInsertOpen = ()=>{
        setProductInsert(true);
        setProductList(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
    }

    const productListOpen= ()=>{
        setProductList(true);
        setProductInsert(false);
        setUserList(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
    }

    const userListOpen= ()=>{
        setUserList(true);
        setProductList(false);
        setProductInsert(false);
        setDashBoard(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
    }
    const dashBoardOpen= ()=>{
        setDashBoard(true);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductDetail(false);
        setProductInsertOption(false);
        setProductUpdate(false);
    }
    const productDetailOpen=()=>{
        setProductDetail(true);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductInsertOption(false);
        setProductUpdate(false);
    }
    const productInsertOptionOpen=()=>{
        setProductInsertOption(true);
        setProductDetail(false);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
        setProductUpdate(false);
    }
    const productUpdateOptionOpen=()=>{
        setProductUpdate(true);
        setProductInsertOption(false);
        setProductDetail(false);
        setDashBoard(false);
        setUserList(false);
        setProductList(false);
        setProductInsert(false);
    }

    return (
        <>  
        <ManagerHeader dashBoardOpen={dashBoardOpen}/>
        <div className="manager-wapper">
          
            <div class="block"></div>
                <div className="manager-main">
                    <ManagerSidebar 
                    productInsertOpen={productInsertOpen} 
                    productListOpen={productListOpen}
                    userListOpen={userListOpen}
                    />
                <div className="division"></div>
                    <div className="manager-content">
                        {dashBoard && <ManagerDashboad/>}
                        {productInsert && <ProductInsert productInsertOptionOpen={productInsertOptionOpen}/>}
                        {productInsertOption && <ProductInsertOption />}
                        {productList && <ProductList productDetailOpen={productDetailOpen}/>}
                        {productDetail&&<ProductDetail productUpdateOptionOpen={productUpdateOptionOpen}/>}
                        {userList && <UserList/>}
                        {productUpdate && <ProductUpdate/>}
                        
                    </div>
                </div>
               
        </div>
         <Footer/>
         </>
    )
}

export default ManagerPage
