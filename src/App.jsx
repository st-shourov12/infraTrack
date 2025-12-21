import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, X, Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const CATEGORIES = [
  { id: 'streetlight', name: 'Broken Streetlight', icon: '💡' },
  { id: 'pothole', name: 'Pothole', icon: '🕳️' },
  { id: 'water', name: 'Water Leakage', icon: '💧' },
  { id: 'garbage', name: 'Garbage Overflow', icon: '🗑️' },
  { id: 'footpath', name: 'Damaged Footpath', icon: '🚶' },
  { id: 'drainage', name: 'Blocked Drainage', icon: '🌊' },
  { id: 'traffic', name: 'Traffic Signal Issue', icon: '🚦' },
  { id: 'other', name: 'Other', icon: '📋' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' }
];

// Configure your backend API URL
const API_URL = 'http://localhost:5000/api';

export default function ReportIssueForm() {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      category: '',
      priority: 'medium',
      title: '',
      description: '',
      address: '',
      landmark: ''
    }
  });

  const selectedCategory = watch('category');
  const selectedPriority = watch('priority');

  // Get current location
  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setValue('address', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please enter address manually.');
          setLoadingLocation(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoadingLocation(false);
    }
  };

  // Convert image to base64
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be less than 5MB');
        continue;
      }

      try {
        const base64 = await toBase64(file);
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: base64,
          file: file,
          name: file.name,
          size: file.size
        }]);
      } catch (err) {
        console.error('Error reading file:', err);
        setError('Error uploading image');
      }
    }
  };

  // Remove image
  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Upload images to backend (if using separate upload endpoint)
  const uploadImages = async (issueId) => {
    if (images.length === 0) return [];

    try {
      const formData = new FormData();
      images.forEach((img, index) => {
        formData.append('images', img.file);
      });
      formData.append('issueId', issueId);

      const response = await axios.post(`${API_URL}/issues/upload-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      return response.data.imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    setError('');
    
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    if (!location) {
      setError('Please set your location');
      return;
    }

    try {
      // Prepare issue data
      const issueData = {
        category: data.category,
        priority: data.priority,
        title: data.title,
        description: data.description,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat], // MongoDB uses [longitude, latitude]
          address: data.address
        },
        landmark: data.landmark || '',
        images: images.map(img => img.url), // Send base64 images
        status: 'pending',
        citizenId: localStorage.getItem('userId') || 'guest', // Get from auth
        createdAt: new Date().toISOString()
      };

      // Submit to backend
      const response = await axios.post(`${API_URL}/issues`, issueData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using JWT
        }
      });

      console.log('Issue created:', response.data);
      
      // Set tracking ID from response
      setTrackingId(response.data.issue.trackingId || response.data.issue._id);
      
      // Show success state
      setSubmitted(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        reset();
        setImages([]);
        setLocation(null);
        setUploadProgress(0);
      }, 5000);

    } catch (err) {
      console.error('Error submitting issue:', err);
      setError(
        err.response?.data?.message || 
        'Failed to submit issue. Please try again.'
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  const handleReset = () => {
    reset();
    setImages([]);
    setLocation(null);
    setError('');
    setUploadProgress(0);
  };

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Issue Reported Successfully!</h2>
            <p className="text-gray-600">Your issue has been submitted and saved to the database.</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Tracking ID</p>
            <p className="text-2xl font-bold text-blue-600">#{trackingId}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">✅ Saved to MongoDB</p>
            <p className="text-sm text-gray-600 mb-2">✅ Admin notified</p>
            <p className="text-sm text-gray-600">✅ Email confirmation sent</p>
          </div>

          <p className="text-sm text-gray-500">
            You'll receive updates via email and notifications. Track your issue from the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Report an Issue</h1>
          <p className="text-gray-600">Help us make your city better by reporting infrastructure problems</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Uploading images...</span>
              <span className="text-sm font-bold text-blue-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Category Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Issue Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat.id}
                  className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedCategory === cat.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    value={cat.id}
                    {...register('category', { required: 'Please select a category' })}
                    className="sr-only"
                  />
                  <span className="text-3xl mb-2">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
                  {selectedCategory === cat.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-2">{errors.category.message}</p>
            )}
          </div>

          {/* Priority Level */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Priority Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PRIORITY_LEVELS.map((priority) => (
                <label
                  key={priority.value}
                  className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedPriority === priority.value ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    value={priority.value}
                    {...register('priority')}
                    className="sr-only"
                  />
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${priority.color}`}>
                    {priority.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 10, message: 'Title must be at least 10 characters' },
                maxLength: { value: 100, message: 'Title must be less than 100 characters' }
              })}
              placeholder="Brief description of the issue"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 20, message: 'Description must be at least 20 characters' }
              })}
              rows="4"
              placeholder="Provide detailed information about the issue..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 mb-3">
              <input
                type="text"
                {...register('address', { required: 'Address is required' })}
                placeholder="Enter address or use current location"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={loadingLocation}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                {loadingLocation ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5" />
                )}
                {loadingLocation ? 'Getting...' : 'Use GPS'}
              </button>
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
            {location && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Location captured: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </div>
            )}
          </div>

          {/* Landmark */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nearby Landmark (Optional)
            </label>
            <input
              type="text"
              {...register('landmark')}
              placeholder="e.g., Near City Hospital, Opposite Park"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Images <span className="text-red-500">*</span> (Max 5, up to 5MB each)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">Click to upload images</p>
                <p className="text-sm text-gray-400">JPG, PNG, GIF up to 5MB</p>
              </label>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.url}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition truncate">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting to MongoDB...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-blue-600 text-2xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-1">Quick Response</h3>
            <p className="text-sm text-gray-600">Issues are reviewed within 24 hours</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-green-600 text-2xl mb-2">📍</div>
            <h3 className="font-semibold text-gray-800 mb-1">Track Progress</h3>
            <p className="text-sm text-gray-600">Get real-time updates on your report</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-purple-600 text-2xl mb-2">🏆</div>
            <h3 className="font-semibold text-gray-800 mb-1">Make a Difference</h3>
            <p className="text-sm text-gray-600">Help improve your community</p>
          </div>
        </div>
      </div>
    </div>
  );
}