import React from "react";
import styled from "styled-components";

function Preloader() {
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <div id="loadergif"></div>
        <Message>
          SETTING UP YOUR ENVIRONMENT <br />
          THIS COULD TAKE A WHILE...
        </Message>
      </div>
    </Container>
  );
}

export default Preloader;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2000;
`;

const Message = styled.div`
  color: #5a90dc;
`;
