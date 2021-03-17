import styled from "styled-components";

export const Layout = styled.div`
  max-width: 1220px;
  margin: 0 auto;
  padding: 20px 30px;
`;

export const ErrorMessage = styled.p`
  margin: 0px;
  font-size: 13px;
  color: #ff7171;
  font-weight: 600;
  margin-top: 7px;
`;

export const ErrorHolder = styled.div`
  background: #ff71713d;
  padding: 10px 20px;

  & p {
    margin: 0px;
    font-size: 13px;
    color: #ff7171;
    font-weight: 600;
  }
`;

export const CommonBtn = styled.button`
  margin-top: 1rem;
  font-weight: 600;
  background: #0f1218;
  border: none;
  padding: 8px 20px;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
`;
