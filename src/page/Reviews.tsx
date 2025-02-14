import DrawerAppBar from "../components/NavigationHeader.tsx";
import Review from "../components/Review/Review.tsx";

export default function Reviews() {
    return (
        <>
            <DrawerAppBar></DrawerAppBar>
            <section>
                <Review></Review>
                <Review></Review>
                <Review></Review>
                <Review></Review>
            </section>
        </>
    )
}