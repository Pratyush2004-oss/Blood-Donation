'use client'

import { db } from '@/config';
import { userdata } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { usedDynamicAPIs } from 'next/dist/server/app-render/dynamic-rendering';
import React, { useEffect, useState } from 'react'
import Userinfo from '../_components/Userinfo';
import Donarlist from './_components/Donarlist';

const Donar = () => {
    const { user } = useUser();

    const [me, setme] = useState();

    const getme = async () => {
        const result = await db.select().from(userdata)
            .where(and(eq(userdata.usermail, user?.primaryEmailAddress?.emailAddress), eq(userdata.mobile, user?.primaryPhoneNumber?.phoneNumber)))
        setme(result[0]);
        console.log(result)
    }



    useEffect(() => {
        getme() && user

    }, [user])

    return (
        <div data-theme='' className='p-10'>
            {me &&
                <>
                    <h2 className='font-bold text-xl xl:text-2xl text-center font-serif'>Blood Donars for you in {me.city},{me.state}</h2>

                    <div className='p-5 shadow-md my-4'>
                        <Donarlist me={me} />
                    </div>
                </>

            }
        </div>
    )
}

export default Donar