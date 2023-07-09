import { useEffect, useRef } from 'react';
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

    return (
        <div style={{ height: '300px', overflow: 'scroll' }} ref={containerRef} onScroll={handleScroll}>
            <ul>
                {phonebooks.map((phonebook) => (
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
