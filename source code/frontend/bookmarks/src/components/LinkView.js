import { useEffect } from 'react';
import { constructImageSource } from './Utils';

const LinkView = ({ link, openInNewWindow }) => {

    useEffect(() => {
        document.getElementById(`description${link.id}`).innerHTML = link.description;
    }, []);

    const handleOpen = () => {
        window.open(link.url, openInNewWindow ? "_blank" : "_self");
    };

    return (
        <button className='w-100 btn btn-light d-flex justify-content-between' onClick={handleOpen}>
            <div className='d-flex flex-column align-items-center justify-content-center w-25'>
                <img width="200" height="200" src={constructImageSource(link.image)} alt={`Image ${link.id}`} />
                <h3 className='text-break'>{link.name}</h3>
            </div>
            <div className='d-flex flex-column w-75 align-items-center justify-content-center align-middle' id={`description${link.id}`}></div>
        </button>
    );

};

export default LinkView;