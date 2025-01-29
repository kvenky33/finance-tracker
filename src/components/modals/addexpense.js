import React from 'react'
import {Modal,Button,Form,DatePicker,Select,Input} from 'antd'

const AddExpenses = ({isExpenseModalVisible,closeExpenseModal,onFinish}) => {
  const [form] = Form.useForm()
  return (
   
         <Modal open={isExpenseModalVisible}
          style={{fontWeight:600}}
          title="Add Expense"
          onCancel={closeExpenseModal}
          footer={null}
          >
             <Form form={form} layout='vertical' onFinish={(values)=>{onFinish(values,"expense"); form.resetFields();}}
              >
                <Form.Item label="Name" name="name" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Input the name of the transaction!',
                  },
                ]}>
                  <Input type='text' className='custom-input'  />
                </Form.Item>
                <Form.Item label="Amount" name="amount" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter the Expense Amount!',
                  },
                ]}>
                  <Input type='number' className='custom-input' />
                </Form.Item>

                <Form.Item label="Date" name="date" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Select the Expense Date!',
                  },
                ]}>
                 <DatePicker format='YYYY-MM-DD' className='custom-input'/>
                </Form.Item>
                
                <Form.Item label="Tag" name="tag" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Select a Tag!',
                  },
                ]}>
                 <Select>
                  <Select.Option value="entertainment">Entertainment</Select.Option>
                  <Select.Option value="travel">Travel</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="education">Education</Select.Option>
                 </Select>
                </Form.Item>

                <Form.Item>
                  <Button className='btn-blue' type='primary' htmlType='submit'>Add Expense</Button>
                </Form.Item>

             </Form>

          </Modal>
  )
}

export default AddExpenses