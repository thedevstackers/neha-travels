import { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./style.scss";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import * as XLSX from "xlsx";

const GroupFare = () => {
    const [passengers, setPassengers] = useState([]);
    const [fileName, setFileName] = useState("");
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });
    const [editFormData, setEditFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });
    const [editPassengerId, setEditPassengerId] = useState(null);

    const handleOnExport = () => {
        console.log(passengers)
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(passengers);

        XLSX.utils.book_append_sheet(wb, ws, fileName ? `${fileName} - Neha Travels` : "MySheet");

        XLSX.writeFile(wb, fileName ? `${fileName} - ${new Date().toLocaleString().split(',')[0].split("/").join("")} - Neha Travels.xlsx` : "GroupFare.xlsx");
    }

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newPassenger = {
            id: nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        };

        const newPassengers = [...passengers, newPassenger];
        setPassengers(newPassengers);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedPassenger = {
            id: editPassengerId,
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email,
        };

        const newPassengers = [...passengers];

        const index = passengers.findIndex((passenger) => passenger.id === editPassengerId);

        newPassengers[index] = editedPassenger;

        setPassengers(newPassengers);
        setEditPassengerId(null);
    };

    const handleEditClick = (event, passenger) => {
        event.preventDefault();
        setEditPassengerId(passenger.id);

        const formValues = {
            fullName: passenger.fullName,
            address: passenger.address,
            phoneNumber: passenger.phoneNumber,
            email: passenger.email,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditPassengerId(null);
    };

    const handleDeleteClick = (passengerId) => {
        const newPassengers = [...passengers];

        const index = passengers.findIndex((passenger) => passenger.id === passengerId);

        newPassengers.splice(index, 1);

        setPassengers(newPassengers);
    };

    return (
        <div className="app-container">
            <h2>Add a Contact</h2>
            <form onSubmit={handleAddFormSubmit} className="add-form">
                <input
                    type="text"
                    name="fullName"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="address"
                    required="required"
                    placeholder="Enter an addres..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Enter a phone number..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="email"
                    name="email"
                    required="required"
                    placeholder="Enter an email..."
                    onChange={handleAddFormChange}
                />
                <button type="submit">Add</button>
            </form>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th className="serial-number">S.No</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger, index) => {
                            const sNo = index + 1;
                            return (
                                <Fragment key={index}>
                                    {editPassengerId === passenger.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                            sNo={sNo}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            passenger={passenger}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                            sNo={sNo}
                                        />
                                    )}
                                </Fragment>
                            );
                        })}
                    </tbody>
                    {passengers.length === 0
                        && <tfoot>
                            <tr>
                                <td colSpan="100%"> No data found</td>
                            </tr>
                        </tfoot>
                    }
                </table>
            </form>
            {passengers.length !== 0 && <div className="export">
                <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="Enter a file name for export" />
                <button onClick={handleOnExport}>Export</button>
            </div>}
        </div>
    );
};

export default GroupFare;
