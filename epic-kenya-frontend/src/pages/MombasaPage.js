import React from "react";
import DestinationLayout from "../components/DestinationLayout";
import mombasaBg from "../assets/mombasa-bg.jpg"; 

const MombasaPage = () => {
  return (
    <DestinationLayout
      title="Mombasa"
      description="Mombasa is Kenya’s coastal jewel — home to stunning beaches, rich Swahili heritage, centuries-old forts, and vibrant island life. Wander through Old Town’s narrow alleys, feel the breeze at Fort Jesus, and soak in breathtaking sunsets over the Indian Ocean."
      backgroundImage={mombasaBg}
      destination="mombasa"
      activities={[
        "Explore the historic Fort Jesus Museum",
        "Walk through Mombasa Old Town and Swahili architecture",
        "Relax at Nyali and Bamburi Beaches",
        "Visit Haller Park for nature trails and wildlife",
        "Enjoy seafood at Tamarind Dhow restaurant on the sea",
      ]}
      videoUrl="https://www.youtube.com/embed/G3WqCniRcfs" 
      mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.58489713216!2d39.65626785!3d-4.0434775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1840122c35c9a3d3%3A0x8e647e8f1f77ddf0!2sMombasa!5e0!3m2!1sen!2ske!4v1718345678901"
    />
  );
};

export default MombasaPage;
