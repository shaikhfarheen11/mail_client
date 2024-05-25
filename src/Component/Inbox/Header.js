import React, {useEffect} from "react";
import ReorderIcon from "@material-ui/icons/Reorder";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import AppsIcon from "@material-ui/icons/Apps";
import Sidebar from "../Sidebar";
import GmailImage from '../asset/Gmail.png';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken');
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('authToken');
            navigate('/login');
        }
    };

    
    return (
        <div className="header">
            <div className="header__left">
                <Button variant="link">
                    <ReorderIcon />
                </Button>
                <img className="gmail-logo" src={GmailImage} alt="Gmail Logo" />
                <span className="gmail">Gmail</span>
            </div>
            <div className="header__middle">
                <div className="search_mail">
                    <Button variant="link">
                        <SearchIcon />
                    </Button>
                    <input type="text" placeholder="Search mail" />
                    <Button variant="link">
                        <ExpandMoreIcon />
                    </Button>
                </div>
            </div>
            <div className="header__right">
                <Button variant="link">
                    <HelpOutlineIcon />
                </Button>
                <Button variant="link">
                    <SettingsIcon />
                </Button>
                <Button variant="link">
                    <AppsIcon />
                </Button>
                <Button varient="link" className="logout-button" onClick={handleLogout}>Logout</Button>

            </div>
            <Sidebar />
        </div>
    )
}

export default Header;