export type City = {
  nome: string;
  estado: string;
};

export type CitySelectProps = {
  cities?: City[];
  selectedCity: string;
  handleChange: (cityValue: string) => void;
  label?: string;
  size?: 'large' | 'medium';
  id?: string;
};
