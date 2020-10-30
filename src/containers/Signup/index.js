import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import Header from "../../components/Header"
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../../components/Header/GlobalStyle";
import { useDarkMode } from "../../components/useDarkMode";
import { lightTheme, darkTheme } from "../../components/Header/Themes";
import Burger from "../../components/Menu/Burger";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          핫플고
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({history}) => {
    const [theme, themeToggler, mountedComponent] = useDarkMode();
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
            display : "flex",
            alignItems : "center", 
            justifyContent: "center", 
            backgroundColor : "#e6f7ff",
            border : "1px solid #1890FF",
            color : "#1890ff",
            marginTop : "9px",
            marginRight : "-3px"
        },
        topHeartShape : {
            cursor:"pointer",
            height: "100%", 
            width:"100%",
            color:"#eb2f96",
            display : "flex",
            fontSize : "30px",
            alignItems : "center",
            justifyContent: "center"
        },
        topLeftWrapper : {
            display:"flex", 
            alignContent:"space-between"
        }
    }

    const classes = useStyles();

    const favPlace = useSelector((state) => state.FavPlaces.data) || {};
    const favePlaceTitle = useSelector((state) => state.FavPlaces.title) || "";

    useEffect(() => {
    }, []);

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
        return  <Burger/>

    }

    const goLikePage = () => {
        window.dataLayer.push({event: 'selectEntity', selectedElement: "찜목록 확인"});
        history.push('/like/place/name/' + JSON.stringify(Object.keys(favPlace)) + '/"' + favePlaceTitle + '"');

    }

    const LikedBadge = () => {
        return  (
            <Badge size="small"  count={Object.keys(favPlace).length} style={styles.likedBadge} onClick={goLikePage} showZero>
                <HeartFilled style={styles.topHeartShape} twoToneColor="#eb2f96" />
            </Badge>
        )
    }

    const Right = () => {
        return (
            <div style={styles.topLeftWrapper}>
                <LikedBadge />
            </div>
        )
    }

    const ClickLeft = () => {
    }

    return (
        <>
            <ThemeProvider theme={themeMode}>
            <GlobalStyles/>
            <Header Center={Center} Left={Left} Right={Right} ClickLeft={ClickLeft}/>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                회원가입
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    </Grid> */}
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="이름"
                        name="name"
                        autoComplete="name"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    회원가입
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/signin" variant="body2">
                        이미 계정이 있으신가요? 로그인
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
            </Container>            
            <footer></footer>
            </ThemeProvider> 
        </>
            );
    }
export default Signup;