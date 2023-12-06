import React from "react";

function Inputs(props) {
  return (
    <>
      <div className="form__group field">
        <input
          type="input"
          className="form__field"
          placeholder="Refferer"
          disabled={!props.connected || !props.reffererInputAvaliavle}
          name="Refferer"
          id="Refferer"
          value={props.refferer}
          onChange={props.handleChangeRefferer}
        />
        <label htmlFor="Refferer" className="form__label">
          Refferer address
        </label>
      </div>
      <div className="form__group field">
        <input
          className="form__field"
          placeholder="Amount"
          disabled={!props.connected}
          name="Amount"
          type="number"
          value={props.mintAmount}
          id="Amount"
          onChange={props.handleChangeMintAmount}
        />
        <label htmlFor="Amount" className="form__label">
          Amount
        </label>
      </div>
    </>
  );
}

export default Inputs;
