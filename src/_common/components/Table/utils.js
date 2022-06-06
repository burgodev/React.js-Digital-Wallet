/* ACTION LIST EXAMPLE */
const actionList = [
  {
    text: "Detalhes",
    id: 2,
    type: "button",
    width: "40%",
    onClick: (id) => console.log(id)
  },
  {
    id: 1,
    text: "Aprovar",
    type: "button",
    width: "40%",
    secondary: true,
    onClick: (id) => console.log(id)
  },
  {
    type: "list",
    id: 3,
    list: [
      {
        id: 0,
        onClick: (id) => console.log(id),
        text: "Detalhes"
      },
      {
        onClick: (id) => console.log(id),
        text: "Aprovar",
        id: 1,
      },
      {
        onClick: (id) => console.log(id),
        text: "Reprovar",
        id: 2,
      },
    ],
  }
]

/* TABLE HEAD */
const tableHead = [
  {
    text: "Data solicitação",
    id: 1,
  },
  {
    text: "Conta",
    id: 2,
  },
  {
    text: "Descrição",
    id: 3,
  },
  {
    text: "Valor",
    id: 4,
  },
];