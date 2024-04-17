import { useState } from 'react';
import { useContactFormMutation } from '../../api/contacts';
import TopNavBar from '../landingPage/topNavBar';

function ContactsForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const [createContact] = useContactFormMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createContact({ variables: { name, email, phone, message } });
            // Set alert message
            setAlertMessage('Your message has been received. We will get back to you soon.');
            // Reset form fields
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (error) {
            console.error('Error creating contact:', error);
            // Handle error (e.g., display an error message to the user)
        }
    };

    return (
        <div className="">
            <TopNavBar />
            <section className="min-h-screen flex items-center justify-center mt-10">
                <div className="container mx-auto">
                    <div className="bg-gray-300 flex rounded-2xl shadow-lg p-8 items-center">
                        <div className="w-full md:w-1/2 md:px-8">
                            <h2 className="text-center font-bold text-2xl text-to-black mb-4">Contact Us</h2>
                            <p className="text-center mb-4">
                                Have questions or need assistance? Contact us using the form below and we'll get back to you as soon as possible.
                            </p>
                            {/* Display alert message */}
                            {alertMessage && <div className="text-center text-green-600 mb-4">{alertMessage}</div>}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className="p-2 rounded-xl border"
                                    required
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="p-2 rounded-xl border"
                                    required
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                    className="p-2 rounded-xl border"
                                    required
                                />
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Message"
                                    className="p-2 rounded-xl border"
                                    rows="4"
                                    required
                                ></textarea>
                                <button type="submit" className="bg-primary rounded-xl text-white py-2 hover:scale-105 duration-300">Submit</button>
                            </form>
                        </div>
                        <div className="md:block hidden w-1/2">
                            <img className="rounded-2xl mx-auto" src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Login" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactsForm;
 



