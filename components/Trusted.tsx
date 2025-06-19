import Image from "next/image";

const Trusted = () => {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl px-8 py-12">
        <div className="flex justify-center">
          <div className="max-w-[848px]">
            <p className="text-2xl sm:text-3xl md:text-[46px] font-bold text-center">
              We are <span className="text-primary-500">Trusted </span>by
              Industry Leaders
            </p>
            <p className="my-6 text-gray-primary  text-center">
              We have earned the trust of industry leaders through our
              unwavering commitment to excellence, innovation, and delivering
              exceptional results.
            </p>
          </div>
        </div>
        {/* logos */}
        <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
          {[
            "/images/youtube.png",
            "/images/facebook.png",
            "/images/google.png",
            "/images/youtube.png",
            "/images/facebook.png",
            "/images/google.png",
            "/images/youtube.png",
            "/images/facebook.png",
            "/images/google.png",
          ].map((logo, index) => (
            <div key={index}>
              <Image
                draggable={false}
                src={logo}
                alt={`Logo ${index + 1}`}
                width={133}
                height={44}
                className="h-full w-auto  min-w-[133px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
