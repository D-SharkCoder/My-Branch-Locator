export type Filter = {
  text: string;
  for: "any" | "name" | "manager" | "location" | "phone";
  sort: "asc" | "desc";
  status: boolean 
}