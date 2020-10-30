import React from "react";

export const Header = (props) => {
    const theme = window.localStorage.getItem('theme');
    const titleStyle ={
        "overflow" : "hidden",
        "whiteSpace" : "nowrap", 
        "textOverflow" : "ellipsis",
        'textShadow': theme === 'dark'
        ? '2px 2px 0px #696969, 6px 4px 0px rgba(0,0,0,0.15)'
        : '2px 2px 0px #F5F5F5, 5px 4px 0px #FFEFD5'
    }
    const {Left , Right, ClickLeft, Center }  = props
    return (
        <>
        <div id="header" style={{padding: "5px"}}>
            <span className="items">
                <div className="left" onClick={ClickLeft}>
                    <Left/>
                </div>
            </span>
            <span className="items">
                <div className="title" style={titleStyle}>
                    <Center/>
                </div>
            </span>
            <span className="items">
                <div className="right">
                    <Right/>
                </div>
            </span>
            <div className="clear"></div>
        </div>
        </>
    );
};
export default Header;
