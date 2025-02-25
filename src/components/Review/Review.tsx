import "./Review.css";

interface MediaFile {
    id: string;
    file_type: string;
    uploaded_at: string;
    storage_path: string;
    url: string;
}

interface User {
    email: string;
}

interface ReviewType {
    id: string;
    created_at: string;
    user_id: string;
    title: string;
    description: string;
    media_files: MediaFile[];
    users: User;
}

interface ReviewProps {
    review: ReviewType;
}

export default function Review({ review }: ReviewProps) {
    return (
        <div className="review-container">
            <div className='user-info-container'>
                <div className='user-info'>
                    <p>{review.users.email}</p>
                </div>
                <div className='date-info'>
                    <p>{new Date(review.created_at).toLocaleString()}</p>
                </div>
            </div>
            <p className='title'>{review.title}</p>
            <p className='description'>{review.description}</p>
            <div className="media-gallery">
                {review.media_files.map((file) => (
                    <img
                        key={file.id}
                        src={file.url}
                        alt={file.file_type}
                        className="img"
                    />
                ))}
            </div>
        </div>
    );
}
