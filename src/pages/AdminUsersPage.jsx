import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderSortedTable from "../components/RenderSortedTable";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/AuthContext";
import useGetUsers from "../hooks/useStreamUsers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSortBy } from "react-table";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
    const { data: users, loading } = useGetUsers();
    const setAdmin = async (mail, admin) => {
        const user = users.find((user) => user.email === mail);
        const uid = user.id;
        const userRef = doc(db, "users", uid);

        try {
            await updateDoc(userRef, {
                admin: !admin,
            });
            toast.success('Successfully updated admin status')
        } catch (err) {
            toast.error(err.message)
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

    const adminSortByFunction = React.useMemo(() => {
        return (rowA, rowB, columnId, desc) => {
            // inspect the row to see what data we have
            if (rowA.original.admin && !rowB.original.admin) return 1;
            if (!rowA.original.admin && rowB.original.admin) return -1;
            return 0;
        };
    }, []);
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
                disableSortBy: true,
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
                sortType: adminSortByFunction,
            },
        ],
        [users, adminSortByFunction]
    );

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useSortBy
    );
    return (
        <Container>
            <h2>Users</h2>
            <RenderSortedTable tableInstance={tableInstance} />
        </Container>
    );
}
