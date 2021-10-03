import React from "react";

export default class SortingVisualizer extends React.Component {
  state = {
    array: [],
    idx1: 0,
    idx2: 1,
    sorted: false,
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
      array: new Array(50).fill(0).map((e) => parseInt(Math.random() * 550)),
      sorted: false,
      idx1: 0,
      idx2: 1,
    });
  }

  async bubbleSort() {
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
    this.setState({ sorted: true });
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
    return (
      <div>
        <div
          style={{
            transform: "rotate(270deg)",
          }}
        >
          {this.state.array.map((e, i) => (
            <div
              key={i}
              style={{
                width: `${e}px`,
                backgroundColor: this.getColor(i),
                margin: "1px",
              }}
            >
              <span style={{ color: this.getColor(i), fontSize: "1px" }}>
                Aditri is awesome
              </span>
            </div>
          ))}
        </div>
        <div>
          <button onClick={() => this.bubbleSort()}>bubble sort</button>
          <button onClick={() => this.reset()}>reset</button>
        </div>
      </div>
    );
  }
}
