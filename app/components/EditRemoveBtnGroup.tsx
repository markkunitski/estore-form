import React from "react";

interface EditRemoveBtnGroupProps {
  isEditing: boolean;
  handleSaveEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EditRemoveBtnGroup: React.FC<EditRemoveBtnGroupProps> = ({
  isEditing,
  handleSaveEdit,
  handleEdit,
  handleCancelEdit,
  handleRemove,
}) => (
  <div className="bulletpoint-bottom d-flex justify-content-between align-items-center">
    <div>
      <button
        className="btn btn-sm btn-outline-info me-2"
        onClick={isEditing ? handleSaveEdit : handleEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={isEditing ? handleCancelEdit : handleRemove}
      >
        {isEditing ? "Cancel" : "Remove"}
      </button>
    </div>
    <span className="me-3">&#9868;</span>
  </div>
);
