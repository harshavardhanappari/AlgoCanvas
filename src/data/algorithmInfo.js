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

  selectionSort: {
    title: "Selection Sort",

    description:
      "Selection Sort repeatedly finds the minimum element from the unsorted portion of the array and places it at its correct position.",

    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    stable: "No",

    inPlace: "Yes",

    pseudoCode: [
      "for i = 0 to n - 2",
      "    minIndex = i",
      "    for j = i + 1 to n - 1",
      "        if arr[j] < arr[minIndex]",
      "            minIndex = j",
      "    swap(arr[i], arr[minIndex])",
    ],
  },

  insertionSort: {
    title: "Insertion Sort",

    description:
      "Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position.",

    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },

    stable: "Yes",

    inPlace: "Yes",

    pseudoCode: [
      "for i = 1 to n - 1",
      "    key = arr[i]",
      "    j = i - 1",
      "    while j >= 0 and arr[j] > key",
      "        arr[j + 1] = arr[j]",
      "        j = j - 1",
      "    arr[j + 1] = key",
    ],
  },
  mergeSort: {
    title: "Merge Sort",

    description:
      "Merge Sort uses the Divide and Conquer technique by recursively dividing the array into halves and then merging the sorted halves.",

    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },

    stable: "Yes",

    inPlace: "No",

    pseudoCode: [
      "mergeSort(left, right)",
      "    if left >= right return",
      "    mid = (left + right) / 2",
      "    mergeSort(left, mid)",
      "    mergeSort(mid + 1, right)",
      "    merge(left, mid, right)",
    ],
  },
};

export default algorithmInfo;
