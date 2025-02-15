import React,{useState} from 'react'
import { Table,Select,Radio } from 'antd';
import searchImg from '../assets/search.svg'
import './style.css'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

const TransactionTable = ({transactions,addTransaction,fetchTansactions}) => {
  const {Option} = Select
    const [search,setSearch] = useState('')
    const [typeFilter,setTypeFilter] =  useState('')
    const[sortKey ,setSortKey] = useState('');
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          }
      ];
      
      let filterTransaction = transactions.filter((item)=>
          item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
          
      )
    //   console.log(filterTransaction)

    let sortedTransaction = filterTransaction.sort((a,b)=>{
      if(sortKey==="amount"){
        return a.amount - b.amount
      }
      else if(sortKey==='date'){
        return new Date(a.date) - new Date(b.date)
      }
      else{
        return 0
      }
    })
      
    // export to csv
   const exportCSV = ()=>{
    var csv = unparse({
      "fields": ['name','type','date','tag','amount'],
       "data" :transactions
    });
     
    const data = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    const  csvURL = window.URL.createObjectURL(data);
    const Link = document.createElement('a');
    Link.href = csvURL;
    Link.download = 'transactions.csv'; 
    document.body.appendChild(Link)
    Link.click();
    document.body.removeChild(Link)

   }

  //  Import from csv

  const importCSV = (event)=>{
    event.preventDefault();
    try{
      parse(event.target.files[0],{
        header:true,
        complete: async function (results) {
          for(const transaction of results.data){
            const newTransaction = {...transaction,amount:parseInt(transaction.amount)}
            await addTransaction(newTransaction,true)
          }   
        }
      })
      toast.success('All transactions added')
      fetchTansactions()
      event.target.files = null
    }
    catch(e){
      toast.error(e.message)
    }

  }
     
  return (
    <>
    <div className='search-select'>
      <div className='search-part'>
        <label for="search"> <img src={searchImg} alt='search-icon' /></label>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search by name' id='search'/>
      </div>
      <Select className='select-input' style={{width:"20%",boxShadow:" 0 0 8px 8px #f4f1f1", borderRadius:'8px'}} onChange={(value)=>setTypeFilter(value)} placeholder="Filter" value={typeFilter} allowClear>
        <Option value="">All</Option>
        <Option value="income">Income</Option>
        <Option value="expense">Expense</Option>
      </Select>
    </div>

    <div className='myTransactions'>
      <div className='myTransactions-headPart'>
        <h3>My Transactions</h3>
          <Radio.Group className='input-radio' onChange={(e)=>setSortKey(e.target.value)} value={sortKey}>
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div className='csv-btns'>
            <button className='btn' onClick={exportCSV}>Export to CSV</button>
            <label className='btn blue-btn' for="file-csv">Import from CSV</label>
            <input type='file' id='file-csv' accept='.CSV' required  onChange={importCSV} style={{display:"none"}}/>
          </div>
      </div>
    <Table dataSource={sortedTransaction} columns={columns} />
    </div>
    </>
  )
}

export default TransactionTable