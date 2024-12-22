// nodes.js
const nodes = [
  {
    id: "1",
    type: "textUpdater",
    data: { label: "Node 0" },
    position: { x: 250, y: 5 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "Group A" },
    position: { x: 100, y: 100 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 200 },
  },
  {
    id: "2a",
    type: "textUpdater",
    data: { label: "Node A.1" },
    position: { x: 10, y: 50 },
    parentId: "2",
  },
  {
    id: "3",
    data: { label: "Node 1" },
    position: { x: 320, y: 100 },
    className: "light",
  },
  {
    id: "4",
    data: { label: "Group B" },
    position: { x: 320, y: 200 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 300, height: 300 },
    type: "group",
  },
  {
    id: "4a",
    data: { label: "Node B.1" },
    position: { x: 15, y: 65 },
    className: "light",
    parentId: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Group B.A" },
    position: { x: 15, y: 120 },
    className: "light",
    style: {
      backgroundColor: "rgba(255, 0, 255, 0.2)",
      height: 150,
      width: 270,
    },
    parentId: "4",
  },
  {
    id: "4b1",
    data: { label: "Node B.A.1" },
    position: { x: 20, y: 40 },
    className: "light",
    parentId: "4b",
  },
  {
    id: "4b2",
    data: { label: "Node B.A.2" },
    position: { x: 100, y: 100 },
    className: "light",
    parentId: "4b",
  },
];

export default nodes;
