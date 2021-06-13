import React from 'react'
function ManagerSidebar({productInsertOpen,productListOpen,userListOpen,userStatusOpen,orderStatusOpen}) {
    return (
        <div className="manager-sidebar">
                <ul>
                    <butten onClick={()=>productInsertOpen()}><li>상품등록</li></butten>
                    <butten onClick={()=>productListOpen()}><li>상품목록</li></butten>
                    <butten onClick={()=>orderStatusOpen()}><li>주문현황</li></butten>
                    <butten onClick={()=>userListOpen()}><li>유저목록</li></butten>
                    <butten onClick={()=>userStatusOpen()}><li>유저현황</li></butten>
                </ul>
            </div>
    )
}

export default ManagerSidebar
