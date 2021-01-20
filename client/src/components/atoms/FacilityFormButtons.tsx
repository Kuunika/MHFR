import React from "react";
import Button from "./Button";
import styled from "styled-components";

export default (props: Props) => {
  const { handleSubmit, isSubmitting, handleCancel, saveBtnText } = props;
  return (
    <Container data-test="formFooter">
      {saveBtnText && (
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
          data-test="saveBtn"
        >
          {isSubmitting ? "Saving..." : saveBtnText}
        </Button>
      )}
      <Button
        disabled={isSubmitting}
        onClick={handleCancel}
        theme="default"
        data-test="cancelBtn"
      >
        or Cancel
      </Button>
    </Container>
  );
};
type Props = {
  handleSubmit: Function;
  handleCancel: Function;
  saveBtnText: string;
  isSubmitting: boolean;
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;

  background-color: #eee;
  width: 100%;
`;
