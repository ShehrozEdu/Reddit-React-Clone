import React from 'react'
import { useNavigate } from 'react-router-dom';

const WorkUnderProgress = () => {
    const navigate=useNavigate()
    return (
        <>

            <div class="h-screen dark:bg-gray-900 bg-gray-100 flex items-center">
                <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div class="max-w-md">
                        <div class="text-5xl dark:text-white font-dark font-bold">404</div>
                        <p
                            class="text-2xl md:text-3xl dark:text-white font-light leading-normal"
                        >Work is under progress.</p>
                        <p class="mb-8 dark:text-white">But dont worry, you can find plenty of other things on our homepage.</p>

                        <button class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-gray-600 active:bg-gray-600 hover:bg-gray-700" onClick={()=>navigate("/")}>Back to homepage</button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default WorkUnderProgress