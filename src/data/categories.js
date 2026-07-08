import {
  FaChartBar,
  FaLink,
  FaLayerGroup,
  FaInbox,
  FaTree,
  FaProjectDiagram,
  FaPuzzlePiece,
  FaFont,
  FaChessKnight,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    title: "Arrays",
    description: "Learn searching, sorting, prefix sums and sliding window.",
    icon: FaChartBar,
  },
  {
    id: 2,
    title: "Linked Lists",
    description: "Master singly, doubly and circular linked lists.",
    icon: FaLink,
  },
  {
    id: 3,
    title: "Stacks",
    description: "Understand LIFO, monotonic stack and applications.",
    icon: FaLayerGroup,
  },
  {
    id: 4,
    title: "Queues",
    description: "Explore FIFO, deque and priority queues.",
    icon: FaInbox,
  },
  {
    id: 5,
    title: "Trees",
    description: "Binary Trees, BST, AVL and traversals.",
    icon: FaTree,
  },
  {
    id: 6,
    title: "Graphs",
    description: "DFS, BFS, shortest paths and MST.",
    icon: FaProjectDiagram,
  },
  {
    id: 7,
    title: "Dynamic Programming",
    description: "Build intuition with memoization and tabulation.",
    icon: FaPuzzlePiece,
  },
  {
    id: 8,
    title: "Strings",
    description: "Pattern matching and string algorithms.",
    icon: FaFont,
  },
  {
    id: 9,
    title: "Backtracking",
    description: "Generate combinations, permutations and solve puzzles.",
    icon: FaChessKnight,
  },
];

export default categories;