import React from 'react'
function ManagerSidebar({productInsertOpen,productListOpen,userListOpen,userStateOpen}) {
    return (
        <div className="manager-sidebar">
                <ul>
                    <butten onClick={()=>productInsertOpen()}><li>상품등록</li></butten>
                    <butten onClick={()=>productListOpen()}><li>상품목록</li></butten>
                    <butten onClick={()=>userListOpen()}><li>유저목록</li></butten>
                    <butten onClick={()=>userStateOpen()}><li>유저상태</li></butten>
                </ul>
            </div>
    )
}

export default ManagerSidebar
