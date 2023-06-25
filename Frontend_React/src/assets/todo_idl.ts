export type TodoListAnchor = {
  "version": "0.1.0",
  "name": "todo_list_anchor",
  "instructions": [
    {
      "name": "addTodo",
      "accounts": [
        {
          "name": "todoUser",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "item",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatedChecked",
      "accounts": [
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "checked",
          "type": "bool"
        }
      ]
    },
    {
      "name": "removeTodo",
      "accounts": [
        {
          "name": "todoUser",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "todoItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "item",
            "type": "string"
          },
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "checked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "todoUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "listedItems",
            "type": "u16"
          }
        ]
      }
    }
  ]
};

export const IDL: TodoListAnchor = {
  "version": "0.1.0",
  "name": "todo_list_anchor",
  "instructions": [
    {
      "name": "addTodo",
      "accounts": [
        {
          "name": "todoUser",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "item",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatedChecked",
      "accounts": [
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        },
        {
          "name": "checked",
          "type": "bool"
        }
      ]
    },
    {
      "name": "removeTodo",
      "accounts": [
        {
          "name": "todoUser",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_user"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "todoItem",
          "isMut": true,
          "isSigner": false,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "type": "string",
                "value": "todo_item"
              },
              {
                "kind": "account",
                "type": "publicKey",
                "path": "signer"
              },
              {
                "kind": "arg",
                "type": "u8",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "todoItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "item",
            "type": "string"
          },
          {
            "name": "id",
            "type": "u8"
          },
          {
            "name": "checked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "todoUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "listedItems",
            "type": "u16"
          }
        ]
      }
    }
  ]
};
