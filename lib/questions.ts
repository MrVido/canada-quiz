export type Question = {
  id: number;
  question: string;
  choices: [string, string, string, string];
  answerIndex: number;
  explanation: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
    answerIndex: 1,
    explanation: "Ottawa is the capital. Toronto just acts like it sometimes.",
  },
  {
    id: 2,
    question: "What animal is one of Canada's official symbols?",
    choices: [
      "Beaver",
      "Polar bear with sunglasses",
      "Goose with anger issues",
      "Moose in a tuxedo",
    ],
    answerIndex: 0,
    explanation: "The beaver is an official Canadian symbol.",
  },
  {
    id: 3,
    question: "What is Canada's national winter sport?",
    choices: [
      "Ice hockey",
      "Snow shoveling",
      "Complaining about road salt",
      "Tim Hortons drive-thru racing",
    ],
    answerIndex: 0,
    explanation: "Hockey is Canada's national winter sport.",
  },
  {
    id: 4,
    question: "What is Canada's national summer sport?",
    choices: ["Lacrosse", "Soccer", "Canoe parking", "Patio season"],
    answerIndex: 0,
    explanation: "Lacrosse is Canada's national summer sport.",
  },
  {
    id: 5,
    question: "Who is Canada's head of state?",
    choices: [
      "The Prime Minister",
      "The King",
      "The Governor General's dog",
      "The mayor of every small town",
    ],
    answerIndex: 1,
    explanation:
      "Canada is a constitutional monarchy, and the monarch is the head of state.",
  },
  {
    id: 6,
    question: "What are the three levels of government in Canada?",
    choices: [
      "Federal, provincial/territorial, municipal",
      "Cold, colder, freezing",
      "Prime, premium, extra maple",
      "City, hockey, cottage",
    ],
    answerIndex: 0,
    explanation:
      "Canada has federal, provincial/territorial, and municipal governments.",
  },
  {
    id: 7,
    question: "What does the maple leaf represent on the Canadian flag?",
    choices: [
      "Canada",
      "A warning that syrup may be nearby",
      "Hockey overtime",
      "Fall cleanup season",
    ],
    answerIndex: 0,
    explanation: "The maple leaf is the main symbol on Canada's flag.",
  },
  {
    id: 8,
    question: "What are the two official languages of Canada?",
    choices: [
      "English and French",
      "English and Hockey",
      "French and Apology",
      "Poutine and Maple",
    ],
    answerIndex: 0,
    explanation: "Canada's official languages are English and French.",
  },
  {
    id: 9,
    question:
      "Which province is known for French-speaking culture and Montreal?",
    choices: ["Quebec", "Alberta", "Nova Scotia", "British Columbia"],
    answerIndex: 0,
    explanation: "Quebec is Canada's main French-speaking province.",
  },
  {
    id: 10,
    question: "What is the name of Canada's national police force?",
    choices: ["RCMP", "FBI Canada", "Maple Patrol", "The Sorry Squad"],
    answerIndex: 0,
    explanation:
      "The Royal Canadian Mounted Police are Canada's national police force.",
  },
  {
    id: 11,
    question: "What do Canadians vote for in a federal election?",
    choices: [
      "Members of Parliament",
      "The best donut",
      "The Stanley Cup winner",
      "The weather forecast",
    ],
    answerIndex: 0,
    explanation: "Canadians elect Members of Parliament.",
  },
  {
    id: 12,
    question: "What is the name of Canada's parliament buildings city?",
    choices: ["Ottawa", "Calgary", "Winnipeg", "Mississauga"],
    answerIndex: 0,
    explanation: "Parliament is in Ottawa.",
  },
  {
    id: 13,
    question: "What ocean is on Canada's west coast?",
    choices: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
      "Ocean of maple syrup",
    ],
    answerIndex: 0,
    explanation: "British Columbia borders the Pacific Ocean.",
  },
  {
    id: 14,
    question: "What ocean is on Canada's east coast?",
    choices: [
      "Atlantic Ocean",
      "Pacific Ocean",
      "Indian Ocean",
      "The Great Double-Double Sea",
    ],
    answerIndex: 0,
    explanation: "Atlantic Canada borders the Atlantic Ocean.",
  },
  {
    id: 15,
    question: "What is Canada's northern ocean?",
    choices: [
      "Arctic Ocean",
      "Pacific Ocean",
      "Atlantic Ocean",
      "Frozen Coffee Ocean",
    ],
    answerIndex: 0,
    explanation: "Canada reaches the Arctic Ocean in the north.",
  },
  {
    id: 16,
    question: "What is a major right of Canadian citizens?",
    choices: [
      "The right to vote",
      "The right to skip winter",
      "The right to free poutine",
      "The right to own a Zamboni",
    ],
    answerIndex: 0,
    explanation: "Canadian citizens have the right to vote.",
  },
  {
    id: 17,
    question: "What is one responsibility of Canadian citizens?",
    choices: [
      "Obeying the law",
      "Saying sorry every 12 minutes",
      "Owning plaid",
      "Watching every hockey game",
    ],
    answerIndex: 0,
    explanation: "Citizens are expected to obey Canadian laws.",
  },
  {
    id: 18,
    question: "What is Canada's national anthem?",
    choices: [
      "O Canada",
      "Sweet Caroline",
      "The Hockey Night in Canada theme",
      "Maple Syrup Forever",
    ],
    answerIndex: 0,
    explanation: 'Canada\'s national anthem is "O Canada."',
  },
  {
    id: 19,
    question: "Which city is the largest in Canada by population?",
    choices: ["Toronto", "Ottawa", "Vancouver", "Halifax"],
    answerIndex: 0,
    explanation: "Toronto is Canada's largest city.",
  },
  {
    id: 20,
    question:
      "Final boss question: What should every true Canadian do when someone bumps into them?",
    choices: [
      'Say "sorry" even if it was not their fault',
      "Challenge them to a duel",
      "Call Parliament",
      "Pour maple syrup on the ground",
    ],
    answerIndex: 0,
    explanation:
      "This one is mostly cultural comedy. But yes, saying sorry is very Canadian.",
  },
];
