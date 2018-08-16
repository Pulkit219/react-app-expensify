import React from 'react'

const ExpenseListItem =({description, amount}) => {
  return (
    <div>
      <p>{description} is</p> <b>{amount}</b>
    </div>
  )
}

export default ExpenseListItem;
