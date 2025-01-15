export default function Restaurants() {
  return (
    <div className="max-w-screen-lg mx-auto py-20 px-5">
      <h1 className="text-4xl font-bold text-center mb-8">Our Restaurants</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <p>
          At <span className="font-semibold text-green-500">EatThisSheet</span>, we take pride in offering a wide variety of culinary delights to satisfy your cravings. From authentic Thai cuisine to exquisite European dishes, our restaurants cater to every palate.
        </p>
        <p>
          With branches located across multiple cities, we make it convenient for you to enjoy your favorite meals wherever you are. Whether you’re in the mood for spicy, savory, or sweet, we’ve got you covered!
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {/* Branches Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Our Branches</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Bangkok - Sukhumvit Road</li>
            <li>Chiang Mai - Nimmanhaemin</li>
            <li>Phuket - Patong Beach</li>
            <li>London - Oxford Street</li>
            <li>New York - Times Square</li>
          </ul>
          <p className="mt-4">
            No matter where you are, you’ll find a welcoming atmosphere, exceptional service, and unforgettable meals at all our branches.
          </p>
        </div>

        {/* Cuisine Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-4">Our Cuisine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow ">
              <div className="overflow-hidden rounded-lg h-[299px]">
                <img src="/thai.jpg" className="rounded-lg mb-2  h-[299px] w-full hover:scale-125 transition-all" />
              </div>

              <h3 className="font-semibold text-xl mb-2 text-green-600">Thai Cuisine</h3>
              <p>
                Enjoy the bold and vibrant flavors of Thailand, from spicy Tom Yum soup to creamy Green Curry.
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="overflow-hidden rounded-lg h-[299px]">
                <img src="/europe.jpg" className="rounded-lg mb-2  h-[299px] w-full hover:scale-125 transition-all" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-green-600">European Cuisine</h3>
              <p>
                Indulge in classic European dishes like Italian pasta, French pastries, and Spanish paella.
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="overflow-hidden rounded-lg h-[299px]">
                <img src="/japan.jpg" className="rounded-lg mb-2  h-[299px] w-full hover:scale-125 transition-all" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-green-600">Japanese Cuisine</h3>
              <p>
                Savor the delicate and fresh tastes of Japan, including sushi, ramen, and tempura.
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="overflow-hidden rounded-lg h-[299px]">
                <img src="/america2.jpg" className="rounded-lg mb-2  h-[299px] w-full hover:scale-125 transition-all" />
              </div>
              <h3 className="font-semibold text-xl mb-2 text-green-600">American Cuisine</h3>
              <p>
                Treat yourself to hearty American classics like burgers, steaks, and barbecues.
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-xl font-semibold text-gray-800">
          Visit one of our branches today and let your taste buds explore the world!
        </p>
      </div>
    </div>
  );
}
