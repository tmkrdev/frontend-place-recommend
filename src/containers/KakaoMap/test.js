import React from 'react'
import { useSelector } from "react-redux";

const KakaoMap = (props) => {
  const {
      recResultList = [],
  } = useSelector((s) => ({
      recResultList: s.RecResultList.data, 
  })); 

  return (
    <div>test</div>
  )
}

export default KakaoMap