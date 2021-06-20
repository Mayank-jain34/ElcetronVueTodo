import { v4 as uuidV4 } from "uuid";
import { generateRandomColor } from "./utils";

// red, orange, yellow, green, blue, purple, pink
export const defaultTags = [
  {id: uuidV4(), color: generateRandomColor({hue: 'red'}), label: "Blocked",},
  {id: uuidV4(), color: generateRandomColor({hue: 'orange'}), label: "In Progress" },
  {id: uuidV4(), color: generateRandomColor({hue: 'blue'}), label: "Question" },
  {id: uuidV4(), color: generateRandomColor({hue: 'red'}), label: "Help Wanted" },
  {id: uuidV4(), color: generateRandomColor({hue: 'orange'}), label: "Pending" },
  {id: uuidV4(), color: generateRandomColor({hue: 'red'}), label: "Invalid" },
  {id: uuidV4(), color: generateRandomColor({hue: 'purple'}), label: "Duplicate" },
  {id: uuidV4(), color: generateRandomColor({hue: 'red'}), label: "Bug" },
  {id: uuidV4(), color: generateRandomColor({hue: 'pink'}), label: "Enhancement" },
  {id: uuidV4(), color: generateRandomColor({hue: 'blue'}), label: "Long Term Goal" },
  {id: uuidV4(), color: generateRandomColor({hue: 'blue'}), label: "Short Term Goal" },
];

export const priorities = [
  { label: "None", value: 0, color: "#2196F3"},
  { label: "Lowest", value: 1, color: "#69F0AE" },
  { label: "Low", value: 2, color: "#00C853" },
  { label: "Medium", value: 3, color: "#FFA726" },
  { label: "High", value: 4, color: "#FF5252" },
  { label: "Highest", value: 5, color: "#D50000" },
];

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateFakeTodo = (text) => {
  return {
    id: uuidV4(),
    text,
    priority: getRandomArbitrary(0, 5),
    tags: defaultTags
      .slice(0, getRandomArbitrary(0, defaultTags.length - 1))
      .map((s) => s.id),
    isCompleted: false,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

const fakeData = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Fusce ut justo ullamcorper, rutrum est vitae, varius velit.",
  "Maecenas gravida lacus quis est bibendum, non faucibus lectus interdum.",
  "Vestibulum suscipit mauris quis libero laoreet, ut volutpat erat viverra.",
  "Suspendisse aliquet turpis ut justo porttitor, eu elementum lorem tincidunt.",
  "Curabitur aliquet lorem vel elit cursus iaculis.",
  "Etiam eu nulla et ligula faucibus vehicula quis non nulla.",
  "Curabitur at erat finibus, efficitur lacus vel, molestie nisi.",
  "Integer at enim sit amet eros porta pellentesque.",
  "Sed eu ipsum vel sem laoreet vestibulum eu eget dolor.",
  "Mauris et magna et nulla egestas convallis.",
  "Nullam dignissim velit quis ex tempor, id vehicula mi maximus.",
  "Fusce gravida ipsum vitae vestibulum vulputate.",
  "Maecenas aliquam urna vel sem lobortis dignissim.",
  "Vivamus ullamcorper quam sed augue finibus gravida.",
  "Quisque dapibus odio quis sem cursus consectetur.",
  "Quisque id felis sollicitudin purus semper egestas.",
  "In molestie massa vitae est congue, id cursus nulla sodales.",
];

export const fakeTodos = fakeData.map(generateFakeTodo);
