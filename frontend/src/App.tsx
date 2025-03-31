import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  MainLayout from "@/layouts/main-layout.tsx";
import  Dashboard  from "@/pages/dashboard.tsx";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                </Routes>
                <Toaster />
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;