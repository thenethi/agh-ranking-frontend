import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  SubTitle,
  Form,
  Input,
  Select,
  Button,
  Table,
  Th,
  Td,
  Alert,
  Link,
  Message
} from './StyledComponents';

const RankingSystem=()=> {
  const [examData, setExamData] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [newExam, setNewExam] = useState({
    name: "",
    date: "",
    certification: "",
    courseType: "",
    status: "",
    score: "",
    totalScore: "",
    sessionLink: "",
  });
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
  };

  const handleInputChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_URL}/api/examdata`, newExam);
    fetchExamData();
    fetchRankings();
    setNewExam({
      name: "",
      date: "",
      certification: "",
      courseType: "",
      status: "",
      score: "",
      totalScore: "",
      sessionLink: "",
    });
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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/bulkupload`, formData);
      setUploadMessage(`Successfully uploaded ${response.data.count} records.`);
      fetchExamData();
      fetchRankings();
    } catch (error) {
      console.error("Error:", error);
      setUploadMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Skill Ranking System</Title>

      <SubTitle>Add New Exam Data</SubTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          value={newExam.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <Input
          name="date"
          type="date"
          value={newExam.date}
          onChange={handleInputChange}
          required
        />
        <Input
          name="certification"
          value={newExam.certification}
          onChange={handleInputChange}
          placeholder="Certification"
          required
        />
        <Select
          name="courseType"
          value={newExam.courseType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Course Level</option>
          {courseTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Select
          name="status"
          value={newExam.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
        </Select>
        <Input
          name="score"
          type="number"
          value={newExam.score}
          onChange={handleInputChange}
          placeholder="Score"
          required
        />
        <Input
          name="totalScore"
          type="number"
          value={newExam.totalScore}
          onChange={handleInputChange}
          placeholder="Total Score"
          required
        />
        <Input
          name="sessionLink"
          value={newExam.sessionLink}
          onChange={handleInputChange}
          placeholder="Session Link"
          required
        />
        <Button type="submit">Add Exam Data</Button>
      </Form>

      <SubTitle>Bulk Upload</SubTitle>
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