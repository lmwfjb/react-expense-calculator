// src/SettlementPage.js
import React, { useMemo } from 'react';
import { Layout, Table, Button, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftCircleOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const formatNumber = (number) => {
    return new Intl.NumberFormat('zh-TW', { 
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(number);
};

const SettlementPage = ({ expenses, participants }) => {
    const navigate = useNavigate();

    const settlementData = useMemo(() => {
        const data = participants.map(participant => ({
            member: participant,
            sharedAmount: 0,
            paidAmount: 0,
            balanceAmount: 0,
        }));

        expenses.forEach(expense => {
            const payer = expense.payer;
            const amount = parseFloat(expense.amount);
            const sharedParticipants = expense.participants.length;
            const sharedAmount = amount / sharedParticipants;

            expense.participants.forEach(participant => {
                const index = data.findIndex(item => item.member === participant);
                if (index !== -1) {
                    data[index].sharedAmount += sharedAmount;
                }
            });

            const payerIndex = data.findIndex(item => item.member === payer);
            if (payerIndex !== -1) {
                data[payerIndex].paidAmount += amount;
            }
        });

        return data.map(item => ({
            ...item,
            sharedAmount: Math.round(item.sharedAmount),
            paidAmount: Math.round(item.paidAmount),
            balanceAmount: Math.round(item.sharedAmount - item.paidAmount)
        }));
    }, [expenses, participants]);

    const columns = [
        {
            title: '成員',
            dataIndex: 'member',
            key: 'member',
        },
        {
            title: '分攤金額',
            dataIndex: 'sharedAmount',
            key: 'sharedAmount',
            render: (value) => <div style={{ textAlign:'right', paddingRight: '10px' }}>{formatNumber(value)}</div>
        },
        {
            title: '代付金額',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
            render: (value) => <div style={{ textAlign:'right', paddingRight: '10px' }}>{formatNumber(value)}</div>
        },
        {
            title: '應付金額',
            dataIndex: 'balanceAmount',
            key: 'balanceAmount',
            render: (value) => <div style={{ color: value <= 0 ? 'green' : 'red', textAlign:'right', paddingRight: '10px' }}>{formatNumber(value)}</div>
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header">
                <Row align="middle">
                    <Col>
                        <img src="header-logo.png" alt="Logo" style={{ height: '24px' }} />
                    </Col>
                    <Col>
                        <Title level={4} style={{ color: 'white', padding: '4px', margin: 0}}>
                        分帳小幫手
                        </Title>
                    </Col>
                </Row>
            </Header>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <h2>結算頁面</h2>
                    <Table columns={columns} dataSource={settlementData} rowKey="member" pagination={false}/>
                    <Button type="primary" 
                        icon={<LeftCircleOutlined />} 
                        onClick={() => navigate('/')} 
                        style={{ marginTop: 16 }}
                    >
                        返回首頁
                    </Button>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SettlementPage;