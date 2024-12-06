import "./RecommendationCard.css";

function RecommendationCard({ imageUrl, title, author, content, onClick }) {
    return (
        <div className="item-card-2" onClick={onClick}>
            <img src={imageUrl} alt={title} className="item-card__image-2" />
            <div className="item-card__content-2">
                <h2 className="item-card__name-2">Book : {title}</h2>
                <p className="item-card__author-2">Writer : {author}</p>
                <p className="item-card__content-2">{content}</p>
            </div>
        </div>
    );
}

export default RecommendationCard;
