interface Props{
    title:string,
    timeFormatter: ()=>string,
    handlePlay: ()=>void,
    handleReset: ()=>void
}

const Timer = ({title, timeFormatter, handlePlay, handleReset}:Props) => {
  return (
    <div className="timer-wrapper">
      <div className="timer">
        <h2 id="timer-label">{title}</h2>
        <h3 id="time-left">{timeFormatter()}</h3>
      </div>
      <div className="controle">
        <button onClick={handlePlay} className="btn-operation" id="start_stop">
          <i className="fa-solid fa-play"></i>
        </button>
        <button onClick={handleReset} className="btn-operation" id="reset">
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
    </div>
  );
};

export default Timer;
