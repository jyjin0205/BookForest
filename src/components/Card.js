function Card({ imageUrl, title, author, content, onClick }) {
    return (
        <div className="item-card" onClick={onClick}>
            <img src={imageUrl} alt={title} className="item-card__image" />
            <div className="item-card__content">
                <h2 className="item-card__name">{title}</h2>
                <p className="item-card__author">{author}</p>
                <p className="item-card__content">{content}</p>
            </div>
        </div>
    );
}

export default Card;
