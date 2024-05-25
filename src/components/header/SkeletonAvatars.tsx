import React from 'react'

export default function SkeletonAvatars({classes, amount}: any) {
    const array = Array.from(Array(Number(amount)).keys())
  return (
    
    array.map((x, index) => {
      return <div key={index} className={`${classes} animate-pulse rounded-full bg-slate-700`}></div>
    })
    
  )
}