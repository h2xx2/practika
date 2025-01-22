
interface FeedbackCellsProps {
    feedbackComment: string;
    img: string// Задаем тип для `feedbackComment`
}

export default function FeedbackCells(props : FeedbackCellsProps) {
    return (
        <>
        <div className="App">
            <img src={props.img} alt = 'image' className="App-logo"/>
            <h2>{props.feedbackComment}</h2>
        </div>
        </>
    )
}