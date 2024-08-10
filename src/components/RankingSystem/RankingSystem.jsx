import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx';
import { formFields } from '../data/formConfig';
import { Container, Title, SubTitle, Form, Input, Select, Button, Table, Th, Td, Alert, Link, Message } from './StyledComponents';

const RankingSystem = () => {
  const { register, handleSubmit, reset } = useForm();
  const [examData, setExamData] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    fetchExamData();
    fetchRankings();
    fetchCourseTypes();
  }, []);

  const fetchExamData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/examdata`);
    setExamData(response.data);
  };

  const fetchRankings = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/rankings`);
    setRankings(response.data);
  };

  const fetchCourseTypes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/coursetypes`);
    setCourseTypes(response.data);
    const courseTypeField = formFields.find(field => field.name === 'courseType');
    if (courseTypeField) {
      courseTypeField.options = response.data.map(type => ({ value: type, label: type }));
    }
  };

  const onSubmit = async (data) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/examdata`, data);
    fetchExamData();
    fetchRankings();
    reset(); // Resets the form after successful submission
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bulkupload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadMessage(`Successfully uploaded ${response.data.count} records.`);
      fetchExamData();
      fetchRankings();
    } catch (error) {
      console.error("Error:", error);
      setUploadMessage("Error uploading file. Please try again.");
    }
  };

  const generateExcelTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([formFields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {})]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "BulkUploadTemplate.xlsx");
  };

  return (
    <Container>
      <Title>Skill Ranking System</Title>

      <SubTitle>Add New Exam Data</SubTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field, index) => (
          field.type === "select" ? (
            <Select key={index} {...register(field.name)} required={field.required}>
              <option value="">{field.placeholder}</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>{option.label}</option>
              ))}
            </Select>
          ) : (
            <Input
              key={index}
              type={field.type}
              {...register(field.name)}
              placeholder={field.placeholder}
              required={field.required}
            />
          )
        ))}
        <Button type="submit">Add Exam Data</Button>
      </Form>

      <SubTitle>Bulk Upload</SubTitle>
      <Button onClick={generateExcelTemplate}>Download Bulk Upload Template</Button>
      <Form onSubmit={handleBulkUpload}>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".csv,.xlsx,.xls"
        />
        <Button type="submit">Upload</Button>
      </Form>
      {uploadMessage && <Alert>{uploadMessage}</Alert>}

      <SubTitle>Exam Data</SubTitle>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Date</Th>
            <Th>Certification</Th>
            <Th>Course Level</Th>
            <Th>Status</Th>
            <Th>Score</Th>
            <Th>Total Score</Th>
            <Th>Session Link</Th>
          </tr>
        </thead>
        <tbody>
          {examData.map((exam) => (
            <tr key={exam._id}>
              <Td>{exam.name}</Td>
              <Td>{new Date(exam.date).toLocaleDateString()}</Td>
              <Td>{exam.certification}</Td>
              <Td>{exam.courseType}</Td>
              <Td>{exam.status}</Td>
              <Td>{exam.score}</Td>
              <Td>{exam.totalScore}</Td>
              <Td>
                <Link href={exam.sessionLink} target="_blank" rel="noopener noreferrer">
                  View Session
                </Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SubTitle>Rankings (Top 30)</SubTitle>
      <Table>
        <thead>
          <tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Certification</Th>
            <Th>Course Level</Th>
            <Th>Score</Th>
            <Th>Total Score</Th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking) => (
            <tr key={ranking._id}>
              <Td>{ranking.rank}</Td>
              <Td>{ranking.name}</Td>
              <Td>{ranking.certification}</Td>
              <Td>{ranking.courseType}</Td>
              <Td>{ranking.score}</Td>
              <Td>{ranking.totalScore}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {rankings.length === 30 && (
        <Message>Showing top 30 rankings. More may be available.</Message>
      )}
    </Container>
  );
}

export default RankingSystem;
