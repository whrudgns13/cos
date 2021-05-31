import React,{useState} from 'react'
import ManagerHeader from './ManagerHeader'
import './managerCss/managermain.css'
import {Link} from "react-router-dom";
import ManagerSidebar from './ManagerSidebar';
import ProductInsert from './Product/ProductInsert';
import ProductList from './Product/ProductList';
import UserList from './Product/UserList';

function ManagerPage(props) {

    const [productInsert, setProductInsert] = useState(false);
    const [productList, setProductList] = useState(false);
    const [userList, setUserList] = useState(false);

    const productInsertOpen = ()=>{
        setProductInsert(true);
        setProductList(false);
        setUserList(false);
    }

    const productListOpen= ()=>{
        setProductList(true);
        setProductInsert(false);
        setUserList(false);
    }

    const userListOpen= ()=>{
        setUserList(true);
        setProductList(false);
        setProductInsert(false);
    }


    return (
        <div className="manager-wapper">
            <ManagerHeader/>
            <div class="block"></div>
                <div className="manager-main">
                    <ManagerSidebar 
                    productInsertOpen={productInsertOpen} 
                    productListOpen={productListOpen}
                    userListOpen={userListOpen}
                    />            
                <div className="division"></div>
                    <div className="manager-content">
                        {productInsert && <ProductInsert/>}
                        {productList && <ProductList/>}
                        {userList && <UserList/>}
                    </div>
                </div>
        </div>
    )
}

export default ManagerPage
