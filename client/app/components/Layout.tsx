import Nav from "./Nav";
import Footer from "./Footer";


export default function Layout({children}:any){
    return(
        <>
        <div className="sticky top-0 z-50">
            <Nav/>
        </div>
            
            {children}
            <Footer />
        </>
    )
}