import { useState, useEffect } from 'react';
import LinkTable from './components/LinkTable';
import LinkOverview from './components/LinkOverview';
import axios from 'axios';

const App = () => {

    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [choice, setChoice] = useState(true);

    const fetchLinks = () => {
        axios.get("http://localhost:8080/link")
            .then((response) => {
                setLoading(false);
                setError(false);
                setLinks(response.data);
            }).catch(() => {
                setLoading(false);
                setError(true);
            }); 
    }

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleChoice = () => {
        setChoice(prev => !prev);
    }

    return (
        <div className='container m-auto d-flex flex-column '>
            <div className='d-flex flex-row justify-content-center m-1'>
                <button className='btn btn-primary' onClick={handleChoice}>{choice ? "Show Overview..." : "Show List..."}</button>
            </div>
            {loading ? (<div>Loading...</div>) : error ? (<div>Error occured while fetching data</div>) : (
                choice ? <LinkTable links={links} refreshCallback={fetchLinks}/>
                : <LinkOverview links={links} />
            )}
        </div>
    );
};

export default App;
