import PhoneList from "./PhoneList"

export default function PhoneBox({data, updateUser, removeUser}) {
    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    phonebooks={data}
                    update={updateUser}
                    remove={removeUser}/>
            </main>
        </div>
    )
}