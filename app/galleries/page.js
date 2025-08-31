import Gallery from "@/components/gallery";
import GalleryBanner from "@/components/gallery/galleryBanner";

export default function GalleryPage() {
  return (
    <main>

      <GalleryBanner />
      <div className="pt-24 min-h-screen bg-gray-50">
        <section className="container mx-auto px-6">
          <Gallery />
        </section>
      </div>
    </main>
  );
}
