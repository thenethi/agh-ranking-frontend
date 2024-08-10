export const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
    required: true,
  },
  {
    name: "date",
    type: "date",
    placeholder: "Date",
    required: true,
  },
  {
    name: "certification",
    type: "text",
    placeholder: "Certification",
    required: true,
  },
  {
    name: "courseType",
    type: "select",
    placeholder: "Select Course Level",
    required: true,
    options: [], // Will be populated dynamically
  },
  {
    name: "status",
    type: "select",
    placeholder: "Select Status",
    required: true,
    options: [
      { value: "Passed", label: "Passed" },
      { value: "Failed", label: "Failed" },
    ],
  },
  {
    name: "score",
    type: "number",
    placeholder: "Score",
    required: true,
  },
  {
    name: "totalScore",
    type: "number",
    placeholder: "Total Score",
    required: true,
  },
  {
    name: "sessionLink",
    type: "text",
    placeholder: "Session Link",
    required: true,
  },
];
