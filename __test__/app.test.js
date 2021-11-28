import { handleSubmit } from "../src/client/js/app";

describe("Testing the submit functionality", function() {
    test("Testing the handleSubmit() function", function() {
        expect(handleSubmit).toBeDefined();
    });
});