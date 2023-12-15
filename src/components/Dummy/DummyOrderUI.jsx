import React from "react";
import styled from "styled-components";

function DummyOrderUI() {
  return (
    <OrderUI>
      <div className="dummyOrderUIwrapper">
        <p>
          Orders {">"} <span>Order 32257ABC</span>
        </p>
        <div>
          <h2>Order 32457ABC</h2>
          <div className="dummyOrder_ButtonDIv">
            <button>Back</button>
            <button className="dummyOrder_ApproveBtn">Approve Order</button>
          </div>
        </div>
      </div>
    </OrderUI>
  );
}

const OrderUI = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  .dummyOrderUIwrapper {
    max-width: 1200px;
    margin: auto;
    text-align: start;
    padding: 10px;
    padding-bottom: 0px;

    p {
      margin: 0px;
      margin-bottom: 10px;

      span {
        text-decoration: underline gray;
        text-underline-offset: 3px;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2{
          margin: 10px 0px;
      }

      .dummyOrder_ButtonDIv {
        display: flex;
        gap: 30px;

        button {
          color: #1e633f;
          font-weight: bold;
          border-radius: 20px;
          border: 2px solid #1e633f;
          background-color: white;
          padding: 5px 15px;
        }
        .dummyOrder_ApproveBtn {
          background-color: #1e633f;
          color: white;
        }
      }
    }
  }
`;

export default DummyOrderUI;
