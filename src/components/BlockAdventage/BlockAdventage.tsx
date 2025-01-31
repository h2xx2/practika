import "./BlockAdvantage.css"

export default function BlockAdventage(props) {
    return (
        <div className="block">
            <p className='text-number'>
                {/* eslint-disable-next-line react/prop-types */}
                {props.textNumber}
            </p>
            <p className='text'>
                {/* eslint-disable-next-line react/prop-types */}
                {props.text}
            </p>
        </div>
    )
}