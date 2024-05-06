import { useState, useEffect } from 'react';
import Link from './Link';
import ConfirmationBox from './ConfirmationBox';
import LinkForm from './LinkForm';
import axios from 'axios';
import { PlusLg, Trash, ArrowRepeat } from 'react-bootstrap-icons';

const LinkTable = ({ links, refreshCallback }) => {

    const [confirmPrompt, setConfirmPrompt] = useState("");
    const [confirmOpened, setConfirmOpened] = useState(false);
    const [confirmCallback, setConfirmCallback] = useState(null);
    const [error, setError] = useState("");

    const [addOpened, setAddOpened] = useState(false);
    const [actionCallback, setActionCallback] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editedForm, setEditedForm] = useState({});

    const editLink = (newData) => {
        setAddOpened(false);

        axios.post("http://localhost:8080/link/update", {
            ...newData
        }, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(() => {
            refreshCallback();
            stopEditing();
        }).catch(() => {
            setError("Failed to edit a new link...");
            stopEditing();
        });
    }

    const addLink = (formData) => {
        closeLinkForm();

        axios.post("http://localhost:8080/link", {
            name: formData.name,
            url: formData.url,
            image: formData.image,
            description: formData.description
        }, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(() => {
            refreshCallback();
        }).catch(() => {
            setError("Failed to add a new link...");
        });

    }

    const purgeLinks = () => {
        closeConfirm();

        axios.post("http://localhost:8080/link/purge")
        .then(() => {
            refreshCallback()
        }).catch(() => {
            setError("Failed to purge links...");
        });
    }

    const deleteLink = (linkId) => {
        setConfirmOpened(false);

        axios.post("http://localhost:8080/link/delete", {
            id: linkId 
        }, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        }).then(() => {
            refreshCallback();
            closeLinkForm();
        }).catch(() => {
            setError("Failed to delete link...");
        });
    }

    const closeConfirm = () => {
        setConfirmOpened(false);
    }

    const closeLinkForm = () => {
        setAddOpened(false);
        stopEditing();
    }

    const stopEditing = () => {
        setEditing(false);
        setEditedForm({});
    }

    const handleEditButton = (link) => {
        setEditing(true);
        setEditedForm(link);
        setActionCallback(() => (newData) => editLink(newData));
        setAddOpened(true);
    }

    const handleAddButton = () => {
        setEditing(false);
        setEditedForm({});
        setActionCallback(() => (data) => addLink(data));
        setAddOpened(true);
    }

    const handlePurgeButton = () => {
        setConfirmPrompt("Do you really wish to purge all links?");
        setConfirmCallback(() => () => purgeLinks());
        setConfirmOpened(true);
    }

    const handleDeleteButton = (linkId) => {
        setConfirmPrompt("Do you really wish to delete this link?");
        setConfirmCallback(() => () => deleteLink(linkId));
        setConfirmOpened(true);
    }

    useEffect(() => {
        if (error.length === 0) return;

        setTimeout(() => {
            setError("");
        }, 5000);
    }, [error]);

    return (
        <section className='d-flex justify-content-center'>
            <ConfirmationBox prompt={confirmPrompt} open={confirmOpened} confirmCallback={confirmCallback} closeCallback={closeConfirm} />
            <LinkForm open={addOpened} actionCallback={actionCallback} closeCallback={closeLinkForm} editing={editing} form={editedForm} deleteCallback={handleDeleteButton}/>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-center'>
                    {links.length === 0 && "Nothing to see here... try adding a link."}
                    <button className='btn btn-primary m-1' onClick={handleAddButton}><PlusLg/></button>
                    <button className='btn btn-secondary m-1' onClick={() => refreshCallback()}><ArrowRepeat/></button>
                    {links.length !== 0 && <button className='btn btn-danger m-1' onClick={handlePurgeButton}><Trash/></button>}
                    {error.length === 0 && <div className='error'>{error}</div>}
                </div>
                {(error.length === 0 && links.length > 0) && (
                    <table className='table table-striped text-center align-center'>
                        <thead>
                            <tr>
                                <td className='text-break' scope='col'>Name</td>
                                <td className='text-break' scope='col'>URL</td>
                                <td className='text-break' scope='col'>New tab</td>
                                <td className='text-break' scope='col'>Firefox</td>
                                <td className='text-break' scope='col'>Chrome</td>
                                <td className='text-break' scope='col'>Active</td>
                                <td className='text-break' scope='col'>Edit</td>
                                <td className='text-break' scope='col'>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {links.map(link => <Link key={link.id} linkData={link} deleteButtonCallback={() => handleDeleteButton(link.id)} editButtonCallback={() => handleEditButton(link)} />)}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );

};

export default LinkTable;