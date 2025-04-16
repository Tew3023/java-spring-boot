interface Id {
  fid: {
    id: number;
    fname: string;
    price: number;
  };
}

export default function Button({ fid }: Id) {
  const orderFood = () => {
    const storedOrders = localStorage.getItem("order");
    const orderList = storedOrders ? JSON.parse(storedOrders) : [];
    const existingItemIndex = orderList.findIndex((item: any) => item.id === fid.id);
    if (existingItemIndex !== -1) {
      orderList[existingItemIndex].quantity += 1;
    } else {
      orderList.push({
        id: fid.id,
        fname: fid.fname,
        price: fid.price,
        quantity: 1,
      });
    }
    localStorage.setItem("order", JSON.stringify(orderList));
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
