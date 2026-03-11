import React from "react";
import DestinationLayout from "../components/DestinationLayout";
import maasaiMaraBg from "../assets/maasai-mara-bg.jpg"; // Ensure this file exists

const MaasaiMaraPage = () => {
  return (
    <DestinationLayout
      title="Maasai Mara"
      description="The Maasai Mara is Kenya's most iconic safari destination, famed for its incredible wildlife and the annual Great Migration. Vast plains, acacia-dotted landscapes, and an abundance of predators make it a dream for nature lovers and photographers alike."
      backgroundImage={maasaiMaraBg}
      destination="maasai-mara"
      activities={[
        "See the Great Wildebeest Migration (July–October)",
        "Spot the Big Five on game drives",
        "Take a sunrise hot-air balloon ride over the savannah",
        "Visit Maasai villages and learn about their culture",
        "Enjoy sundowners with stunning Mara views",
      ]}
      videoUrl="https://www.youtube.com/embed/ZrsT8hq1xV0" 
      mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.982165247204!2d35.117751781839245!3d-1.406111105345131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x183e533087761b0f%3A0xf79df8d3fc147ff2!2sMasai%20Mara%20National%20Reserve!5e0!3m2!1sen!2ske!4v1718379124963"
    />
  );
};

export default MaasaiMaraPage;
