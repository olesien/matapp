import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import AdminRestaurantImagesPage from '../AdminRestaurantImagesPage'
import AuthContextProvider from '../../contexts/AuthContext'

test("table is initially empty", () => {
    render(
        <AuthContextProvider>
            <AdminRestaurantImagesPage />
        </AuthContextProvider>
    )

    // find table body

    // expect table body to be empty

})

test("table can sort by title when 'title' is clicked", () => {
    render(
        <AuthContextProvider>
            <AdminRestaurantImagesPage />
        </AuthContextProvider>
    )

    // find column header called 'title'

    // click on column header element

    // assert that the table can sort by title
})

test("an image can change status when 'approved' button is clicked", () => {
    render(
        <AuthContextProvider>
            <AdminRestaurantImagesPage />
        </AuthContextProvider>
    )

    // find 'approved' button element

    // click on 'approved' button

    // assert that 'approved' status has changed
})
