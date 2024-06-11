import React from 'react'
import BillContext from './billContext'

const BillState = () => {
  return (
    <BillContext.Provider
      value={{ }}
    >
      {props.children}
    </BillContext.Provider>
  )
}

export default BillState
