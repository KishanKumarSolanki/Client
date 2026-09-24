/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Demo accounts
export const DEMO_ACCOUNTS = {
    admin: { email: 'admin@lms.com', password: 'admin123', role: 'admin', name: 'Admin User', avatar: 'A' },
    teacher: { email: 'teacher@lms.com', password: 'teacher123', role: 'teacher', name: 'Dr. Sarah Khan', avatar: 'S' },
    student: { email: 'student@lms.com', password: 'student123', role: 'student', name: 'Rahul Sharma', avatar: 'R' },
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem('lms_user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });
    const loading = false;

    const login = (email, password) => {
        const account = Object.values(DEMO_ACCOUNTS).find(
            a => a.email === email && a.password === password
        );
        if (account) {
            const userData = { ...account };
            setUser(userData);
            localStorage.setItem('lms_user', JSON.stringify(userData));
            return { success: true, role: userData.role };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('lms_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
