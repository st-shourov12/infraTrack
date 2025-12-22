import React from 'react';
import Heading from '../../components/Shared/Heading';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';

import { imageUpload } from '../../Utils';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const ReportIssue = () => {
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

    const { register, handleSubmit, control } = useForm();

    const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(center => center.region);
    const regions = [...new Set(regionsDuplicate)];

    const senderRegion = useWatch({ control, name: 'region' });
    const up = useWatch({ control, name: 'district' });

    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const upByDistrict = (district) => {
        const regionDistricts = serviceCenters.filter(c => c.district === district);
        return regionDistricts.length > 0 ? regionDistricts[0].upazilas : [];
        //

    }

    const handleFormSubmit = async (data) => {


        const { reporterName, reporterEmail, category, description, image, priority, region, district, upzila, location } = data;
        const profileImg = image[0];
        const photoURL = profileImg ? await imageUpload(profileImg) : '';




        const issueData = {
            reporterName,
            reporterEmail,
            reporterPhoto: x?.photoURL,
            category,
            description,
            photo: photoURL,
            priority,
            region,
            district,
            upzila,
            location,
            userRole: xrole,
            status: 'pending',
            timeline: [
                {
                    id: 5,
                    status: "pending",
                    message: "Issue reported and awaiting review",
                    updatedBy: reporterName,
                    role: xrole,
                    assignedAt: new Date().toISOString()
                }
            ]


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
                    axiosSecure.post('/issues', issueData)

                        .then(res => {
                            console.log('Issue saved', res.data);

                            Swal.fire({
                                icon: "success",
                                title: "Issue Submitted",
                                text: "Your issue has been reported successfully!",
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
        <div className='max-w-5/6 mx-auto py-5'>

            <Heading center={true} title="Report Issue" subtitle="Report an issue to the system"></Heading>
            <div className="mt-8">
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid px-5">
                    <div className="space-y-4">
                        {/* username and email */}
                        <fieldset className='flex justify-between items-center gap-5'>
                            <fieldset className='w-full fieldset flex flex-col justify-between gap-2 '>
                                <label htmlFor="username" className='label'>Reporter Name</label>
                                <input className=' w-full input' type="text" id="username" {...register("reporterName")} defaultValue={user?.displayName} />
                            </fieldset>
                            <fieldset className='w-full fieldset flex flex-col justify-between gap-2 '>
                                <label htmlFor="email" className='label'>Email</label>
                                <input type="email" id="email" {...register("reporterEmail")} defaultValue={user?.email} className="input w-full" />
                            </fieldset>
                        </fieldset>
                        <fieldset className='flex justify-between items-center gap-5'>
                            <fieldset className='w-full mx-auto'>
                                <select {...register("category")} defaultValue="Pick Category" className="select w-full">
                                    <option disabled={true}>Pick Category</option>
                                    {
                                        categories.map((category, index) => <option key={index}>{category}</option>)
                                    }


                                </select>
                            </fieldset>
                            <fieldset className='w-full mx-auto'>
                                <legend className="block mb-2 text-sm">Urgency Level</legend>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register("priority")}
                                            value="Normal"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Normal</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register("priority")}
                                            value="Medium"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Medium</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register("priority")}
                                            value="High"
                                            className="form-radio"
                                        />
                                        <span className="ml-2">High</span>
                                    </label>
                                </div>
                            </fieldset>

                        </fieldset>


                        <fieldset>
                            <label htmlFor="issueDescription" className="block mb-2 text-sm">
                                Issue Description
                            </label>
                            <textarea
                                {...register("description")}
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
                                <select {...register("region")} defaultValue="Select Region" className="select w-full">
                                    <option disabled={true}>Select Region</option>
                                    {
                                        regions.map((region, index) => <option key={index}>{region}</option>)
                                    }
                                </select>
                            </fieldset>
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Select Your District</legend>
                                <select {...register('district')} defaultValue="Pick a district" className="select w-full">
                                    <option disabled={true}>Pick a district</option>
                                    {
                                        districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                                    }
                                </select>
                            </fieldset>
                            <fieldset className="fieldset w-full">
                                <legend className="fieldset-legend">Select Upzila</legend>
                                <select {...register('upzila')} defaultValue="Pick an upzila" className="select w-full">
                                    <option disabled={true}>Pick an upzila</option>
                                    {
                                        upByDistrict(up).map((d, i) => <option key={i} value={d}>{d}</option>)
                                    }
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
                                id="location"
                                placeholder="Enter the location of the issue"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-100 text-gray-900"
                                data-temp-mail-org="0"
                            />
                        </fieldset>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 w-full rounded-md py-3 text-white hover:bg-blue-700"
                        >
                            Submit Issue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIssue;