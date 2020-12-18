import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import http from '../http';

const FORM = {
  amount: null
}

export default function OrderForm(props) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(Object.assign({}, FORM));

  const submit = async () => {
    const { data } = await http.post('orders', form);
    setVisible(false);

    // callback to parent to update the order list
    props.onSaved(data);

    // reset form
    setForm(Object.assign({}, FORM));
  }

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>NEW ORDER</Button>
      <Modal title="Basic Modal" visible={visible} onOk={submit} onCancel={() => setVisible(false)}>
        <Form>
          <Form.Item label="" name="amount" rules={[{ required: true, message: 'Please enter the amount!' }]}>
            <Input addonBefore="RM" value={form.amount} onChange={e => setForm({ amount: e.target.value })}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}