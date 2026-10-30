import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/user";
import { getRoles } from "../services/role";

function AddUser(){
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [roleError, setRoleError] = useState("");
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [roles, setRoles] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [role_id, setRole_id] = useState("");
    const [status, setStatus] = useState(true);
    

    // Load all roles from Laravel
    useEffect(() => {
        async function loadRoles() {
            try {
                const firstPage = await getRoles(1);
                let allRoles = firstPage.data || [];

                // Fetch remaining pages, if any
                for (
                    let page = 2;
                    page <= firstPage.last_page;
                    page++
                ) {
                    const result = await getRoles(page);
                    allRoles = [...allRoles, ...(result.data || [])];
                }

                setRoles(allRoles);
            } catch (err) {
                setRoleError("Unable to load roles. Please try again.");
            } finally {
                setLoadingRoles(false);
            }
        }

        loadRoles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== cpassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        if (!role_id) {
            setError("Please select a role.");
            return;
        }

        setSaving(true);

        try {
            await createUser({
            name,
            email,
            phone,
            password,
            password_confirmation: cpassword,
            role_id: Number(role_id),
            status: status ,

            });

            navigate("/users");
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
                            <input type="text" className="form-control" value={name} name="name" id="name" required placeholder="Enter Name" 
                            onChange={(e)=>setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Email</label>
                          <div className="col-sm-10">
                            <input type="email" required className="form-control" value={email} name="email" id="email" placeholder="Enter Email" 
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Password</label>
                          <div className="col-sm-10">
                            <input type="password" required className="form-control" value={password} name="password" id="password" placeholder="Enter password" 
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Confirm Password</label>
                          <div className="col-sm-10">
                            <input type="password" required className="form-control" value={cpassword} name="cpassword" id="cpassword" placeholder="Confirm password" 
                            onChange={(e)=>setCpassword(e.target.value)}
                            />
                          </div>
                        </div>
                         <div className="row mb-3">
                                    <label htmlFor="role_id" className="col-sm-2 col-form-label">
                                        Role
                                    </label>
                                    <div className="col-sm-10">
                                        <select
                                            className="form-select"
                                            id="role_id"
                                            value={role_id}
                                            onChange={(e) => setRole_id(e.target.value)}
                                            required
                                            disabled={loadingRoles || !!roleError}
                                        >
                                            <option value="">
                                                {loadingRoles
                                                    ? "Loading roles..."
                                                    : "Select role"}
                                            </option>

                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>

                                        
                                    </div>
                                </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label" for="basic-default-name">Phone</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" value={phone} name="phoe" id="phone"  placeholder="Enter Phone" 
                            onChange={(e)=>setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                        <label for="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <select className="form-select" required name="status" id="status"
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
export default AddUser