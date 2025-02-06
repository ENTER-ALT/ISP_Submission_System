import { Privilege as PrismaPrivilege} from "@prisma/client";
import { PrivilegeType } from "../types/privilegeDTO";

export class Privilege {
    public readonly id?: number; // This is optional
    public readonly name: PrivilegeType;
    public readonly description: string;

    constructor(privilege: { id?: number; name: PrivilegeType; description: string }) { // 'id' is optional here
        Privilege.validate(privilege);
        this.id = privilege.id;
        this.name = privilege.name;
        this.description = privilege.description;
    }

    public static validate(privilege: { description: string }) {
        if (!privilege.description || privilege.description.length === 0) {
            throw new Error("Description is required.");
        }
    }

    public static from({
        id,
        name,
        description
    }: PrismaPrivilege): Privilege {
        return new Privilege({
            id,
            name: name,
            description
        });
    }
}
