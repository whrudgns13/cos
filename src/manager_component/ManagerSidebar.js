import React from 'react'
import {Link} from "react-router-dom";
function ManagerSidebar() {
    return (
        <div className="manager-sidebar">
                <ul>
                    <Link to={'/productInsert'}>
                    <li>상품등록</li>
                    </Link>
                    <Link to={'/productList'}>
                    <li>상품목록</li>
                    </Link>
                    <Link to={'/userList'}>
                    <li>유저목록</li>
                    </Link>
                </ul>
            </div>
    )
}

export default ManagerSidebar
