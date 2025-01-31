import React, { useEffect, useState } from 'react'
import Header from "../components/Header"
import Cards from '../components/Cards'
import AddExpenses from '../components/modals/addexpense'
import AddIncome from '../components/modals/addincome'
import moment from 'moment'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { toast } from 'react-toastify'
import { useAuthState } from 'react-firebase-hooks/auth'
import TransactionTable from '../TransactionTable'
const Dashboard = () => {
  const [user] = useAuthState(auth)
  const [isExpenseModalVisible,setIsExpenseModalVisible] = useState(false)
  const [isIncomeModalVisible,setIsIncomeModalVisible] = useState(false)

  const [transactions,setTransactions] = useState([])
  const [loading,setLoading] = useState(false)

  const[income,setIncome] = useState(0);
  const[expense,setExpense] = useState(0);
  const[currentBalance,setCurrentBalance] = useState(0);

  const showExpenseModal =()=>{
    setIsExpenseModalVisible(true)
  }
  const showIncomeModal = ()=>{
    setIsIncomeModalVisible(true)
  }

  const closeExpenseModal =()=>{
    setIsExpenseModalVisible(false)
  }
  const closeIncomeModal = ()=>{
    setIsIncomeModalVisible(false)
  }
  const onFinish =(values,type)=>{
     const newTransaction = {
      type: type,
      amount:parseFloat(values.amount),
      date:moment(values.date).format("YYYY-MM-DD"),
      tag:values.tag,
      name:values.name
     }
     addTransaction(newTransaction)
  }

  //   add a transation for the user in the collection
  const  addTransaction = async (transaction) => {
    try {
      const docRef = await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transaction
      )
      toast.success("Transaction Added!")
      let newArr = transactions
      newArr.push(transaction)
      setTransactions(newArr)
      calcualteBalance()

    } catch (error) {
      console.log(error)
      toast.error("Couldn't add Transaction!")
    }
  }

  useEffect(()=>{
    fetchTansactions()
  },[])

//  Fetching all the transactions 
const fetchTansactions = async () => {
   try {
    setLoading(true)

    if(user){
      const q = query(collection(db,`users/${user.uid}/transactions`))
      const querydata = await getDocs(q);
      let transactionArray =[]
      querydata.forEach(doc => {
        transactionArray.push(doc.data())
      });
      setTransactions(transactionArray)
      toast.success("Transactions Fetched!")
      // console.log(transactionArray)
      setLoading(false)
    }
   
  } catch (error) {
    console.log(error)
  }
}

//  Income, expense and Total Balance
useEffect(()=>{
calcualteBalance()
},[transactions])

const calcualteBalance =()=>{
  let totalIncome =0
  let totalExpense =0
  transactions.map((transaction)=>{
    if(transaction.type==='income')
       totalIncome += transaction.amount
     else
       totalExpense += transaction.amount 
  })
  setIncome(totalIncome)
  setExpense(totalExpense)
  setCurrentBalance(totalIncome-totalExpense)
}


  return (
    <div>
      <Header/>
      {loading? <p>Loading...</p>: 
        <>
          <Cards  showExpenseModal={showExpenseModal} 
          showIncomeModal={showIncomeModal} 
          income={income}
          expense={expense}
          currentBalance={currentBalance}
          />
          <AddExpenses isExpenseModalVisible={isExpenseModalVisible} closeExpenseModal={closeExpenseModal} onFinish={onFinish} />
          <AddIncome isIncomeModalVisible={isIncomeModalVisible} closeIncomeModal={closeIncomeModal} onFinish={onFinish} />
          <TransactionTable transactions={transactions}/>
        </>
      }
     </div>
  )
}

export default Dashboard
