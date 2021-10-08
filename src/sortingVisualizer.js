import React from "react";

const buttonStyl = (sortRunning) => ({
  margin: "2px",
  border: "solid #b3e5fc ",
  backgroundColor: sortRunning ? "#e0e0e0" : "#4eb5f1",
  color: sortRunning ? "#424242" : "#ffffff",
});

export default class SortingVisualizer extends React.Component {
  state = {
    array: [],
    idx1: 0,
    idx2: 1,
    sorted: false,
    sortRunning: false,
  };

  componentDidMount() {
    this.reset();
  }

  swap(arr, xp, yp) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }

  async sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }

  reset() {
    this.setState({
      array: new Array(50)
        .fill(0)
        .map((e) => parseInt(Math.random() * 500) + 50),
      sorted: false,
      idx1: 0,
      idx2: 1,
    });
  }

  async bubbleSort() {
    this.setState({ sortRunning: true });
    const { array } = this.state;
    let auxillaryArray = array;
    let i, j;
    const n = array.length;
    for (i = 0; i < n - 1; i++) {
      this.setState({ idx1: i });
      for (j = 0; j < n - i - 1; j++) {
        if (auxillaryArray[j] > auxillaryArray[j + 1]) {
          this.setState({ idx2: j });
          this.swap(auxillaryArray, j, j + 1);
          await this.sleep(50);
          this.setState({ array: auxillaryArray });
        }
      }
    }
    this.setState({ sorted: true, sortRunning: false });
  }

  async insertionSort() {
    this.setState({ sortRunning: true });
    const { array } = this.state;
    const n = array.length;
    let i, j, key;
    for (i = 1; i < n; i++) {
      this.setState({ idx1: i });
      key = array[i];
      j = i - 1;
      while (j >= 0 && array[j] > key) {
        this.setState({ idx2: j });
        array[j + 1] = array[j];
        j = j - 1;
        await this.sleep(100);
      }
      array[j + 1] = key;
    }
    this.setState({ sorted: true, sortRunning: false });
  }

  async selectionSort(){
    this.setState({ sortRunning: true });
    const { array } = this.state;
    let auxillaryArray = array;
    let i, j, minIdx;
    const n = array.length;
      for (i = 0; i < n-1; i++)
      {
        this.setState({ idx1: i });
        minIdx = i;
        for (j = i + 1; j < n; j++){
          if (auxillaryArray[j] < auxillaryArray[minIdx]){
            this.setState({ idx2: j });
            await this.sleep(100);
            minIdx = j;
          }
        }
        this.swap(auxillaryArray, i, minIdx);
        this.setState({ array: auxillaryArray });
      }

    this.setState({ sorted: true, sortRunning: false });
  }


  getColor(i) {
    const { idx1, idx2, sorted } = this.state;
    return sorted
      ? "#ccff90"
      : [idx1, idx2].includes(i)
      ? "#c62828"
      : "#90caf9 ";
  }

  render() {
    const { sortRunning } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Times New Roman",
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Sorting Algorithm visualizer
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              transform: "rotate(270deg)",
              margin: "50px",
            }}
          >
            {this.state.array.map((e, i) => (
              <p
                key={i}
                style={{
                  width: `${e}px`,
                  backgroundColor: this.getColor(i),
                  margin: "1px",
                  height: "5px",
                }}
              >
                <span style={{ color: this.getColor(i), fontSize: "1px" }}>
                  Aditri is awesome
                </span>
              </p>
            ))}
          </div>
          <div>
            <button
              style={buttonStyl(sortRunning)}
              disabled={sortRunning}
              onClick={() => this.bubbleSort()}
            >
              bubble sort
            </button>
            <button
              style={buttonStyl(sortRunning)}
              disabled={sortRunning}
              onClick={() => this.insertionSort()}
            >
              insertion sort
            </button>
            <button
              style={buttonStyl(sortRunning)}
              disabled={sortRunning}
              onClick={() => this.selectionSort()}
            >
              selection sort
            </button>
            <button
              style={buttonStyl(sortRunning)}
              disabled={sortRunning}
              onClick={() => this.reset()}
            >
              reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
