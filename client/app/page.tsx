'use server'
import { Star } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <section>
        <div
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-screen relative"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                Healthy and Delicious
                <br />
                Delivered Straight to You
              </h1>
              <p className="text-xl md:text-2xl mb-6">
                Fresh food, drinks, and groceries—delivered to your door.
              </p>
              <Link href={'/foods'} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-screen-lg mx-auto py-20">
          <h2 className="text-3xl font-semibold text-center mb-10">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:bg-green-200 transition-all">
              <h3 className="text-2xl font-semibold mb-4">Fresh Ingredients</h3>
              <p className="text-lg">
                We source the freshest ingredients to make your meals healthier and tastier.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:bg-green-200 transition-all">
              <h3 className="text-2xl font-semibold mb-4">Quick Delivery</h3>
              <p className="text-lg">
                Get your order delivered fast, so you can enjoy your meal at the perfect moment.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:bg-green-200 transition-all">
              <h3 className="text-2xl font-semibold mb-4">Healthy Options</h3>
              <p className="text-lg">
                Our menu offers healthy choices to fit your lifestyle and nutritional needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-screen-lg mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center flex-col text-center md:text-left">
            <p className="text-3xl font-semibold text-green-600 mb-4">Fresh Ingredients</p>
            <div className="flex justify-center md:justify-start mb-6">
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
            </div>
            <p className="text-lg text-gray-600 text-center">
              We source the freshest ingredients for a healthier, more delicious experience. You can taste the difference with every bite!
            </p>
          </div>
          <div className="relative w-full h-64 md:h-full rounded-lg overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/farm.jpg"
              alt="Farm fresh ingredients"
            />
          </div>
        </div>
      </section>
      <section className="max-w-screen-lg mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="/vegetable.jpg"
              alt="vegetable fresh ingredients"
            />
          </div>

          <div className="flex flex-col justify-center text-center space-y-4">
            <h2 className="text-3xl font-semibold text-green-600">
              No Chemical Fertilizers Used
            </h2>
            <div className="flex justify-center mb-6">
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
              <Star className="w-5 h-5 fill-green-400 text-green-400" />
            </div>
            <p className="text-lg text-gray-700">
              At EatThisSheet we are committed to providing you with healthy, fresh products grown without chemical fertilizers. Our focus is on sustainable farming that respects nature and promotes long-term health.
            </p>
            <p className="text-lg text-gray-700">
              We believe that good food starts with healthy soil and the use of natural, eco-friendly practices. Trust us to deliver products that are both delicious and good for the planet.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
