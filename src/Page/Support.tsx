import { useState } from 'react';
import Button from '../Component/Button';
import styles from './Support.module.css';
import { useNavigate } from "react-router-dom";

const Support = () => {

    const nav = useNavigate();

    const [ticketNumber, setTicketNumber] = useState<number>();
    const [showModal, setShowModal] = useState(false);
    const [showMain, setShowMain] = useState(true);
    const [formValues, setFormValues] = useState({
        fname: '',
        lname: '',
        email: '',
        topic: '',
    })

    const isFormValid = () => {
        const {fname, lname, email, topic} = formValues;
        return fname.trim() !== '' && lname.trim() !== '' && email.trim() !== '' && topic.trim() !== '';
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        setTicketNumber(Math.floor(Math.random()*10000) + 1);
        setShowModal(true);
        setShowMain(false);
        e.preventDefault(); // karena project ini tidak benar2 submit formnya
    }

    return (
        <div className={styles.App}>
            {showModal && (
                <div id={styles.modal} className={styles.container}>
                    <h1>Thank you for sending us your report, we will track the problem now</h1>
                    <p>ticket number: {ticketNumber}</p>
                    <Button value="Back" onClick={() => nav("/")} className="back"/>
                </div>
            )}
            {showMain && (
                <div id={styles.main} className={styles.container}>
                    <div>
                        <h1>Support Ticket Form</h1>
                        <hr />
                    </div>
                    <form action="" className={styles.content} onSubmit={handleSubmit}>
                        <div className={styles.left}>
                            <h2>Name</h2>
                            <div className={styles.nameContainer}>
                                <div className={styles.name}>
                                    <input value={formValues.fname} onChange={handleInputChange} type="text" id="fname" name='fname' required/>
                                    <label htmlFor="fname">First</label>
                                </div>
                                <div className={styles.name}>
                                    <input value={formValues.lname} onChange={handleInputChange} type="text" id="lname" name='lname' required/>
                                    <label htmlFor="lname">Last</label>
                                </div>
                            </div>
                            <h2><label htmlFor="email">Email</label></h2>
                            <input value={formValues.email} onChange={handleInputChange} type="email" id="email" name='email' required/>
                            <h2>Topic</h2>
                            <div>
                                <input onChange={handleInputChange} type="radio" name="topic" value="general" id="general" required/>
                                <label htmlFor="general">General</label>
                            </div>
                            <div>
                                <input type="radio" name="topic" value="bug" id="bug"/>
                                <label htmlFor="bug">Bug</label>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <h2><label htmlFor="description">Description (optional)</label></h2>
                            <textarea name="description" id="description" cols={30} rows={10}></textarea>
                            <button type='submit' disabled={!isFormValid()} >SEND</button>
                        </div>
                    </form>
                    <Button value="Back" onClick={() => nav("/")} className="back"/>
                </div>
            )}
        </div>
    )
}

export default Support