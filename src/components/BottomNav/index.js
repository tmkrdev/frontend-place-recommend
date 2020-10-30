import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const useStyles = makeStyles({
  root: {
    color : "white",
    width: "auto",
    position: "fixed",
    margin : "30",
    bottom: "20px",
    left : '50%',
    marginRight: "-50%",
    "transform"  : "translate(-50%, -50%)",
    "boxShadow" : '0 2px 2px -2px rgba(0, 0, 0, 0.12), 0 2px 3px 0 rgba(0, 0, 0, 0.08),0 4px 4px 3px rgba(0, 0, 0, 0.05)',
    borderRadius : "30px",
    border : "2px solid #f7f5f6",
    backgroundColor : "rgb(255, 240, 246)"
  },
  textBlack : {
      color : "black"
  }


});

const BottomNav = (props) => {
//   props.clickFilter()
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.textBlack} label="취향 선택" value="취향 선택" onClick={props.clickFilter} icon={<props.FilterIcon/>} />
      {
        props.ListIcon?
          <BottomNavigationAction className={classes.textBlack} label="장소 후보" value="장소 후보" onClick={props.clickList} icon={<props.ListIcon/>} />
            : <></>
      }

      { 
        props.LikesIcon?
        <BottomNavigationAction className={classes.textBlack} label="찜 장소" value="찜 장소" icon={<props.LikesIcon/>} />
        : <></>
      }

    </BottomNavigation>
  );
}
export default BottomNav;