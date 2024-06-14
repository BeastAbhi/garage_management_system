import React, { useContext } from 'react'
import loaderContext from '@/context/loader/loaderContext'

const TestComponent = () => {
    const loaderCon  = useContext(loaderContext)
    const { showToast } = loaderCon
  return (
    <div>
      <button onClick={()=>{
        showToast("this is test","this is an test toast","destructive")
      }} >hihhih</button>
    </div>
  )
}

export default TestComponent
