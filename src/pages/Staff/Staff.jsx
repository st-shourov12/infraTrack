import React from 'react';
import Heading from '../../components/Shared/Heading';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import { imageUpload } from '../../Utils';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Staff = () => {
    const departments = [
        "Road Maintenance",
        "Electrical Services",
        "Water Supply",
        "Waste Management",
        "Public Health",
        "Traffic Management",
        "Park & Recreation",
        "Building Inspector",
        "Emergency Services",
        "Other",
    ];

    const qualifications = [
        "High School Diploma",
        "Bachelor's Degree",
        "Master's Degree",
        "Technical Certification",
        "Vocational Training",
        "Professional License",
    ];

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
     const navigate = useNavigate()

    const { data: users = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });

    const currentUser = users.find(us => us.email === user?.email);

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const serviceCenters = useLoaderData() || [];

    const regionsDuplicate = Array.isArray(serviceCenters)
        ? serviceCenters.map(center => center.region)
        : [];

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
        const {
            fullName,
            email,
            phone,
            nid,
            department,
            qualification,
            experience,
            region,
            district,
            upzila,
            password,

            profileImage
        } = data;

        // Upload images
        const profileImgFile = profileImage[0];


        const profilePhotoURL = profileImgFile ? await imageUpload(profileImgFile) : currentUser?.photoURL || '';


        const staffApplicationData = {
            fullName,
            email,
            phone,
            nid,
            department,
            qualification,
            experience: parseInt(experience),
            preferredRegion: region,
            preferredDistrict: district,
            preferredUpzila: upzila,
            password,
            profilePhoto: profilePhotoURL,
            applicationStatus: 'pending',
            appliedAt: new Date().toISOString(),
            userId: currentUser?._id,
            userRole: 'staff',
        };

        console.log(staffApplicationData);

        Swal.fire({
            title: "Submit Application?",
            text: "You are applying to become a staff member!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (!currentUser?.isBlock) {
                    axiosSecure.post('/staffs', staffApplicationData)
                        .then(res => {
                            console.log('Application submitted', res.data);
                            Swal.fire({
                                icon: "success",
                                title: "Application Submitted!",
                                text: "Your staff application has been submitted successfully. We'll review it soon!",
                            });
                            navigate('/dashboard/myProfile')
                        })
                        .catch(error => {
                            console.error('Axios error:', error);
                            Swal.fire({
                                icon: "error",
                                title: "Submission Failed",
                                text: error?.response?.data?.message || 'Something went wrong',
                            });
                        });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Submission Failed",
                        text: 'You are blocked by Admin',
                    });
                }
            }
        });
    };

    return (
        <div className='max-w-5xl mx-auto py-5'>
            <Heading
                center={true}
                title="Become a Staff Member"
                subtitle="Join our team and help improve your community"
            />

            <div className="mt-8">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <div className="flex">
                        <div className="shrink-0">
                            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">
                                Please fill out this application form carefully. All fields marked with * are required.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 ng-untouched ng-pristine ng-valid px-5">

                    {/* Personal Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h3>

                        <div className="space-y-4">
                            {/* Full Name and Email */}
                            <fieldset className='flex flex-col md:flex-row justify-between items-center gap-5'>
                                <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                    <label htmlFor="fullName" className='label'>
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className='w-full input'
                                        type="text"
                                        id="fullName"
                                        {...register("fullName", { required: "Full name is required" })}
                                        defaultValue={user?.displayName}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
                                </fieldset>

                                <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                    <label htmlFor="email" className='label'>
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", { required: "Email is required" })}
                                        defaultValue={user?.email}
                                        className="input w-full"

                                    />
                                </fieldset>
                            </fieldset>

                            {/* Phone and NID */}
                            <fieldset className='flex flex-col md:flex-row justify-between items-center gap-5'>
                                <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                    <label htmlFor="phone" className='label'>
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className='w-full input'
                                        type="tel"
                                        id="phone"
                                        {...register("phone", {
                                            required: "Phone number is required",

                                        })}
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                                </fieldset>

                                <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                    <label htmlFor="nid" className='label'>
                                        National ID Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="nid"
                                        {...register("nid", {
                                            required: "NID is required",
                                            minLength: {
                                                value: 5,
                                                message: "NID must be at least 5 digits"
                                            }
                                        })}
                                        className="input w-full"
                                        placeholder="Enter your NID number"
                                    />
                                    {errors.nid && <span className="text-red-500 text-sm">{errors.nid.message}</span>}
                                </fieldset>
                            </fieldset>

                            <fieldset className='flex flex-col md:flex-row justify-between items-center gap-5'>

                                <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                    <label className="label">
                                        <span className="label-text">Password *</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                        })}
                                        placeholder="Enter password"
                                        className="input w-full input-bordered"
                                    />
                                    {errors.password && <span className="text-error text-sm">{errors.password.message}</span>}
                                </fieldset>

                                {/* Profile Image Upload */}
                                <div className='w-full fieldset flex flex-col justify-between gap-2'>


                                    <label htmlFor="profileImage" className="block mb-2 text-sm font-medium text-gray-700">
                                        Profile Photo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        {...register('profileImage')}
                                        accept="image/*"
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 bg-gray-100 border border-dashed border-blue-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 p-1"
                                    />
                                    {/* {errors.profileImage && <span className="text-red-500 text-sm">{errors.profileImage.message}</span>} */}
                                    <p className="mt-1 text-xs text-gray-400">PNG, JPG or JPEG (max 5MB)</p>
                                    {/* , { required: "Profile photo is required" } */}
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Professional Information</h3>

                        <div className="space-y-4">
                            {/* Department and Qualification */}
                            <fieldset className='flex flex-col md:flex-row justify-between items-center gap-5'>
                                <fieldset className='w-full mx-auto'>
                                    <label className="label">
                                        Preferred Department <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("department", { required: "Department is required" })}
                                        defaultValue="Pick Department"
                                        className="select w-full"
                                    >
                                        <option disabled={true}>Pick Department</option>
                                        {departments.map((dept, index) => <option key={index}>{dept}</option>)}
                                    </select>
                                    {errors.department && <span className="text-red-500 text-sm">{errors.department.message}</span>}
                                </fieldset>

                                <fieldset className='w-full mx-auto'>
                                    <label className="label">
                                        Highest Qualification <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("qualification", { required: "Qualification is required" })}
                                        defaultValue="Select Qualification"
                                        className="select w-full"
                                    >
                                        <option disabled={true}>Select Qualification</option>
                                        {qualifications.map((qual, index) => <option key={index}>{qual}</option>)}
                                    </select>
                                    {errors.qualification && <span className="text-red-500 text-sm">{errors.qualification.message}</span>}
                                </fieldset>
                            </fieldset>

                            {/* Years of Experience */}
                            <fieldset className='w-full fieldset flex flex-col justify-between gap-2'>
                                <label htmlFor="experience" className='label'>
                                    Years of Experience <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className='w-full input'
                                    type="number"
                                    id="experience"
                                    min="0"
                                    max="50"
                                    {...register("experience", {
                                        required: "Experience is required",
                                        min: { value: 0, message: "Experience cannot be negative" }
                                    })}
                                    placeholder="Enter years of experience"
                                />
                                {errors.experience && <span className="text-red-500 text-sm">{errors.experience.message}</span>}
                            </fieldset>


                        </div>
                    </div>

                    {/* Preferred Work Location Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Preferred Work Location</h3>

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
                    </div>



                    {/* Terms and Conditions */}
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                {...register("terms", { required: "You must agree to the terms" })}
                                className="mt-1 mr-3"
                            />
                            <div>
                                <p className="text-sm text-gray-700">
                                    I hereby declare that all the information provided above is true and accurate to the best of my knowledge.
                                    I understand that providing false information may result in rejection of my application.
                                </p>
                                {errors.terms && <span className="text-red-500 text-sm">{errors.terms.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="bg-blue-500 w-full rounded-md py-3 text-white hover:bg-blue-700 font-semibold transition-colors duration-200"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Staff;