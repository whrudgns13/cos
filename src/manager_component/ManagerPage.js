import React from 'react'
import ManagerHeader from './ManagerHeader'
import './managerCss/managermain.css'
import {Link} from "react-router-dom";
import ManagerSidebar from './ManagerSidebar';
import ProductInsert from './Product/ProductInsert';

function ManagerPage() {
    return (
        
            <div className="manager-wapper">
             
            <ManagerHeader/>
            <div class="block"></div>
            <div className="manager-main">
            <ManagerSidebar/>            
            <div className="division"></div>
            
            </div>
            </div>
    )
}

export default ManagerPage
