import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../Maincomponent/images/logo.jpg";
import {Link} from "react-router-dom";
function ManagerHeader(){

    return(
        <>
        <div className="manager-navigation">
            <div className="banner">
                <div className="mid_menu">
                    <img
                        src={ Logo }
                        style={{height:"50px"}}
                        alt='testA' />
                    </div>
            </div>
            </div>
            </>
            )

};
export default ManagerHeader;