export type CityAutocompleteProps = {
  value?: string;

  handleChange: (cityValue: string) => void;

  label?: string;

  placeholder?: string;

  disabled?: boolean;

  size?: 'small' | 'medium' | 'large';

  showGeolocation?: boolean;

  permissionDenied?: boolean;

  onRequestPermission?: () => void;

  name?: string;
};
