import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Modal, Button, Table, Avatar, Row, Col, Typography } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import InputPageModal from './InputPageModal';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const formatNumber = (number) => {
    return new Intl.NumberFormat('zh-TW', { 
        style: 'decimal',
        maximumFractionDigits: 0
    }).format(number);
};

const MainPage = ({ expenses, addExpense, participantsList }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddExpense = (expense) => {
        addExpense(expense);
        setModalOpen(false);
    };

    const totalAmount = useMemo(() => expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0), [expenses]);

    const columns = [
        {
            title: '付款人',
            dataIndex: 'payer',
            key: 'payer',
        },
        {
            title: '金額',
            dataIndex: 'amount',
            key: 'amount',
            render: (value) => formatNumber(value),
        },
        {
            title: '項目',
            dataIndex: 'item',
            key: 'item',
        },
        {
            title: '分攤人',
            dataIndex: 'participants',
            key: 'participants',
            render: participants => participants.join(', '),
        },
    ];

    const navigate = useNavigate();
    const handleSettlement = () => {
        console.log("進行結算");
        navigate('/settlement');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header className="header" >
            <Row align="middle">
                <Col>
                    <Row gutter={[8, 0]} align="middle">
                        <Col>
                            <img src="/header-logo.png" alt="Logo" style={{ height: '24px' }} />
                        </Col>
                        <Col>
                            <Title level={4} style={{ color: 'white', margin: 0 }}>
                                分帳小幫手
                            </Title>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <p style={{ color: 'rgb(153 153 153)', fontSize: '12px', margin: 0, paddingLeft: '8px', paddingTop: '8px' }}>
                        Made with React
                    </p>
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
                    <h2>團員列表</h2>
                    <Avatar.Group size="large">
                        {participantsList.map(participant => (
                            <Avatar key={participant} style={{ backgroundColor: '#f56a00' }}>{participant}</Avatar>
                        ))}
                    </Avatar.Group>
                    <h2 style={{ margin: '40px 0px 15px' }}>記帳統計</h2>
                    <Row justify="space-between" align="middle" style={{ margin: '10px 0px' }}>
                        <Col>
                            <p>總計: ${formatNumber(totalAmount)}</p>
                        </Col>
                        <Col>
                            <Button 
                                type="primary" 
                                icon={<PlusCircleOutlined />} 
                                // iconPosition={"end"}
                                onClick={() => setModalOpen(true)}
                            >
                                新增記帳
                            </Button>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={expenses.map((expense, index) => ({ ...expense, key: index }))} />
                </Content>
                {expenses.length > 0 && (
                    <Footer style={{ textAlign: 'center' }}>
                        <Button type="primary" 
                            icon={<EditOutlined />} 
                            // iconPosition={"end"}
                            onClick={handleSettlement}
                        >
                            結算
                        </Button>
                    </Footer>
                )}
            </Layout>

            {/* Modal for InputPage */}
            <Modal
                title="記帳輸入"
                open={modalOpen}
                footer={null}
                onCancel={() => setModalOpen(false)}
            >
                <InputPageModal 
                    addExpense={handleAddExpense} 
                    participantsList={participantsList} 
                />
            </Modal>
        </Layout>
    );
};

export default MainPage;