import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../data/supabaseClient';
import DogCard from '../components/DogCard';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const initialDogData = {
    name: '',
    age: '',
    sex: '',
    breed: '',
    description: '',
    availability: 'available',
    images: []
  };
  useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log("Supabase session:", session);
  });
}, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        console.log("NOT USER")
        return;
      }
    };
    checkAuth();
  }, []);

  const [dogData, setDogData] = useState(initialDogData);
  const [showFormModal, setShowFormModal] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [confirmation, setConfirmation] = useState({ show: false, id: null });
  const [adoptConfirmation, setAdoptConfirmation] = useState({ show: false, id: null });
  const handleAdoptClick = (id) => {
    setAdoptConfirmation({ show: true, id });
  };

  const confirmAdopt = async () => {
    const id = adoptConfirmation.id;
    setAdoptConfirmation({ show: false, id: null });

    const dog = dogs.find((d) => d.id === id);
    if (!dog) return;

    const { error: insertError } = await supabase.from('Happy Tails').insert({
      name: dog.name,
      age: dog.age,
      sex: dog.sex,
      breed: dog.breed,
      description: dog.description,
      image: dog.image,
      "created at": new Date().toISOString(),
    });

    if (insertError) {
      console.error('Insert error:', insertError);
      showNotification('Failed to mark as adopted', 'error');
      return;
    }

    const { error: deleteError } = await supabase.from('Adoptable Dogs').delete().eq('id', id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      showNotification('Failed to remove from Adoptable Dogs', 'error');
      return;
    }

    showNotification('Dog marked as adopted!');
    fetchDogs();
  };
  const fileInputRef = useRef(null);

  const fetchDogs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Adoptable Dogs')
      .select('*')
      .order('"created at"', { ascending: true });
    
    if (error) {
      console.error('Fetch error:', error);
      showNotification('Failed to fetch dogs', 'error');
    } else {
      setDogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleChange = (e) => {
    setDogData({ ...dogData, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      showNotification('Please select valid image files', 'error');
      return;
    }

    let newSelectedFiles = [...selectedFile, ...imageFiles];
    let newPreviews = [...previewUrl, ...imageFiles.map(file => URL.createObjectURL(file))];

    setSelectedFile(newSelectedFiles);
    setPreviewUrl(newPreviews);
  };

  // Remove an image by index from selectedFile and previewUrl, and delete from Supabase Storage if uploaded
  const removeImage = async (index) => {
    const newFiles = selectedFile.filter((_, i) => i !== index);
    const newPreviews = previewUrl.filter((_, i) => i !== index);

    // Try to delete the file from Supabase storage if it has already been uploaded
    const urlToRemove = previewUrl[index];
    const filenameMatch = urlToRemove && urlToRemove.match(/adopt\/([^?]+)/);
    if (filenameMatch) {
      const filename = `adopt/${filenameMatch[1]}`;
      const { error: removeError } = await supabase.storage
        .from('dog-images')
        .remove([filename]);

      if (removeError) {
        console.error('Failed to delete from storage:', removeError);
      }
    }

    // Also remove from dogData.images if it exists
    const newImageUrls = (dogData.images || []).filter((url) => url !== urlToRemove);
    setDogData((prev) => ({ ...prev, images: newImageUrls }));

    setSelectedFile(newFiles);
    setPreviewUrl(newPreviews);
  };

  // Upload multiple images
  const uploadImages = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const filename = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;
      const { data, error } = await supabase.storage
        .from('dog-images')
        .upload(`adopt/${filename}`, file);

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from('dog-images')
        .getPublicUrl(`adopt/${filename}`);

      uploadedUrls.push(publicData.publicUrl);
    }

    return uploadedUrls;
  };

  // New handleSubmit function per instructions (multiple images)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrls = [];

      if (selectedFile && selectedFile.length) {
        imageUrls = await uploadImages(selectedFile);
      }

      let error;
      if (isEditing) {
        ({ error } = await supabase
          .from('Adoptable Dogs')
          .update({
            name: dogData.name,
            age: dogData.age,
            sex: dogData.sex,
            breed: dogData.breed,
            description: dogData.description,
            availability: dogData.availability,
            images: [...(dogData.images || []), ...imageUrls],
          })
          .eq('id', editingId));
      } else {
        ({ error } = await supabase
          .from('Adoptable Dogs')
          .insert({
            name: dogData.name,
            age: dogData.age,
            sex: dogData.sex,
            breed: dogData.breed,
            description: dogData.description,
            availability: dogData.availability,
            images: imageUrls,
            "created at": new Date().toISOString(),
          }));
      }

      if (error) throw error;

      showNotification(isEditing ? 'Dog updated successfully!' : 'Dog added successfully!');
      setShowFormModal(false); // Close popup
      setDogData(initialDogData);
      setPreviewUrl([]);
      setSelectedFile([]);
      setIsEditing(false);
      setEditingId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchDogs();
    } catch (err) {
      console.error('Error submitting form:', err);
      showNotification(isEditing ? 'Failed to update dog' : 'Failed to add dog', 'error');
    }
  };

  const handleEdit = (dog) => {
    setDogData({
      name: dog.name,
      age: dog.age,
      sex: dog.sex,
      breed: dog.breed,
      description: dog.description,
      availability: dog.availability,
      images: dog.images || [],
    });
    // Set preview to the existing images
    setPreviewUrl(dog.images || []);
    setSelectedFile([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsEditing(true);
    setEditingId(dog.id);
    setShowFormModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setConfirmation({ show: true, id });
  };

  const confirmDelete = async () => {
    const id = confirmation.id;
    setConfirmation({ show: false, id: null });
    setLoading(true);
    const { error } = await supabase
      .from('Adoptable Dogs')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      showNotification('Failed to delete dog', 'error');
    } else {
      showNotification('Dog deleted successfully!');
      fetchDogs();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setShowFormModal(false); // Ensure modal closes
    setIsEditing(false);
    setEditingId(null);
    setDogData(initialDogData);
    setPreviewUrl([]);
    setSelectedFile([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-[85%] mx-auto mt-40 p-6 rounded-lg shadow-md min-h-[60vh]">
      <div className="flex justify-end mb-4">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate('/login');
          }}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      {notification.show && (
        <div className={`p-4 mb-4 rounded-md flex items-center justify-between ${notification.type === 'error' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-green-100 text-green-700 border border-green-300'}`}>
          <div className="flex items-center space-x-2">
            <span>
              {notification.type === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {confirmation.show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setConfirmation({ show: false, id: null });
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this dog?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmation({ show: false, id: null })}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-10 mt-12 mb-6">
        <h2 className="text-2xl font-bold text-[#7d5c46]">Current Dogs</h2>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-[#9c7459] text-white py-2 px-6 rounded-md hover:bg-[#7d5c46] transition-colors"
        >
          Add Dog
        </button>
      </div>

      {/* Modal for Add/Edit Dog */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFormModal(false);
              handleCancel();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => {
                setShowFormModal(false);
                handleCancel();
              }}
            >
              ✕
            </button>
            <h1 className="text-2xl font-bold text-center mb-4 text-[#7d5c46]">
              {isEditing ? 'Edit Dog' : 'Add New Dog'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Dog's name"
                    onChange={handleChange}
                    value={dogData.name}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    id="age"
                    type="text"
                    name="age"
                    placeholder="Dog's age (e.g., 2 years)"
                    onChange={handleChange}
                    value={dogData.age}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    id="breed"
                    type="text"
                    name="breed"
                    placeholder="Dog's breed"
                    onChange={handleChange}
                    value={dogData.breed}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Dog Image</label>
                  <div className="space-y-2">
                    {/* Image previews */}
                    {previewUrl.length > 0 && (
                      <div className="flex overflow-x-auto gap-4 mb-4 py-2 px-1 max-w-full">
                        {previewUrl.map((url, index) => (
                          <div key={index} className="relative group flex-shrink-0 w-32 h-32">
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="w-full h-full object-cover rounded-md border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 text-gray-600 p-1  hover:text-red-600"
                              title="Remove image"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* File upload input */}
                    <div className="flex items-center space-x-4">
                      <input
                        ref={fileInputRef}
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {/* Always show the upload button */}
                      <label
                        htmlFor="image-upload"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md cursor-pointer transition-colors inline-flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Upload Images
                      </label>
                    </div>

                    {/* Upload progress indicator */}
                    {isUploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#9c7459] h-2.5 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}

                    {/* Show existing image URLs if available and no preview */}
                    {dogData.images && dogData.images.length > 0 && (!selectedFile || selectedFile.length === 0) && previewUrl.length === 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {dogData.images.map((imgUrl, idx) => (
                          <img
                            key={idx}
                            src={imgUrl}
                            alt={`Current ${idx}`}
                            className="h-32 w-auto object-cover rounded-md border border-gray-200"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                  <select
                    id="sex"
                    name="sex"
                    value={dogData.sex}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                    required
                  >
                    <option value="">Select sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    id="availability"
                    name="availability"
                    value={dogData.availability}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                    required
                  >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description about the dog"
                  rows="4"
                  onChange={handleChange}
                  value={dogData.description}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                  required
                ></textarea>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-[#9c7459] text-white py-3 px-6 rounded-md hover:bg-[#7d5c46] transition-colors flex-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : isEditing ? 'Update Dog' : 'Add Dog'}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowFormModal(false);
                      handleCancel();
                    }}
                    className="bg-gray-300 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-400 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}


      {loading && <p className="text-center text-gray-600">Loading...</p>}

      <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-8 gap-y-10 justify-center">
        {dogs.map((dog) => (
          <div key={dog.id} className="w-full">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col w-[300px] h-[520px]">
              {/* Show last image if available, fallback to empty string */}
              <img
                src={dog.images && dog.images.length > 0 ? dog.images[dog.images.length - 1] : ''}
                alt={`${dog.name} - ${dog.breed}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl mb-1">{dog.name}</h3>
                    <span className={`py-1 px-3 rounded-full text-sm font-semibold
                      ${dog.availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {dog.availability === 'pending' ? 'Application Pending' : 'Available'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{dog.age} • {dog.sex} • {dog.breed}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {dog.description}
                  </p>
                </div>
                <div className="mt-auto flex space-x-3 pt-4">
                  <button
                    onClick={() => handleEdit(dog)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dog.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAdoptClick(dog.id)}
                    className="bg-[#7d5c46] hover:bg-[#5f4735] text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Adopted
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {dogs.length === 0 && !loading && (
          <p className="text-center text-gray-600 py-8">No dogs currently in the database.</p>
        )}
      </div>

      {adoptConfirmation.show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setAdoptConfirmation({ show: false, id: null });
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Adoption</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to mark this dog as adopted?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setAdoptConfirmation({ show: false, id: null })}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAdopt}
                className="bg-[#9c7459] text-white px-4 py-2 rounded-md hover:bg-[#7d5c46]"
              >
                Yes, Adopted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;