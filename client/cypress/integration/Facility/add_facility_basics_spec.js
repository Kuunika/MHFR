/// <reference types="Cypress" />

const validateSelect = (name, error) => {
  cy.get(`[data-test=${name}]`)
    .first()
    .click();

  cy.get(`[id=menu-${name}]`)
    .first()
    .click();
  cy.get("[data-test=formFooter]")
    .first()
    .click();

  cy.get(`[data-test=fieldError${name}]`)
    .first()
    .should("be.visible")
    .contains(error);
};

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

describe("Add Facility Basics", () => {
  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const BACKEND_URL = Cypress.env("API_URL");

  var details = {
    commonName: "kuunika",
    dateOpened: "1975-01-01",
    district: 18,
    facilityName: "kuunika",
    facilityOwner: 8,
    facilityType: 9,
    facility_code_mapping: null,
    operationalStatus: 5,
    publishedDate: null,
    registrationNumber: "11111111",
    regulatoryStatus: 5
  };

  const credentials = {
    username: "mfladminuser",
    password: "admin"
  };

  const errors = {
    facilityName: "Facility name must have atleast 3 characters",
    facilityCommon: "Common name must have atleast 3 characters",
    registrationNumber: "Invalid Registration Number",
    empty: "You can't leave this field blank"
  };

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
      win.localStorage.clear();
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
  });

  context("Validates input in front-end", () => {
    it("Validates facility name", () => {
      type("facility_name", "ku");

      cy.get(`[data-test=fieldErrorfacility_name`)
        .first()
        .should("be.visible")
        .contains(errors.facilityName);
    });
    it("Validates facility common name", () => {
      type("common_name", "ku");

      cy.get(`[data-test=fieldErrorcommon_name]`)
        .first()
        .should("be.visible")
        .contains(errors.facilityCommon);
    });

    // it("Validates facility type", () => {
    //   validateSelect("facilityType", errors.empty);
    // });

    it("Validates Operational Status", () => {
      validateSelect("facility_operational_status_id", errors.empty);
    });

    // it("Validates regulatory status", () => {
    //   validateSelect("regulatoryStatus", errors.empty);
    // });

    it("Validates facility owner", () => {
      validateSelect("facility_owner_id", errors.empty);
    });

    it("Validates district", () => {
      validateSelect("district_id", errors.empty);
    });

    // it("Validates Registration", () => {
    //   type("registration_number", "1");

    //   cy.get(`[data-test=fieldErrorregistration_number]`)
    //     .first()
    //     .should("be.visible")
    //     .contains(errors.registrationNumber);
    // });
  });

  context("Adds Facility Basics", () => {
    it("Successfully Adds Facility Basics", () => {
      cy.server({
        status: 200
      });
      cy.route(
        "POST",
        `${BACKEND_URL}/Facilities`,
        "fixture:add_facility_basics_success.json"
      ).as("basics");
      cy.route("POST", `${BACKEND_URL}/Facilities/publish`, {
        success: "done"
      }).as("publish");

      cy.get("input[name='facility_name']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      cy.get("input[name='common_name']")
        .first()
        .click()
        .clear()
        .type("kuunika");

      selectFirst("facility_type_id");

      selectFirst("facility_operational_status_id");

      // selectFirst("facility_regulatory_status");

      selectFirst("facility_owner_id");

      selectFirst("district_id");

      // cy.get("input[name='registration_number']")
      //   .first()
      //   .click()
      //   .clear()
      //   .type("11111111");

      cy.get("[data-test='saveBtn']")
        .first()
        .click();

      cy.wait("@basics");
      cy.wait("@publish");

      cy.window().then(win => {
        let facility = JSON.parse(win.localStorage.new_facility_details);
        assert.notDeepEqual(facility, {
          ...details
        });
      });
    });
  });
});
