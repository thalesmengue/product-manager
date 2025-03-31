import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <header className="border-b">
                <div className="container mx-auto py-4">
                    <h1 className="text-2xl font-bold ml-8">Product Manager</h1>
                </div>
            </header>
            <main className="flex-1 container mx-auto py-8">
                <Outlet />
            </main>
            <footer className="border-t py-4">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Product Manager
                </div>
            </footer>
        </div>
    );
}