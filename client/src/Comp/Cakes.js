
import React, { useEffect, useState } from 'react'

import AddCakes from './AddCakes';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';
import { Button, Card, Col, Layout, Popconfirm, Row, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

const Cakes = () => {
    const [cakes, setCakes] = useState([]);
    const [taxs, setTaxs] = useState([]);
    const getCakes = async () => {
        const result = await axios.get("http://localhost:8000/Cakes/");
        setCakes(result.data);
    }
    const getTaxs = async () => {
        const result = await axios.get("http://localhost:8000/Taxs/");
        setTaxs(result.data);
    }
    useEffect(() => { getCakes(); getTaxs(); }, [])



    const confirm = async(e,cake) => {
        console.log(cake);
        const result=await axios.delete("http://localhost:8000/Cakes/delete/"+cake.id,{
            headers:{
                accessToken:localStorage.getItem("accessToken")
            }
        });
        if(result)
        {
            message.success("Cake is Deleted!")
        }
        else{
            message.error("Cake is Not Deleted");
        }
        getCakes();
    };
    let tax;
    return (<div style={{ margin: "20px" }}>
        <AddCakes />

        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 400,
                background: "rgba(256,256,256,.5)",
                borderRadius: 15,
            }}
        ><Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {
                    cakes.map((cake) => {
                        tax = taxs.filter((t) => t.id === cake.TaxId);
                        console.log(tax[0]);
                        return (
                            <Col className="gutter-row" span="4" key={cake.id} offset={1} style={{ padding: "10px", }} >
                                <Card
                                    hoverable
                                    style={{
                                        width: 240,
                                        marginTop: 30,
                                    }}
                                    cover={<img alt="example" height="250px" src={cake.pic} />}
                                >
                                    {cake.name} <br />

                                    {(`price: ₹ ` + cake.price)} + [ {tax[0].Rate}% ]
                                    <br />
                                    <Popconfirm
                                        title="Delete the Cake"
                                        description="Are you sure to delete this Cake Info?"
                                        onConfirm={(e)=>confirm(e,cake)}

                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button type='primary' style={{ margin: '5px ', width: "100%", background: "tomato" }} >Delete</Button>
                                    </Popconfirm>

                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Content>


    </div>)
}

export default Cakes
