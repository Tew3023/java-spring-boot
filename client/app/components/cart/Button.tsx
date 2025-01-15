import { useState } from "react";
import axios from "axios";

interface orderValue {
  id: number;
  fname: string;
  price: number;
}

export default function Button() {
    const addToDataBase = async () => {
        try {
          const order = localStorage.getItem("order"); 
          if (order) {
            const orderParsed: orderValue[] = JSON.parse(order);
            
            const orderFormated = orderParsed.map((order) => ({
              customer: "John Doe", 
              foodOrder: order.fname,  
              orderPrice: order.price  
            }));
      
            console.log(orderFormated);
      
            for (const order of orderFormated) {
              try {
                const response = await axios.post("http://localhost:8080/order", order);
                console.log(`Order item added: ${order.foodOrder}`, response.data);
              } catch (error) {
                console.error(`Failed to add order: ${order.foodOrder}`, error);
              }
            }
          } else {
            console.warn("No order found in localStorage.");
          }
        } catch (err) {
          console.error("An error occurred while processing orders:", err);
        }
      };
      

  return (
    <button
      onClick={addToDataBase}
      className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
    >
      Proceed to Checkout
    </button>
  );
}
