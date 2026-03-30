import Footer from "../components/common/Footer.tsx";
import Header from "../components/common/Header.tsx";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}): LayoutProps {
    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}