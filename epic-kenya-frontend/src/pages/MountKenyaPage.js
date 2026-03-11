import React from "react";
import DestinationLayout from "../components/DestinationLayout";
import mountKenyaBg from "../assets/mount-kenya-bg.jpg"; 

const MountKenyaPage = () => {
  return (
    <DestinationLayout
      title="Mount Kenya"
      description="Mount Kenya is Africa’s second-highest mountain and a UNESCO World Heritage Site. With its snow-capped peaks, diverse ecosystems, and dramatic scenery, it offers a unique alpine experience just miles from the equator. From hiking and climbing to exploring moorlands, it’s a true adventure hub."
      backgroundImage={mountKenyaBg}
      destination="mount-kenya"
      activities={[
        "Trek to Point Lenana, the third-highest summit",
        "Explore the tropical forests and bamboo zones",
        "Spot unique wildlife like sunbirds and hyraxes",
        "Camp under the stars at Shipton’s or Mackinder’s Camp",
        "Visit Lake Ellis or Lake Michaelson inside the park",
      ]}
      videoUrl="https://www.youtube.com/embed/C7khv4KEO6o" 
      mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63704.39634345635!2d37.2928!3d-0.1521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1828947e82f88507%3A0x72830e7881632b9b!2sMount%20Kenya!5e0!3m2!1sen!2ske!4v1718347526123"
    />
  );
};

export default MountKenyaPage;
