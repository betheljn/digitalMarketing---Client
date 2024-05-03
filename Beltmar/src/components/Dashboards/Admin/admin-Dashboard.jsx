import { useState } from 'react';
import AdminNavBar from "../../Admin/adminNavBar"
import AddClientModal from '../../Modals/AddClientModal';
import AddArticleModal from '../../Modals/AddArticleModal';

function AdminDashboard() {
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);

  const handleShowAddArticleModal = () => {
    setShowAddArticleModal(true);
  };

  const handleCloseAddArticleModal = () => {
    setShowAddArticleModal(false);
  };

  const handleShowAddClientModal = () => {
    setShowAddClientModal(true);
  };

  const handleCloseAddClientModal = () => {
    setShowAddClientModal(false);
  };

  return (
    <div>
      {/* Navbar Section */}
      <AdminNavBar />

      {/* Dashboard Section */}
      <h1 className="text-3xl text-center mt-5 mb-5">Admin Dashboard</h1>
      <hr />
      
      {/* Shortcut Box */}
      <div>
        <p className="text-xl text-center mb-5 mt-10">Shortcut Box</p>
      </div>
      <div className="flex flex-wrap justify-center mb-5 space-x-4 mt-10 border-solid border-2 p-4">
        {/* Add Client Button */}
        <button className="border border-primary hover:bg-gray-400 text-primary font-bold py-2 px-4 rounded" onClick={handleShowAddClientModal}>
          Add Client
        </button>

        {/* Add other shortcut buttons here */}
        <button className="border border-primary hover:bg-gray-400 text-primary font-bold py-2 px-4 rounded" onClick={handleShowAddArticleModal}>
          Add Article
        </button>
        <button className="border border-primary hover:bg-gray-400 text-primary font-bold py-2 px-4 rounded">
          Button 3
        </button>
        {/* Add more buttons as needed */}
      </div>

      {/* Add Client Modal */}
      <AddClientModal show={showAddClientModal} handleClose={handleCloseAddClientModal} />

      {/* Add Article Modal */}
      <AddArticleModal show={showAddArticleModal} handleClose={handleCloseAddArticleModal} />
      
    </div>
  )
}

export default AdminDashboard;



