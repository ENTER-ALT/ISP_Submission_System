import { useAuth } from "@/components/AuthProvider";
import FormInput from "@/components/forms/FormInput";
import FormSelectObjectInput from "@/components/forms/FormSelectObjectInput";
import AdministrativeService from "@/services/AdministrativeService";
import StudentService from "@/services/StudentService";
import { User } from "@/types";
import { LoginData, UserType } from "@/types/auth";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { mapUserToString } from "@/utils/mappers";
import { validateLoginData } from "@/utils/validators";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";

const TITLE = "Login";

export default function Login() {
  const { errors, setErrors, handleError } = useErrorHandler();
  const [input, setInput] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [userIndex, setUserIndex] = useState<number>(-1);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const auth = useAuth();

  const textInputClass = `p-1 pl-4 rounded shadow-regular text-gray-800 `;

  const getAvailableUsers = async () => {
    const adminsData = await AdministrativeService.getAllAdministratives(
      handleError
    );
    const studentsData = await StudentService.getAllStudents(handleError);
    const admins: User[] = adminsData.map((admin) => ({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: "password123",
      userType: UserType.ADMINISTRATIVE,
    }));
    const students: User[] = studentsData.map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      password: "password123",
      userType: UserType.STUDENT,
    }));
    return [...admins, ...students];
  };

  useEffect(() => {
    getAvailableUsers().then((users) => {
      setAvailableUsers(users);
    });
  }, []);

  const handleSelectUser = (index: number) => {
    setUserIndex(index);
    setInput({
      username: availableUsers[index].email,
      password: availableUsers[index].password,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateLoginData(input, setErrors)) {
      await auth.login(input);
      return;
    }
    alert("please provide a valid input");
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <section className="m-auto w-112 bg-primary shadow-regular rounded mt-28 ">
        <form className="flex flex-col gap-3 p-16" onSubmit={handleSubmit}>
          <h2 className="text-center">Welcome!</h2>
          <FormSelectObjectInput
            objectIndex={userIndex}
            name="user"
            labelText="Select User"
            onChange={handleSelectUser}
            availableObjects={availableUsers.map(mapUserToString)}
            error={errors.user}
          />
          <FormInput
            name="username"
            labelText="Email"
            inputType="text"
            value={input.username}
            inputClassName={textInputClass}
            onChange={handleInput}
            error={errors.username}
          />
          <FormInput
            name="password"
            labelText="Password"
            inputType="password"
            value={input.password}
            inputClassName={textInputClass}
            onChange={handleInput}
            error={errors.password}
          />
          <button
            type="submit"
            className="bg-safe p-2 rounded shadow-regular hover:shadow-success mt-3 w-fit self-center"
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
