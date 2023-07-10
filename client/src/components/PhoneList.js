import { useEffect, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateParams } from '../actions/phonebooks';
import PhoneItem from './PhoneItem';

export default function PhoneList({ remove, update }) {
    const phonebooks = useSelector((state) => state.phonebooks);
    const pagination = useSelector((state) => state.pagination);
    const dispatch = useDispatch();
    const containerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    useEffect(() => {
        if (pagination.page > 1 && pagination.page <= pagination.totalPage) {
            dispatch(fetchData());
        }
    }, [pagination.page, pagination.totalPage, dispatch]);

    const handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        if (
            scrollHeight - scrollTop - clientHeight <= 1 &&
            pagination.page <= pagination.totalPage
        ) {
            dispatch(updateParams({ page: pagination.page + 1 }));
        }
    };

    const filteredPhonebooks = useMemo(() => {
        const { searchQuery, sortBy, sortMode } = pagination;

        // Filter phonebooks based on search query
        const filtered = phonebooks.filter((phonebook) => {
            const nameMatch = phonebook.name.toLowerCase().includes(searchQuery.toLowerCase());
            const phoneMatch = phonebook.phone.includes(searchQuery);
            return nameMatch || phoneMatch;
        });

        // Sort phonebooks based on sort parameters
        const sorted = filtered.sort((a, b) => {
            if (sortBy === 'name') {
                return sortMode === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else {
                // Add sorting logic for other properties if needed
                return 0;
            }
        });

        return sorted;
    }, [phonebooks, pagination]);

    return (
        <div style={{ height: '300px', overflow: 'scroll' }} ref={containerRef} onScroll={handleScroll}>
            <ul>
                {filteredPhonebooks.map((phonebook) => (
                    <PhoneItem
                        key={phonebook.id}
                        phonebook={phonebook}
                        update={update}
                        remove={() => remove(phonebook.id)}
                    />
                ))}
            </ul>
        </div>
    );
}

