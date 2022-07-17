import { ItemCard } from "../itemcard"
import "./grid.css";

export function Grid({
    items
}){
    return <div className="grid">
        <ul className="autogrid">
            {items.map(item => {
                return <li key={item.id}><ItemCard item={item} /></li>
            })}
        </ul>
    </div>
}