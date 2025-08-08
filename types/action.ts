export type TAction = {
  id: number;
  isHeartSelected: boolean;
  isStarSelected: boolean;
};

export type TLikeButton = {
  id: number;
  updateButtonStatus: ({
    id,
    isHeartSelected,
    isStarSelected,
  }: TAction) => void;
  isHeartSelected: boolean;
  isStarSelected: boolean;
};
