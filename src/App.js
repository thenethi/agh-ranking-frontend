import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [examData, setExamData] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [newExam, setNewExam] = useState({
    name: "",
    date: "",
    certification: "",
    courseType: "",
    status: "",
    score: "",
    sessionLink: "",
  });

  useEffect(() => {
    fetchExamData();
    fetchRankings();
    fetchCertifications();
    fetchCourseTypes();
  }, []);

  const fetchExamData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/examdata`
    );
    const data = await response.json();
    setExamData(data);
  };

  const fetchRankings = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/rankings`
    );
    const data = await response.json();
    setRankings(data);
  };

  const fetchCertifications = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/certifications`
    );
    const data = await response.json();
    setCertifications(data);
  };

  const fetchCourseTypes = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/coursetypes`
    );
    const data = await response.json();
    setCourseTypes(data);
  };

  const handleInputChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/api/examdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExam),
    });
    fetchExamData();
    fetchRankings();
    setNewExam({
      name: "",
      date: "",
      certification: "",
      courseType: "",
      status: "",
      score: "",
      sessionLink: "",
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Skill Ranking System</h1>

      <h2 className="mb-3">Add New Exam Data</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            className="form-control"
            name="name"
            value={newExam.name}
            onChange={handleInputChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="date"
            type="date"
            value={newExam.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            name="certification"
            value={newExam.certification}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Certification</option>
            {certifications.map((cert, index) => (
              <option key={index} value={cert}>
                {cert}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            name="courseType"
            value={newExam.courseType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Course Type</option>
            {courseTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            name="status"
            value={newExam.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="score"
            type="number"
            value={newExam.score}
            onChange={handleInputChange}
            placeholder="Score"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="sessionLink"
            value={newExam.sessionLink}
            onChange={handleInputChange}
            placeholder="Session Link"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Exam Data
        </button>
      </form>

      <h2 className="mb-3">Exam Data</h2>
      <div className="table-responsive mb-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Certification</th>
              <th>Course Type</th>
              <th>Status</th>
              <th>Score</th>
              <th>Session Link</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam) => (
              <tr key={exam._id}>
                <td>{exam.name}</td>
                <td>{new Date(exam.date).toLocaleDateString()}</td>
                <td>{exam.certification}</td>
                <td>{exam.courseType}</td>
                <td>{exam.status}</td>
                <td>{exam.score}</td>
                <td>
                  <a
                    href={exam.sessionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Session
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3">Rankings</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Certification</th>
              <th>Course Type</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking) => (
              <tr key={ranking._id}>
                <td>{ranking.rank}</td>
                <td>{ranking.name}</td>
                <td>{ranking.certification}</td>
                <td>{ranking.courseType}</td>
                <td>{ranking.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
