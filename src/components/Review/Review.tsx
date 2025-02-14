import "./Review.css"

export default function Review(){
    return(
        <>
        <div className="review-container">
            <div className='user-info-container'>
                <div className='user-info'>
                    <p>
                        d.shmakov1001@gmail.com
                    </p>
                </div>
                <div className='date-info'>
                    <p>
                        10.01.2005 06:45
                    </p>
                </div>
            </div>
            <p className='title'>
                Мой Отзыв
            </p>
            <p className='description'>
                Супер курсы для прохождения
            </p>
            <div>
                <img src='src/assets/ipad-pro-new-apple-wallpaper-preview.jpg'/>
                <img src='src/assets/ipad-pro-new-apple-wallpaper-preview.jpg'/>
                <img src='src/assets/ipad-pro-new-apple-wallpaper-preview.jpg'/>
                <img src='src/assets/ipad-pro-new-apple-wallpaper-preview.jpg'/>
            </div>
        </div>
        </>
    )
}