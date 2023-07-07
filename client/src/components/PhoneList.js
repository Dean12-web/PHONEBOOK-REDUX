import { useEffect } from "react";
import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove, update }) {
    const phonebook = users.data
    if (!Array.isArray(phonebook)) {
        return <div>No phonebooks available</div>;
    }

    return (
        <div style={{ height: '250px', overflowY: "scroll" }}>
            <ul>
                {
                    phonebook.map((user) => (
                        <PhoneItem
                            key={user.id}
                            user={user}
                            update={update}
                            remove={() => remove(user.id)} />
                    ))
                }
            </ul>
        </div>
    )
}