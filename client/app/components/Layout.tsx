"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import Sidebar from "./admin/Sidebar";
import { usePathname } from 'next/navigation';

export default function Layout({ children }: any) {
    const pathname = usePathname();
    const pathSegments = pathname.split('/'); 
    const isAdminPage = pathSegments.includes("admin");

    return (
        <>
            {!isAdminPage && (
                <div className="sticky top-0 z-50">
                    <Nav />
                </div>
            )}

            <div className={`flex ${isAdminPage ? "min-h-screen" : ""}`}>
                {isAdminPage && <Sidebar />}
                <main className={`flex-1 ${isAdminPage ? "p-6" : ""}`}>
                    {children}
                </main>
            </div>

            {!isAdminPage && <Footer />}
        </>
    );
}
