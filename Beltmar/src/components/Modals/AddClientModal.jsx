import { useState } from 'react';
import { useCreateClientMutation } from '../../api/clientsApi';
import { useCreateCompanyDataMutation } from '../../api/companyDataApi';


function AddClientModal({ show, handleClose }) {
    const [createClient] = useCreateClientMutation();
    const [createCompanyData] = useCreateCompanyDataMutation();

    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        industry: '',
        website: '',
        size: '',
        street: '',
        city: '',
        zipCode: '',
        state: '',
        country: '',
        foundedYear: 0,
        revenue: 0,
        description: '',
        services: [],
        budget: 0,
        marketingChannels: [],
        targetAudience: '',
        competitors: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`);
        
        let parsedValue = value;
    
        if (name === 'foundedYear') {
            parsedValue = parseInt(value, 10) || '';
        } else if (name === 'revenue' || name === 'budget') {
            parsedValue = parseFloat(value) || null;
        } else if (name === 'services' || name === 'marketingChannels' || name === 'competitors') {
            parsedValue = value.split(',').map(item => item.trim()); // Convert string to array
            
            // Check if the array has less than two elements
            if (parsedValue.length < 1) {
                // Show an alert indicating that the array should have at least two elements
                alert(`Please enter at least two ${name}`);
                return; // Prevent further execution
            }
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: parsedValue,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create the company data
            const companyDataResponse = await createCompanyData({
                companyName: formData.companyName,
                industry: formData.industry,
                website: formData.website,
                size: formData.size,
                street: formData.street,
                city: formData.city,
                zipCode: formData.zipCode,
                state: formData.state,
                country: formData.country,
                foundedYear: formData.foundedYear,
                revenue: formData.revenue,
                description: formData.description,
                services: formData.services,
                budget: formData.budget,
                marketingChannels: formData.marketingChannels,
                targetAudience: formData.targetAudience,
                competitors: formData.competitors,
            });

            // Extract the ID of the created company data
            const companyId = companyDataResponse.data.id;

            // Create the client and associate it with the company data
            await createClient({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                companyDataId: companyId,
            });

            // Reset the form data
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                companyName: '',
                industry: '',
                website: '',
                size: '',
                street: '',
                city: '',
                zipCode: '',
                state: '',
                country: '',
                foundedYear: null,
                revenue: null,
                description: '',
                services: [],
                budget: null,
                marketingChannels: [],
                targetAudience: '',
                competitors: [],
            });

            handleClose();

            alert('Company data and client added successfully!');

            // Handle any further actions (e.g., closing the modal)
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    const stateOptions = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];
    
    const industryOptions = ["Technology", "Finance", "Healthcare", "Education", "Manufacturing", "Retail", "Hospitality", "Other"];
    
    const countryOptions = [
        "United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "India", "Japan", "China", "South Korea", "Brazil", "Mexico"
    ];

    const size = ["Small", "Medium", "Large"];

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${show ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl text-center font-bold">Add Client</p>
                            <button className="modal-close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="phoneNumber">
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phoneNumber"
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="companyName">
                                    Company Name
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="companyName"
                                    type="text"
                                    placeholder="Company Name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="industry">
                                    Industry
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                >
                                <option value="">Select Industry</option>
                                    {industryOptions.map((industry, index) => (
                                <option key={index} value={industry}>{industry}</option>
                                ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="website">
                                    Website
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="website"
                                    type="text"
                                    placeholder="Website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="size">
                                    Business Size
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="size"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Size</option>
                                    {size.map((size, index) => (
                                        <option key={index} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                                    Street
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="street"
                                    type="text"
                                    placeholder="Street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                /> 
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                    City
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="city"
                                    type="text"
                                    placeholder="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                                    State
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                >
                                    <option value="">Select State</option>
                                    {stateOptions.map((state, index) => (
                                        <option key={index} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="zipCode">
                                    Zip Code
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="zipCode"
                                    type="text"
                                    placeholder="Zip Code"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                                    Country
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Country</option>
                                    {countryOptions.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="foundedYear">
                                    Year Founded
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="foundedYear"
                                    type="text"
                                    placeholder="Year Founded"
                                    name="foundedYear"
                                    value={formData.foundedYear}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="revenue">
                                    Revenue
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="revenue"
                                    type="text"
                                    placeholder="Revenue"
                                    name="revenue"
                                    value={formData.revenue}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="description"
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="services">
                                    Services
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="services"
                                    type="text"
                                    placeholder="Services"
                                    name="services"
                                    value={formData.services}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="budget">
                                    Budget
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="budget"
                                    type="text"
                                    placeholder="Budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="marketingChannels">
                                    Marketing Channels
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="marketingChannels"
                                    type="text"
                                    placeholder="Marketing Channels"
                                    name="marketingChannels"
                                    value={formData.marketingChannels}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="targetAudience">
                                    Target Audience
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="targetAudience"
                                    type="text"
                                    placeholder="Target Audience"
                                    name="targetAudience"
                                    value={formData.targetAudience}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="competitors">
                                    Competitors
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="competitors"
                                    type="text"
                                    placeholder="Competitors"
                                    name="competitors"
                                    value={formData.competitors}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Add other fields as needed */}
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline col-span-2 onClick={handleSubmit}"
                                type="submit"
                            >
                                Add Client
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddClientModal;



