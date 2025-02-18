import DrawerAppBar from "../components/NavigationHeader.tsx";
import Main from "../components/Main/Main.tsx";
import Footer from "../components/footer/Footer.tsx";

import ChatWidget from "../components/Chat/Chat.tsx";

export default function Home(){
    return (
        <>
            <DrawerAppBar></DrawerAppBar>
            <Main></Main>
            <ChatWidget></ChatWidget>
            <Footer></Footer>
        </>
    )
}