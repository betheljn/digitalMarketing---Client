import { useGetArticlesQuery, useCreateArticleMutation } from '../../api/articlesApi';
import AdminNavBar from './adminNavBar';
import AddArticleModal from '../Modals/AddArticleModal';
import { useState } from 'react';

function ArticlesPage() {
    const { data: articles, isLoading, isError } = useGetArticlesQuery();
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const handleShowAddArticleModal = () => {
        setShowAddArticleModal(true);
    };

    const handleCloseAddArticleModal = () => {
        setShowAddArticleModal(false);
    };

    return (
        <div>
            <AdminNavBar />

            <h1 className="text-3xl text-center mt-5 mb-5">Article Dashboard</h1>
            <hr />
            {/* Add Article Button */}
            <button className="bg-primary hover:bg-gray-400 text-white font-bold py-1 px-2 rounded mb-4 mt-5 ml-5" onClick={handleShowAddArticleModal}>
                    Add Article
            </button>

                {/* Add Article Modal */}
                <AddArticleModal show={showAddArticleModal} handleClose={handleCloseAddArticleModal} />
                {/* Edit Article Modal */}

                {/* Article Table */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Title</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Content</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Picture</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Published</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Tags</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="font-semibold">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className={article.id % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700'}>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {article.title}
                                </td>
                                <td className="px-6 py-4">
                                    {article.content}
                                </td>
                                <td className="px-6 py-4">
                                    {article.picture}
                                </td>
                                <td className="px-6 py-4">
                                    {article.published ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4">
                                    {article.tags.map(tag => tag.name).join(', ')}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEditArticle(article)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}

export default ArticlesPage;

