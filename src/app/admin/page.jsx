'use client';
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
  </svg>
);

const AdminPage = () => {
  const router = useRouter();

  const initialDogData = {
    name: '',
    age: { weeks: 0, months: 0, years: 0 },
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
        router.push('/login');
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

  // Fundraiser admin state
  const [adminView, setAdminView] = useState('dogs');

  const initialFundraiserData = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    goal: null,
    raised: null,
    images: [],
  };
  const [fundraisers, setFundraisers] = useState([]);
  const [fundraiserData, setFundraiserData] = useState(initialFundraiserData);
  const [showFundraiserModal, setShowFundraiserModal] = useState(false);
  const [isFundraiserEditing, setIsFundraiserEditing] = useState(false);
  const [editingFundraiserId, setEditingFundraiserId] = useState(null);
  // Fundraiser fetch
  const fetchFundraisers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Fundraisers')
      .select('*')
      .order('startDate', { ascending: true });
    if (error) {
      console.error('Fundraiser fetch error:', error);
      showNotification('Failed to fetch fundraisers', 'error');
    } else {
      setFundraisers(data);
    }
    setLoading(false);
  };
  const handleAdoptClick = (id) => {
    setAdoptConfirmation({ show: true, id });
  };

  const confirmAdopt = async () => {
    const id = adoptConfirmation.id;
    setAdoptConfirmation({ show: false, id: null });
    setLoading(true);
    try {
      const dog = dogs.find((d) => d.id === id);
      if (!dog) {
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('Happy Tails').insert({
        name: dog.name,
        age: dog.age,
        sex: dog.sex,
        breed: dog.breed,
        description: dog.description,
        images: dog.images,
        "created at": new Date().toISOString(),
      });

      if (insertError) {
        console.error('Insert error:', insertError);
        showNotification('Failed to mark as adopted', 'error');
        setLoading(false);
        return;
      }

      const { error: deleteError } = await supabase.from('Adoptable Dogs').delete().eq('id', id);

      if (deleteError) {
        console.error('Delete error:', deleteError);
        showNotification('Failed to remove from Adoptable Dogs', 'error');
        setLoading(false);
        return;
      }

      showNotification('Dog marked as adopted!');
      fetchDogs();
    } finally {
      setLoading(false);
    }
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
    fetchFundraisers();
  }, []);
  // Fundraiser submit handler
  const handleFundraiserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
      if (selectedFile && selectedFile.length) {
        imageUrls = await uploadImages(selectedFile);
      }
      let error;
      if (isFundraiserEditing) {
        ({ error } = await supabase
          .from('Fundraisers')
          .update({
            title: fundraiserData.title,
            description: fundraiserData.description,
            startDate: fundraiserData.startDate,
            endDate: fundraiserData.endDate,
            goal: fundraiserData.goal,
            raised: fundraiserData.raised,
            images: [...(fundraiserData.images || []), ...imageUrls],
          })
          .eq('id', editingFundraiserId));
      } else {
        ({ error } = await supabase
          .from('Fundraisers')
          .insert({
            title: fundraiserData.title,
            description: fundraiserData.description,
            startDate: fundraiserData.startDate,
            endDate: fundraiserData.endDate,
            goal: fundraiserData.goal,
            raised: fundraiserData.raised,
            images: imageUrls,
          }));
      }
      if (error) throw error;
      showNotification(isFundraiserEditing ? 'Fundraiser updated!' : 'Fundraiser created!');
      setShowFundraiserModal(false);
      setFundraiserData(initialFundraiserData);
      setPreviewUrl([]);
      setSelectedFile([]);
      setIsFundraiserEditing(false);
      setEditingFundraiserId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchFundraisers();
    } catch (err) {
      console.error('Fundraiser submit error:', err);
      showNotification('Fundraiser error: ' + (err.message || 'Unknown'), 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fundraiser edit handler
  const handleFundraiserEdit = (fundraiser) => {
    setFundraiserData(fundraiser);
    setPreviewUrl(fundraiser.images || []);
    setSelectedFile([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsFundraiserEditing(true);
    setEditingFundraiserId(fundraiser.id);
    setShowFundraiserModal(true);
  };

  // Fundraiser delete confirmation
  const confirmFundraiserDelete = async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('Fundraisers')
        .delete()
        .eq('id', id);
      if (error) throw error;
      showNotification('Fundraiser deleted');
      fetchFundraisers();
    } catch (err) {
      console.error('Delete fundraiser error:', err);
      showNotification('Delete error: ' + (err.message || 'Unknown'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setDogData({ ...dogData, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const MAX_FILE_SIZE_MB = 7;

  // Helper function to generate a video thumbnail as a Data URL
  const generateVideoThumbnail = (videoFile) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.currentTime = 1;
      video.addEventListener('loadeddata', () => {
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL('image/jpeg');
        resolve(thumbnailUrl);
      });
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = ['image/', 'video/'];
    const mediaFiles = files.filter(file => allowedTypes.some(type => file.type.startsWith(type)));

    if (mediaFiles.length === 0) {
      showNotification('Please select valid image or video files', 'error');
      return;
    }

    const oversized = mediaFiles.find(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);
    if (oversized) {
      showNotification(`Each image must be under ${MAX_FILE_SIZE_MB}MB`, 'error');
      return;
    }

    let newSelectedFiles = [...selectedFile, ...mediaFiles];
    // Generate previews, using thumbnails for videos
    const thumbnailPromises = mediaFiles.map(async (file) => {
      if (file.type.startsWith('video/')) {
        return await generateVideoThumbnail(file);
      }
      return URL.createObjectURL(file);
    });
    const newPreviews = [...previewUrl, ...(await Promise.all(thumbnailPromises))];

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
    setLoading(true);
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
      showNotification(
        (isEditing ? 'Failed to update dog' : 'Failed to add dog') + ': ' + (err.message || 'Unknown error'),
        'error'
      );
    } finally {
      setLoading(false);
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
    try {
      // Fetch the dog to get image URLs
      const { data: dogDataToDelete, error: fetchError } = await supabase
        .from('Adoptable Dogs')
        .select('images')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Fetch error before delete:', fetchError);
        showNotification('Failed to fetch dog images before delete', 'error');
        setLoading(false);
        return;
      }

      // Delete associated images from storage if any
      if (dogDataToDelete?.images && dogDataToDelete.images.length > 0) {
        const filenames = dogDataToDelete.images
          .map((url) => {
            const match = url.match(/adopt\/([^?]+)/);
            return match ? `adopt/${match[1]}` : null;
          })
          .filter(Boolean);

        if (filenames.length > 0) {
          const { error: removeError } = await supabase.storage
            .from('dog-images')
            .remove(filenames);

          if (removeError) {
            console.error('Storage delete error:', removeError);
            showNotification('Failed to delete images from storage', 'error');
          }
        }
      }

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
    } finally {
      setLoading(false);
    }
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
    <div className="max-w-[85%] mx-auto pt-40 p-6 rounded-lg shadow-md min-h-[60vh]">
      <div className="flex justify-end pb-4">
        {/* Fundraiser/Dog view switcher */}
        <div className="flex space-x-4 mb-6 mr-auto">
          <button onClick={() => setAdminView('dogs')} className={adminView==='dogs' ? 'bg-[#7d5c46] text-white py-2 px-4 rounded-md' : 'bg-gray-200 py-2 px-4 rounded-md'}>Manage Dogs</button>
          <button onClick={() => setAdminView('fundraisers')} className={adminView==='fundraisers' ? 'bg-[#7d5c46] text-white py-2 px-4 rounded-md' : 'bg-gray-200 py-2 px-4 rounded-md'}>Manage Fundraisers</button>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
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
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOGS PANEL */}
      {adminView==='dogs' && (
        <>
      <div className="flex items-center space-x-10 mt-12 mb-6">
        <h2 className="text-2xl font-bold text-[#7d5c46]">Current Dogs</h2>
        <button
          onClick={() => setShowFormModal(true)}
          className="bg-[#9c7459] text-white py-2 px-6 rounded-md hover:bg-[#7d5c46] transition-colors flex items-center justify-center"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Add Dog'}
        </button>
      </div>

      {/* Modal for Add/Edit Dog */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-auto backdrop-blur-sm bg-white/30"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFormModal(false);
              handleCancel();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] p-6 relative overflow-y-auto">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age <span className="text-gray-500 text-sm">(weeks / months / years)</span></label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="weeks"
                      min="0"
                      placeholder="Weeks"
                      value={dogData.age.weeks}
                      onChange={(e) =>
                        setDogData({
                          ...dogData,
                          age: { ...dogData.age, weeks: parseInt(e.target.value) || 0 },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                      required
                    />
                    <input
                      type="number"
                      name="months"
                      min="0"
                      placeholder="Months"
                      value={dogData.age.months}
                      onChange={(e) =>
                        setDogData({
                          ...dogData,
                          age: { ...dogData.age, months: parseInt(e.target.value) || 0 },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                      required
                    />
                    <input
                      type="number"
                      name="years"
                      min="0"
                      placeholder="Years"
                      value={dogData.age.years}
                      onChange={(e) =>
                        setDogData({
                          ...dogData,
                          age: { ...dogData.age, years: parseInt(e.target.value) || 0 },
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                      required
                    />
                  </div>
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
                  maxLength={1000}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#9c7459] focus:border-[#9c7459] outline-none"
                  required
                ></textarea>
              </div>

              {/* Moved Dog Image Upload Section to here, just before the button group */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Dog Image</label>
                <div className="space-y-2">
                  {/* Image previews */}
                  {previewUrl.length > 0 && (
                    <div className="flex overflow-x-auto gap-4 mb-4 py-2 px-1 max-w-full">
                      {previewUrl.map((url, index) => (
                        <div key={index} className="relative group flex-shrink-0 w-32 h-32">
                          {url.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={url}
                              controls
                              className="w-full h-full object-cover rounded-md border border-gray-200"
                            />
                          ) : (
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="w-full h-full object-cover rounded-md border border-gray-200"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 text-gray-600 bg-white/60 rounded-full p-1 w-6 h-6 flex items-center justify-center hover:text-red-600"
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
                      accept="image/*,video/*"
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

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-[#9c7459] text-white py-3 px-6 rounded-md hover:bg-[#7d5c46] transition-colors flex-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : (isEditing ? 'Update Dog' : 'Add Dog')}
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
              {/* Show last image or video if available, fallback to "No media" */}
              {(dog.images && dog.images.length > 0) ? (
                dog.images[dog.images.length - 1].match(/\.(mp4|webm|ogg)$/i) ? (
                  <video
                    src={dog.images[dog.images.length - 1]}
                    controls
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <img
                    src={dog.images[dog.images.length - 1]}
                    alt={`${dog.name} - ${dog.breed}`}
                    className="w-full h-64 object-cover"
                  />
                )
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  No media
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl mb-1">{dog.name}</h3>
                    <span className={`py-1 px-3 rounded-full text-sm font-semibold
                      ${dog.availability === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {dog.availability === 'pending' ? 'Application Pending' : 'Available'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    {dog.age?.weeks || dog.age?.months || dog.age?.years ? (
                      <>
                        {dog.age.weeks > 0 && `${dog.age.weeks} weeks `}
                        {dog.age.months > 0 && `${dog.age.months} months `}
                        {dog.age.years > 0 && `${dog.age.years} years `}
                      </>
                    ) : 'Age unknown'} • {dog.sex} • {dog.breed}
                  </p>
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
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : 'Delete'}
                  </button>
                  <button
                    onClick={() => handleAdoptClick(dog.id)}
                    className="bg-[#7d5c46] hover:bg-[#5f4735] text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : 'Adopted'}
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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30"
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
                className="bg-[#9c7459] text-white px-4 py-2 rounded-md hover:bg-[#7d5c46] flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <Spinner /> : 'Yes, Adopted'}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
      )}

      {/* FUNDRAISERS PANEL */}
      {adminView==='fundraisers' && (
        <>
      <div className="flex items-center space-x-10 mt-12 mb-6">
        <h2 className="text-2xl font-bold text-[#7d5c46]">Fundraisers</h2>
        <button
          onClick={() => setShowFundraiserModal(true)}
          className="bg-[#9c7459] text-white py-2 px-6 rounded-md hover:bg-[#7d5c46]"
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Add Fundraiser'}
        </button>
      </div>
      <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-8 gap-y-10 justify-center">
        {fundraisers.map((f) => (
          <div key={f.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md p-4 w-[300px] flex flex-col">
            {(f.images && f.images.length > 0) ? (
              f.images[f.images.length - 1].match(/\.(mp4|webm|ogg)$/i) ? (
                <video src={f.images[f.images.length - 1]} controls className="w-full h-48 object-cover mb-2" />
              ) : (
                <img src={f.images[f.images.length - 1]} alt={f.name} className="w-full h-48 object-cover mb-2" />
              )
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">No media</div>
            )}
            <h3 className="font-bold text-xl mb-1">{f.title}</h3>
            <p className="text-gray-600 mb-1">
              {(() => {
                const formatDate = (dateString) => {
                  const [year, month, day] = dateString.split('-');
                  const date = new Date(year, month - 1, day);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'America/Edmonton'
                  });
                };
                return `${formatDate(f.startDate)} to ${formatDate(f.endDate)}`;
              })()}
            </p>
            <p className="text-gray-600 mb-1">{f.description}</p>
            <p className="text-gray-600 mb-1">Goal: ${f.goal}</p>
            <p className="text-gray-600 mb-2">Raised: ${f.raised}</p>
            <div className="mt-auto flex space-x-3">
              <button onClick={() => handleFundraiserEdit(f)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
              <button onClick={() => confirmFundraiserDelete(f.id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
            </div>
          </div>
        ))}
        {fundraisers.length === 0 && !loading && (
          <p className="text-center text-gray-600 py-8">No fundraisers found.</p>
        )}
      </div>
      </>
      )}

      {/* FUNDRAISER MODAL */}
      {showFundraiserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto backdrop-blur-sm bg-white/30"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowFundraiserModal(false); setFundraiserData(initialFundraiserData); setIsFundraiserEditing(false); setEditingFundraiserId(null); setPreviewUrl([]); setSelectedFile([]); } }}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] p-6 relative overflow-y-auto">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => { setShowFundraiserModal(false); setFundraiserData(initialFundraiserData); setIsFundraiserEditing(false); setEditingFundraiserId(null); setPreviewUrl([]); setSelectedFile([]); }}>
              ✕
            </button>
            <h1 className="text-2xl font-bold text-center mb-4 text-[#7d5c46]">
              {isFundraiserEditing ? 'Edit Fundraiser' : 'Add New Fundraiser'}
            </h1>
            {notification.show && (
              <div className={`p-4 mb-4 rounded-md flex items-center justify-between ${
                notification.type === 'error'
                  ? 'bg-red-100 text-red-700 border border-red-300'
                  : 'bg-green-100 text-green-700 border border-green-300'
              }`}>
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
            <form onSubmit={handleFundraiserSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Fundraiser Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Fundraiser title"
                  required
                  className="w-full p-3 border rounded-md"
                  value={fundraiserData.title}
                  onChange={(e) => setFundraiserData({ ...fundraiserData, title: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description"
                  rows="4"
                  required
                  className="w-full p-3 border rounded-md"
                  value={fundraiserData.description}
                  onChange={(e) => setFundraiserData({ ...fundraiserData, description: e.target.value })}
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-full">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    className="w-full p-3 border rounded-md"
                    value={fundraiserData.startDate}
                    onChange={(e) => setFundraiserData({ ...fundraiserData, startDate: e.target.value })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    className="w-full p-3 border rounded-md"
                    value={fundraiserData.endDate}
                    onChange={(e) => setFundraiserData({ ...fundraiserData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-full">
                  <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Fundraising Goal</label>
                  <input
                    type="number"
                    name="goal"
                    id="goal"
                    placeholder="Goal amount (in dollars)"
                    required
                    className="w-full p-3 border rounded-md"
                    value={fundraiserData.goal ?? ''}
                    onChange={(e) => setFundraiserData({ ...fundraiserData, goal: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="raised" className="block text-sm font-medium text-gray-700 mb-1">Amount Raised</label>
                  <input
                    type="number"
                    name="raised"
                    id="raised"
                    placeholder="Raised amount (in dollars)"
                    required
                    className="w-full p-3 border rounded-md"
                    value={fundraiserData.raised ?? ''}
                    onChange={(e) => setFundraiserData({ ...fundraiserData, raised: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              {/* re-use image/video upload */}
              <div className="space-y-2">
                {/* Image previews */}
                {previewUrl.length > 0 && (
                  <div className="flex overflow-x-auto gap-4 mb-4 py-2 px-1 max-w-full">
                    {previewUrl.map((url, index) => (
                      <div key={index} className="relative group flex-shrink-0 w-32 h-32">
                        {url.match(/\.(mp4|webm|ogg)$/i) ? (
                          <video
                            src={url}
                            controls
                            className="w-full h-full object-cover rounded-md border border-gray-200"
                          />
                        ) : (
                          <img
                            src={url}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded-md border border-gray-200"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            // Remove image logic for fundraiser
                            const newFiles = selectedFile.filter((_, i) => i !== index);
                            const newPreviews = previewUrl.filter((_, i) => i !== index);
                            // Remove from images in fundraiserData if exists
                            const urlToRemove = previewUrl[index];
                            const newImageUrls = (fundraiserData.images || []).filter((url) => url !== urlToRemove);
                            setFundraiserData((prev) => ({ ...prev, images: newImageUrls }));
                            setSelectedFile(newFiles);
                            setPreviewUrl(newPreviews);
                          }}
                          className="absolute top-1 right-1 text-gray-600 bg-white/60 rounded-full p-1 w-6 h-6 flex items-center justify-center hover:text-red-600"
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
                    id="fundraiser-image-upload"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {/* Always show the upload button */}
                  <label
                    htmlFor="fundraiser-image-upload"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md cursor-pointer transition-colors inline-flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Upload Images
                  </label>
                </div>
              </div>
              <div className="flex space-x-4">
                <button type="submit" className="bg-[#9c7459] text-white px-6 py-3 rounded-md">{loading ? <Spinner/> : (isFundraiserEditing ? 'Update' : 'Add')}</button>
                {isFundraiserEditing && (
                  <button type="button" onClick={() => { setShowFundraiserModal(false); setFundraiserData(initialFundraiserData); setIsFundraiserEditing(false); setEditingFundraiserId(null); }} className="bg-gray-300 px-6 py-3 rounded-md">Cancel</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
