import style from "./Input.module.css";

const InputSearch = ({ handleInput, fetchData, error, valueInput }) => {
  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          placeholder="Type the city..."
          className={style.input}
          type="text"
          onChange={handleInput}
        />
        <button
          className={style.btnSearch}
          onClick={fetchData}
          disabled={!(valueInput?.length > 0 && error.length < 1)}
        >
          Search
        </button>
      </div>
      <p className={style.msgError}>{error}</p>
    </div>
  );
};

export default InputSearch;
