import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRole } from "../services/role";

function AddRole(){
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSaving(true);

        try {
            await createRole({
            name,
            description,
            status,
            });

            navigate("/roles");
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
        };
    return(

        <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Roles/</span> Add</h4>
            <div  className="row">
                <div className="col-xxl">
                  <div className="card mb-4">
                    <div className="card-header d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">Basic Layout</h5>
                      <small className="text-muted float-end">Default label</small>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" value={name} name="role" id="role" placeholder="Enter Role" 
                            onChange={(e)=>setName(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-message">Description</label>
                          <div className="col-sm-10">
                            <textarea
                            name="description"
                              id="description"
                              className="form-control"
                              placeholder="Description"
                              value={description}
                              onChange={(e)=>setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                        <label for="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <select className="form-select"name="status" id="status"
                            value={status?"1":"0"}
                            onChange={(e)=>setStatus(e.target.value==="1")}
                            >
                            <option selected>Select</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                            </select>
                        </div>
                      </div>
                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                            )}
                            <button type="submit" className="btn btn-primary"
                             disabled={saving}
>
  {saving ? "Saving..." : "Save"}</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/roles")}>Cancel</button>

                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

            </div>
            
            
            
        </div>
    )
}
export default AddRole