import { useState, useEffect } from 'react';

const ConfirmationBox = ({ prompt, open, confirmCallback, closeCallback }) => {

    const [opened, setOpened] = useState(false);
    
    useEffect(() => {
        setOpened(open);
    }, [open])

    return (
        <dialog className='border border-danger rounded p-3' style={{zIndex: 2}} open={opened}>
            <p className='text-danger'>{prompt}</p>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-danger' onClick={confirmCallback}>Confirm</button>
                <button className='btn btn-secondary' onClick={closeCallback}>Cancel</button>
            </div>
        </dialog>
    );

};

export default ConfirmationBox;
