export const ItemTypes = {
  CARD: "card",
};

export interface DragItem {
  index: number;
  id: string;
  type: string;
}
export interface Item {
  id: number;
  text: string;
}
