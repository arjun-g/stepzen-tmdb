import { ItemCard } from "../itemcard"
import "./grid.css";

export function Grid({
    items,
    style
}){
    return <div className="grid" style={style}>
        <ul className="autogrid">
            {items.map(item => {
                return <li key={item.id}><ItemCard item={item} /></li>
            })}
        </ul>
    </div>
}