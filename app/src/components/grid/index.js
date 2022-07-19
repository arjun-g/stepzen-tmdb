import { ItemCard } from "../itemcard"
import "./grid.css";

export function Grid({
    items,
    style,
    mediaType
}){
    return <div className="grid" style={style}>
        <ul className="autogrid">
            {items.map(item => {
                return <li key={item.id}><ItemCard item={item} mediaType={mediaType} /></li>
            })}
        </ul>
    </div>
}