import React, { useState } from "react";
import Logo from "../Maincomponent/images/logo.jpg";

function ManagerHeader({dashBoardOpen}){
    return(
        <>
        <div className="manager-navigation">
            <div className="banner">
                <div className="mid_menu">
                    <button className="logoBtn" onClick={()=>dashBoardOpen()}>
                    <img 
                        src={ Logo }
                        style={{height:"50px"}}
                        alt='testA' />
                        </button>
                    </div>
                    
            </div>
            </div>
            </>
            )

};
export default ManagerHeader;