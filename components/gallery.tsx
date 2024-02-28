import Image from "next/image";
import Placeholder from "../public/images/gallery/galleryImg(20).jpg";
import GalleryImages from "../pages/api/gallery-api";
import { useState } from "react";

function GallerySlider() {
  const [image, setImage] = useState(GalleryImages[0]);
  
  const viewImage=(index)=> {
    setImage(GalleryImages[index])
  }

  const SliderImages = GalleryImages.map((gallery,index) => (
    // <div className="gallery-image">
    <Image
      onClick={()=>viewImage(index)}
      key={gallery.id}
      id={gallery.id}
      src={gallery.src}
      alt="Placeholder"
      width={50} height={50}
      className={`${gallery.id == image.id ? "gallery-image-active":"gallery-image"}`}
    />
    // </div>
  ));

  return (
    <>
      <div className="gallery">
        <div className="text-section">
          <h2>Gallery</h2>
          <p>Highlighted images from our latest events</p>
        </div>
        <div className="image-on-display  mt-6">
          <Image src={image.src} width={50} height={50} alt="Placeholder text" />
        </div>
        <div className={`gallery-slider  mt-6`}> {SliderImages}</div>
      </div>
    </>
  );
}

export default function TheGallerySlider() {
  return <GallerySlider />;
}
