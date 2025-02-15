import "./MyReview.css";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";

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

export default function MyReview({ review }: ReviewProps) {
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
                        className="media-image"
                    />
                ))}
            </div>
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    className="buttons"
                    sx={{borderRadius: '0.5rem'}}
                >
                    <Button sx={{background: '#1a1a1a', borderRadius: '0.5rem'}}>Удалить</Button>
                    <Button sx={{background: '#1a1a1a', borderRadius: '0.5rem'}}>Изменить</Button>
                </ButtonGroup>

        </div>
    );
}
