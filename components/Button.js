export function IconButton({children,...props}) {
    const {logo} = props;
    return (
        <div className="iconButtonContainer">

                <button variant="contained" color="neutral">
                    <img
                        src={logo}
                        width="17px" height="17px" alt=""/>
                </button>

        </div>
    )
}

export function NormalButton({children,...props}) {
    const {onClick} = props
    return (
        <div className="normalButton">

                <button variant="contained" color="neutral" onClick={onClick}>
                    {children}
                </button>

        </div>
    )
}


export function NormalButton2({ children ,...props}) {
    const {disabled , onClick} = props
    return (
        <div className="newContactButton">
                <button variant="contained" className={"primary_btn"}  disabled={disabled} onClick={onClick}>
                    {children}
                </button>
        </div>
    )
}

export function FunctionButton(props) {
    return (
        <button className="selectButton" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export function FunctionCancelButton(props) {
    return (
        <button className="cancelButton" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export function ConfirmButton(props) {
    return (
        <button className="addButton" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export function SelectButton(props) {
    return (
        <button className="selectButton" onClick={props.onClick}>
            Select
        </button>
    )
}

export function CancelButton(props) {
return (
        <button className="cancelButton" onClick={props.onClick}>
            Cancel
        </button>
    )
}
export function LeftButton(props) {
    return (
        <button className={"leftButton" } onClick={props.onclick} onSubmit={props.submit}>
            {props.title}
        </button>
    )
}
export function RightlButton(props) {
    return (
            <button className={"rightButton"} onClick={props.onclick}>
                {props.title}
            </button>
        )
    }

export function AddButton(props) {
    return (
        <button className="addButton" onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export function NormalButton3(props) {
    return (
        <div className="newNoteButton">
                <button variant="contained" color="secondary" onClick={props.onClick}>
                    {props.children}
                </button>
        </div>
    )
}

export function TextWithIconButton({ children, ...props }) {
    const {onClick} = props
    return (
        <div className="textWithIconButton">
                <button variant="contained" color="neutral" onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-pencil" viewBox="0 0 16 16" style={{marginRight: "4px"}}>
                        <path
                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    <span>{children}</span>
                </button>
        </div>
    )
}

export function ThreeDotsMenu() {
    return (
        <div className="threeDotsMenu"></div>
    )
}