import React from "react"
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import './Header.css';
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from  '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import Sidebar from "./Sidebar";



const Header = () => {

    return (
       <div className="header">
        <div className="header__left">
            <IconButton>
                <ReorderIcon></ReorderIcon>
            </IconButton>
            
        </div>
        <div className="header__middle">
            <div className="search_mail">
                <IconButton>
                    <SearchIcon></SearchIcon>
                </IconButton>
                <input type="text" placeholder="Search mail"/>
                <IconButton>
                    <ExpandMoreIcon> </ExpandMoreIcon>
                </IconButton>
                
            </div>
            
        </div>
        <div className="header__right">
            <IconButton>
            <HelpOutlineIcon> </HelpOutlineIcon>
</IconButton>
<IconButton>
    <SettingsIcon></SettingsIcon>
</IconButton>
<IconButton>
    <AppsIcon>

    </AppsIcon>
</IconButton>


        </div>
        <Sidebar />
       </div>
    )
}
export default Header;