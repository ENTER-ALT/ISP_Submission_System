import { Privilege } from "../../model/privilege";
import { PrivilegeType } from "../../types/privilegeDTO";

test('given: valid privilege data, when: privilege is created, then: fields are set correctly', () => {
    const privilege = new Privilege({
        id: 1,
        name: PrivilegeType.CREATE_ISP,
        description: 'Grants access to create ISP'
    });

    expect(privilege.id).toEqual(1);
    expect(privilege.name).toEqual(PrivilegeType.CREATE_ISP);
    expect(privilege.description).toEqual('Grants access to create ISP');
});

test('given: missing description, when: privilege is created, then: an error is thrown', () => {
    const createPrivilege = () => new Privilege({
        id: 3,
        name: PrivilegeType.UPDATE_STUDENT,
        description: ''
    });

    expect(createPrivilege).toThrow('Description is required.');
});

test('given: valid privilege with undefined id, when: privilege is created, then: fields are set correctly without id', () => {
    const privilege = new Privilege({
        name: PrivilegeType.CREATE_COURSE,
        description: 'Grants access to create course'
    });

    expect(privilege.id).toBeUndefined();
    expect(privilege.name).toEqual(PrivilegeType.CREATE_COURSE);
    expect(privilege.description).toEqual('Grants access to create course');
});
