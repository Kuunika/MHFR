import { uniq, pull } from "lodash";

export default (
    state = {
        districtValues: [],
        operationalStatusValues: [],
        facilityTypeValues: [],
        facilityOwnerValues: [],
        regulatoryStatusValues: [],
        resourceTypeValue: [],
        typeInstanceValues: [],
        selectTagValue: 1
    },
    action
) => {
    switch (action.type) {
        case "ADD_DISTRICT_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: uniq([...state.districtValues, action.payload]),
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_OPERATIONAL_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: uniq([
                    ...state.operationalStatusValues,
                    action.payload
                ]),
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_FACILITY_TYPE_VALUES":
            return {
                facilityTypeValues: uniq([
                    ...state.facilityTypeValues,
                    action.payload
                ]),
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_FACILITY_OWNER_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: uniq([
                    ...state.facilityOwnerValues,
                    action.payload
                ]),
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_REGULATORY_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: uniq([
                    ...state.facilityOwnerValues,
                    action.payload
                ]),
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_RESOURCE_TYPE_VALUE":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: uniq([
                    ...state.resourceTypeValue,
                    action.payload
                ]),
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "ADD_RESOURCE_TYPE_INSTANCE":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: uniq([
                    ...state.typeInstanceValues,
                    action.payload
                ]),
                selectTagValue: state.selectTagValue
            };
            case "ADD_RESOURCE_SELECT_TAG":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue+action.payload
    
            };

        case "REMOVE_DISTRICT_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: pull(
                    state.districtValues,
                    action.payload.toString()
                ),
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "REMOVE_OPERATIONAL_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: pull(
                    state.operationalStatusValues,
                    action.payload.toString()
                ),
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "REMOVE_FACILITY_TYPE_VALUES":
            return {
                facilityTypeValues: pull(
                    state.facilityTypeValues,
                    action.payload.toString()
                ),
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "REMOVE_FACILITY_OWNER_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: pull(
                    state.facilityOwnerValues,
                    action.payload.toString()
                ),
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "REMOVE_REGULATORY_STATUS_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: pull(
                    state.regulatoryStatusValues, action.payload.toString()
                ),
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: state.typeInstanceValues,
                selectTagValue: state.selectTagValue
            };
        case "REMOVE_RESOURCE_TYPE_VALUES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: pull(
                    state.resourceTypeValue, action.payload.toString()
                ),
                typeInstanceValues: state.typeInstanceValues

       ,         selectTagValue: state.selectTagValue
            };
        case "REMOVE_RESOURCE_TYPE_INSTANCES":
            return {
                facilityTypeValues: state.facilityTypeValues,
                districtValues: state.districtValues,
                operationalStatusValues: state.operationalStatusValues,
                facilityOwnerValues: state.facilityOwnerValues,
                regulatoryStatusValues: state.regulatoryStatusValues,
                resourceTypeValue: state.resourceTypeValue,
                typeInstanceValues: pull(state.typeInstanceValues, action.payload.toString()),
                selectTagValue: state.selectTagValue
            };

        default:
            return state;
    }
};
