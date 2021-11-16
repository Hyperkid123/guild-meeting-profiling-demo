function startup() {
  
    const input = generateWorstCaseScenarioInput();
    const sampleOne = [...input];
    const sampleTwo = [...input];

  
    stupidlyUnOptimizedFunction(sampleOne);
  
    nativeSortFunction(sampleTwo);
}

function generateWorstCaseScenarioInput() {
    return [...Array(5000)]
      .map((_, index) =>
        [...Array(index + 1)].reduce((acc, curr) => `${acc}a`, "")
      )
      .reverse();
  }
  
  function stupidlyUnOptimizedFunction(arr) {
    console.log('Starting bad sort')
    /**
     * I DARE YOU TO USE THIS IN PRODUCTION!
     */
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  function nestedSort(a, b) {
      return (a.length > b.length ? 1 : -1)
  }
  
  function nativeSortFunction(arr) {
    console.log('Starting native sort')
    return arr.sort(nestedSort)
    // return arr.sort((a, b) => (a.length > b.length ? 1 : -1));
  }
  
  startup()

  const JSProfiling = () => {
    return <h1>Open your browser developer console</h1>;
  };
  
  export default JSProfiling;
  