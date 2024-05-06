import { useState, useEffect } from 'react';
import axios from 'axios';
import LinkView from './LinkView';

const LinkOverview = ({ links }) => {

    const [filteredLinks, setFilteredLinks] = useState([]);
    const [filters, setFilters] = useState({
        checkChrome: false,
        checkFirefox: false,
        checkActive: false,
        checkOpenInNewWindow: true
    });

    useEffect(() => {
        filterLinks();
    }, [filters]);

    const filterLinks = () => {
        if (!filters.checkChrome && !filters.checkFirefox && !filters.checkActive) {
            setFilteredLinks(links);
            return;
        }

        let filtered = links;
        if (filters.checkActive) filtered = filtered.filter(l => l.active === filters.checkActive);
        if (filters.checkChrome) filtered = filtered.filter(l => l.availableChrome === filters.checkChrome);
        if (filters.checkFirefox) filtered = filtered.filter(l => l.availableFirefox === filters.checkFirefox);

        setFilteredLinks(filtered);
    }

    const handleFilterChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.checked
        }));
    };

    return (
        <>
            {links.length === 0 && (<div>Nothing to see here... go back and add a link.</div>)}
            {links.length > 0 && 
            <>
                <section className=''>
                    <div className='d-flex justify-content-around text-white bg-secondary m-2 rounded'>
                        <label className='d-flex align-items-center p-2'>Available in Chrome <div className='p-2'><input className='form-check-input' onChange={handleFilterChange} checked={filters.checkChrome} type="checkbox" name="checkChrome" /></div></label>
                        <label className='d-flex align-items-center p-2'>Available in Firefox <div className='p-2'><input className='form-check-input' onChange={handleFilterChange} checked={filters.checkFirefox} type="checkbox" name="checkFirefox"  /></div></label>
                        <label className='d-flex align-items-center p-2'>Active <div className='p-2'><input className='form-check-input' onChange={handleFilterChange} checked={filters.checkActive} type="checkbox" name="checkActive"  /></div></label>
                        <label className='d-flex align-items-center p-2'>Open in a new window <div className='p-2'><input className='form-check-input' onChange={handleFilterChange} checked={filters.checkOpenInNewWindow} type="checkbox" name="checkOpenInNewWindow" /></div></label>
                    </div>
                    {filteredLinks.map((link, index) => <LinkView key={index} link={link} openInNewWindow={filters.checkOpenInNewWindow}/>)}
                </section>
            </>
            }
        </>
    );

};

export default LinkOverview;
