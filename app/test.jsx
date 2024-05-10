import React, { useEffect, useState } from "react";

const USERS_URL = "https://example.com/api/users";

export default function Table() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(USERS_URL + "?page=" + page);
        const resData = await response.json();
        setUsers(resData);
      } catch (error) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const getLastPage = () => {
    console.log("lastpage", Math.ceil(page / 10));
    return Math.ceil(users.count / 10) - 1;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            Object.keys(users).length > 0 &&
            users.results.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <section className="pagination">
        <button
          className="first-page-btn"
          onClick={() => setPage(0)}
          disabled={loading || page === 0}
        >
          first
        </button>
        <button
          className="previous-page-btn"
          onClick={() => setPage((page) => page - 1)}
          disabled={loading || page === 0}
        >
          previous
        </button>
        <button
          className="next-page-btn"
          onClick={() => setPage((page) => page + 1)}
          disabled={loading || page === getLastPage()}
        >
          next
        </button>
        <button
          className="last-page-btn"
          onClick={() => setPage(getLastPage())}
          disabled={loading || page === getLastPage()}
        >
          last
        </button>
      </section>
    </div>
  );
}
