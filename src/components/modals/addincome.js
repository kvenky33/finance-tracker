import React from 'react'
import {Modal,Button,Form,DatePicker,Select,Input} from 'antd'

const AddIncome = ({isIncomeModalVisible,closeIncomeModal,onFinish}) => {
  const [form] = Form.useForm()
  return (
   
         <Modal open={isIncomeModalVisible}
          style={{fontWeight:600}}
          title="Add Income"
          onCancel={closeIncomeModal}
          footer={null}
          >
             <Form form={form} layout='vertical' onFinish={(values)=>{onFinish(values,"income"); form.resetFields();}}
              >
                <Form.Item label="Name" name="name" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Input the name of the transaction!',
                  },
                ]}>
                  <Input type='text'  className='custom-input'  />
                </Form.Item>
                <Form.Item label="Amount" name="amount" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter the Income Amount!',
                  },
                ]}>
                  <Input type='number' className='custom-input'  />
                </Form.Item>

                <Form.Item label="Date" name="date" 
                style={{fontWeight:600}}
                rules={[
                  {
                    required: true,
                    message: 'Please Select the Income Date!',
                  },
                ]}>
                 <DatePicker format='YYYY-MM-DD'  className='custom-input' />
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
                  <Select.Option value="freelance">Freelance </Select.Option>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="bussiness">Bussiness</Select.Option>
                 </Select>
                </Form.Item>

                <Form.Item>
                  <Button className='btn-blue' type='primary' htmlType='submit'>Add Income</Button>
                </Form.Item>

             </Form>

          </Modal>
  )
}


export default AddIncome