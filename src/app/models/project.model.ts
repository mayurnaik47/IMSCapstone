
export  class UserModel {
  userName: string;
  email: string;
  password: string;
  fName: string;
  lName: string;
  phone: string;
  uType: number;
}

export  class IdeaEvaluation {
  critID: number;
  usersID: number;
  ideaID: number;
  rating: number;
  evalStatus: string;
}

export  class IdeaModel {
  ideaID: number;
  title: string;
  description: string;
  estTime: string;
  cost: string;
  docName: string;
  usersID: number;
  typeID: number;
  statusID: number;
  typeName: string;
  statusName: string;
  evalStatus: string;
}

export  class MaxID {
  maxId: number;
}

export  class IdeaType {
  typeID: number;
  name: string;
}
export  class IdeaCriteria {
  critID: number;
  name: string;
  rating: number;
}

export  class IdeaStatus {
  statusID: number;
  name: string;
}

export  class Evaluators {
  usersID: number;
  typeID: number;
}

export  class IdeaFeedback {
  usersID: number;
  ideaID: number;
  message: string;
  msgID: number;
}

