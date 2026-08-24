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
  quickSort: {
    title: "Quick Sort",

    description:
      "Quick Sort uses the Divide and Conquer technique by selecting a pivot, partitioning the array around it, and recursively sorting the left and right parts.",

    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)",
    },

    stable: "No",

    inPlace: "Yes",

    pseudoCode: [
      "quickSort(left, right)",
      "    if left >= right return",
      "    pivotIndex = partition(left, right)",
      "    quickSort(left, pivotIndex - 1)",
      "    quickSort(pivotIndex + 1, right)",
      "partition(left, right)",
      "    choose pivot",
      "    compare elements with pivot",
      "    swap elements when needed",
      "    place pivot in correct position",
    ],
  },
  heapSort: {
    title: "Heap Sort",

    description:
      "Heap Sort builds a Max Heap and repeatedly moves the maximum element to the end of the array, then restores the heap using heapify.",

    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
    },

    stable: "No",

    inPlace: "Yes",

    pseudoCode: [
      "heapSort(array)",
      "    buildMaxHeap(array)",
      "    for end = n - 1 down to 1",
      "        swap(array[0], array[end])",
      "        reduce heap size",
      "        heapify(array, 0, heapSize)",
      "heapify(array, root, heapSize)",
      "    find largest among root and children",
      "    if largest is not root",
      "        swap root with largest",
      "        heapify(array, largest, heapSize)",
    ],
  },
  linearSearch: {
    title: "Linear Search",

    description:
      "Linear Search checks each element one by one until the target element is found or the entire array has been searched.",

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "linearSearch(array, target)",
      "    for i = 0 to n - 1",
      "        if array[i] == target",
      "            return i",
      "    return -1",
    ],
  },
};

export default algorithmInfo;
