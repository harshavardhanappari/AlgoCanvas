const algorithmInfo = {
  bubbleSort: {
    title: "Bubble Sort",

    description:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. After each pass, the largest unsorted element reaches its correct position.",

    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    stable: "Yes",

    inPlace: "Yes",

    pseudoCode: [
      "for i = 0 to n - 1",
      "    for j = 0 to n - i - 1",
      "        if arr[j] > arr[j + 1]",
      "            swap(arr[j], arr[j + 1])",
    ],
  },
};

export default algorithmInfo;