import { Privilege } from '../model/privilege';
import { PrivilegeType } from '../types/privilegeDTO';

const privileges: Privilege[] = [
    { id: 1, name: PrivilegeType.CREATE_ISP, description: 'Create ISP' },
    { id: 2, name: PrivilegeType.UPDATE_ISP, description: 'Update ISP' },
    { id: 3, name: PrivilegeType.DELETE_ISP, description: 'Delete ISP' },
    { id: 4, name: PrivilegeType.CREATE_STUDENT, description: 'Create Student' },
    { id: 5, name: PrivilegeType.UPDATE_STUDENT, description: 'Update Student' },
    { id: 6, name: PrivilegeType.DELETE_STUDENT, description: 'Delete Student' },
    { id: 7, name: PrivilegeType.CREATE_COURSE, description: 'Create Course' },
    { id: 8, name: PrivilegeType.UPDATE_COURSE, description: 'Update Course' },
    { id: 9, name: PrivilegeType.DELETE_COURSE, description: 'Delete Course' },
    { id: 10, name: PrivilegeType.CREATE_ADMINISTRATIVE, description: 'Create Administrative' },
    { id: 11, name: PrivilegeType.UPDATE_ADMINISTRATIVE, description: 'Update Administrative' },
    { id: 12, name: PrivilegeType.DELETE_ADMINISTRATIVE, description: 'Delete Administrative' },
];

export default privileges;
