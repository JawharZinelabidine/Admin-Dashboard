import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "../services/axiosInterceptor";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function RestaurantDetails() {
    const { restaurantId } = useSelector(state => state.restaurant);
    const [restaurant, setRestaurant] = useState({});

    const fetchRestaurant = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3000/api/admin/restaurant/${restaurantId}`);
            setRestaurant(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRestaurant();
    }, []);

    return (
        <div className="max-w-[800px] p-[20px] overflow-y-auto max-h-screen relative flex flex-col space-y-[20px] text-gray-700 bg-white shadow-md w-10/12 rounded-xl bg-clip-border">
            {/* {Main Image} */}
            <h6 className="text-lg font-semibold ">Main Image</h6>
            <div className="flex-1  text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 max-h-80">
                <img src={restaurant.main_image} className='w-full h-80 shadow-lg rounded-xl shadow-blue-gray-500/40' />
            </div>

            {/* Menu Images */}
            <div className="mt-4">
                <h6 className="text-lg font-semibold mb-2">Menu Images</h6>
                <Carousel>
                    {restaurant.menu_images && restaurant.menu_images.map((menuImage, index) => (
                        <img key={index} src={menuImage} className="w-full h-50 object-cover rounded-md" alt={`Menu ${index + 1}`} />
                    ))}
                </Carousel>
            </div>

            {/* Extra Images */}
            {restaurant.extra_images && restaurant.extra_images.length > 0 && (
                <div className="mt-4">
                    <h6 className="text-lg font-semibold mb-2">Extra Images</h6>
                    <Carousel>
                        {restaurant.extra_images.map((extraImage, index) => (
                            <div key={index}>
                                <img src={extraImage} className="w-full h-80 object-cover rounded-md" alt={`Extra ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}
            {/* Name */}
            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">Name: {restaurant.name}</h5>

            {/* Description */}
            <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-inherit">Description: {restaurant.description}</p>

            {/* Phone Number */}
            <p className="block font-sans text-base antialiased font-semibold leading-relaxed text-inherit">Phone Number: {restaurant.phone_number}</p>

        </div>
    )
}

export default RestaurantDetails
