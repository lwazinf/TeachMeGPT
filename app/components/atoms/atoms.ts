import { atom } from "recoil";

// Your data array
export const data_ = [
    {
      title: `Case Study: Optimizing Customer Experience in the Car Insurance Industry`,
      case: `In the competitive world of e-commerce, Company X is looking to improve customer experience and drive sales through personalized recommendations and offerings. They want to leverage data analytics to understand customer preferences and behavior to deliver tailored shopping experiences.`,
      type: `multichoice`,
      media: <Boolean>false,
      questions: <any>[
        `How might personalized recommendations impact customer loyalty and retention for Company X? Provide specific examples of how tailored suggestions can enhance the shopping experience.`,
      ],
      uid: <any>1,
    },
    // {
    //   title: `Case Study: Optimizing Customer Experience in the Car Insurance Industry`,
    //   case: `In the competitive world of e-commerce, Company X is looking to improve customer experience and drive sales through personalized recommendations and offerings. They want to leverage data analytics to understand customer preferences and behavior to deliver tailored shopping experiences.`,
    //   type: `detail`,
    //   media: <Boolean>false,
    //   questions: <any>[
    //     `How might personalized recommendations impact customer loyalty and retention for Company X? Provide specific examples of how tailored suggestions can enhance the shopping experience.`,
    //     `Discuss the potential ethical concerns related to collecting and using customer data to provide personalized experiences. How can Company X address these concerns to ensure both customer satisfaction and data privacy?`,
    //     `Evaluate the potential challenges Company X might face in implementing a successful personalization strategy. What technological, logistical, and customer-oriented hurdles should they consider?`,
    //   ],
    //   uid: <any>2,
    // },
  ];
  
  // Create objects {uid: object_.uid, data: [..all questions]}
  const objectsWithUidAndData = data_.map((obj) => ({
    uid: <any>obj.uid,
    data: <any>[],
  }));

export const ObjectState = atom({
  key: "ObjectState",
  default: objectsWithUidAndData,
}); 

export const DataState = atom({
  key: "DataState",
  default: {cs: '', t: '', q: [], tips: ''},
}); 

export const FocusState = atom({
  key: "FocusState",
  default: {},
}); 

export const AnswerState = atom({
    key: "AnswerState",
    default: {data: '', answer: ''},
  }); 

  export const ScriptState = atom({
    key: "ScriptState",
    default: [],
  }); 

  export const SignalState = atom({
    key: "SignalState",
    default: 0,
  }); 

  export const TestState = atom({
    key: "TestState",
    default: -1,
  }); 

  export const LoadingState = atom({
    key: "LoadingState",
    default: false,
  }); 

  export const GenderState = atom({
    key: "GenderState",
    default: 'm',
  }); 

  export const ThisState = atom({
    key: 'ThisState',
    default: false,
  })

  export const ShowingState = atom({
    key: 'ShowingState',
    default: '',
  })

  export const UserState = atom<any>({
    key: 'UserState',
    default: null,
  })

  export const MenuState = atom<any>({
    key: 'MenuState',
    default: false,
  })

  export const InterState = atom<any>({
    key: 'InterState',
    default: [],
  })

  export const BaselineState = atom<any>({
    key: 'BaselineState',
    default: {0: {}, 1: {}},
  })

  export const IndexState = atom<any>({
    key: 'IndexState',
    default: 0,
  })