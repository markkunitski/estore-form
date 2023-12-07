import React, { FC, useCallback } from "react";
import update from "immutability-helper";
import { DNDCard } from "./DNDCard";
import { Item } from "@/app/types/DNDTypes";

// Props for DNDContainer component
interface DNDContainerProps {
  initialbulletPoints: Item[];
  setBulletPoints: React.Dispatch<React.SetStateAction<Item[]>>;
}

// DNDContainer component definition
export const DNDContainer: FC<DNDContainerProps> = ({
  initialbulletPoints,
  setBulletPoints,
}) => {
  // Handler to remove a card by its ID
  const handleRemoveCard = (id: number) => {
    setBulletPoints((prevbulletPoints) =>
      prevbulletPoints.filter((card) => card.id !== id)
    );
  };

  // Handler to edit the text of a card by its ID
  const handleEditCard = (id: number, newText: string) => {
    setBulletPoints((prevbulletPoints) =>
      prevbulletPoints.map((card) =>
        card.id === id ? { ...card, text: newText } : card
      )
    );
  };

  // Handler to add a new card
  const handleAddCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Create a new card with a unique ID (timestamp)
    const newCard: Item = {
      id: Date.now(),
      text: "New Bullet Point",
    };

    // Update state to include the new card
    setBulletPoints((prevbulletPoints) =>
      update(prevbulletPoints, {
        $push: [newCard],
      })
    );
  };

  // Callback to move a card within the list
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setBulletPoints((prevbulletPoints: Item[]) =>
      update(prevbulletPoints, {
        $splice: [
          [dragIndex, 1], // Remove the dragged card
          [hoverIndex, 0, prevbulletPoints[dragIndex] as Item], // Insert the dragged card at the new position
        ],
      })
    );
  }, []);

  // Callback to render an individual card
  const renderCard = useCallback(
    (card: { id: number; text: string }, index: number) => {
      return (
        <DNDCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          onRemove={(id) => handleRemoveCard(id)}
          onEdit={(id, newText) => handleEditCard(id, newText)}
        />
      );
    },
    [moveCard, handleRemoveCard, handleEditCard]
  );

  return (
    <>
      <div>
        {/* Render existing cards */}
        {initialbulletPoints.map((card, i) => renderCard(card, i))}

        {/* Button to add a new card */}
        <button
          className="btn btn-sm btn-outline-secondary w-100"
          onClick={handleAddCard}
        >
          Add New
        </button>
      </div>
    </>
  );
};
