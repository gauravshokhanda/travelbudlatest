'use client';

import Image from 'next/image';

export default function RightImagesPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-center text-center px-12 h-full">
      <div className="flex flex-col justify-evenly items-center h-full py-10 w-full">
        {/* Block 1 */}
        <div className="flex flex-col items-center max-w-lg">
          <Image
            src="/images/Ecohouse.png"
            alt="Ecohouse"
            width={160}
            height={60}
            className="mb-4"
          />
          <h3 className="text-3xl text-black mb-2 leading-snug">
            Search perfect stays!
          </h3>
          <p className="text-lg text-accent leading-relaxed">
            Search the best stays and capture your favorite moments.
          </p>
        </div>

        {/* Block 2 */}
        <div className="flex flex-col items-center max-w-lg">
          <Image
            src="/images/Retirementestate.png"
            alt="List your property"
            width={160}
            height={60}
            className="mb-4"
          />
          <h3 className="text-3xl text-black mb-2 leading-snug">
            List your property
          </h3>
          <p className="text-lg text-accent leading-relaxed">
            List your property to earn and welcome travelers across the world.
          </p>
        </div>
      </div>
    </div>
  );
}
