export function tag(props) {
    return (
        <span className={"tag tag_text tag_"+(props.is_team ? "team_" : "")+props.order}>
            {props.children}
        </span>
    )
}
