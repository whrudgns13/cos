import React from 'react'
import {Link} from "react-router-dom";
function ManagerSidebar() {
    return (
        <div className="manager-sidebar">
                <ul>
                    <Link to={'/productInsert'}>
                    <li>상품등록</li>
                    </Link>
                    <li>상품목록</li>
                    <li>유저목록</li>
                </ul>
            </div>
    )
}

export default ManagerSidebar
