import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <Skeleton count={10}/>
  )
}

export default Loading