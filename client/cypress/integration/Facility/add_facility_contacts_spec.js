/// <reference types="Cypress" />
const type = (fieldName, value) => {
  cy.get(`input[name='${fieldName}']`)
    .first()
    .click()
    .clear()
    .type(`${value}`)
    .blur();
};

const hasError = (fieldName, error) => {
  cy.get(`[data-test=fieldError${fieldName}`)
    .first()
    .should("be.visible")
    .contains(error);
};

describe("Add Facility Contacts", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const BACKEND_URL = Cypress.env("API_URL");

  var details = {
    postalAddress: "P.O.Box 1",
    physicalAddress: "Kuunika",
    contactName: "Kuunika",
    contactEmail: "ku@gmail.com",
    contactPhoneNumber: "0888888888",
    catchmentArea: "100",
    catchmentPopulation: "100",
    longitude: "100",
    latitude: "-100"
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    postalAddress: "Postal Address is too short",
    physicalAddress: "Physical Address is too short",
    contactName: "Contact Name is too short",
    contactEmail: "Invalid Email format",
    contactPhoneNumber: "Invalid phone number",
    catchmentArea: "Catchment Area is too short",
    catchmentPopulation: `Invalid number`,
    longitude: `longitude must be a positive number`,
    latitude: `latitude must be a negative number`
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
      win.localStorage.setItem(
        "new_facility_active_form",
        `Contacts & Location`
      );
      win.localStorage.setItem(
        "new_facility_details",
        JSON.stringify({ facility_name: "kuunika", id: 1 })
      );
    });
  });
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem(
        "new_facility_active_form",
        `Contacts & Location`
      );
      win.localStorage.setItem(
        "new_facility_details",
        JSON.stringify({ facility_name: "kuunika", id: 1 })
      );
    });
  });

  context("Navigates to the add form", () => {
    it("Navigates to the facilities page", () => {
      cy.login(credentials);
      cy.visit(FRONTEND_URL);
      cy.get(`[data-test=menuFacilities]`).click();
      cy.get("[data-test=addFacilityBtn]").click();
      cy.location().should(loc => {
        expect(loc.href).to.equal(`${FRONTEND_URL}/facilities/add`);
      });
    });

    it("Shows facility contacts form", () => {
      cy.get("button.swal-button.swal-button--confirm")
        .first()
        .click();
    });
  });

  context("Validates input in front-end", () => {
    it("Validates postal address", () => {
      type("postal_address", "ku");

      hasError("postal_address", errors.postalAddress);
    });

    it("Validates physical address", () => {
      type("physical_address", "ku");

      hasError("physical_address", errors.physicalAddress);
    });

    it("Validates contact name", () => {
      type("contact_person_fullname", "ku");

      hasError("contact_person_fullname", errors.contactName);
    });

    it("Validates phone", () => {
      type("contact_person_phone", "ku");

      hasError("contact_person_phone", errors.contactPhoneNumber);
    });

    it("Validates email", () => {
      type("contact_person_email", "ku");

      hasError("contact_person_email", errors.contactEmail);
    });

    it("Validates catchment area", () => {
      type("catchment_area", "ku");

      hasError("catchment_area", errors.catchmentArea);
    });
    it("Validates catchment area population", () => {
      type("catchment_population", "ty");

      hasError("catchment_population", errors.catchmentPopulation);
    });
    it("Validates latitude", () => {
      type("latitude", "1");

      hasError("latitude", errors.latitude);
    });

    it("Validates longitude", () => {
      type("longitude", "-1");

      hasError("longitude", errors.longitude);
    });
  });

  context("Adds Facility Contacts And Locations", () => {
    it("Successfully Adds Contacts And Locations", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `${BACKEND_URL}/Facilities/contactDetails`,
        "fixture:add_facility_basics_success.json"
      ).as("contacts");
      type("postal_address", details.postalAddress);
      type("physical_address", details.physicalAddress);
      type("contact_person_fullname", details.contactName);
      type("contact_person_phone", details.contactPhoneNumber);
      type("contact_person_email", details.contactEmail);
      type("catchment_area", details.catchmentArea);
      type("catchment_population", details.catchmentPopulation);

      type("longitude", details.longitude);

      type("latitude", details.latitude);

      cy.get("[data-test='saveBtn']")
        .first()
        .click();
      cy.wait("@contacts");
      // cy.fetch_add_facility().then(facility => {
      //   let facilityContacts = facility.contact;
      //   cy.expect(facilityContacts).to.deep.equal({
      //     ...details
      //   });
      // });
    });
  });
});
