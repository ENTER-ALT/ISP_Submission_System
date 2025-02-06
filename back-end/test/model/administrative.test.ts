import { Privilege } from "../../model/privilege";
import { Administrative } from "../../model/administrative";
import { PrivilegeType } from "../../types/privilegeDTO";

const mockPrivilege1 = new Privilege({
    id: 1,
    name: PrivilegeType.UPDATE_COURSE,
    description: "Can edit content"
});

const mockPrivilege2 = new Privilege({
    id: 2,
    name: PrivilegeType.DELETE_COURSE,
    description: "Can delete content"
});

test("given: valid data for Administrative, when: instance is created, then: the instance is created with the correct values", () => {
    const admin = new Administrative({
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        password: "securepassword",
        privileges: [mockPrivilege1, mockPrivilege2]
    });

    expect(admin.id).toEqual(1);
    expect(admin.name).toEqual("John Doe");
    expect(admin.email).toEqual("johndoe@example.com");
    expect(admin.password).toEqual("securepassword");
    expect(admin.privileges).toEqual([mockPrivilege1, mockPrivilege2]);
});

test("given: empty privileges array, when: instance is created, then: an error is thrown", () => {
    const createAdmin = () =>
        new Administrative({
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            password: "securepassword",
            privileges: []
        });

    expect(createAdmin).toThrow("Privileges are required for administrative users.");
});

test("given: missing privileges, when: instance is created, then: an error is thrown", () => {
    const createAdmin = () =>
        new Administrative({
            id: 3,
            name: "Alice Johnson",
            email: "alicejohnson@example.com",
            password: "securepassword",
            privileges: undefined as any
        });

    expect(createAdmin).toThrow("Privileges are required for administrative users.");
});

test("given: missing name, when: instance is created, then: an error is thrown", () => {
    const createAdmin = () =>
        new Administrative({
            id: 4,
            name: "",
            email: "emptyname@example.com",
            password: "securepassword",
            privileges: [mockPrivilege1]
        });

    expect(createAdmin).toThrow("Name is required.");
});

test("given: missing email, when: instance is created, then: an error is thrown", () => {
    const createAdmin = () =>
        new Administrative({
            id: 5,
            name: "Empty Email",
            email: "",
            password: "securepassword",
            privileges: [mockPrivilege2]
        });

    expect(createAdmin).toThrow("Email is required.");
});

test("given: missing password, when: instance is created, then: an error is thrown", () => {
    const createAdmin = () =>
        new Administrative({
            id: 6,
            name: "Empty Password",
            email: "emptypassword@example.com",
            password: "",
            privileges: [mockPrivilege1]
        });

    expect(createAdmin).toThrow("Password is required.");
});

test("given: multiple privileges, when: privileges are accessed, then: returns correct privileges", () => {
    const admin = new Administrative({
        id: 7,
        name: "Multi Privileges",
        email: "multiprivileges@example.com",
        password: "securepassword",
        privileges: [mockPrivilege1, mockPrivilege2]
    });

    expect(admin.privileges.length).toBe(2);
    expect(admin.privileges).toContain(mockPrivilege1);
    expect(admin.privileges).toContain(mockPrivilege2);
});
