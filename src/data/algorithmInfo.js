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

  binarySearch: {
    title: "Binary Search",

    description:
      "Binary Search repeatedly divides a sorted array in half and eliminates the half that cannot contain the target.",

    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "binarySearch(array, target)",
      "    left = 0",
      "    right = n - 1",
      "    while left <= right",
      "        mid = (left + right) / 2",
      "        if array[mid] == target",
      "            return mid",
      "        else if array[mid] < target",
      "            left = mid + 1",
      "        else",
      "            right = mid - 1",
      "    return -1",
    ],
  },

  arrayTraversal: {
    title: "Array Traversal",

    description:
      "Array Traversal visits each element of an array sequentially from the beginning to the end.",

    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "traverse(array)",
      "    for i = 0 to n - 1",
      "        visit array[i]",
    ],
  },

  arrayInsertionDeletion: {
    title: "Insertion & Deletion",

    description:
      "Learn how elements are inserted into and deleted from an array while maintaining the order of the remaining elements.",

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "insert(array, index, value)",
      "    for i = n - 1 down to index",
      "        array[i + 1] = array[i]",
      "    array[index] = value",
      "delete(array, index)",
      "    for i = index to n - 2",
      "        array[i] = array[i + 1]",
      "    reduce array size",
    ],
  },

  arraySearching: {
    title: "Searching in Arrays",

    description:
      "Search through an array to find a target element and determine its position.",

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "search(array, target)",
      "    for i = 0 to n - 1",
      "        if array[i] == target",
      "            return i",
      "    return -1",
    ],
  },

  twoPointers: {
    title: "Two Pointers",

    description:
      "Use two pointers moving from opposite ends of a sorted array to efficiently find a pair of elements with a given target sum.",

    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "left = 0",
      "right = n - 1",
      "while left < right",
      "    sum = array[left] + array[right]",
      "    if sum == target",
      "        return pair",
      "    else if sum < target",
      "        left++",
      "    else",
      "        right--",
      "return no pair",
    ],
  },

  slidingWindow: {
    title: "Sliding Window",

    description:
      "The Sliding Window technique maintains a fixed-size window and moves it across an array to efficiently find the maximum sum subarray.",

    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "calculate sum of first window of size k",
      "maxSum = currentWindowSum",
      "for right = k to n - 1",
      "    remove array[right - k] from window",
      "    add array[right] to window",
      "    update maxSum if needed",
      "return maxSum",
    ],
  },

  prefixSum: {
    title: "Prefix Sum",

    description:
      "Prefix Sum preprocesses an array so that the sum of any range can be calculated efficiently.",

    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(n)",
    },

    stable: "N/A",

    inPlace: "No",

    pseudoCode: [
      "prefix[0] = array[0]",
      "for i = 1 to n - 1",
      "    prefix[i] = prefix[i - 1] + array[i]",
      "rangeSum(left, right)",
      "    if left == 0",
      "        return prefix[right]",
      "    return prefix[right] - prefix[left - 1]",
    ],
  },
  kadanesAlgorithm: {
    title: "Kadane's Algorithm",

    description:
      "Kadane's Algorithm efficiently finds the maximum sum of a contiguous subarray by deciding at each element whether to extend the current subarray or start a new one.",

    complexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    stable: "N/A",

    inPlace: "Yes",

    pseudoCode: [
      "currentSum = array[0]",
      "maxSum = array[0]",
      "for i = 1 to n - 1",
      "    currentSum = max(array[i], currentSum + array[i])",
      "    maxSum = max(maxSum, currentSum)",
      "return maxSum",
    ],
  },
};

export default algorithmInfo;
