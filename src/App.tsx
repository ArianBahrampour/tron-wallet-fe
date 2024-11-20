import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Container } from "@mui/material";

const App: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ my: 5 }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </Container>
    );
};

export default App;
