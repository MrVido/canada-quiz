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
    choices: [
      "Toronto, because it keeps introducing itself first",
      "Ottawa, because apparently the quiet kid was in charge the whole time",
      "Montreal, because it has better food and refuses to apologize for it",
      "Vancouver, because rent is already political enough",
    ],
    answerIndex: 1,
    explanation:
      "Ottawa is the capital of Canada. Toronto gets the attention, Montreal gets the food, Vancouver gets the views, and Ottawa gets the government paperwork.",
  },
  {
    id: 2,
    question: "Which animal is one of Canada's official symbols?",
    choices: [
      "Canada goose, because fear is universal",
      "Moose, because it looks like a horse built by committee",
      "Beaver, because Canada respects hard work, wood, and weird teeth",
      "Polar bear, because it owns the north emotionally",
    ],
    answerIndex: 2,
    explanation:
      "The beaver is an official Canadian symbol. The goose is more of a national warning system.",
  },
  {
    id: 3,
    question: "What is Canada's national winter sport?",
    choices: [
      "Curling, because sweeping finally got competitive",
      "Ice hockey, because apparently skating fast with knives on your feet was not dangerous enough",
      "Skiing, because some people still trust their knees",
      "Snow shoveling, because unpaid cardio builds character",
    ],
    answerIndex: 1,
    explanation:
      "Hockey is Canada's national winter sport. Snow shoveling is just the sport nobody signed up for.",
  },
  {
    id: 4,
    question: "What is Canada's national summer sport?",
    choices: [
      "Baseball, because hot dogs deserve a purpose",
      "Lacrosse, because Canada wanted hockey energy without the ice",
      "Soccer, because every parent owns a folding chair",
      "Complaining that hockey season is too far away",
    ],
    answerIndex: 1,
    explanation:
      "Lacrosse is Canada's national summer sport. It is fast, physical, and very Canadian in a \"please wear padding\" kind of way.",
  },
  {
    id: 5,
    question: "Who is Canada's head of state?",
    choices: [
      "The Prime Minister, because he gets blamed for everything",
      "The Governor General, because the title sounds powerful enough",
      "The King, because Canada likes democracy with a royal plot twist",
      "Whoever controls the thermostat in winter",
    ],
    answerIndex: 2,
    explanation:
      "Canada is a constitutional monarchy, so the monarch is the head of state. The thermostat person just runs the house.",
  },
  {
    id: 6,
    question: "What are the three levels of government in Canada?",
    choices: [
      "Federal, provincial/territorial, municipal, because one government was not enough paperwork",
      "Federal, regional, local, because that sounds close enough",
      "Parliament, province, parking ticket",
      'National, provincial, "ask your city"',
    ],
    answerIndex: 0,
    explanation:
      "Canada has federal, provincial/territorial, and municipal governments. That way, everyone has someone else to blame for potholes.",
  },
  {
    id: 7,
    question: "What symbol is in the centre of the Canadian flag?",
    choices: [
      "A crown, because Britain left some accessories behind",
      "A red maple leaf, because Canada chose a tree part and made it iconic",
      "A beaver, because it was already booked for the coins",
      "A very polite warning label",
    ],
    answerIndex: 1,
    explanation:
      "The Canadian flag has a maple leaf. Simple, clean, and impossible to rake in November.",
  },
  {
    id: 8,
    question: "What are Canada's two official languages?",
    choices: [
      "English and French, because one language was too easy",
      'English and "sorry," because it works everywhere',
      'French and "sorry," because Quebec needed a stronger version',
      "Hockey and road construction",
    ],
    answerIndex: 0,
    explanation:
      'Canada\'s official languages are English and French. "Sorry" is not official, but it is spiritually protected.',
  },
  {
    id: 9,
    question:
      "Which province is known for French-speaking culture and Montreal?",
    choices: [
      "Ontario, because Toronto keeps trying to be the answer",
      "Quebec, because even the stop signs have confidence",
      "New Brunswick, because it is also bilingual and wants credit",
      "Manitoba, because Winnipeg has suffered enough",
    ],
    answerIndex: 1,
    explanation:
      "Quebec is home to Montreal and Canada's strongest opinions about cheese curds.",
  },
  {
    id: 10,
    question: "What is the name of Canada's national police force?",
    choices: [
      "Canadian Federal Police, because that sounds like a TV show",
      "Royal Canadian Mounted Police, because nothing says authority like a red coat and a horse",
      "National Security Police, because very serious, very generic",
      "The Red Coat Horse People",
    ],
    answerIndex: 1,
    explanation:
      'The RCMP is Canada\'s national police force. "The Red Coat Horse People" is not official, but everyone would understand.',
  },
  {
    id: 11,
    question: "What do Canadians vote for in a federal election?",
    choices: [
      "Senators, because that sounds fancy",
      "Members of Parliament, because democracy loves job titles",
      "Supreme Court judges, because robes feel official",
      "The person who promises spring will come early",
    ],
    answerIndex: 1,
    explanation:
      "Canadians elect Members of Parliament. Sadly, weather promises are not legally binding.",
  },
  {
    id: 12,
    question: "In which city are Canada's Parliament buildings located?",
    choices: [
      "Toronto, because it assumed this was about Toronto",
      "Ottawa, because the government needed somewhere quiet to argue",
      "Quebec City, because it has the castle vibes",
      "Winnipeg, because it deserves something nice",
    ],
    answerIndex: 1,
    explanation:
      "Parliament is in Ottawa, where people argue professionally and still call each other honourable.",
  },
  {
    id: 13,
    question: "Which ocean borders Canada's west coast?",
    choices: [
      "Atlantic Ocean, because it wanted to be included",
      "Pacific Ocean, because British Columbia needed something peaceful after housing prices",
      "Arctic Ocean, because technically Canada has a lot of cold options",
      "The Ocean of Unaffordable Vancouver Condos",
    ],
    answerIndex: 1,
    explanation:
      "British Columbia borders the Pacific Ocean. The condo ocean is nearby, but not recognized by geography.",
  },
  {
    id: 14,
    question: "Which ocean borders Canada's east coast?",
    choices: [
      "Pacific Ocean, because it got lost",
      "Atlantic Ocean, because the east coast has seafood, storms, and stories",
      "Arctic Ocean, because Canada likes having too many oceans",
      "The Ocean Where Everyone Has a Cousin Named Mike",
    ],
    answerIndex: 1,
    explanation:
      "Atlantic Canada borders the Atlantic Ocean. And somehow, everyone really does know a Mike.",
  },
  {
    id: 15,
    question: "Which ocean is north of Canada?",
    choices: [
      "Pacific Ocean, because geography is stressful",
      "Atlantic Ocean, because it already does enough work",
      "Arctic Ocean, because Canada looked north and said, \"Yes, more winter\"",
      "The Frozen Place Your Weather App Warned You About",
    ],
    answerIndex: 2,
    explanation:
      "Canada reaches the Arctic Ocean in the north. It is not a place for light jackets or fake confidence.",
  },
  {
    id: 16,
    question: "What is a major right of Canadian citizens?",
    choices: [
      "The right to vote, because complaining works better when you participate",
      "The right to free poutine, which should honestly be discussed",
      "The right to skip February",
      "The right to personally complain to a moose",
    ],
    answerIndex: 0,
    explanation:
      "Canadian citizens have the right to vote. The right to skip February is still under national review.",
  },
  {
    id: 17,
    question: "What is one responsibility of Canadian citizens?",
    choices: [
      "Obeying the law, even when the parking sign is written like a math equation",
      "Voting in every election, even the ones with lawn signs everywhere",
      "Owning winter boots, because survival has a dress code",
      'Saying "not bad" when life is clearly bad',
    ],
    answerIndex: 0,
    explanation:
      "Citizens are expected to obey Canadian laws. Winter boots are not mandatory, just emotionally necessary.",
  },
  {
    id: 18,
    question: "What is Canada's national anthem?",
    choices: [
      "God Save the King, because Canada keeps royal backup files",
      "O Canada, because the title got straight to the point",
      "The Maple Leaf Forever, because it sounds like a tree made a promise",
      "The Tim Hortons Drive-Thru Hold Music",
    ],
    answerIndex: 1,
    explanation:
      'Canada\'s national anthem is "O Canada." The drive-thru music is more of a survival soundtrack.',
  },
  {
    id: 19,
    question: "Which city is the largest in Canada by population?",
    choices: [
      "Montreal, because it has the personality for it",
      "Vancouver, because it charges like it is",
      "Toronto, because of course Toronto found a way to win this question",
      "Calgary, because cowboy confidence is real",
    ],
    answerIndex: 2,
    explanation:
      "Toronto is Canada's largest city. Do not worry, Toronto will remind you.",
  },
  {
    id: 20,
    question:
      "Final boss question: What is the most Canadian reaction when someone bumps into you?",
    choices: [
      'Say "sorry" even if they hit you, because Canada runs on reverse blame',
      "Challenge them to a snowball duel",
      "Ask which province they're from before judging them",
      "Report the incident to a parliamentary committee",
    ],
    answerIndex: 0,
    explanation:
      "Saying sorry when someone else bumps into you is peak Canada. It is not weakness — it is advanced diplomacy.",
  },
];
