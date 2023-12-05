import { BrowserRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query';
import { AppRoutes } from './AppRoutes';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';


import './App.css';

const queryClient = new QueryClient();

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <AppRoutes />
                </QueryClientProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
