import React, { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "./images/logo.jpg";
import "./css/Banner.css"
import {SidebarData} from "./SidebarData"
import {Link} from "react-router-dom";
import SeachCart from "./SeachCart";
function Banner(){
    const [sidebar,setSidebar] = useState(false);

    const showSidebar = ()=> setSidebar(!sidebar);


    return(
        <>
            <div className="banner">
                    <div className="left_menu">
                        <IconButton className="menuButton" onClick={showSidebar}>
                            <MenuIcon/>
                        </IconButton>
                    </div>
                    <div className="mid_menu">
                    <img
                        src={ Logo }
                        style={{height:"50px"}}
                        alt='testA' />
                    </div>
                    <SeachCart/>
                    
            </div>
            <nav className={sidebar ? "nav-menu active":"nav-menu"}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <IconButton className="menuButton" onClick={showSidebar}>
                            <CloseIcon/>
                        </IconButton>
                    </li>
                    {SidebarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                            <Link to={item.path}>
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );

}
export default Banner;