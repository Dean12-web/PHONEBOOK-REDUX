import React from 'react';
import PhoneItem from './PhoneItem';

export default function PhoneList({ phonebooks, remove, update, containerRef, isLoading }) {
    const data = phonebooks.data
    // console.log(phonebooks.data)
    if (!Array.isArray(data)) {
        return <div>No phonebooks available</div>;
    }
    return (
        <div ref={containerRef} style={{ height: '250px', overflowY: 'scroll' }}>
            <ul>
                {data.map(user => (
                    <PhoneItem key={user.id} user={user} update={update} remove={() => remove(user.id)} />
                ))}
                {isLoading ? <li className="text-center">Loading...</li> : null}
            </ul>
        </div>
    );
}
