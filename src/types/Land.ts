import { BuildId } from "./Build"

export class Land {
    public id:string|undefined
    public x = -1
    public y = -1
    public owner: string|undefined
    public build: BuildId = BuildId.None
}