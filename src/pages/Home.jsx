import React, { useEffect, useState } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=1&results=5&seed=abc`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setUserData(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!userData.length) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        {userData.map((user, index) => (
          <div className="col-lg-11 col-md-12 mb-4" key={index}>
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "15px",
                background: "linear-gradient(to bottom, #ffffff, #f7f9fc)",
              }}
            >
              <div className="row g-0 align-items-center">
                {/* Image Section */}
                <div
                  className="col-md-4 text-center p-4"
                  style={{
                    borderRadius: "15px 0 0 15px",
                  }}
                >
                  <img
                    // src={user.picture.medium}
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                    className="rounded-circle shadow"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      border: "5px solid rgb(0, 217, 255)",
                    }}
                  />
                </div>

                {/* Details Section */}
                <div className="col-md-7 p-4">
                  <h5 className="mt-3 text-primary">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h5>
                  <hr className="mb-3" />
                  <p>
                    <strong>Username:</strong> {user.login.username}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user.gender}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Cell:</strong> {user.cell}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>
                    {new Date(user.dob.date).toLocaleDateString()} (
                    {user.dob.age} years old)
                  </p>
                  <p>
                    <strong>Nationality:</strong> {user.nat}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
