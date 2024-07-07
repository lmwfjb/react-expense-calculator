import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import SettlementPage from './SettlementPage';

const participantsList = ['A', 'B', 'C', 'D', 'E'];

const App = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);
    }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => {
        setExpenses(prevExpenses => [...prevExpenses, expense]);
    };

    return (
        <Router basename={ process.env.PUBLIC_URL }>
            <Routes>
                <Route path="/" element={<MainPage 
                    expenses={expenses} 
                    setExpenses={setExpenses} 
                    addExpense={addExpense} 
                    participantsList={participantsList} 
                />} />
                <Route path="/settlement" element={<SettlementPage 
                    expenses={expenses} 
                    participants={participantsList} 
                />} />
            </Routes>
        </Router>
    );
};

export default App;