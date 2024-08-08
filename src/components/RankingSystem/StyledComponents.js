import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

export const SubTitle = styled.h2`
  margin-bottom: 15px;
  color: #444;
`;

export const Form = styled.form`
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom:10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

export const Alert = styled.div`
  padding: 12px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  margin-bottom: 15px;
`;

export const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Message = styled.p`
  color: #6c757d;
  font-style: italic;
`;
