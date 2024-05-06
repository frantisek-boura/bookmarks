import axios from 'axios'
import { useState, useEffect } from 'react';
import { constructImageSource, truncateString } from './Utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const HistoryRecord = ({data}) => {
 
    const padZero = (num) => {
        return num < 10 ? '0' + num : num;
    };

    const parseISO8601 = (iso) => {
        const dateTime = new Date(iso);
        return `${padZero(dateTime.getDate())}.${padZero(dateTime.getMonth() + 1)}.${dateTime.getFullYear()} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;
    };

    return (
        <tr className='align-middle'>
            <td>{parseISO8601(data.dateOfChange)}</td>
            <td style={{maxWidth:'200px'}} className='text-break'>{data.name}</td>
            <td style={{maxWidth:'200px'}} className='text-break'>{data.url}</td>
            <td><img width="50" height="50" src={`http://localhost:8080/image/${data.imageId}`} alt={`Old image ${data.imageId}`}/></td>
            <td style={{maxWidth:'200px'}} className='text-break'>{data.description}</td>
        </tr>
    );
    
};

export default HistoryRecord;