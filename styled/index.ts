import styled from "@emotion/styled";

export const StyledMain = styled.main`
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

export const StyledContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  font-size: 14px;
  font-family: sans-serif;
`;

export const StyledTh = styled.th`
  padding: 12px 15px;
`;

export const StyledTr = styled.tr`
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  background-color: ${(props) => props.theme.accentSecondary};
  &:nth-of-type(even) {
    background-color: ${(props) => props.theme.accent};
  }
`;

export const StyledTd = styled.td`
  padding: 12px 15px;
`;

export const StyledHeaderTr = styled.tr`
  padding: 12px 15px;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.tableHeaderText};
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 0.6em;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  display: inline-block;
  align-self: center;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  padding: 0.5em 1em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  font-weight: 700;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.text};
    outline: 0;
  }
`;

export const StyledThemeSwitchButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.primary};
  font-size: 1.5rem;
  cursor: pointer;
  display: inline-block;
  align-self: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5em 1em;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.text};
    outline: 0;
  }
`;

export const StyledNavbar = styled.nav`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 0.6em;
  margin-bottom: 0.5rem;
  &:focus {
    outline: 0;
  }
`;

export const StyledActyionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
