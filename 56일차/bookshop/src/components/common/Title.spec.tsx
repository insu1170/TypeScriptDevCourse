import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("Title", () => {
    it("랜더 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Title size="large">Test</Title>
            </BookStoreThemeProvider>
        )
        expect(screen.getByText("Test")).toBeInTheDocument();
    })
})  