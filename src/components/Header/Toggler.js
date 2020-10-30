import React from "react";
import {func, string} from "prop-types";
import styled from "styled-components";

const ThemeSwitch = styled.div `
    background: transparent;
    // float: right;
    text-align : center;
    border: 0px;
    font-size: 14px;
    span {
      &.light {
        color: ${ ({
      theme}) => (theme === "light" ? "#ffb499" : "white")};
      }

      &.dark {
        color: ${ ({
          theme}) => (theme === "dark" ? "#4e6600" : "white")};
      }
    }
  `;

const Toggle = ({ theme, toggleTheme }) => {
  const isDark = () => theme === "dark" 
  return (
    <>
      <ThemeSwitch onClick={toggleTheme} theme={theme}>
        {isDark()
          ? (
            <div>
            라이트 모드
            <span className="light">
              <i className="fa fa-sun-o" aria-hidden="true" style={{color : '#FAFAD2', filter:'drop-shadow(0px 0px 2px #BDB76B)'}}></i>
            </span>
            </div>
            
          ) : (
            <div>
            다크 모드
          <span className="dark">
            <i className="fa fa-moon-o" aria-hidden="true" style={{filter:'drop-shadow(0px 0px 1px white)'}}></i>
          </span>
          </div>

            
          )}              
      </ThemeSwitch>
    </>
  );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired
};

  export default Toggle;
