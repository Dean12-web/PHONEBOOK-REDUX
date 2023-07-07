import PhoneItem from "./PhoneItem"
export default function PhoneList({ phonebooks, remove, update }) {
    return (
        <div style={{ height: '250px', overflowY: "scroll" }}>
            <ul>
                {
                    phonebooks.map((phonebook) => (
                        <PhoneItem
                            key={phonebook.id}
                            phonebook={phonebook}
                            update={update}
                            remove={() => remove(phonebook.id)} />
                    ))
                }
            </ul>
        </div>
    )
}