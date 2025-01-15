interface Id {
    fid: {
      id: number;
      fname: string;
      price: number;
    };
  }
  
  export default function Button({ fid }: Id) {
    const orderFood = () => {
      const storedOrders = localStorage.getItem('order');
      const storeItem = storedOrders ? JSON.parse(storedOrders) : [];
      
      storeItem.push(fid);
  
      localStorage.setItem('order', JSON.stringify(storeItem));
  
      console.log("Order saved:", storeItem);
    };
  
    return (
      <button
        onClick={orderFood}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-colors"
      >
        Order Now
      </button>
    );
  }
  