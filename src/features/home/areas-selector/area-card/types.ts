export type Course = {
  id: string | number;
  name: string;
};

export type Area = {
  id: string | number;
  imageUrl: string;
  title: string;
  courses: Course[];
};
