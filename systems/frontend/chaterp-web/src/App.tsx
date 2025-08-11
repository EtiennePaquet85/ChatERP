// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { TrialPage } from './pages/TrialPage';
import { ContactPage } from './pages/ContactPage';
import { EmployeesPage } from './pages/EmployeesPage';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trial" element={<TrialPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
            </Routes>
        </BrowserRouter>
    );
}
