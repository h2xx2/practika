import DrawerAppBar from "../components/NavigationHeader.tsx";
import Main from "../components/Main/Main.tsx";
import Footer from "../components/footer/Footer.tsx";

export default function Home(){
    return (
        <>
            <DrawerAppBar></DrawerAppBar>
            <Main></Main>
            <Footer></Footer>
        </>
    )
}