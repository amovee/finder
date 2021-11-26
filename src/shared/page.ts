import { Status } from "./status";

export class Page {
  constructor(
    public key: string,
    public name: string,
    public status: Status,
    public info: string | null = null,
  ) { }
}