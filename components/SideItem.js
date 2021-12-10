import Link from "next/link";
import {CommentsAltSVG} from "../public/side_bar_icon_svg/side_bar_icon_svg";


export default function NavItem ({url , name , icon , active}) {

    return(
        <div className={(active ? "active-side-item" : "side-item ")}>
            <Link href={url}>
                <div className={"nav-item " + (active ? "active " : null)}>
                    {icon}
                    <span className="side-item-name">{name}</span>
                </div>
            </Link>
        </div>
    )

}