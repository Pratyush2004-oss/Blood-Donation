'use client'
import BloodGroup from '@/app/_data/BloodGroup'
import { db } from '@/config'
import { userdata } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { City, Country, State } from 'country-state-city'
import { eq } from 'drizzle-orm'
import { CalendarHeart, Droplet, Mail, MapPin, Phone, SquareUserRound } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Update = () => {
    const { user } = useUser();
    const [userInfo, setUserinfo] = useState([]);

    {/* For selecting the country */}
    const countrydata = Country.getAllCountries();
    const [country,setusercountry] = useState();
    console.log(country);
    
    {/* for selecting the state */}
    const stateData = State.getStatesOfCountry(country);
    const statecode = State.getStateByCode(country);
    const [state,setState0] = useState()
    // console.log(statecode);

    {/* for selecting the city */}
    const citydata = City.getCitiesOfState(statecode)
    // console.log(citydata)

    useEffect(() => {
        user && getUserData();
    }, [user])
    const getUserData = async () => {
        const result = await db.select().from(userdata)
            .where(eq(userdata.usermail, user?.primaryEmailAddress?.emailAddress))
        setUserinfo(result)
    }
    return (
        <div className='p-10 pb-32 md flex flex-col'>
            <h2 className='font-bold text-2xl font-serif'>Update your Data</h2>

            <form className='w-full p-4 my-4 border-4 shadow-md rounded-lg mx-auto'>
                {/* UserName */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <SquareUserRound width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>Name</span>
                    </label>
                    <label className="w-full">
                        <input
                            type="text"
                            placeholder="Enter Your Name"
                            className="input input-bordered w-full"
                            defaultValue={userInfo.name} />
                    </label>
                </div>

                {/* Age */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <CalendarHeart width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>Age</span>
                    </label>
                    <label className="w-full">
                        <input
                            type="number"
                            placeholder="Enter age"
                            className="input input-bordered w-full"
                            defaultValue={userInfo.age} />
                    </label>
                </div>

                {/* Email */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <Mail width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>E-mail</span>
                    </label>
                    <label className="w-full">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userInfo.usermail}
                            disabled />
                    </label>
                </div>

                {/* Cntact Number */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <Phone width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>Contact Number</span>
                    </label>
                    <label className="w-full">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            defaultValue={userInfo.mobile}
                        />
                    </label>
                </div>

                {/* Blood Group */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <Droplet width={40} height={40} className='text-red-500' />
                        </span>
                        <span className='text-lg font-bold'>Blood Group</span>
                    </label>
                    <select className="select w-full select-bordered">
                        <option disabled selected>{userInfo.bloodgroup}</option>
                        {BloodGroup.map((option, idx) => (
                            <option key={idx}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Country */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <MapPin width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>Country</span>
                    </label>
                    <label className="w-full">
                        <select 
                        onChange={(v) => setusercountry(v.target.value)}
                        className="select w-full select-bordered">
                            <option disabled selected>{userInfo.country}</option>
                            {countrydata.map((option, idx) => (
                                <option
                                value={option.isoCode}
                                key={idx}>{option.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* State */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <MapPin width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>State</span>
                    </label>
                    <label className="w-full">
                        <select className="select w-full select-bordered">
                            <option disabled selected>{userInfo.bloodgroup}</option>
                            {stateData.map((option, idx) => (
                                <option key={idx}>{option.name}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* City */}
                <div className='grid grid-cols-1 md:grid-cols-2  my-5'>
                    <label className='grid grid-cols-2 gap-4 items-center my-2 md:justify-center'>
                        <span className='flex justify-end'>
                            <MapPin width={40} height={40} />
                        </span>
                        <span className='text-lg font-bold'>City</span>
                    </label>
                    <label className="w-full">
                        <select className="select w-full select-bordered">
                            <option disabled selected>{userInfo.bloodgroup}</option>
                            {BloodGroup.map((option, idx) => (
                                <option key={idx}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>

                {/* Submit button */}
                <div className='flex justify-center items-center'>
                    <button className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Update