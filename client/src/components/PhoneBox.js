import PhoneList from "./PhoneList"

export default function PhoneBox({updateUser, removeUser}) {
    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    update={updateUser}
                    remove={removeUser}/>
            </main>
        </div>
    )
}