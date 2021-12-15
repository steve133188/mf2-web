import React from "react";

export function CheckboxM2({props}) {
    const {onclick,checked,id} = props;

    const toggleCheckBox = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);

        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        console.log(selectedUsers)
    };
    return (
        <div className="newCheckboxContainer right">
        <label className="newCheckboxLabel"> <input type="checkbox" id={id} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleCheckBox} />
        </label>
    </div>
    )
}
