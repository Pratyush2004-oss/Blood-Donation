'use client'
import React, { useState } from 'react'
import BloodGroup from '../_data/BloodGroup'
import { City, Country, State } from 'country-state-city'
import toast from 'react-hot-toast'
import { db } from '@/config'
import { userdata } from '@/config/schema'
import { and, eq } from 'drizzle-orm'
import Userinfo from './_components/Userinfo'

const Dashboard = () => {

  {/* Getting country */ }
  const countrydata = Country.getAllCountries();
  const [countrycode, setCountrycode] = useState();
  const [country, setCountry] = useState('');

  {/* Getting State */ }
  const statedata = State.getStatesOfCountry(countrycode);
  const [statecode, setstatecode] = useState();
  const [state, setState] = useState('');

  {/* Getting City */ }
  const citydata = City.getCitiesOfState(countrycode, statecode);
  const [city, setcity] = useState('');

  {/* Setting blood group */ }
  const [bloodgrp, setbloodgrp] = useState('');


  {/* Setting varialble for getting data from database */ }
  const [bloodInfo, setbloddinfo] = useState();

  {/* Submiiting the user Details */ }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!country && !state && !city && !bloodgrp) {
      toast.error("FIll all credentials!");
    }
    else {
      const result = await db.select().from(userdata)
        .where(and(
          eq(userdata.country, country.name), eq(userdata.state, state.name), eq(userdata.city, city), eq(userdata.bloodgroup, bloodgrp)
        )).orderBy(userdata.id)
      setbloddinfo(result);
    }

  }


  return (
    <div data-theme='' className='p-10'>
      <h2 className='font-bold text-2xl font-serif'>Get the Blood</h2>
      <form
        onSubmit={handleSubmit}
        className='w-full p-4 my-4 border-4 shadow-md rounded-lg mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 '>
          {/* Country */}
          <select
            onChange={(e) => {
              setCountrycode(e.target.value)
              setCountry(Country.getCountryByCode(e.target.value))
            }}

            className="select flex mx-auto my-5 select-error w-full max-w-xs">
            <option selected disabled>Enter Country</option>
            {countrydata.map((option, idx) => (
              <option key={idx}
                value={option.isoCode}>{option.name}</option>
            ))}
          </select>

          {/* State */}
          <select
            onChange={(v) => {
              setstatecode(v.target.value)
              setState(State.getStateByCodeAndCountry((v.target.value), countrycode))
            }}
            className="select flex mx-auto my-5 select-error w-full max-w-xs">
            <option disabled selected>Enter State</option>
            {statedata.map((option, idx) => (
              <option key={idx}
                value={option.isoCode}>{option.name}</option>
            ))}
          </select>

          {/* City */}
          <select
            onChange={(v) => setcity(v.target.value)}
            className="select flex mx-auto my-5 select-error w-full max-w-xs">
            <option disabled selected>Enter City</option>
            {citydata.map((option, idx) => (
              <option
                key={idx}>{option.name}</option>
            ))}
          </select>

          {/* Blood Group */}
          <select
            onChange={(e) => setbloodgrp(e.target.value)}
            className="select flex mx-auto my-5 select-error w-full max-w-xs">
            <option disabled selected>Enter Blood Group</option>
            {BloodGroup.map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>

        </div>
        <button className='btn w-full my-5 btn-primary rounded-lg' type='submit'>
          <span>Submit</span>

        </button>
      </form>

      {/* Displaying Data of the users in the window */}
      {bloodInfo &&
        <div className='w-full p-4 my-4 border-4 shadow-md rounded-lg mx-auto' >
          <h2 className='font-bold text-2xl font-serif'>Donars in {city}</h2>
          <div className='grid grid-cols-1 xl:grid-cols-2 my-3 gap-4'>
            {bloodInfo.map((info, idx) => (
              <>
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
                <Userinfo key={idx} info={info} />
              </>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Dashboard