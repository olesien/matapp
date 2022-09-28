import React from "react";
import Container from "react-bootstrap/Container";
import { useTable } from "react-table";
import RenderTable from "../components/RenderTable";

export default function AdminUsersPage() {
    console.log("rendering");
    const data = React.useMemo(
        () => [
            {
                col1: "Hello",
                col2: "World",
            },
            {
                col1: "react-table",
                col2: "rocks",
            },
            {
                col1: "whatever",
                col2: "you want",
            },
        ],
        []
    );
    const columns = React.useMemo(
        () => [
            {
                Header: "Column 1",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Column 2",
                accessor: "col2",
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });
    return (
        <Container>
            <h2>Users</h2>
            <RenderTable tableInstance={tableInstance} />
        </Container>
    );
}
