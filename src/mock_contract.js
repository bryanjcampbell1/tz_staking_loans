let storage = { "prim": "Pair", "args": [ { "int": "12" }, { "int": "123" } ] };

let code = {[
        { "prim": "storage", "args": [ { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%myParameter1" ] }, { "prim": "int", "annots": [ "%myParameter2" ] } ] } ] },
{ "prim": "parameter", "args": [ { "prim": "or", "args": [ { "prim": "int", "annots": [ "%myEntryPoint1" ] }, { "prim": "int", "annots": [ "%myEntryPoint2" ] } ] } ] },
{
    "prim": "code",
    "args": [
    [
        { "prim": "DUP" },
        { "prim": "CDR" },
        { "prim": "SWAP" },
        { "prim": "CAR" },
        {
            "prim": "IF_LEFT",
            "args": [
                [
                    [
                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "123" } ] },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                            "prim": "IF",
                            "args": [
                                [ [] ],
                                [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.myParameter1 <= 123" } ] }, { "prim": "FAILWITH" } ] ]
                            ]
                        },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "CDR" },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                        { "prim": "CAR" },
                        { "prim": "ADD" },
                        { "prim": "PAIR" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DROP", "args": [ { "int": "2" } ] }
                    ]
                ],
                [
                    [
                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "123" } ] },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                            "prim": "IF",
                            "args": [
                                [ [] ],
                                [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.myParameter1 <= 123" } ] }, { "prim": "FAILWITH" } ] ]
                            ]
                        },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "CDR" },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                        { "prim": "CAR" },
                        { "prim": "ADD" },
                        { "prim": "PAIR" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DROP", "args": [ { "int": "2" } ] }
                    ]
                ]
            ]
        },
        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
        { "prim": "PAIR" }
    ]
]
}
]};

let address = "KT1EnYHapL9ehyEuJXgFCXLUTR5CA9RJpJrm"

let contractData = {storage:storage, code:code, address:address};

export default contractData;