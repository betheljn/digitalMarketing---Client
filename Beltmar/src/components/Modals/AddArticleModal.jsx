import { useState } from 'react';
import { useCreateArticleMutation } from '../../api/articlesApi';
import { useUploadImageMutation } from '../../api/imageUploadApi';

function AddArticleModal({ show, handleClose }) {
    const [createArticle] = useCreateArticleMutation();
    const [uploadImage] = useUploadImageMutation();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        picture: null,
        tags: [],
        published: false, // Initialize as false
        author: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tags') {
            setFormData({ ...formData, [name]: value.split(',') });
        } else if (name === 'published') {
            setFormData({ ...formData, [name]: e.target.checked });
        } else if (name === 'picture') {
            // Store the selected image file
            setFormData({ ...formData, picture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageData = new FormData();
            imageData.append('image', formData.picture);

            // Use the uploadImage mutation hook to upload the image
            const uploadResponse = await uploadImage(imageData);

            const articleData = {
                title: formData.title,
                content: formData.content,
                picture: uploadResponse.data.file.filename,
                tags: formData.tags,
                published: formData.published,
                author: formData.author,
            };

            const response = await createArticle(articleData);
            handleClose();
            alert('Article created successfully!');
        } catch (error) {
            console.error('Error creating article:', error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${show ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen">
                <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl text-center font-bold">Add Article</p>
                            <button className="modal-close" onClick={handleClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                                    Title
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="title"
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="content">
                                    Content
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="content"
                                    type="text"
                                    placeholder="Content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="picture">
                                    Picture
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="picture"
                                    type="file" // Change the input type to "file"
                                    name="picture"
                                    accept="image/*" // Accept only image files
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="tags">
                                    Tags
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tags"
                                    type="text"
                                    placeholder="Tags (comma-separated)"
                                    name="tags"
                                    value={formData.tags.join(',')} // Join tags array to display as comma-separated string
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xs font-bold mb-2" htmlFor="published">
                                    Published
                                </label>
                                <input
                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                    id="published"
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published} // Use checked attribute for checkbox
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                                    Add
                                </button>
                                <button onClick={handleClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddArticleModal;

