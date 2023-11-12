import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RestaurantDetails() {
    const { restaurantId } = useSelector(state => state.restaurant);
    const [restaurant, setRestaurant] = useState({})

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

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <div className="max-w-[800px] p-[20px] overflow-y-auto max-h-screen relative flex flex-col space-y-[20px] text-gray-700 bg-white shadow-md w-10/12 rounded-xl bg-clip-border">
            {/* {Main Image} */}
            <h6 className="text-lg font-semibold">Main Image</h6>
            <div className="flex-1  text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 max-h-80">
                <img src={restaurant.main_image} className='w-full h-80 shadow-lg rounded-xl shadow-blue-gray-500/40' />
            </div>

            {/* Menu Images */}
            <div className="mt-4">
                <h6 className="text-lg font-semibold mb-2">Menu Images</h6>
                <Slider {...sliderSettings}>
                    {restaurant.menu_images &&
                        restaurant.menu_images.map((menuImage, index) => (
                            <div key={index}>
                                <img src={menuImage} className="w-full h-32 object-cover rounded-md" alt={`Menu ${index + 1}`} />
                            </div>
                        ))}
                </Slider>
            </div>

            {/* Extra Images */}
            <div className="mt-4">
                {restaurant.extra_images.length > 0 && <h6 className="text-lg font-semibold mb-2">Extra Images</h6>}
                <Slider {...sliderSettings}>
                    {restaurant.extra_images &&
                        restaurant.extra_images.map((extraImage, index) => (
                            <div key={index}>
                                <img src={extraImage} className="w-full h-32 object-cover rounded-md" alt={`Extra ${index + 1}`} />
                            </div>
                        ))}
                </Slider>
            </div>

            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"> {restaurant.name}</h5>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit"> {restaurant.description}</p>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit"> {restaurant.phone_number}</p>

        </div>
    )
}

export default RestaurantDetails
