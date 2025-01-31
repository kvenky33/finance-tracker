import React,{useState} from 'react'
import { Table } from 'antd';
import './style.css'


const TransactionTable = ({transactions}) => {
    const [search,setSearch] = useState('')
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
          item.name.toLowerCase().includes(search.toLowerCase())
          
      )
    //   console.log(filterTransaction)
      
     
  return (
    <>
    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search by name'/>
    <Table dataSource={filterTransaction} columns={columns} />;
    </>
  )
}

export default TransactionTable