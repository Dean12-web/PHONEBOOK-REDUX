import React, { useEffect, useRef, useState } from 'react';
import PhoneList from './PhoneList';

export default function PhoneBox({ data, updateUser, removeUser, isLoading }) {
    const containerRef = useRef(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;
            if (
                container &&
                container.scrollTop + container.clientHeight === container.scrollHeight &&
                !loading
            ) {
                setPage(prevPage => prevPage + 1);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        // Simulate fetching data from the server
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [page]);

    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    phonebooks={data}
                    update={updateUser}
                    remove={removeUser}
                    containerRef={containerRef}
                    isLoading={isLoading || loading}
                />
                {isLoading || loading ? (
                    <div className="text-center mt-3">Loading...</div>
                ) : null}
            </main>
        </div>
    );
}
