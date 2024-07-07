// src/InputPageModal.js
import React from 'react';
import { Form, Input, InputNumber, Button, Checkbox, Select } from 'antd';
const { Option } = Select;

const InputPageModal = ({ addExpense, participantsList }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { payer, amount, item, participants } = values;
    addExpense({ payer, amount, item, participants });
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="payer" label="付款人" rules={[{ required: true, message: '請選擇付款人' }]}>
        <Select placeholder="請選擇付款人">
            {participantsList.map(participant => (
                <Option key={participant} value={participant}>{participant}</Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item name="amount" label="金額" rules={[{ required: true, message: '請輸入金額' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="item" label="項目" rules={[{ required: true, message: '請輸入項目' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="participants" label="分攤人" rules={[{ required: true, message: '請選擇分攤人' }]}>
        <Checkbox.Group options={participantsList} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">儲存</Button>
      </Form.Item>
    </Form>
  );
};

export default InputPageModal;
