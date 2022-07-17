import { TopNav } from "../components/topnav";
import "./pages.css";

export function Page(props){
    return <div className="page">
        <TopNav />
        <div className="pagecontent">
            {props.children}
        </div>
    </div>
}