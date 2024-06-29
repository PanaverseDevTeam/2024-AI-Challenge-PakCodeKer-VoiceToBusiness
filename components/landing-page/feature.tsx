"use client";

const Feature = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-white via-white  sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-green-600 to-lime-600">
            <p className="text-xs font-semibold tracking-widest text-white uppercase">
              Our Key Features
            </p>
          </div>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-200">
            Instant Business Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Explore the cutting-edge tools and services we offer to
            revolutionize your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
          <div className="transition-all duration-200 bg-white hover:shadow-xl">
            <div className="py-10 px-9">
              <svg
                className="w-16 h-16 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Placeholder Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Generative AI
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Discover how our Generative AI can automate content creation,
                enhance productivity, and foster innovation in your business.
              </p>
            </div>
          </div>

          <div className="transition-all duration-200 bg-white hover:shadow-xl">
            <div className="py-10 px-9">
              <svg
                className="w-16 h-16 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Placeholder Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Business Generator
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Leverage our Business Generator tools to identify new market
                opportunities, streamline operations, and accelerate growth.
              </p>
            </div>
          </div>

          <div className="transition-all duration-200 bg-white hover:shadow-xl">
            <div className="py-10 px-9">
              <svg
                className="w-16 h-16 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Placeholder Icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="mt-8 text-lg font-semibold text-black">
                Custom Solutions
              </h3>
              <p className="mt-4 text-base text-gray-600">
                Custom AI solutions tailored to meet the specific needs of your
                business and industry.
              </p>
            </div>
          </div>
        </div>

        {/* Border Line */}
        <div className=" w-full h-full border mt-14"></div>
      </div>
    </section>
  );
};

export default Feature;
