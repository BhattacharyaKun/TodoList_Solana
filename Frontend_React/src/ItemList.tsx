import Item from "./Item";
import { ListItemProps } from "./types";

const ItemList = ({ items, handleCheck, handleDelete}: ListItemProps) => {
  return (
    <ul>
    {items.map((item) => (
        <Item key={item.id} item={item} handleCheck={handleCheck} handleDelete={handleDelete}/>
    ))}
    </ul>
  );
}

export default ItemList;