import { useEffect } from "react";
import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove, update }) {
    return (
        <div style={{ height: '250px', overflowY: "scroll" }}>
            <ul>
                {
                    users.map((user) => (
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