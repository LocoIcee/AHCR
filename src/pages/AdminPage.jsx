import React, { useState, useEffect } from 'react';
import { supabase } from '../data/supabaseClient';
import DogCard from '../components/DogCard';

const AdminPage = () => {
  const [dogData, setDogData] = useState({
    name: '',
    age: '',
    sex: '',
    breed: '',
    description: '',
    availability: 'available',
    image: ''
  });

  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const { data, error } = await supabase.from('Adoptable Dogs').select('*').order('"created at"', { ascending: true });
      if (error) {
        console.error('Fetch error:', error);
      } else {
        setDogs(data);
      }
    };
    fetchDogs();
  }, []);

  const handleChange = (e) => {
    setDogData({ ...dogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('Adoptable Dogs').insert([dogData]);
    if (error) {
      console.error('Insert error:', error);
    } else {
      alert('Dog added!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-28 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Admin - Add Dog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'age', 'breed', 'description', 'image'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            onChange={handleChange}
            value={dogData[field]}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}

        <select
          name="sex"
          value={dogData.sex}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select name="availability" value={dogData.availability} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
          <option value="available">Available</option>
          <option value="pending">Pending</option>
        </select>
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded">
          Add Dog
        </button>
      </form>
      <h2 className="text-2xl font-bold mt-10 mb-4">Current Dogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            name={dog.name}
            image={dog.image}
            age={dog.age}
            sex={dog.sex}
            breed={dog.breed}
            description={dog.description}
            availability={dog.availability}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;