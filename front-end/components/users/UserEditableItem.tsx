import { UserShort } from "@/types";
import EditButton from "../buttons/EditButton";
import UserItemLayout from "./UserItemLayout";
import UserShortView from "./UserShortView";

interface UserEditableItemProps {
  student: UserShort;
  redactorStudent: (studentId: number) => Promise<void>;
  isActive: boolean;
}
const UserEditableItem = ({
  student,
  redactorStudent,
  isActive,
}: UserEditableItemProps) => {
  const handleRedactorStudent = async () => {
    if (isActive) {
      await redactorStudent(student.id);
    }
  };

  return (
    <UserItemLayout>
      <UserShortView user={student} />
      <EditButton handleEdit={handleRedactorStudent} isActive={isActive} />
    </UserItemLayout>
  );
};

export default UserEditableItem;
