import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

function index(props: Props) {
  const { icon, title, options, sub, approved } = props;
  return (
    <Container>
      <TitleContainer>
        <Icon>{icon}</Icon>
        <div>
          {title && title.toUpperCase()}
          {sub ? <SubTitle>{` (${sub})`}</SubTitle> : ""}
          {approved && (
            <span style={{ marginLeft: "1rem", color: "#40c140" }}>
              <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
            </span>
          )}
        </div>
      </TitleContainer>
      {options && <div>{options}</div>}
    </Container>
  );
}

type Props = {
  title: string;
  sub?: string;
  icon: any;
  options?: any;
  approved?: boolean;
};

const Container = styled.div`
  display: flex;

  justify-content: space-between;
`;
const Icon = styled.div`
  margin-right: 15px;
`;

const TitleContainer = styled.div`
  font-size: 26px;
  display: flex;
  align-items: center;
`;

const SubTitle = styled.span`
  font-size: 18px;
  padding-left: 5px;
`;

export default index;
