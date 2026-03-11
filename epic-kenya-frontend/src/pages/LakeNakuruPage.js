// src/pages/LakeNakuruPage.js
import React from "react";
import DestinationLayout from "../components/DestinationLayout";
import lakeNakuruBg from "../assets/lake-nakuru-bg.jpg";

const LakeNakuruPage = () => {
  return (
    <DestinationLayout
      title="Lake Nakuru"
      description="Lake Nakuru National Park is a haven for bird watchers and wildlife lovers. Set against the backdrop of the Great Rift Valley, it is famed for its pink-hued flamingos, endangered white rhinos, and sweeping acacia woodlands. A place where the sky, land, and water meet in a dance of colors and life."
      backgroundImage={lakeNakuruBg}
      destination="lake-nakuru" // ✅ This must match the destination used in backend
      activities={[
        "Spot flamingos along the lake’s alkaline shores",
        "See endangered white and black rhinos",
        "Drive to Baboon Cliff for a panoramic view of the lake",
        "Visit the Makalia Waterfalls inside the park",
        "Enjoy a picnic surrounded by zebras and waterbucks",
      ]}
      videoUrl="https://www.youtube.com/embed/KnxQ1cVBl1g"
      mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127234.49018202856!2d36.0191105!3d-0.35660799999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa4d70dcf5b09%3A0x6b2b4a71e4c9a7ef!2sLake%20Nakuru%20National%20Park!5e0!3m2!1sen!2ske!4v1718346732347"
    />
  );
};

export default LakeNakuruPage;
