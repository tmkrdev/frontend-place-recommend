import React from "react";
import { SmileOutlined } from '@ant-design/icons';
import { Result, Typography } from 'antd';
import Header from "../../components/Header"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
// 추천 결과 리스트 , 그에 대한 지도(마커), 사용자가 선택했던 카드 초기화
import Burger from "../../components/Menu/Burger";

const Company = ({history}) => {
    const [theme, mountedComponent] = useDarkMode();
    const styles = {
        topElements: {
            "cursor" : "pointer",
            fontWeight: "bold",
            'color': theme === 'dark'
                ? 'white'
                : '#6e6e7a',
            'textShadow': theme === 'dark'
                ? '0 0 4px rgb(148, 126, 126), 0 0 5px #fff, 0 0 5px #617e9c, 0 0 5px #2a598b, 0 0 ' +
                        '5px #7895B3, 0 0 5px #486A8B, 0 0 5px #486A8B'
                : '10px 10px 10px #FAF0E6'
        },
        likedBadge : {
            cursor:"pointer",
            color : "#1890ff",
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            backgroundColor : "#e6f7ff",
            border : "1px solid #1890FF",
            marginTop : "9px",
            marginRight : "-3px"
        },
        topHeartShape : {
            cursor:"pointer",
            height: "100%", 
            width:"100%",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center", 
            color:"#eb2f96"
        },
        topLeftWrapper : {
            display:"flex", 
            alignContent:"space-between"
        }
    }

    const themeMode = theme === "light"
        ? lightTheme
        : darkTheme; // 테마

    if (!mountedComponent) 
        return <div/>

    const goHome = () => {
        window.dataLayer.push({event: 'goHome', selectedElement: '홈 버튼'});
        // home 화면으로 가.ㅁ 새로 고침 
       history.push('/');
    }
    
    const Center = () => {
        return <div style={styles.topElements}
                    className="title" onClick={goHome}>🎈핫플고</div>
    }

    const Left = () => {
        return (
            <div style={styles.topLeftWrapper}>
                <Burger/>
            </div>
        )
        
    }

    const Right = () => {
        return(
            <></>
            // <div style={styles.topLeftWrapper}>
            // </div>
        )
    }

    const ClickLeft = () => {
    }
    const { Paragraph, Text } = Typography;


    return (
        <>
            <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft}/>
            <Result
                icon={<SmileOutlined />}
                subTitle="같이 가고 싶은 장소를 원할 때 | 핫플고 장소 추천 서비스"
            >
             <div className="desc">
            <Paragraph>
                <Text
                strong
                style={{
                    fontSize: 16,
                }}
                >
                One Day Korea Tour & Travel Agency
                </Text>
            </Paragraph>
            <br></br>
            <Paragraph>
                <p style={{color:"#27429c", fontWeight:"bold"}}>Office Number: </p>+82 70 7556 5355, +82 10 2479 1242
            </Paragraph>
            <br></br>
            <Paragraph>
            <p style={{color:"#27429c", fontWeight:"bold"}}>Email: </p>info@onedaykorea.com
            </Paragraph> 
            <br></br>
            <Paragraph>
            <p style={{color:"#27429c", fontWeight:"bold"}}>Website: </p><a href="https://www.onedaykorea.com" target="_blank">onedaykorea.com</a>
            </Paragraph> 
            </div>
            </Result>
            <footer></footer>
            </ThemeProvider> 
        </>
            );
    }
export default Company;