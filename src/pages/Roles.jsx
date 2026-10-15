import { useEffect, useState } from "react";
import { getRoles,deleteRole } from "../services/role";
import { useNavigate } from "react-router-dom";

function Roles(){
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({});
    const [roles, setRoles] = useState([]);
      useEffect(() => {
      loadRoles();
    }, []);
    const loadRoles = async (page = 1) => {
    try {
      const response = await getRoles(page);

      setRoles(response.data);

      setPagination({
        currentPage: response.current_page,
        lastPage: response.last_page,
        total: response.total,
      });
    } catch (error) {
      console.log("Error loading roles:", error);
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
      "Are you sure you want to delete this role?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRole(id);
      await loadRoles(1);
    } catch (error) {
      alert(error.message || "Unable to delete role");
    }
  };

    return(

            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-10">
                    <h4 className="fw-bold py-3 mb-4">Roles</h4>
                    </div>
                    <div className="col-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/roles/create`)}
                      >
                        Add Role
                      </button>
                    </div>
                </div>
              <div className="card">
                <h5 className="card-header">Roles</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {roles.map((role) => (

                        <tr key={role.id}>
                          <td><strong>{role.id}</strong></td>
                          <td> <strong>{role.name}</strong></td>
                          <td>{role.description || "-"}
                          </td>
                          <td>
                              {role.status ? (
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
                              onClick={() => navigate(`/roles/${role.id}/edit`)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(role.id)}
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
                  onClick={() => loadRoles(pagination.currentPage - 1)}
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
                        onClick={() => loadRoles(page)}
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
                  onClick={() => loadRoles(pagination.currentPage + 1)}
                >
                  Next
                </button>
              </div>

                
              </div>
              
            </div>
    )
}
export default Roles