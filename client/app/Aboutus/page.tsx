export default function AboutUs() {
    return (
      <div className="max-w-screen-lg mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      
        <div className="space-y-6 text-lg text-gray-700">
          <p>
            Welcome to <span className="font-semibold text-green-500">EatThisSheet</span>, where food meets passion! We are a team of food enthusiasts, dedicated to connecting people with the best restaurants and culinary experiences. Whether you're a foodie on the hunt for unique flavors or simply seeking a comforting meal, we’ve got you covered.
          </p>
          <p>
            Our mission is to bring people together through the love of food. With a curated selection of popular dishes, trusted restaurant recommendations, and a commitment to quality, we aim to make every dining experience unforgettable.
          </p>
          <p>
            At <span className="font-semibold text-green-500">EatThisSheet</span>, we believe food is more than just sustenance—it's an adventure. Our team works tirelessly to ensure that you have access to the best places to eat, paired with seamless service and a user-friendly experience.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-500">Our Vision</h2>
            <p>
              To be the leading platform that connects food lovers with culinary treasures from around the world, fostering a community where everyone can discover, share, and enjoy great food.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-500">Our Values</h2>
            <ul className="list-disc list-inside">
              <li>Passion for quality and authenticity</li>
              <li>Commitment to our customers</li>
              <li>Inspiration through culinary exploration</li>
              <li>Building a community of food lovers</li>
            </ul>
          </div>
        </div>
        <div className="my-10 ">
            <img src="/aboutus.jpg" className="rounded-md" />
        </div>
      </div>
    );
  }
  