import PhoneItem from "./PhoneItem"
export default function PhoneList({ phonebooks, remove, update,containerRef}) {
    return (
        <div ref={containerRef} style={{ height:'250px', overflowY:"scroll" }}>
            <ul>
                {
                    phonebooks.map((user) => (
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