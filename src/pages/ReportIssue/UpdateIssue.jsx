import React from 'react';
import Heading from '../../components/Shared/Heading';
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../Utils';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const UpdateIssue = ({setShowEditModal , editingIssue}) => {


    const categories = [
        "Potholes",
        "Broken Streetlights",
        "Water Leakage",
        "Garbage Overflow",
        "Damaged Footpaths",
        "Drainage Blockage",
        "Illegal Parking",
        "Broken Park Bench",
        "Faulty Traffic Signal",
        "Other",
    ];

    const priorities = [
        
        'Medium',
        'Low'
    ]

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    });








    const x = users.find(us => us.email === user?.email)
    const xrole = x?.role

    const { register, handleSubmit } = useForm();

    
    

    const handleFormSubmit = async (data) => {


        const { category, description, image, priority, region, district, upzila, location } = data;
        const profileImg = image[0];
        const photoURL = profileImg ? await imageUpload(profileImg) : editingIssue?.photo;




        const issueData = {
            category,
            description,
            photo: photoURL,
            priority,
            region,
            district,
            upzila,
            location,
            userRole: xrole,
            



        };
        console.log(issueData);

        Swal.fire({
            title: "Are you sure?",
            text: "You are going to tell us issue!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I agree!"
        }).then((result) => {
            if (result.isConfirmed) {

                // save issue in db
                if (!x?.isBlock) {
                    axiosSecure.patch(`/issues/${editingIssue?._id}`, issueData)

                        .then(res => {
                            console.log('Issue saved', res.data);

                            Swal.fire({
                                icon: "success",
                                title: "Issue Updated",
                                text: "Your issue has been updated successfully!",
                            });
                        })
                        .catch(error => {
                            console.error('Axios error:', error);

                            Swal.fire({
                                icon: "error",
                                title: "Submission Failed",
                                text: error?.response?.data?.message || 'Something went wrong',
                            });
                        });

                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Submission Failed",
                        text: 'You are block by Admin',
                    });
                }

            }

        });
        // post issue data to the server
    }
    return (

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid px-5">
            <div className="space-y-4">

                <fieldset className='flex justify-between items-center gap-5'>
                    <fieldset className='w-full mx-auto'>
                        <legend className="block mb-2 text-sm">Set Category</legend>
                        <select {...register("category")} defaultValue={editingIssue?.category} className="select w-full">
                            <option disabled={true}>Pick Category</option>
                            {
                                categories.map((category, index) => <option key={index}>{category}</option>)
                            }


                        </select>
                    </fieldset>
                    <fieldset className='w-full mx-auto'>
                        <legend className="block mb-2 text-sm">Urgency Level</legend>
                        <select {...register("priority")} defaultValue={editingIssue?.priority} className="select w-full">
                            
                            <option disabled={true}>High</option>
                            {
                                priorities.map((priority, index) => <option key={index}>{priority}</option>)
                            }


                        </select>
                    </fieldset>

                </fieldset>


                <fieldset>
                    <label htmlFor="issueDescription" className="block mb-2 text-sm">
                        Issue Description
                    </label>
                    <textarea
                        {...register("description")}
                        defaultValue={editingIssue?.description}
                        id="issueDescription"
                        placeholder="Describe the issue in detail"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900"
                        rows="5"
                        data-temp-mail-org="0"
                    ></textarea>
                </fieldset>

                <div>
                    <label
                        htmlFor="issueImage"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Upload Image (optional)
                    </label>
                    <input
                        type="file"
                        {...register('image')}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4  file:rounded-md file:border-0  file:text-sm file:font-semibold  file:bg-blue-50 file:text-blue-700  hover:file:bg-blue-100  bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-1"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        PNG, JPG or JPEG (max 5MB)
                    </p>
                </div>
                <fieldset className='flex justify-between items-center gap-4'>
                    <fieldset className='fieldset w-full'>
                        <legend className="fieldset-legend">Select Your Region</legend>
                        <select {...register("region")} defaultValue={editingIssue?.region} className="select w-full">
                            <option disabled={true}>{editingIssue?.region} </option>
                            
                        </select>
                    </fieldset>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Select Your District</legend>
                        <select {...register('district')} defaultValue={editingIssue?.district} className="select w-full">
                            <option disabled={true}>{editingIssue?.district} </option>
                            
                        </select>
                    </fieldset>
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Select Upzila</legend>
                        <select {...register('upzila')} defaultValue={editingIssue?.upzila} className="select w-full">
                            <option disabled={true}>{editingIssue?.upzila}</option>
                            
                        </select>
                    </fieldset>



                </fieldset>
                <fieldset className="fieldset">
                    <label htmlFor="location" className="block mb-2 text-sm">
                        Location
                    </label>
                    <input
                        type="text"
                        {...register("location")}
                        defaultValue={editingIssue?.location}
                        id="location"
                        placeholder="Enter the location of the issue"
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900"
                        data-temp-mail-org="0"
                    />
                </fieldset>
            </div>
            <div className="flex gap-4 pt-4">
                <button
                    type='submit'
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Update Issue
                </button>
                <button
                    type='button'
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                    Cancel
                </button>
            </div>
        </form>

    );
};

export default UpdateIssue;