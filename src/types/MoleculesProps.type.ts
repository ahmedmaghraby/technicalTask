export type ModalActions = {
  label?: string;
  class?: string;
  onClick?: () => void;
  closeOnClick?: boolean;
  type?: "primary" | "success" | "danger" | "gray";
  isLoading?: boolean;
  isDisabled?: boolean;
};
