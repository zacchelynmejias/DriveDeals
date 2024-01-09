import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import DealerNavbar from "./DealerNavbar";
import { useNavigate } from 'react-router-dom';

const DealerConfirm = () =>  {
    const [error] = useState(null);
    const navigate = useNavigate();
    
    const buyConfirm = useCallback(async () => {
        const dealer_name = localStorage.getItem('dealer_name');
        const car_name = localStorage.getItem('car_name');
        const car_style = localStorage.getItem('car_style');
        const price = localStorage.getItem('price');
        const vin = localStorage.getItem('VIN');
        const image_path = localStorage.getItem('image_path');

        try {
            const { data } = await supabase
            .from('dealer_inventory')
            .insert([
                {
                    dealer_name,
                    car_name,
                    car_style,
                    price,
                    VIN: vin,
                    image_path,
                    stocks:'1'
                },
            ])
            .select()
            console.log(data);
            alert("Ordered Successfully")
            navigate('/dealerinventory');
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [navigate]);

    useEffect(() => {
        buyConfirm();
    }, [buyConfirm]); 

    return (
        <div>
            <DealerNavbar />
            <div>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
  
export default DealerConfirm;
