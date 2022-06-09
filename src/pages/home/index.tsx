import React from 'react'
import { useRequest } from 'umi'

export default function HomePage() {
  useRequest({
    method: 'GET',
    url: '/article/page/1/size/5',
  })

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
    </div>
  )
}
