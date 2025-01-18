import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-900">

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="h-[600px] relative">
          <Image
            src="/hero-game.jpg"
            alt="Featured Game"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex items-end pb-20">
              <div className="text-white">
                <h1 className="text-5xl font-bold mb-4">Latest Gaming News</h1>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Experience the latest updates from the gaming world, reviews, and exclusive content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* News Cards */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-zinc-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200">
              <div className="relative h-48">
                <Image
                  src={`/game-${item}.jpg`}
                  alt="Game News"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="text-cherry-500 text-sm font-semibold">GAMING</span>
                <h2 className="text-white text-xl font-bold mt-2">
                  Latest Gaming News Title
                </h2>
                <p className="text-gray-400 mt-2">
                  Brief description of the gaming news article...
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
