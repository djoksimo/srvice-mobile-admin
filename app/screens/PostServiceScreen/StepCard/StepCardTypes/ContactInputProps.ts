export type ContactInputProps = {
  email: string;
  phone: string;
  onEmailChanged: (email: string) => void;
  onPhoneChanged: (phone: string) => void;
};
