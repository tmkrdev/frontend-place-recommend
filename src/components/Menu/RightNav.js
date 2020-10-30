import React from 'react';
import { Badge } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { HeartFilled } from '@ant-design/icons';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";

const Ul = styled.ul `
    border-bottom-left-radius : 5px;
    border-top-left-radius : 5px;
    opacity : 95.5%;
    z-index : 20;
    display: flex;
    flex-flow: row nowrap;
    flex-flow: column nowrap;
    background-color: #426c9c;
    position: fixed;
    transform: ${ ({
    open}) => open ? 'translateX(0)' : 'translateX(-100%)'};
    top: 0;
    left: 0;
    height: 100%;
    width: 36%;
    padding-top: 16%;
    transition: transform 0.3s ease-in-out;
    li {
      list-style-type: none;
      color: #fff;
      padding: 1.2rem;
      font-weight: bold;
      font-size: 16px;
      text-align : center;
    }
    li:hover {
        opacity : 0.8;
        background-color : #558bc9;
        cursor : pointer
      }
`;

    const styles = {
        alignCenter : {
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
        },
        likedBadge : {
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            marginTop : "9px",
            backgroundColor : "#e6f7ff",
            color : "#1890ff",
            fontWeight : "bold",
            fontSize : "small",
            border : "1px solid #1890FF"
        },
        topHeartShape : {
            cursor : "pointer",
            height: "100%", 
            top : "2",
            color:"#eb2f96",
            width:"100%",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center"
        },
    
    }
    const RightNav = ({open}) => {

        const [theme] = useDarkMode();
        const themeMode = theme === "light"
            ? lightTheme
            : darkTheme; // 테마

        const history = useHistory();

        const {
            favPlace = {},
            favePlaceTitle = ""
        } = useSelector((s) => ({
            favPlace: s.FavPlaces.data,
            favePlaceTitle : s.FavPlaces.title
        }));

        const goLikePage = () => {
            window.dataLayer.push({event: 'goLikePage', selectedElement: '찜한 장소 보기'}); // Google Analytics
            history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');
        };

        const goHomePage = () => {
            window.dataLayer.push({event: 'selectEntity', selectedElement: '홈 버튼'}); // Google Analytics
            history.push('/');
        };
        const goAboutUs = () => {
            history.push('/company');
        };

        return (

            <ThemeProvider theme={themeMode}>
                <GlobalStyles/>

                <Ul open={open}>
                    <li onClick={goHomePage}>
                        취향 선택
                    </li>
                    <li style={styles.alignCenter } onClick={goLikePage}>
                        찜한 &nbsp;곳&nbsp;
                        <Badge size="small"  count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage} showZero>
                            <HeartFilled style={styles.topHeartShape}  twoToneColor="#eb2f96" />
                        </Badge>
                        &nbsp;
                    </li>

                    <li onClick={goAboutUs}>
                    Contact Us
                    </li>
                </Ul>
                <footer></footer>
            </ThemeProvider>

        )
    }

    export default RightNav