import Gallery from "@/components/gallery";

export default function GalleryPage() {
  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <section className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">
          Our Gallery
        </h1>
        <Gallery />
      </section>
    </main>
  );
}
