interface Props {
  title: string;
  play: boolean;
  length: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}

const Length = ({
  title,
  play,
  length,
  handleIncrease,
  handleDecrease,
}: Props) => {
  return (
    <div className="length">
      <h3 id={title + "-label"}>
        {title[0].toUpperCase() + title.slice(1, title.length)} Length
      </h3>
      <div className="operations">
        <button
          disabled={play}
          onClick={()=>handleIncrease()}
          id={title+"-increment"}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
        <strong id={title+"-length"}>{length}</strong>
        <button
          disabled={play}
          onClick={()=>handleDecrease()}
          id={title+"-decrement"}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default Length;
