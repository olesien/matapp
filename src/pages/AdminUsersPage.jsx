import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderTable from "../components/RenderTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import useGetUsers from "../hooks/useGetUsers";

export default function AdminUsersPage() {
    console.log("rendering");
    const { currentUser, initialLoading } = useAuthContext();
    const { data: users, loading } = useGetUsers();

    const setAdmin = (mail, admin) => {
        console.log(mail, admin);
    };
    // const data = React.useMemo(
    //     () => [
    //         {
    //             avatar: "https://media.istockphoto.com/photos/black-box-levitation-on-black-background-3d-rendering-picture-id610655646?k=20&m=610655646&s=612x612&w=0&h=8i8ylFj_zaVeQ_YggU07pVTQhPtZzntqxFN9qGFjPRM=",
    //             mail: "somemail@gmail.com",
    //             admin: true,
    //         },
    //     ],
    //     []
    // );
    const data = React.useMemo(
        () =>
            loading
                ? []
                : users.map((user) => ({
                      avatar: user.photoURL,
                      mail: user.email,
                      admin: user.admin,
                  })),
        [loading]
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
        []
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
