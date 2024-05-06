import { Trash, Tools, CheckLg, XLg, ArrowDownRightSquareFill } from 'react-bootstrap-icons';

const Link = ({linkData, deleteButtonCallback, editButtonCallback}) => {

    const handleOpen = () => {
        window.open(linkData.url, "_blank");
    };

    return (
        <tr className='align-middle text-center'>
            <td style={{maxWidth:'300px'}}className='text-break'>{linkData.name}</td>
            <td style={{maxWidth:'300px'}}className='text-break'>{linkData.url}</td>
            <td style={{maxWidth:'300px'}}className='text-break'><button className='btn btn-primary' onClick={handleOpen}><ArrowDownRightSquareFill/></button></td>
            <td style={{maxWidth:'300px'}}className='text-break'>{linkData.availableFirefox ? <CheckLg color="green"/> : <XLg color="red"/>}</td> 
            <td style={{maxWidth:'300px'}}className='text-break'>{linkData.availableChrome ? <CheckLg color="green"/> : <XLg color="red"/>}</td>
            <td style={{maxWidth:'300px'}}className='text-break'>{linkData.active ? <CheckLg color="green"/> : <XLg color="red"/>}</td>
            <td style={{maxWidth:'300px'}}className='text-break'><button className='btn btn-secondary' onClick={() => editButtonCallback(linkData)}><Tools/></button></td>
            <td style={{maxWidth:'300px'}}className='text-break'><button className='btn btn-danger' onClick={() => deleteButtonCallback(linkData.id)}><Trash/></button></td>
        </tr>
    );

};

export default Link;