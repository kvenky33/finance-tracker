import React from 'react'
import "./style.css"
import Button from '../Button'
import { Row ,Card} from 'antd'


const Cards = ({showExpenseModal,showIncomeModal,income,expense,currentBalance}) => {
  return (
        <>
        <Row className='mycard-container'>
           <Card  className='mycard'>
            <h2>Current Balance</h2>
            <p>₹{currentBalance}</p>
             <Button blue={true} style={{margin:'0'}} text="Reset Balance" />
           </Card>
           <Card  className='mycard'>
            <h2>Total Income</h2>
            <p>₹{income}</p>
             <Button blue={true} style={{margin:'0'}} text="Add Income"  onClick={showIncomeModal}/>
           </Card>
           <Card  className='mycard'>
            <h2>Total Expenses</h2>
            <p>₹{expense}</p>
               <Button blue={true} style={{margin:'0'}} text="Add Expenses" onClick={showExpenseModal}/>  
           </Card>
        </Row>
        </>
  )
}

export default Cards
