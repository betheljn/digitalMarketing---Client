import { useState } from 'react';
import { useGetClientsQuery  } from '../../api/clientsApi';
import { useGetCompanyDataQuery } from '../../api/companyDataApi';
import AdminNavBar from './adminNavBar';
import AddClientModal from '../Modals/AddClientModal';
import EditClientModal from '../Modals/EditClientModal';

function ClientPage() {
    const { data: clients, isLoading, isError } = useGetClientsQuery();
    const { data: companyData } = useGetCompanyDataQuery();
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [showEditClientModal, setShowEditClientModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const handleShowAddClientModal = () => {
        setShowAddClientModal(true);
    };

    const handleCloseAddClientModal = () => {
        setShowAddClientModal(false);
    };

    const handleShowEditClientModal = (client) => {
    // Find the corresponding companyData for the selected client
    const clientCompanyData = companyData.find(company => company.id === client.companyDataId);
    // Pass both client and companyData to setSelectedClient
    setSelectedClient({ client, companyData: clientCompanyData });
    setShowEditClientModal(true);
};


    const handleCloseEditClientModal = () => {
        setShowEditClientModal(false);
    };

    return (
        <div>
            <AdminNavBar />

            <h1 className="text-3xl text-center mt-5 mb-5">Client Dashboard</h1>
            <hr />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {/* Add Client Button */}
                <button className="bg-primary hover:bg-gray-400 text-white font-bold py-1 px-2 rounded mb-4 mt-5 ml-5" onClick={handleShowAddClientModal}>
                    Add Client
                </button>

                {/* Add Client Modal */}
                <AddClientModal show={showAddClientModal} handleClose={handleCloseAddClientModal} />

                {/* Edit Client Modal */}
                {showEditClientModal && <EditClientModal show={showEditClientModal} handleClose={handleCloseEditClientModal} clientData={selectedClient} />}

                {/* Client Table */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Name</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Email</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Phone</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Company</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Action</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {client.firstName} {client.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {client.email}
                                </td>
                                <td className="px-6 py-4">
                                    {client.phoneNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Find the corresponding companyData for this client */}
                                    {companyData && companyData.find(company => company.id === client.companyDataId)?.companyName}
                                </td>
                                <div>
                                    <td className="px-6 py-4">
                                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleShowEditClientModal(client)}>Edit</a>
                                </td>
                                </div>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientPage;

