import React from "react";
import styled from "styled-components";
import Button from "../../components/atoms/Button";

function Preloader() {
  const onReload = () => {
    window.location.reload();
  };
  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <Img src="/static/images/networkError.svg" />
        <Message>
          THERE WAS AN ERROR WHILE FETCHING DATA. <br />
          PLEASE TRY AGAIN.
        </Message>
        <Button onClick={onReload} theme="secondary">
          Try Again
        </Button>
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
  text-align: center;
  color: #5a90dc;
`;
const Img = styled.img`
  margin: 2rem auto;
  width: 80px;
`;
