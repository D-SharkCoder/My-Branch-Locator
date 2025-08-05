import BranchGridSection from "../components/BranchGridSection";
import BranchListContextProvider from "../contexts/branch-listing-context";

import { render, within } from "@testing-library/react";
import '@testing-library/jest-dom';

describe("BranchGridSection", () => {
    it("Renders branch card(s) inside the grid", async () => {
        const { getByTestId } = render(
            <BranchListContextProvider>
                <BranchGridSection />
            </BranchListContextProvider>
    );
        const gridContainer = getByTestId("BranchGridListing");

        const cards = await within(gridContainer).findAllByTestId("BranchCard");
        expect(cards.length).toBeGreaterThan(0);
    });
})