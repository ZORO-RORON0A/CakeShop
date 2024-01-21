import React, { useContext } from 'react'
import axios from 'axios'
import { Button, Card, Form, Input, message } from "antd"
import { useState } from "react";
import { UserAddOutlined } from '@ant-design/icons'
import { UserContext } from '../Helper/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const {setusers,users,getAuth}=useContext(UserContext);
    if(users!==null){
        navigate('/');
    }
    const [form, setform] = useState(0);
    const Register = async (values) => {
        console.log(values);

        const result = await axios.post("http://localhost:8000/Users/add", values);
        console.log(result);
        if (result.data.err) {
            message.error(result.data.err);
        }
        else {
            message.success(result.data.msg);
            
        }
    }
    const Login = async (values) => {
        console.log(values);

        const result = await axios.post("http://localhost:8000/Users/log", values);
        
        if (result.data.err) {
            message.error(result.data.err);
        }
        else {
            message.success(result.data.msg);
            localStorage.setItem("accessToken",result.data.token);
            
            setusers(result.data.user);
            getAuth();
        }
    }
    return (

        <Card style={{ width: "75%", position: "absolute", top: "25%", left: "12%", margin: "0px auto" }}>
            {form === 0 ? (
                <>
                    <h1 align="center" >Login</h1>
                    <Form
                        name="Login"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            margin: "0px auto"
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={Login}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            &nbsp;&nbsp;
                            <Button type="primary" ghost onClick={() => setform(1)} >
                                <UserAddOutlined />  Register
                            </Button>
                        </Form.Item>
                    </Form></>) : (<>
                        <h1 align="center">Register</h1>
                        <Form
                            name="Register"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{
                                maxWidth: 600,
                                margin: "0px auto"
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={Register}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="email"
                                name="emailid"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email Id!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" ghost onClick={() => setform(0)} >
                                    Login
                                </Button>&nbsp;&nbsp;
                                <Button type="primary" htmlType="submit" >
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </>)
            }
        </Card>

    )
}

export default Login
