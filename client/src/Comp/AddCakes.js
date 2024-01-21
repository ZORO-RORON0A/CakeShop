import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select, Tabs, message } from 'antd';
import axios from 'axios';

const AddCakes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taxs,settax]=useState([]);
  let option=[]
  useEffect(()=>{
    const gettex=async ()=>{
      const result_taxs = await axios.get("http://localhost:8000/Taxs/");
    settax(result_taxs.data);
    
    }
    gettex();

  },[])
  
  const [url, seturl] = useState("https://i.pinimg.com/564x/6c/3d/43/6c3d43cb72d4bb7772413587b98d1e94.jpg");
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    console.log('Success:', values);
    const result = await axios.post("http://localhost:8000/Cakes/add", values, {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      }

    });
    
    if (!result.data.err) {
      message.success(result.data.msg);
    }
    else {
      message.error(result.data.err);
    }
    
    
  (taxs.forEach((tax)=>{
    
    option.push({ value: tax.id, label: tax.Rate });
    
  }))
    setIsModalOpen(false);
  };
  
  
  return (
    <div>
      <h1 align="right" > <Button type='primary' onClick={showModal} >Add Cake</Button> </h1>
      <Modal title="Basic Modal" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}

          autoComplete="off"
        >
          <Form.Item
            label="Cake Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Cake Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="price"
            name="price"

            rules={[
              {
                required: true,
                message: 'Please input Cake Price!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Picture"
            name="pic"

            rules={[
              {
                required: true,
                message: 'Please input Cake Pic!',
              },
            ]}
          >
            <Input onChange={e => seturl(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Tax Rate :"
            name="TaxId"

            rules={[
              {
                required: true,
                message: 'Please input Cake Tax!',
              },
            ]}
          >
            <Select>
              {taxs.map(tax=>{
                return (<option value={tax.id} >{tax.Rate}</option>)
              })}
              </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <img style={{ borderRadius: "20px", position: "absolute", left: "10px", bottom: "50px" }} alt="cake_photo" width="100px" height="100px" src={url} />

      </Modal>
    </div>
  )
}

export default AddCakes
