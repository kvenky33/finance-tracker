import React,{useState} from 'react'
import { Table,Select } from 'antd';
import './style.css'



const TransactionTable = ({transactions}) => {
  const {Option} = Select
    const [search,setSearch] = useState('')
    const [typeFilter,setTypeFilter] =  useState('')
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
      
     
  return (
    <>

    <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search by name'/>
    <Select className='select-input' onChange={(value)=>setTypeFilter(value)} placeholder="Filter" value={typeFilter} allowClear>
      <Option value="">All</Option>
      <Option value="income">Income</Option>
      <Option value="expense">Expense</Option>
    </Select>
    <Table dataSource={filterTransaction} columns={columns} />;
    </>
  )
}

export default TransactionTable