module.exports = {
    "in_condition": [
        {
            "operator": "IN",
            "fieldName": "name",
            "fieldValue": "'John Doe','Jane Smith'"
        }
    ],
    "like_condition": [
        {
            "operator": "like",
            "fieldName": "name",
            "fieldValue": "John"
        }
    ],
    "equal_condition": [
        {
            "operator": "=",
            "fieldName": "age",
            "fieldValue": "25"
        }
    ],
    "greater_than_equal_condition": [
        {
            "operator": ">=",
            "fieldName": "age",
            "fieldValue": "25"
        }
    ],
    "less_than_equal_condition": [
        {
            "operator": "<=",
            "fieldName": "age",
            "fieldValue": "25"
        }
    ],
    "between_condition": [
        {
            "operator": "between",
            "fieldName": "age",
            "fieldValue": { v1: "21", v2: "29" }
        }
    ],
    "subquery_condition": [
        {
            "operator": "=",
            "fieldName": "name",
            "fieldValue": ''
        }
    ],
    "subquery_condition2": [
        {
            "operator": "=",
            "fieldName": "subquery_field",
            "fieldValue": "'John Doe'"
        }
    ]
}