let storage =`{
  "prim": "Pair",
  "args": [
    {
      "prim": "Pair",
      "args": [ { "prim": "Pair", "args": [ { "string": "tz1hdQscorfqMzFqYxnrApuS5i6QSTuoAp3w" }, { "int": "0" } ] }, { "prim": "Pair", "args": [ { "int": "0" }, [] ] } ]
    },
    { "prim": "Pair", "args": [ { "prim": "Pair", "args": [ { "prim": "Unit" }, [] ] }, { "prim": "Pair", "args": [ { "prim": "False" }, [] ] } ] }
  ]
}`;

let code =`[
  {
    "prim": "storage",
    "args": [
      {
        "prim": "pair",
        "args": [
          {
            "prim": "pair",
            "args": [
              { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%administrator" ] }, { "prim": "nat", "annots": [ "%all_tokens" ] } ] },
              {
                "prim": "pair",
                "args": [
                  { "prim": "nat", "annots": [ "%highestTokenIndex" ] },
                  { "prim": "big_map", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ], "annots": [ "%ledger" ] }
                ]
              }
            ]
          },
          {
            "prim": "pair",
            "args": [
              {
                "prim": "pair",
                "args": [
                  { "prim": "unit", "annots": [ "%metadata_string" ] },
                  {
                    "prim": "big_map",
                    "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ] }, { "prim": "unit" } ],
                    "annots": [ "%operators" ]
                  }
                ]
              },
              {
                "prim": "pair",
                "args": [
                  { "prim": "bool", "annots": [ "%paused" ] },
                  {
                    "prim": "big_map",
                    "args": [
                      { "prim": "nat" },
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "nat", "annots": [ "%token_id" ] },
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "string", "annots": [ "%symbol" ] },
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "string", "annots": [ "%name" ] },
                                      {
                                        "prim": "pair",
                                        "args": [
                                          { "prim": "nat", "annots": [ "%decimals" ] },
                                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ], "annots": [ "%extras" ] }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "annots": [ "%metadata" ]
                          },
                          { "prim": "nat", "annots": [ "%total_supply" ] }
                        ]
                      }
                    ],
                    "annots": [ "%tokens" ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "prim": "parameter",
    "args": [
      {
        "prim": "or",
        "args": [
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "contract",
                        "args": [
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "nat", "annots": [ "%balance" ] },
                                  {
                                    "prim": "pair",
                                    "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                    "annots": [ "%request" ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%callback" ]
                      },
                      {
                        "prim": "list",
                        "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                        "annots": [ "%requests" ]
                      }
                    ],
                    "annots": [ "%balance_of" ]
                  },
                  {
                    "prim": "or",
                    "args": [
                      { "prim": "int", "annots": [ "%create_certificate" ] },
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "contract",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "bool", "annots": [ "%is_operator" ] },
                                  {
                                    "prim": "pair",
                                    "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                                    "annots": [ "%operator" ]
                                  }
                                ]
                              }
                            ],
                            "annots": [ "%callback" ]
                          },
                          {
                            "prim": "pair",
                            "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                            "annots": [ "%operator" ]
                          }
                        ],
                        "annots": [ "%is_operator" ]
                      }
                    ]
                  }
                ]
              },
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%address" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] },
                      { "prim": "pair", "args": [ { "prim": "string", "annots": [ "%symbol" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                    ],
                    "annots": [ "%mint" ]
                  },
                  {
                    "prim": "or",
                    "args": [
                      {
                        "prim": "contract",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              {
                                "prim": "or",
                                "args": [
                                  { "prim": "unit", "annots": [ "%no_transfer" ] },
                                  {
                                    "prim": "or",
                                    "args": [ { "prim": "unit", "annots": [ "%owner_transfer" ] }, { "prim": "unit", "annots": [ "%owner_or_operator_transfer" ] } ]
                                  }
                                ],
                                "annots": [ "%operator" ]
                              },
                              {
                                "prim": "pair",
                                "args": [
                                  {
                                    "prim": "or",
                                    "args": [
                                      { "prim": "unit", "annots": [ "%owner_no_op" ] },
                                      {
                                        "prim": "or",
                                        "args": [ { "prim": "unit", "annots": [ "%optional_owner_hook" ] }, { "prim": "unit", "annots": [ "%required_owner_hook" ] } ]
                                      }
                                    ],
                                    "annots": [ "%receiver" ]
                                  },
                                  {
                                    "prim": "pair",
                                    "args": [
                                      {
                                        "prim": "or",
                                        "args": [
                                          { "prim": "unit", "annots": [ "%owner_no_op" ] },
                                          {
                                            "prim": "or",
                                            "args": [ { "prim": "unit", "annots": [ "%optional_owner_hook" ] }, { "prim": "unit", "annots": [ "%required_owner_hook" ] } ]
                                          }
                                        ],
                                        "annots": [ "%sender" ]
                                      },
                                      {
                                        "prim": "option",
                                        "args": [
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "option", "args": [ { "prim": "address" } ], "annots": [ "%config_api" ] },
                                              { "prim": "string", "annots": [ "%tag" ] }
                                            ]
                                          }
                                        ],
                                        "annots": [ "%custom" ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%permissions_descriptor" ]
                      },
                      { "prim": "nat", "annots": [ "%redeem_certificate" ] }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "prim": "or",
            "args": [
              {
                "prim": "or",
                "args": [
                  { "prim": "address", "annots": [ "%set_administrator" ] },
                  {
                    "prim": "or",
                    "args": [
                      { "prim": "bool", "annots": [ "%set_pause" ] },
                      {
                        "prim": "pair",
                        "args": [
                          {
                            "prim": "contract",
                            "args": [
                              {
                                "prim": "list",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "nat", "annots": [ "%token_id" ] },
                                      {
                                        "prim": "pair",
                                        "args": [
                                          { "prim": "string", "annots": [ "%symbol" ] },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "string", "annots": [ "%name" ] },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "nat", "annots": [ "%decimals" ] },
                                                  { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ], "annots": [ "%extras" ] }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            "annots": [ "%callback" ]
                          },
                          { "prim": "list", "args": [ { "prim": "nat" } ], "annots": [ "%token_ids" ] }
                        ],
                        "annots": [ "%token_metadata" ]
                      }
                    ]
                  }
                ]
              },
              {
                "prim": "or",
                "args": [
                  {
                    "prim": "pair",
                    "args": [
                      {
                        "prim": "contract",
                        "args": [
                          {
                            "prim": "list",
                            "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%total_supply" ] } ] } ]
                          }
                        ],
                        "annots": [ "%callback" ]
                      },
                      { "prim": "list", "args": [ { "prim": "nat" } ], "annots": [ "%token_ids" ] }
                    ],
                    "annots": [ "%total_supply" ]
                  },
                  {
                    "prim": "or",
                    "args": [
                      {
                        "prim": "list",
                        "args": [
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "address", "annots": [ "%from_" ] },
                              {
                                "prim": "list",
                                "args": [
                                  {
                                    "prim": "pair",
                                    "args": [
                                      { "prim": "address", "annots": [ "%to_" ] },
                                      { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                                    ]
                                  }
                                ],
                                "annots": [ "%txs" ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%transfer" ]
                      },
                      {
                        "prim": "list",
                        "args": [
                          {
                            "prim": "or",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                                "annots": [ "%add_operator" ]
                              },
                              {
                                "prim": "pair",
                                "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "address", "annots": [ "%operator" ] } ],
                                "annots": [ "%remove_operator" ]
                              }
                            ]
                          }
                        ],
                        "annots": [ "%update_operators" ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
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
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "CAR" },
                            {
                              "prim": "IF",
                              "args": [
                                [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ self.data.paused" } ] }, { "prim": "FAILWITH" } ] ],
                                [ [] ]
                              ]
                            },
                            {
                              "prim": "PUSH",
                              "args": [
                                {
                                  "prim": "list",
                                  "args": [
                                    {
                                      "prim": "pair",
                                      "args": [
                                        { "prim": "nat", "annots": [ "%balance" ] },
                                        {
                                          "prim": "pair",
                                          "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                          "annots": [ "%request" ]
                                        }
                                      ]
                                    }
                                  ]
                                },
                                []
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            {
                              "prim": "ITER",
                              "args": [
                                [
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR", "annots": [ "%owner", "%token_id" ] },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR" },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "PAIR", "annots": [ "%balance", "%request" ] },
                                  { "prim": "CONS" }
                                ]
                              ]
                            },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                            { "prim": "CAR" },
                            { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                            {
                              "prim": "NIL",
                              "args": [
                                {
                                  "prim": "pair",
                                  "args": [
                                    { "prim": "nat", "annots": [ "%balance" ] },
                                    {
                                      "prim": "pair",
                                      "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ],
                                      "annots": [ "%request" ]
                                    }
                                  ]
                                }
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "ITER", "args": [ [ { "prim": "CONS" } ] ] },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "DROP" },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "DROP" },
                            { "prim": "TRANSFER_TOKENS" },
                            { "prim": "CONS" }
                          ]
                        ],
                        [
                          {
                            "prim": "IF_LEFT",
                            "args": [
                              [
                                [
                                  { "prim": "DUP" },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "25" } ] },
                                  { "prim": "COMPARE" },
                                  { "prim": "GT" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [ [] ],
                                      [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: params.months < 25" } ] }, { "prim": "FAILWITH" } ] ]
                                    ]
                                  },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "1" } ] },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "0" } ] },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "COMPARE" },
                                  { "prim": "LT" },
                                  {
                                    "prim": "LOOP",
                                    "args": [
                                      [
                                        { "prim": "SWAP" },
                                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "10033" } ] },
                                        { "prim": "MUL" },
                                        { "prim": "SWAP" },
                                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "1" } ] },
                                        { "prim": "ADD" },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "COMPARE" },
                                        { "prim": "LT" }
                                      ]
                                    ]
                                  },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "1" } ] },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "0" } ] },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "COMPARE" },
                                  { "prim": "LT" },
                                  {
                                    "prim": "LOOP",
                                    "args": [
                                      [
                                        { "prim": "SWAP" },
                                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "10000" } ] },
                                        { "prim": "MUL" },
                                        { "prim": "SWAP" },
                                        { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "1" } ] },
                                        { "prim": "ADD" },
                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                        { "prim": "SWAP" },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                        { "prim": "COMPARE" },
                                        { "prim": "LT" }
                                      ]
                                    ]
                                  },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "COMPARE" },
                                  { "prim": "LT" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [
                                        [
                                          {
                                            "prim": "PUSH",
                                            "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ (self.data.highestTokenIndex < self.data.all_tokens)" } ]
                                          },
                                          { "prim": "FAILWITH" }
                                        ]
                                      ],
                                      [ [] ]
                                    ]
                                  },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CAR" },
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "DIG", "args": [ { "int": "8" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "9" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                  { "prim": "DIG", "args": [ { "int": "11" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "12" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "ADD" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "COMPARE" },
                                  { "prim": "LE" },
                                  { "prim": "IF", "args": [ [ { "prim": "DROP" } ], [ [ { "prim": "SWAP" }, { "prim": "DROP" } ] ] ] },
                                  { "prim": "DIG", "args": [ { "int": "9" } ] },
                                  { "prim": "DROP" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "SENDER" },
                                  { "prim": "PAIR" },
                                  { "prim": "MEM" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [
                                        [
                                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "6" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "CDR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CAR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "SENDER" },
                                          { "prim": "PAIR" },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                                          { "prim": "GET" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "DROP" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                          { "prim": "DIG", "args": [ { "int": "11" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "12" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CDR" },
                                          { "prim": "DIG", "args": [ { "int": "12" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "SENDER" },
                                          { "prim": "PAIR" },
                                          { "prim": "GET" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "ADD" },
                                          { "prim": "SOME" },
                                          { "prim": "SWAP" },
                                          { "prim": "UPDATE" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "PAIR" },
                                          { "prim": "DUG", "args": [ { "int": "5" } ] }
                                        ]
                                      ],
                                      [
                                        [
                                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "6" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "CDR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CAR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "1" } ] } ] },
                                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "SENDER" },
                                          { "prim": "PAIR" },
                                          { "prim": "UPDATE" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "PAIR" },
                                          { "prim": "DUG", "args": [ { "int": "5" } ] }
                                        ]
                                      ]
                                    ]
                                  },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "MEM" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [
                                        [
                                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "6" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "11" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "2" } ] },
                                          { "prim": "GET" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "CAR" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                          { "prim": "DIG", "args": [ { "int": "12" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "13" } ] },
                                          { "prim": "CDR" },
                                          { "prim": "CDR" },
                                          { "prim": "CDR" },
                                          { "prim": "DIG", "args": [ { "int": "13" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "GET" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:632" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "CDR" },
                                          { "prim": "ADD" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SOME" },
                                          { "prim": "SWAP" },
                                          { "prim": "UPDATE" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "DUG", "args": [ { "int": "5" } ] }
                                        ]
                                      ],
                                      [
                                        [
                                          { "prim": "DIG", "args": [ { "int": "5" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "6" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "DUP" },
                                          { "prim": "CAR" },
                                          { "prim": "SWAP" },
                                          { "prim": "CDR" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                          { "prim": "PUSH", "args": [ { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ] }, [] ] },
                                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "1" } ] },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "100" } ] },
                                          { "prim": "AMOUNT" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "100" } ] },
                                          { "prim": "MUL" },
                                          { "prim": "EDIV" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "split_tokens" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "CAR" },
                                          { "prim": "EDIV" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ]
                                          },
                                          { "prim": "CAR" },
                                          { "prim": "INT" },
                                          { "prim": "SOME" },
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "value" } ] },
                                          { "prim": "UPDATE" },
                                          { "prim": "DIG", "args": [ { "int": "7" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "8" } ] },
                                          { "prim": "ISNAT" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ]
                                          },
                                          { "prim": "DIG", "args": [ { "int": "8" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "9" } ] },
                                          { "prim": "DIG", "args": [ { "int": "11" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "12" } ] },
                                          { "prim": "SUB" },
                                          { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "1" } ] },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "100" } ] },
                                          { "prim": "AMOUNT" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "100" } ] },
                                          { "prim": "MUL" },
                                          { "prim": "EDIV" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "split_tokens" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                          },
                                          { "prim": "CAR" },
                                          { "prim": "EDIV" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ]
                                          },
                                          { "prim": "CAR" },
                                          { "prim": "INT" },
                                          { "prim": "MUL" },
                                          { "prim": "ISNAT" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ]
                                          },
                                          { "prim": "EDIV" },
                                          {
                                            "prim": "IF_NONE",
                                            "args": [
                                              [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "division by zero" } ] }, { "prim": "FAILWITH" } ] ],
                                              [ { "prim": "CAR" } ]
                                            ]
                                          },
                                          { "prim": "INT" },
                                          { "prim": "SOME" },
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "earlyUnlockFee" } ] },
                                          { "prim": "UPDATE" },
                                          { "prim": "PUSH", "args": [ { "prim": "timestamp" }, { "string": "0" } ] },
                                          { "prim": "NOW" },
                                          { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "60" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "24" } ] },
                                          { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "30" } ] },
                                          { "prim": "DIG", "args": [ { "int": "16" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "17" } ] },
                                          { "prim": "MUL" },
                                          { "prim": "MUL" },
                                          { "prim": "MUL" },
                                          { "prim": "MUL" },
                                          { "prim": "ADD" },
                                          { "prim": "SUB" },
                                          { "prim": "SOME" },
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "unlockTime" } ] },
                                          { "prim": "UPDATE" },
                                          { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                          { "prim": "PAIR", "annots": [ "%decimals", "%extras" ] },
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "" } ] },
                                          { "prim": "PAIR", "annots": [ "%name" ] },
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "IOU" } ] },
                                          { "prim": "PAIR", "annots": [ "%symbol" ] },
                                          { "prim": "DIG", "args": [ { "int": "11" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "12" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "PAIR", "annots": [ "%token_id" ] },
                                          { "prim": "PAIR", "annots": [ "%metadata", "%total_supply" ] },
                                          { "prim": "SOME" },
                                          { "prim": "DIG", "args": [ { "int": "10" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CDR" },
                                          { "prim": "CAR" },
                                          { "prim": "UPDATE" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "SWAP" },
                                          { "prim": "PAIR" },
                                          { "prim": "DUG", "args": [ { "int": "5" } ] }
                                        ]
                                      ]
                                    ]
                                  },
                                  { "prim": "DROP", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CAR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "ADD" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                                ]
                              ],
                              [
                                [
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  { "prim": "PAIR", "annots": [ "%owner", "%operator" ] },
                                  { "prim": "MEM" },
                                  { "prim": "PAIR", "annots": [ "%is_operator", "%operator" ] },
                                  { "prim": "TRANSFER_TOKENS" },
                                  { "prim": "CONS" }
                                ]
                              ]
                            ]
                          }
                        ]
                      ]
                    }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "SENDER" },
                            { "prim": "COMPARE" },
                            { "prim": "EQ" },
                            {
                              "prim": "IF",
                              "args": [
                                [ [] ],
                                [
                                  [
                                    { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.sender == self.data.administrator" } ] },
                                    { "prim": "FAILWITH" }
                                  ]
                                ]
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "DUP" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "CAR" },
                            { "prim": "DUP" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "5" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "DUP" },
                            { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                            { "prim": "DIG", "args": [ { "int": "6" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "7" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "ADD" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "COMPARE" },
                            { "prim": "LE" },
                            { "prim": "IF", "args": [ [ { "prim": "DROP" } ], [ [ { "prim": "SWAP" }, { "prim": "DROP" } ] ] ] },
                            { "prim": "DIG", "args": [ { "int": "5" } ] },
                            { "prim": "DROP" },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "SWAP" },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "PAIR" },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [
                                  [
                                    { "prim": "SWAP" },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "DIG", "args": [ { "int": "5" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "6" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "6" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "7" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "PAIR" },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                                    { "prim": "GET" },
                                    {
                                      "prim": "IF_NONE",
                                      "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                    },
                                    { "prim": "DROP" },
                                    { "prim": "DIG", "args": [ { "int": "5" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "6" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "7" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "7" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "8" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "8" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "9" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "PAIR" },
                                    { "prim": "GET" },
                                    {
                                      "prim": "IF_NONE",
                                      "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                    },
                                    { "prim": "ADD" },
                                    { "prim": "SOME" },
                                    { "prim": "SWAP" },
                                    { "prim": "UPDATE" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" }
                                  ]
                                ],
                                [
                                  [
                                    { "prim": "SWAP" },
                                    { "prim": "DUP" },
                                    { "prim": "CDR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CAR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "5" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    { "prim": "SOME" },
                                    { "prim": "DIG", "args": [ { "int": "5" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "6" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "6" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "7" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CAR" },
                                    { "prim": "PAIR" },
                                    { "prim": "UPDATE" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" }
                                  ]
                                ]
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "MEM" },
                            {
                              "prim": "IF",
                              "args": [
                                [
                                  [
                                    { "prim": "SWAP" },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "DIG", "args": [ { "int": "5" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "6" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                                    { "prim": "GET" },
                                    {
                                      "prim": "IF_NONE",
                                      "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                    },
                                    { "prim": "CAR" },
                                    { "prim": "DIG", "args": [ { "int": "6" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "7" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "8" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "8" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "9" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "GET" },
                                    {
                                      "prim": "IF_NONE",
                                      "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:443" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                    },
                                    { "prim": "CDR" },
                                    { "prim": "ADD" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SOME" },
                                    { "prim": "SWAP" },
                                    { "prim": "UPDATE" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" }
                                  ]
                                ],
                                [
                                  [
                                    { "prim": "SWAP" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DUP" },
                                    { "prim": "CAR" },
                                    { "prim": "SWAP" },
                                    { "prim": "CDR" },
                                    { "prim": "DIG", "args": [ { "int": "4" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "5" } ] },
                                    { "prim": "CAR" },
                                    { "prim": "CDR" },
                                    {
                                      "prim": "PUSH",
                                      "args": [
                                        {
                                          "prim": "pair",
                                          "args": [
                                            { "prim": "string", "annots": [ "%name" ] },
                                            {
                                              "prim": "pair",
                                              "args": [
                                                { "prim": "nat", "annots": [ "%decimals" ] },
                                                { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ], "annots": [ "%extras" ] }
                                              ]
                                            }
                                          ]
                                        },
                                        { "prim": "Pair", "args": [ { "string": "" }, { "prim": "Pair", "args": [ { "int": "0" }, [] ] } ] }
                                      ]
                                    },
                                    { "prim": "DIG", "args": [ { "int": "6" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "7" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CAR" },
                                    { "prim": "PAIR", "annots": [ "%symbol" ] },
                                    { "prim": "DIG", "args": [ { "int": "6" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "7" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "PAIR", "annots": [ "%token_id" ] },
                                    { "prim": "PAIR", "annots": [ "%metadata", "%total_supply" ] },
                                    { "prim": "SOME" },
                                    { "prim": "DIG", "args": [ { "int": "5" } ] },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "6" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "UPDATE" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" },
                                    { "prim": "PAIR" },
                                    { "prim": "SWAP" }
                                  ]
                                ]
                              ]
                            },
                            { "prim": "DROP" },
                            { "prim": "DUP" },
                            { "prim": "DUP" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "CAR" },
                            { "prim": "DUP" },
                            { "prim": "CAR" },
                            { "prim": "SWAP" },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "CAR" },
                            { "prim": "ADD" },
                            { "prim": "PAIR" },
                            { "prim": "SWAP" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                          ]
                        ],
                        [
                          {
                            "prim": "IF_LEFT",
                            "args": [
                              [
                                [
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                  {
                                    "prim": "PUSH",
                                    "args": [
                                      {
                                        "prim": "pair",
                                        "args": [
                                          {
                                            "prim": "or",
                                            "args": [
                                              { "prim": "unit", "annots": [ "%no_transfer" ] },
                                              {
                                                "prim": "or",
                                                "args": [ { "prim": "unit", "annots": [ "%owner_transfer" ] }, { "prim": "unit", "annots": [ "%owner_or_operator_transfer" ] } ]
                                              }
                                            ],
                                            "annots": [ "%operator" ]
                                          },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              {
                                                "prim": "or",
                                                "args": [
                                                  { "prim": "unit", "annots": [ "%owner_no_op" ] },
                                                  {
                                                    "prim": "or",
                                                    "args": [ { "prim": "unit", "annots": [ "%optional_owner_hook" ] }, { "prim": "unit", "annots": [ "%required_owner_hook" ] } ]
                                                  }
                                                ],
                                                "annots": [ "%receiver" ]
                                              },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  {
                                                    "prim": "or",
                                                    "args": [
                                                      { "prim": "unit", "annots": [ "%owner_no_op" ] },
                                                      {
                                                        "prim": "or",
                                                        "args": [
                                                          { "prim": "unit", "annots": [ "%optional_owner_hook" ] },
                                                          { "prim": "unit", "annots": [ "%required_owner_hook" ] }
                                                        ]
                                                      }
                                                    ],
                                                    "annots": [ "%sender" ]
                                                  },
                                                  {
                                                    "prim": "option",
                                                    "args": [
                                                      {
                                                        "prim": "pair",
                                                        "args": [
                                                          { "prim": "option", "args": [ { "prim": "address" } ], "annots": [ "%config_api" ] },
                                                          { "prim": "string", "annots": [ "%tag" ] }
                                                        ]
                                                      }
                                                    ],
                                                    "annots": [ "%custom" ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      {
                                        "prim": "Pair",
                                        "args": [
                                          { "prim": "Right", "args": [ { "prim": "Right", "args": [ { "prim": "Unit" } ] } ] },
                                          {
                                            "prim": "Pair",
                                            "args": [
                                              { "prim": "Left", "args": [ { "prim": "Unit" } ] },
                                              { "prim": "Pair", "args": [ { "prim": "Left", "args": [ { "prim": "Unit" } ] }, { "prim": "None" } ] }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  { "prim": "TRANSFER_TOKENS" },
                                  { "prim": "CONS" }
                                ]
                              ],
                              [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "SENDER" },
                                  { "prim": "PAIR" },
                                  { "prim": "MEM" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [ [] ],
                                      [
                                        [
                                          {
                                            "prim": "PUSH",
                                            "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.ledger.contains((sp.sender, params.token_id))" } ]
                                          },
                                          { "prim": "FAILWITH" }
                                        ]
                                      ]
                                    ]
                                  },
                                  { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "0" } ] },
                                  { "prim": "PUSH", "args": [ { "prim": "timestamp" }, { "string": "0" } ] },
                                  { "prim": "NOW" },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:668" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "unlockTime" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:678" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "NEG" },
                                  { "prim": "ADD" },
                                  { "prim": "SUB" },
                                  { "prim": "COMPARE" },
                                  { "prim": "DROP" },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "CDR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CAR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "SENDER" },
                                  { "prim": "PAIR" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "DROP" },
                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                  { "prim": "DROP" },
                                  { "prim": "PUSH", "args": [ { "prim": "option", "args": [ { "prim": "nat" } ] }, { "prim": "Some", "args": [ { "int": "0" } ] } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "UPDATE" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "CAR" },
                                  { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SOME" },
                                  { "prim": "SWAP" },
                                  { "prim": "UPDATE" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                  { "prim": "SENDER" },
                                  { "prim": "CONTRACT", "args": [ { "prim": "unit" } ] },
                                  { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ] },
                                  { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "1" } ] },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "5" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:668" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "earlyUnlockFee" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:680" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:668" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "CAR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "value" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:679" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "SUB" },
                                  { "prim": "ISNAT" },
                                  { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ] },
                                  { "prim": "MUL" },
                                  { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] },
                                  { "prim": "TRANSFER_TOKENS" },
                                  { "prim": "CONS" }
                                ]
                              ]
                            ]
                          }
                        ]
                      ]
                    }
                  ]
                ]
              }
            ],
            [
              {
                "prim": "IF_LEFT",
                "args": [
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "CAR" },
                            { "prim": "SENDER" },
                            { "prim": "COMPARE" },
                            { "prim": "EQ" },
                            {
                              "prim": "IF",
                              "args": [
                                [ [] ],
                                [
                                  [
                                    { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.sender == self.data.administrator" } ] },
                                    { "prim": "FAILWITH" }
                                  ]
                                ]
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "CAR" },
                            { "prim": "DUP" },
                            { "prim": "CDR" },
                            { "prim": "SWAP" },
                            { "prim": "CAR" },
                            { "prim": "CDR" },
                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "PAIR" },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                          ]
                        ],
                        [
                          {
                            "prim": "IF_LEFT",
                            "args": [
                              [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "CAR" },
                                  { "prim": "SENDER" },
                                  { "prim": "COMPARE" },
                                  { "prim": "EQ" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [ [] ],
                                      [
                                        [
                                          { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.sender == self.data.administrator" } ] },
                                          { "prim": "FAILWITH" }
                                        ]
                                      ]
                                    ]
                                  },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "DUP" },
                                  { "prim": "CAR" },
                                  { "prim": "SWAP" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "SWAP" },
                                  { "prim": "PAIR" },
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                                ]
                              ],
                              [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CAR" },
                                  {
                                    "prim": "IF",
                                    "args": [
                                      [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ self.data.paused" } ] }, { "prim": "FAILWITH" } ] ],
                                      [ [] ]
                                    ]
                                  },
                                  {
                                    "prim": "PUSH",
                                    "args": [
                                      {
                                        "prim": "list",
                                        "args": [
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "nat", "annots": [ "%token_id" ] },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "string", "annots": [ "%symbol" ] },
                                                  {
                                                    "prim": "pair",
                                                    "args": [
                                                      { "prim": "string", "annots": [ "%name" ] },
                                                      {
                                                        "prim": "pair",
                                                        "args": [
                                                          { "prim": "nat", "annots": [ "%decimals" ] },
                                                          { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ], "annots": [ "%extras" ] }
                                                        ]
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      },
                                      []
                                    ]
                                  },
                                  { "prim": "SWAP" },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                                  { "prim": "CDR" },
                                  {
                                    "prim": "ITER",
                                    "args": [
                                      [
                                        { "prim": "SWAP" },
                                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                                        { "prim": "DUP" },
                                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                                        { "prim": "CDR" },
                                        { "prim": "CDR" },
                                        { "prim": "CDR" },
                                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                                        { "prim": "GET" },
                                        {
                                          "prim": "IF_NONE",
                                          "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:536" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                        },
                                        { "prim": "CAR" },
                                        { "prim": "CONS" }
                                      ]
                                    ]
                                  },
                                  { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                  { "prim": "CAR" },
                                  { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                                  {
                                    "prim": "NIL",
                                    "args": [
                                      {
                                        "prim": "pair",
                                        "args": [
                                          { "prim": "nat", "annots": [ "%token_id" ] },
                                          {
                                            "prim": "pair",
                                            "args": [
                                              { "prim": "string", "annots": [ "%symbol" ] },
                                              {
                                                "prim": "pair",
                                                "args": [
                                                  { "prim": "string", "annots": [ "%name" ] },
                                                  {
                                                    "prim": "pair",
                                                    "args": [
                                                      { "prim": "nat", "annots": [ "%decimals" ] },
                                                      { "prim": "map", "args": [ { "prim": "string" }, { "prim": "int" } ], "annots": [ "%extras" ] }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  },
                                  { "prim": "SWAP" },
                                  { "prim": "ITER", "args": [ [ { "prim": "CONS" } ] ] },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DROP" },
                                  { "prim": "DIG", "args": [ { "int": "4" } ] },
                                  { "prim": "DROP" },
                                  { "prim": "TRANSFER_TOKENS" },
                                  { "prim": "CONS" }
                                ]
                              ]
                            ]
                          }
                        ]
                      ]
                    }
                  ],
                  [
                    {
                      "prim": "IF_LEFT",
                      "args": [
                        [
                          [
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            { "prim": "CDR" },
                            { "prim": "CAR" },
                            {
                              "prim": "IF",
                              "args": [
                                [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ self.data.paused" } ] }, { "prim": "FAILWITH" } ] ],
                                [ [] ]
                              ]
                            },
                            {
                              "prim": "PUSH",
                              "args": [
                                {
                                  "prim": "list",
                                  "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%total_supply" ] } ] } ]
                                },
                                []
                              ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "2" } ] },
                            { "prim": "CDR" },
                            {
                              "prim": "ITER",
                              "args": [
                                [
                                  { "prim": "SWAP" },
                                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "DUP" },
                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                  { "prim": "GET" },
                                  {
                                    "prim": "IF_NONE",
                                    "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:523" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                  },
                                  { "prim": "CDR" },
                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                  { "prim": "PAIR", "annots": [ "%token_id", "%total_supply" ] },
                                  { "prim": "CONS" }
                                ]
                              ]
                            },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                            { "prim": "DIG", "args": [ { "int": "2" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "3" } ] },
                            { "prim": "CAR" },
                            { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                            { "prim": "DIG", "args": [ { "int": "3" } ] },
                            { "prim": "DUP" },
                            { "prim": "DUG", "args": [ { "int": "4" } ] },
                            {
                              "prim": "NIL",
                              "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%total_supply" ] } ] } ]
                            },
                            { "prim": "SWAP" },
                            { "prim": "ITER", "args": [ [ { "prim": "CONS" } ] ] },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "DROP" },
                            { "prim": "DIG", "args": [ { "int": "4" } ] },
                            { "prim": "DROP" },
                            { "prim": "TRANSFER_TOKENS" },
                            { "prim": "CONS" }
                          ]
                        ],
                        [
                          [
                            {
                              "prim": "IF_LEFT",
                              "args": [
                                [
                                  [
                                    { "prim": "SWAP" },
                                    { "prim": "DUP" },
                                    { "prim": "DUG", "args": [ { "int": "2" } ] },
                                    { "prim": "CDR" },
                                    { "prim": "CDR" },
                                    { "prim": "CAR" },
                                    {
                                      "prim": "IF",
                                      "args": [
                                        [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: ~ self.data.paused" } ] }, { "prim": "FAILWITH" } ] ],
                                        [ [] ]
                                      ]
                                    },
                                    { "prim": "DUP" },
                                    {
                                      "prim": "ITER",
                                      "args": [
                                        [
                                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                                          { "prim": "DUP" },
                                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                                          { "prim": "CAR" },
                                          { "prim": "CAR" },
                                          { "prim": "CAR" },
                                          { "prim": "SENDER" },
                                          { "prim": "COMPARE" },
                                          { "prim": "EQ" },
                                          {
                                            "prim": "IF",
                                            "args": [
                                              [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                              [ [ { "prim": "DUP" }, { "prim": "CAR" }, { "prim": "SENDER" }, { "prim": "COMPARE" }, { "prim": "EQ" } ] ]
                                            ]
                                          },
                                          {
                                            "prim": "IF",
                                            "args": [
                                              [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                              [
                                                [
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CDR" },
                                                  { "prim": "CAR" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SENDER" },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR", "annots": [ "%owner", "%operator" ] },
                                                  { "prim": "MEM" }
                                                ]
                                              ]
                                            ]
                                          },
                                          {
                                            "prim": "IF",
                                            "args": [ [ [] ], [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "NOT_OPERATOR" } ] }, { "prim": "FAILWITH" } ] ] ]
                                          },
                                          { "prim": "DUP" },
                                          { "prim": "CDR" },
                                          {
                                            "prim": "ITER",
                                            "args": [
                                              [
                                                { "prim": "DUP" },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                                                { "prim": "COMPARE" },
                                                { "prim": "LT" },
                                                {
                                                  "prim": "IF",
                                                  "args": [
                                                    [ [] ],
                                                    [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "TRANSFER_OF_ZERO" } ] }, { "prim": "FAILWITH" } ] ]
                                                  ]
                                                },
                                                { "prim": "DUP" },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                { "prim": "CDR" },
                                                { "prim": "CAR" },
                                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "PAIR" },
                                                { "prim": "GET" },
                                                {
                                                  "prim": "IF_NONE",
                                                  "args": [
                                                    [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ],
                                                    []
                                                  ]
                                                },
                                                { "prim": "COMPARE" },
                                                { "prim": "GE" },
                                                {
                                                  "prim": "IF",
                                                  "args": [
                                                    [ [] ],
                                                    [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "INSUFFICIENT_BALANCE" } ] }, { "prim": "FAILWITH" } ] ]
                                                  ]
                                                },
                                                { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "4" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "CDR" },
                                                { "prim": "SWAP" },
                                                { "prim": "CAR" },
                                                { "prim": "DUP" },
                                                { "prim": "CAR" },
                                                { "prim": "SWAP" },
                                                { "prim": "CDR" },
                                                { "prim": "DUP" },
                                                { "prim": "CAR" },
                                                { "prim": "SWAP" },
                                                { "prim": "CDR" },
                                                { "prim": "DUP" },
                                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                { "prim": "CDR" },
                                                { "prim": "CAR" },
                                                { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "PAIR" },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                { "prim": "GET" },
                                                {
                                                  "prim": "IF_NONE",
                                                  "args": [
                                                    [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ],
                                                    []
                                                  ]
                                                },
                                                { "prim": "DROP" },
                                                { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                { "prim": "CDR" },
                                                { "prim": "CAR" },
                                                { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "10" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "PAIR" },
                                                { "prim": "GET" },
                                                {
                                                  "prim": "IF_NONE",
                                                  "args": [
                                                    [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ],
                                                    []
                                                  ]
                                                },
                                                { "prim": "SUB" },
                                                { "prim": "ISNAT" },
                                                {
                                                  "prim": "IF_NONE",
                                                  "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ]
                                                },
                                                { "prim": "SOME" },
                                                { "prim": "SWAP" },
                                                { "prim": "UPDATE" },
                                                { "prim": "SWAP" },
                                                { "prim": "PAIR" },
                                                { "prim": "SWAP" },
                                                { "prim": "PAIR" },
                                                { "prim": "PAIR" },
                                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "4" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "CDR" },
                                                { "prim": "CDR" },
                                                { "prim": "SWAP" },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                { "prim": "CDR" },
                                                { "prim": "CAR" },
                                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                { "prim": "DUP" },
                                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                { "prim": "CAR" },
                                                { "prim": "PAIR" },
                                                { "prim": "MEM" },
                                                {
                                                  "prim": "IF",
                                                  "args": [
                                                    [
                                                      [
                                                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [
                                                            [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ],
                                                            []
                                                          ]
                                                        },
                                                        { "prim": "DROP" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "7" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "8" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "8" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "9" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "GET" },
                                                        {
                                                          "prim": "IF_NONE",
                                                          "args": [
                                                            [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:197" } ] }, { "prim": "FAILWITH" } ] ],
                                                            []
                                                          ]
                                                        },
                                                        { "prim": "ADD" },
                                                        { "prim": "SOME" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "UPDATE" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DUG", "args": [ { "int": "3" } ] }
                                                      ]
                                                    ],
                                                    [
                                                      [
                                                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DUP" },
                                                        { "prim": "CAR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "CDR" },
                                                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CDR" },
                                                        { "prim": "SOME" },
                                                        { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                        { "prim": "CDR" },
                                                        { "prim": "CAR" },
                                                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                        { "prim": "DUP" },
                                                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                        { "prim": "CAR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "UPDATE" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "SWAP" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "PAIR" },
                                                        { "prim": "DUG", "args": [ { "int": "3" } ] }
                                                      ]
                                                    ]
                                                  ]
                                                },
                                                { "prim": "DROP" }
                                              ]
                                            ]
                                          },
                                          { "prim": "DROP" }
                                        ]
                                      ]
                                    },
                                    { "prim": "DROP" }
                                  ]
                                ],
                                [
                                  [
                                    { "prim": "DUP" },
                                    {
                                      "prim": "ITER",
                                      "args": [
                                        [
                                          { "prim": "DUP" },
                                          {
                                            "prim": "IF_LEFT",
                                            "args": [
                                              [
                                                [
                                                  { "prim": "DROP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "SENDER" },
                                                  { "prim": "SWAP" },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [] ],
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ]
                                                    ]
                                                  },
                                                  { "prim": "CAR" },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                                      [
                                                        [
                                                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                          { "prim": "DUP" },
                                                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                          { "prim": "CAR" },
                                                          { "prim": "CAR" },
                                                          { "prim": "CAR" },
                                                          { "prim": "SENDER" },
                                                          { "prim": "COMPARE" },
                                                          { "prim": "EQ" }
                                                        ]
                                                      ]
                                                    ]
                                                  },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [ [] ],
                                                      [
                                                        [
                                                          {
                                                            "prim": "PUSH",
                                                            "args": [
                                                              { "prim": "string" },
                                                              {
                                                                "string":
                                                                  "WrongCondition: (update.open_variant('add_operator').owner == sp.sender) | (sp.sender == self.data.administrator)"
                                                              }
                                                            ]
                                                          },
                                                          { "prim": "FAILWITH" }
                                                        ]
                                                      ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  {
                                                    "prim": "PUSH",
                                                    "args": [ { "prim": "option", "args": [ { "prim": "unit" } ] }, { "prim": "Some", "args": [ { "prim": "Unit" } ] } ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [] ],
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ]
                                                    ]
                                                  },
                                                  { "prim": "CDR" },
                                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [] ],
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                  { "prim": "DROP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR", "annots": [ "%owner", "%operator" ] },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ]
                                              ],
                                              [
                                                [
                                                  { "prim": "DROP" },
                                                  { "prim": "DUP" },
                                                  { "prim": "SENDER" },
                                                  { "prim": "SWAP" },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ],
                                                      [ [] ]
                                                    ]
                                                  },
                                                  { "prim": "CAR" },
                                                  { "prim": "COMPARE" },
                                                  { "prim": "EQ" },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [ { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "True" } ] } ],
                                                      [
                                                        [
                                                          { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                          { "prim": "DUP" },
                                                          { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                          { "prim": "CAR" },
                                                          { "prim": "CAR" },
                                                          { "prim": "CAR" },
                                                          { "prim": "SENDER" },
                                                          { "prim": "COMPARE" },
                                                          { "prim": "EQ" }
                                                        ]
                                                      ]
                                                    ]
                                                  },
                                                  {
                                                    "prim": "IF",
                                                    "args": [
                                                      [ [] ],
                                                      [
                                                        [
                                                          {
                                                            "prim": "PUSH",
                                                            "args": [
                                                              { "prim": "string" },
                                                              {
                                                                "string":
                                                                  "WrongCondition: (update.open_variant('remove_operator').owner == sp.sender) | (sp.sender == self.data.administrator)"
                                                              }
                                                            ]
                                                          },
                                                          { "prim": "FAILWITH" }
                                                        ]
                                                      ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "DUP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "CDR" },
                                                  { "prim": "NONE", "args": [ { "prim": "unit" } ] },
                                                  { "prim": "DIG", "args": [ { "int": "5" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "6" } ] },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ],
                                                      [ [] ]
                                                    ]
                                                  },
                                                  { "prim": "CDR" },
                                                  { "prim": "DIG", "args": [ { "int": "6" } ] },
                                                  { "prim": "DUP" },
                                                  { "prim": "DUG", "args": [ { "int": "7" } ] },
                                                  {
                                                    "prim": "IF_LEFT",
                                                    "args": [
                                                      [ [ { "prim": "DROP" }, { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ],
                                                      [ [] ]
                                                    ]
                                                  },
                                                  { "prim": "DIG", "args": [ { "int": "9" } ] },
                                                  { "prim": "DROP" },
                                                  { "prim": "CAR" },
                                                  { "prim": "PAIR", "annots": [ "%owner", "%operator" ] },
                                                  { "prim": "UPDATE" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "SWAP" },
                                                  { "prim": "PAIR" },
                                                  { "prim": "DUG", "args": [ { "int": "2" } ] }
                                                ]
                                              ]
                                            ]
                                          },
                                          { "prim": "DROP" }
                                        ]
                                      ]
                                    },
                                    { "prim": "DROP" }
                                  ]
                                ]
                              ]
                            },
                            { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                          ]
                        ]
                      ]
                    }
                  ]
                ]
              }
            ]
          ]
        },
        { "prim": "PAIR" }
      ]
    ]
  }
]`;

let address = "KT1UfLqf8ecEhbPU6pWCfEkCKHM2aF7KCfFv"

let contractData = {storage:storage, code:code, address:address};

export default contractData;