import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderTable from "../components/RenderTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import useGetUsers from "../hooks/useGetUsers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminUsersPage() {
    console.log("rendering");
    const { currentUser, initialLoading } = useAuthContext();
    const { data: users, loading } = useGetUsers();
    console.log(users);
    const setAdmin = async (mail, admin) => {
        const user = users.find((user) => user.email === mail);
        const uid = user.id;
        const userRef = doc(db, "users", uid);

        try {
            await updateDoc(userRef, {
                admin: !admin,
            });
            console.log("Succesfully updated");
        } catch (err) {
            console.log(err);
        }
    };

    const data = React.useMemo(
        () =>
            loading
                ? []
                : users.map((user) => ({
                      avatar: user.photoURL,
                      mail: user.email,
                      admin: user.admin,
                  })),
        [users]
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Photo",
                accessor: "avatar",
                Cell: (tableProps) => (
                    <div>
                        <Image
                            fluid
                            style={{ width: 100, height: 80 }}
                            src={tableProps.row.original.avatar}
                            alt="Avatar"
                        />
                    </div>
                ),
            },
            {
                Header: "Mail",
                accessor: "mail",
            },
            {
                Header: "Admin",
                accessor: "admin",
                Cell: (tableProps) => (
                    <div>
                        <Button
                            className="mt-2"
                            variant={
                                tableProps.row.original.admin
                                    ? "danger"
                                    : "primary"
                            }
                            onClick={() => {
                                setAdmin(
                                    tableProps.row.original.mail,
                                    tableProps.row.original.admin
                                );
                            }}
                        >
                            {tableProps.row.original.admin
                                ? "Remove admin"
                                : "Add Admin"}
                        </Button>
                    </div>
                ),
            },
        ],
        [users]
    );
    // if (initialLoading || loading) return <></>;

    const tableInstance = useTable({ columns, data });
    return (
        <Container>
            <h2>Users</h2>
            <RenderTable tableInstance={tableInstance} />
        </Container>
    );
}
