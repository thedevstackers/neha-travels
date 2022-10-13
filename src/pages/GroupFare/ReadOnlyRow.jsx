const ReadOnlyRow = ({ passenger, handleEditClick, handleDeleteClick, sNo }) => {
  return (
    <tr>
      <td>{sNo}</td>
      <td>{passenger.fullName}</td>
      <td>{passenger.address}</td>
      <td>{passenger.phoneNumber}</td>
      <td>{passenger.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, passenger)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(passenger.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;