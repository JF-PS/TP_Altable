const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Dishes", deps: []
 * createTable() => "Services", deps: []
 * createTable() => "Tables", deps: []
 * createTable() => "SeatingPlans", deps: [Services, Tables]
 *
 */

const info = {
  revision: 1,
  name: "migration",
  created: "2022-01-23T15:49:30.325Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Dishes",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name" },
        description: { type: Sequelize.TEXT, field: "description" },
        type: { type: Sequelize.STRING, field: "type" },
        price: { type: Sequelize.FLOAT, field: "price" },
        quantity: {
          type: Sequelize.INTEGER,
          field: "quantity",
          defaultValue: 0,
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Services",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        startDate: { type: Sequelize.DATE, field: "startDate" },
        endDate: { type: Sequelize.DATE, field: "endDate" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Tables",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        numTable: { type: Sequelize.INTEGER, field: "numTable" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "SeatingPlans",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        serviceId: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Services", key: "id" },
          allowNull: true,
          field: "serviceId",
        },
        numTable: {
          type: Sequelize.INTEGER,
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
          references: { model: "Tables", key: "id" },
          allowNull: true,
          field: "numTable",
        },
        nbGuests: { type: Sequelize.INTEGER, field: "nbGuests" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Dishes", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["SeatingPlans", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Services", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Tables", { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
