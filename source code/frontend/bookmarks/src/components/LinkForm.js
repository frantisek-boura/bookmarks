import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { constructImageSource } from './Utils';
import HistoryTable from './HistoryTable';
import {Trash, XLg} from 'react-bootstrap-icons';

const LinkForm = ({ open, actionCallback, closeCallback, editing, form, deleteCallback }) => {

    const [opened, setOpened] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        image: null,
        description: ''
    });
    const [errors, setErrors] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [editor, setEditor] = useState('');

    useEffect(() => {
        setFormData({
            name: '',
            url: '',
            image: null,
            description: ''
        }); 
        setOpened(open);
    }, [open]);

    useEffect(() => {
        if (!editing) {
            
            clearInputs();
        } else prefillInputs();
    }, [editing]);

    useEffect(() => {
        validateInput();
    }, [formData]);

    const prefillInputs = () => {
        const newFormData = {
            ...form,
            image: null
        };

        setFormData(newFormData);

        const formElement = document.getElementById("linkForm");
        formElement.elements["name"].value = form.name;
        formElement.elements["url"].value = form.url;

        setEditor(form.description);
    };

    const clearInputs = () => {
        const form = document.getElementById("linkForm");
        form.elements["name"].value = '';
        form.elements["url"].value = '';
        form.elements["image"].value = ''; 
        setEditor('');
    };

    const validateInput = () => {
        const urlRegex = /^(.+:\/\/)?([^\s\/$.?#].[^\s]*)$/;
        let errorArray = [];
        if (formData.name.length === 0) errorArray.push("Enter a name");
        if (!urlRegex.test(formData.url)) errorArray.push("Enter a URL");
        if (!editing && formData.image == null) errorArray.push("Add an image");

        setErrors(errorArray);
        setSubmitEnabled(errorArray.length === 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actionCallback(formData);
        handleClose();
    };

    const handleFormDataChange = (e) => {
        const valid = validateInput();
        setSubmitEnabled(valid);

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImageChoice = (e) => {
        const valid = validateInput();
        setSubmitEnabled(valid);

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.files[0]
        }));
    };

    const handleEditorChange = (description) => {
        setFormData((prev) => ({
            ...prev,
            description: description
        }));
        setEditor(description);
    };

    const handleClose = () => {
        setFormData({
            name: '',
            url: '',
            image: null,
            description: ''
        });
        setOpened(false);
        closeCallback();
        clearInputs();
    };

    return (
        <dialog className='border border-primary rounded p-0' style={{zIndex: 1}} open={opened}>
            <div className='d-flex justify-content-between align-items-center bg-primary'>
                <button className='m-3 btn btn-secondary' onClick={handleClose}><XLg/></button>
                <div className='p-3 text-center  text-light'>{editing ? "Edit link" : "Add link"}</div>
                {editing ? <button className='m-3 btn btn-danger' onClick={() => deleteCallback(form.id)}><Trash/></button> : <div> </div>}
            </div>
            <div className='p-3'>
                {errors.length !== 0 && (<div className='d-flex flex-column align-items-center alert alert-danger p-2 m-2'>{errors.map((error, index) => (<span key={index}className='error'>{error}</span>))}</div>)}
                <form className='d-flex flex-column py-2' id="linkForm" onSubmit={handleSubmit} encType='multipart/form-data'>
                    <label>Name<input className='w-100 form-control border border-primary' onChange={handleFormDataChange} type="text" name="name" /></label>
                    <label>URL<input className='w-100 form-control border border-primary' onChange={handleFormDataChange} type="text" name="url" /></label>
                    <label>
                        Image
                        <div className='d-flex justify-content-around align-items-center'>
                            <label className='btn btn-primary'>{formData.image == null ? "Choose image" : formData.image.name}<input style={{display:'none'}} onChange={handleImageChoice} type="file" accept="image/png" name="image" /></label>
                            {editing && <div className='d-flex justify-content-between align-items-center w-25'>Current image:<img width="50" height="50" src={constructImageSource(form.image)} alt={`Link img ${form.id}`} /></div>}
                        </div>
                    </label>
                    <ReactQuill theme="snow" className='border border-primary rounded m-2 mh-50' value={editor} onChange={handleEditorChange}/>
                    <div>
                        <input className='btn btn-primary' type="submit" value="Submit" disabled={!submitEnabled}/>
                    </div>
                    {editing && <HistoryTable linkId={form.id}/>}
                </form> 
            </div>
        </dialog>
    );

}

export default LinkForm;