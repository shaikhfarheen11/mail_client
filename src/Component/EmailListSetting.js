import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useNavigate } from "react-router-dom";

function EmailListSetting(){
    const navigate = useNavigate();

    const handleArrowButtonClick = () => {
        navigate('/header');
    }


    return (
        <div className="emaillist__Settings">
            <div className="emaillist__SettingsLeft">
                <ButtonGroup>
                    <Button variant="light" onClick={handleArrowButtonClick}>
                        <ArrowBackIcon />
                        </Button>
                    <Button variant="light">
                        <CheckBoxOutlineBlankIcon/>
                    </Button>
                    <Button variant="light">
                       <ArrowDropDownIcon/>
                    </Button>
                    <Button variant="light">
                      <RefreshIcon/>
                    </Button>
                    <Button variant="light">
                        <MoreVertIcon/>
                    </Button>
                </ButtonGroup>
            </div>
            <div className="emaillist__settingsRight">
                <p>1-50 of 10,222</p>
                <ButtonGroup>
                    <Button variant="light">
                        <ChevronLeftIcon />
                    </Button>
                    <Button variant="light">
                        <ChevronRightIcon />
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default EmailListSetting;
