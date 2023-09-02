import Image from "next/image";
import Card_ from "./components/Card_";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div
        className={`flex flex-col justify-center items-center min-w-[910px] min-h-screen`}
      >
        <div
        className={`gap-4 justify-center items-center columns-2 min-w-[910px] min-h-2 py-8`}
      >
        {[
          {
            title: `Case Study: Optimizing Customer Experience in the Car Insurance Industry`,
            case: `In the competitive world of e-commerce, Company X is looking to improve customer experience and drive sales through personalized recommendations and offerings. They want to leverage data analytics to understand customer preferences and behavior to deliver tailored shopping experiences.`,
            type: `multichoice`,
            media: false,
            questions: [`How might personalized recommendations impact customer loyalty and retention for Company X? Provide specific examples of how tailored suggestions can enhance the shopping experience.`,],
            uid: 1
          },
          {
            title: `Case Study: Optimizing Customer Experience in the Car Insurance Industry`,
            case: `In the competitive world of e-commerce, Company X is looking to improve customer experience and drive sales through personalized recommendations and offerings. They want to leverage data analytics to understand customer preferences and behavior to deliver tailored shopping experiences.`,
            type: `detail`,
            media: false,
            questions: [
              `How might personalized recommendations impact customer loyalty and retention for Company X? Provide specific examples of how tailored suggestions can enhance the shopping experience.`,
              `Discuss the potential ethical concerns related to collecting and using customer data to provide personalized experiences. How can Company X address these concerns to ensure both customer satisfaction and data privacy?`,
              `Evaluate the potential challenges Company X might face in implementing a successful personalization strategy. What technological, logistical, and customer-oriented hurdles should they consider?`,
            ],
            uid: 2
          },
        ].map((obj_, index) => {
          return <Card_ section_={obj_} key={index} />;
        })}
      </div>
      </div>
    </main>
  );
}
