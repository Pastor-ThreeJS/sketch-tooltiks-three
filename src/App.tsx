import React from 'react';
import "./css/app.css"

interface StateProps { }
interface StaState {
}
export default class App extends React.Component<StateProps, StaState> {
  //定时器
  timerID!: any;
  constructor(props: StateProps) {
    super(props);
  }

  componentDidMount() {
    //注册定时器
    this.timerID = setInterval(
      () => {
        this.setState({
          date: new Date()
        });
      },
      1000
    );
  }

  componentWillUnmount() {
    //移除定时器
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <canvas id="RenderCanvas" />
      </div >
    )
  }
}