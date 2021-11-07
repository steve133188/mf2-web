import '../styles/components/font.scss';
import '../styles/components/tag.scss';

export function tag(props) {
    return (
        <span className={"tag tag_text tag_"+(props.is_team ? "team_" : "_")+props.order}>
            {props.text}
        </span>
    )
}
