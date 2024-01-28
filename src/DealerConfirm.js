import supabase from './SupabaseClient.js';
import { useState, useEffect, useCallback } from 'react';
import DealerNavbar from "./DealerNavbar";
import { useNavigate } from 'react-router-dom';

const DealerConfirm = () =>  {
    const [error] = useState(null);
    const navigate = useNavigate();

    const deduct = useCallback(async (vehicle_name) => {
        const { data } = await supabase
        .from('Vehicles')
        .select('*')
        .eq('vehicle_name', vehicle_name)

        console.log(data);
        const newstocks = data[0].stocks;
        console.log(newstocks);
        localStorage.setItem('newstocks', newstocks);

        try {
          const deductedstocks = localStorage.getItem('newstocks')
          let newStocks = parseInt(deductedstocks) - 1;
            const { data } = await supabase
            .from('Vehicles')
            .update({ 'stocks': newStocks })    
            .eq('vehicle_name', vehicle_name);
            console.log(data);
            alert('Purchase Successful');
            navigate('/dealerhome');
        } 
        catch(error) {
            console.error('Error during login:', error.message); 
        }
    }, [navigate]); 

    const store1 = useCallback(async (vehicle_name) => {
        const stocks = localStorage.getItem('stocks');
        console.log(stocks);
        let newStocks = parseInt(stocks) + 1;
        try {
            const { data } = await supabase
            .from('Dealer_Inventory')
            .update({ 'stocks': newStocks })    
            .eq('vehicle_name', vehicle_name);
            console.log(data);
            deduct(vehicle_name);
        } 
        catch(error) {
            console.error('Error during login:', error.message);  
        }
    }, [deduct]); 

    const store2 = useCallback(async () => {
        const brand = localStorage.getItem('brand');
        const vehicle_name = localStorage.getItem('vehicle_name');
        const car_style = localStorage.getItem('car_style');
        const price = localStorage.getItem('price');
        const vin = localStorage.getItem('VIN');
        const image_path = localStorage.getItem('image_path');

        try {
            const { data } = await supabase
            .from('Dealer_Inventory')
            .insert([
                {
                    brand,
                    vehicle_name,
                    car_style,
                    price,
                    VIN: vin,
                    image_path,
                    stocks:'1'
                },
            ])
            .select()
            console.log(data);
            deduct(vehicle_name);
        } 
        catch (error) {
            console.error('Error during login:', error.message);
        }
    }, [navigate, deduct]);

    const buyConfirm = useCallback(async () => {
        const vehicle_name = localStorage.getItem('vehicle_name');
        console.log(vehicle_name);
        try {
            const { data } = await supabase
            .from('Dealer_Inventory')
            .select('*')
            .eq('vehicle_name', vehicle_name)
            .single();
            console.log(data);
                     
            if (data && data.vehicle_name === vehicle_name) {
                const stocks = data.stocks;
                localStorage.setItem('stocks', stocks);
                store1(vehicle_name);
            } else {
                store2();
            }
        } 
        catch(error) {
            console.error('Error fetching data:', error.message);
        }
    }, [store1, store2]);

    useEffect(() => {
        buyConfirm();
    }, [buyConfirm]); 

    return (
        <div>
            <DealerNavbar />
            <div>
            </div>
        </div>
    );
}
  
export default DealerConfirm;
