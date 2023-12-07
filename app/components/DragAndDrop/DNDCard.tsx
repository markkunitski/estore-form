import { DragItem, ItemTypes } from "@/app/types/DNDTypes";
import React, { FC, useRef, useState } from "react";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { EditRemoveBtnGroup } from "../EditRemoveBtnGroup";

// Define the props for the DNDCard component
export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (id: any) => void;
  onEdit: (id: any, newText: string) => void;
}

// DNDCard component definition
export const DNDCard: FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
  onRemove,
  onEdit,
}) => {
  // Ref to the card element
  const ref = useRef<HTMLDivElement>(null);

  // State to track if the card is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State to store the edited text
  const [editedText, setEditedText] = useState(text);

  // Drop configuration for the react-dnd library
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getItem() ? monitor.getItem().id.toString() : null,
      };
    },
    hover(item: DragItem, monitor) {
      // Hover logic to determine the position of the dragged item
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Call the moveCard function to update the card order
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  // Drag configuration for the react-dnd library
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Set opacity based on whether the card is being dragged
  const opacity = isDragging ? 0.5 : 1;

  // Event Handlers for bullet buttons
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove(id);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Call onEdit function to save the edited text
    onEdit(id, editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Cancel the editing mode and reset the edited text
    setIsEditing(false);
    setEditedText(text);
  };

  // Attach drag and drop handlers to the card element
  drag(drop(ref));

  // JSX rendering
  return (
    <div
      ref={ref}
      className={`border rounded-2 px-3 py-2 mb-2 cursor-grab ${
        isEditing ? "editing" : ""
      }`}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            className="form-control border-info mb-2"
            onChange={(e) => setEditedText(e.target.value)}
          />
          {/* Render button group for editing mode */}
          <EditRemoveBtnGroup
            isEditing={isEditing}
            handleSaveEdit={handleSaveEdit}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleRemove={handleRemove}
          />
        </>
      ) : (
        <>
          {/* Render text and button group for non-editing mode */}
          <p>{text}</p>
          <EditRemoveBtnGroup
            isEditing={isEditing}
            handleSaveEdit={handleSaveEdit}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleRemove={handleRemove}
          />
        </>
      )}
    </div>
  );
};
