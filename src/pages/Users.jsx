import { useEffect, useState } from "react";
import { getUsers,deleteUser } from "../services/user";
import { useNavigate } from "react-router-dom";

function Users(){
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({});
    const [users, setUsers] = useState([]);
      useEffect(() => {
      loadUsers();
    }, []);
    const loadUsers = async (page = 1) => {
    try {
      const response = await getUsers(page);

      setUsers(response.data);

      setPagination({
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total,
      });
    } catch (error) {
      console.log("Error loading users:", error);
    }
    };

   
    const getPageNumbers = () => {
      const current = pagination.currentPage;
      const last = pagination.lastPage;

      if (!last) return [];

      if (last <= 5) {
        return Array.from({ length: last }, (_, i) => i + 1);
      }

      let start = Math.max(1, current - 1);
      let end = Math.min(last, current + 2);

      if (current <= 2) {
        start = 1;
        end = 5;
      }

      if (current >= last - 2) {
        start = last - 4;
        end = last;
      }

      const pages = [];

      if (start > 1) {
        pages.push(1);

        if (start > 2) {
          pages.push("...");
        }
      }

      for (let page = start; page <= end; page++) {
        pages.push(page);
      }

      if (end < last) {
        if (end < last - 1) {
          pages.push("...");
        }

        pages.push(last);
      }

      return pages;
    };
    const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id);
      await loadUsers(1);
    } catch (error) {
      alert(error.message || "Unable to delete user");
    }
  };

    return(

            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-10">
                    <h4 className="fw-bold py-3 mb-4">Users</h4>
                    </div>
                    <div className="col-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/users/create`)}
                      >
                        Add User
                      </button>
                    </div>
                </div>
              <div className="card">
                <h5 className="card-header">Users</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {users.map((user) => (

                        <tr key={user.id}>
                          <td><strong>{user.id}</strong></td>
                          <td> <strong>{user.name}</strong></td>
                          <td>{user.email}
                          </td>
                          <td>{user.phone || "-"}
                          </td>
                          <td>{user.role?.name || "No Role Assigned"}
                          </td>
                          <td>
                              {user.status ? (
                              <span className="badge bg-label-success me-1">
                                  Active
                              </span>
                              ) : (
                              <span className="badge bg-label-danger me-1">
                                  Inactive
                              </span>
                              )}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => navigate(`/users/${user.id}/edit`)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  
              <div className="card-footer d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  disabled={pagination.currentPage <= 1}
                  onClick={() => loadUsers(pagination.currentPage - 1)}
                >
                  Previous
                </button>

                
                <div className="d-flex gap-2">
                  {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                      <span key={`ellipsis-${index}`} className="px-2 py-1">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        className={`btn btn-sm ${
                          page === pagination.currentPage
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => loadUsers(page)}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>


                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  disabled={pagination.currentPage >= pagination.lastPage}
                  onClick={() => loadUsers(pagination.currentPage + 1)}
                >
                  Next
                </button>
              </div>

                
              </div>
              
            </div>
    )
}
export default Users