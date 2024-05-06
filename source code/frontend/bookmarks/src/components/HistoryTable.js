import {useState, useEffect} from 'react';
import axios from 'axios';
import HistoryRecord from './HistoryRecord';

const HistoryTable = ({linkId}) => {

    const [records, setRecords] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('http://localhost:8080/history', {
            id: linkId
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            setRecords(response.data)
            setLoading(false);
            setError(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
        })
    }, []);

    return (
        (error.length === 0 && !loading) ? "Error fetching data" :  
        (loading ? "Loading..." : (
        <section >
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>Date of change</td>
                        <td>Name</td>
                        <td>URL</td>
                        <td>Image</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => <HistoryRecord key={index} data={record}/>)}
                </tbody>
            </table>
        </section>)
        )
    );

};

export default HistoryTable;