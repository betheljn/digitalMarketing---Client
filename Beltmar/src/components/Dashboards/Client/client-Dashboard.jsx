import { useState, useEffect } from 'react';
import { useUserProfileQuery } from '../../../api/beltmarApi';
import { useGetProjectByClientIdQuery } from '../../../api/projectsApi';
import TopNavBar from '../../landingPage/topNavBar';
import formatDate from '../../Inputs/formatDate';

function ClientDashboard() {
    const { data: userData, isLoading: userLoading, error: userError } = useUserProfileQuery();
    console.log(userData)
    const [token, setToken] = useState("");
    const [headers, setHeaders] = useState({
        Authorization: '',
        'Content-Type': 'application/json',
    });

    const userId = userData?.userProfile?.id;
    console.log(userId);

    const { data: projectData, isLoading: projectLoading, error: projectError } = useGetProjectByClientIdQuery(userId);
    const projects = projectData;


    const [projectsAccordionOpen, setProjectsAccordionOpen] = useState(false);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setHeaders({
                ...headers,
                Authorization: `Bearer ${storedToken}`,
            });
        }
    }, []);
    
    if (userLoading || projectLoading) {
        return <div>Loading...</div>;
    }

    if (userError || projectError) {
        return <div>Error: {userError?.message || projectError?.message}</div>;
    }

    const user = userData?.userProfile;

    if (!user || !projects) {
        return <div>No user or projects found.</div>; // Handle case where user or projects are missing
    }

    // Log the project data for debugging
    console.log('Projects:', projects);

    return (
        <div>
            <TopNavBar />
            <section className="min-h-screen flex items-center justify-center">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-center mt-2">Client Dashboard</h1>
                    <p className="text-center">Welcome, {user.firstName}</p>
                    <hr className="my-4 border-gray-300" />
                    <div>
                        <h2 className="text-xl font-bold">Profile Information</h2>
                        <div className="border border-gray-200 p-4 rounded mb-4 mt-5">
                            <p>Email: {user.email}</p>
                            <p>Name: {user.firstName} {user.lastName}</p>
                            {/* Add more profile information as needed */}
                        </div>
                    </div>
                    <hr className="my-4 border-gray-300" />
                    <div>
                        <h2 className="text-xl font-bold cursor-pointer" onClick={() => setProjectsAccordionOpen(!projectsAccordionOpen)}>
                            Projects
                            <span className="float-right">{projectsAccordionOpen ? '▲' : '▼'}</span>
                        </h2>
                        {projectsAccordionOpen && (
                        <div className="border border-gray-200 p-4 rounded mb-4">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white rounded shadow-md p-4 mb-4">
                                    <p className="text-lg font-semibold mb-2">Project Name: {project.name}</p>
                                    <p className="text-gray-700 mb-2">Project Description: {project.description}</p>
                                    <p className="text-gray-700 mb-2">Project Status: {project.status}</p>
                                    <p className="text-gray-700 mb-2">Start Date: {formatDate(project.startDate)}</p>
                                    <p className="text-gray-700 mb-2">End Date: {formatDate(project.endDate)}</p>
                                    <hr />
                                    <p className='text-gray-700 mb-2'>Status: {project.status}</p>
                                    {/* Add more project information as needed */}
                                </div>
                            ))}
                        </div>
                    )}

                    </div>
                    <hr className="my-4 border-gray-300" />
                </div>
            </section>
        </div>
    );
}

export default ClientDashboard;







