import React, { useContext } from 'react'
import loaderContext from '@/context/loader/loaderContext'

const TestComponent = () => {
    const loaderCon  = useContext(loaderContext)
    const { showToast, setLoader } = loaderCon

  return (
    <div>
      <button onClick={()=>{
        showToast("this is test","this is an test toast","destructive")
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
        }, 3000);
      }} >hihhih </button>
    </div>
  )
}

export default TestComponent
