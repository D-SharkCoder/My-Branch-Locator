export type Filter = {
  text: string;
  for: "any" | "name" | "manager" | "location" | "phone";
  sort: "any" | "asc" | "desc";
  status: boolean 
}