//Item Card Component
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div>
      <div>
        <img
          className="card_image"
          src={item.link}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className="card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
