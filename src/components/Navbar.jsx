import React from "react";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { Heading } from "@chakra-ui/react";

function Navbar() {
  return (
    <div style={{ backgroundColor: "#1e633f", position:'fixed', width:'100%',top:'0' }}>
      <Nav>
        <ul>
          <Heading as='h1'>Reeco</Heading>
          <li>Store</li>
          <li>Orders</li>
          <li>Analytics</li>
        </ul>
        <div>
          <FiShoppingCart size={"25px"} />
          <p>Hello, James</p>
        </div>
      </Nav>
    </div>
  );
}

const Nav = styled.nav`
  color: white;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin: auto;
  padding: 5px 10px;
  justify-content: space-between;

  ul {
    padding-left: 0;
    display: flex;
    list-style: none;
    align-items: center;
    gap: 50px;
    margin: 0px;

    h1 {
      font-size: 2rem;
      margin-top: 0px;
      margin-bottom: 0px;
      padding: 5px 0px;
    }
  }
  div {
    display: flex;
    gap: 50px;
    align-items: center;
  }
`;

export default Navbar;
