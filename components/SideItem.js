import Link from "next/link";

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
