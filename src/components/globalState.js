import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  selectedModule: "",
  isModuleSelected: false,
  projectID: 9999,
  concatenated_requirements: [
    {
      index: "1",
      moduleName: "This is a test",
      requirements: "This too is a test",
    },
    {
      index: "2",
      moduleName: "Hey woah I am a test as wel!",
      requirements: "I know right this kinda insane",
    },
  ],
  cleaned_requirements: [
    {
      index: "1",
      moduleName: "Module 1",
      requirements: [
        "Lorem Ipsum er ganske enkelt fyldtekst fra print- og typografiindustrien. Lorem Ipsum har været standard fyldtekst siden 1500-tallet, hvor en ukendt trykker sammensatte en tilfældig spalte for at trykke en bog til sammenligning af forskellige skrifttyper. Lorem Ipsum har ikke alene overlevet fem århundreder, men har også vundet indpas i elektronisk typografi uden væsentlige ændringer. Sætningen blev gjordt kendt i 1960'erne med lanceringen af Letraset-ark, som indeholdt afsnit med Lorem Ipsum, og senere med layoutprogrammer som Aldus PageMaker, som også indeholdt en udgave af Lorem Ipsum.",
        "req2",
      ],
    },
    {
      index: "2",
      moduleName: "Hey im module2",
      requirements: ["test 1 yo", "eyy yo", "bruh"],
    },
    {
      index: "3",
      moduleName: "Module 3",
      requirements: ["req1"],
    },
  ],
};

export const { setGlobalState, getGlobalState, useGlobalState } =
  createGlobalState(initialState);

// Example Usage
// import { setGlobalState, getGlobalState } from "./components/globalState";
