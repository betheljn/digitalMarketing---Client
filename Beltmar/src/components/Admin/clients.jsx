import { useGetClientsQuery } from '../../api/clientsApi';
import { useGetCompanyDataQuery } from '../../api/companyDataApi';

function Clients() {
    const { data: clients, isLoading, isError } = useGetClientsQuery();
    const { data: companyData } = useGetCompanyDataQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    console.log(clients);
    console.log(companyData);
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* Add Client Button */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-4">
                <a href="/admin/clients/addClient">Add Client</a>
            </button>

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
        <td className="px-6 py-4">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
        </td>
    </tr>
))}

</tbody>

            </table>
        </div>
    );
}

export default Clients;





