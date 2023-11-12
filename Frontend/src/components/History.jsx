import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function History() {
    return (
        <>
            < Navbar />
            <div className="flex-grow min-h-screen text-white bg-gray-900 w-full">
                <main className="p-6  space-y-28" >
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between ">
                        <div className="mr-6">
                            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                            <h2 className="text-gray-600 ml-0.5">Restaurants statistiques</h2>
                        </div>
                    </div>
                    <section className="flex flex-col row-span-3 bg-gray-800 shadow-lg rounded-lg">
                        <div className="row-span-3 bg-gray-800 shadow-lg rounded-lg">
                            <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                                <span>Restaurants History</span>
                            </div>
                            <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
                                <ul className="p-6 space-y-6">
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div >
        </>
    )
}

export default History
